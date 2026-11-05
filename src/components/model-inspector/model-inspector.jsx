
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const MODELS = {
  dressed: {
    label: "DRESSED Base",
    path: "/model-3d/dressed-base.glb",
  },
  mannequin: {
    label: "Mannequin",
    path: "/model-3d/mannequin.glb",
  },
};

export default function ModelInspector() {
  const mountRef = useRef(null);
  const engineRef = useRef(null);
  const modelRef = useRef(null);

  const [selectedModel, setSelectedModel] = useState("dressed");
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f7edf2");

    const camera = new THREE.PerspectiveCamera(
      40,
      mount.clientWidth / mount.clientHeight,
      0.01,
      100
    );

    camera.position.set(0, 1, 3.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.target.set(0, 0.9, 0);
    controls.minDistance = 0.5;
    controls.maxDistance = 8;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x9b8290, 2));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(-4, 2, -3);
    scene.add(fillLight);

    const grid = new THREE.GridHelper(4, 20, 0xc9aebe, 0xe5d5df);
    grid.position.y = 0;
    scene.add(grid);

    const axes = new THREE.AxesHelper(0.5);
    scene.add(axes);

    engineRef.current = {
      scene,
      camera,
      renderer,
      controls,
      grid,
    };

    let animationFrame;

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      if (!mount.clientWidth || !mount.clientHeight) return;

      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(mount.clientWidth, mount.clientHeight);
    });

    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();

      controls.dispose();

      if (modelRef.current) {
        scene.remove(modelRef.current);
        modelRef.current = null;
      }

      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }

      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    let cancelled = false;

    async function loadModel() {
      setLoading(true);
      setError("");
      setModelInfo(null);

      if (modelRef.current) {
        engine.scene.remove(modelRef.current);

        modelRef.current.traverse((object) => {
          if (!object.isMesh) return;

          object.geometry.dispose();

          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];

          materials.forEach((material) => {
            if (material) material.dispose();
          });
        });

        modelRef.current = null;
      }

      try {
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(
          MODELS[selectedModel].path
        );

        if (cancelled) return;

        const model = gltf.scene;
        model.updateMatrixWorld(true);

        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();

        box.getSize(size);
        box.getCenter(center);

        // Center model horizontally and place its lowest point at Y=0.
        model.position.set(
          -center.x,
          -box.min.y,
          -center.z
        );

        model.updateMatrixWorld(true);

        let meshes = 0;
        let vertices = 0;
        let triangles = 0;
        let normals = true;
        let uv = true;
        let materials = 0;

        model.traverse((object) => {
          if (!object.isMesh) return;

          meshes++;

          const geometry = object.geometry;
          const position = geometry.getAttribute("position");
          const normal = geometry.getAttribute("normal");
          const uvAttribute = geometry.getAttribute("uv");

          vertices += position?.count ?? 0;

          triangles += geometry.index
            ? geometry.index.count / 3
            : (position?.count ?? 0) / 3;

          if (!normal) normals = false;
          if (!uvAttribute) uv = false;

          materials += Array.isArray(object.material)
            ? object.material.length
            : 1;

          // Keep the source geometry and materials unchanged.
          object.frustumCulled = true;
        });

        engine.scene.add(model);
        modelRef.current = model;

        engine.controls.target.set(0, size.y / 2, 0);
        engine.camera.position.set(0, size.y / 2, size.y * 2.2);
        engine.camera.near = Math.max(size.y / 1000, 0.001);
        engine.camera.far = size.y * 20;
        engine.camera.updateProjectionMatrix();
        engine.controls.update();

        engine.grid.position.y = 0;

        setModelInfo({
          name: MODELS[selectedModel].label,
          width: size.x,
          height: size.y,
          depth: size.z,
          centerY: center.y,
          meshes,
          vertices,
          triangles,
          materials,
          normals,
          uv,
          skins: gltf.parser.json.skins?.length ?? 0,
          animations: gltf.animations.length,
        });
      } catch (err) {
        if (!cancelled) {
          console.error("GLB loading error:", err);
          setError(
            "Modellen kunne ikke indlæses. Kontrollér at GLB-filen findes i public/model-3d."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadModel();

    return () => {
      cancelled = true;
    };
  }, [selectedModel]);

  function setView(view) {
    const engine = engineRef.current;
    if (!engine || !modelInfo) return;

    const target = new THREE.Vector3(
      0,
      modelInfo.height / 2,
      0
    );

    const distance = modelInfo.height * 2.2;

    const positions = {
      front: [0, target.y, distance],
      back: [0, target.y, -distance],
      side: [distance, target.y, 0],
      threeQuarter: [
        distance * 0.7,
        target.y,
        distance * 0.7,
      ],
    };

    const position = positions[view];

    engine.controls.target.copy(target);
    engine.camera.position.set(...position);
    engine.controls.update();
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <span style={styles.eyebrow}>DRESSED / DEVELOPMENT</span>
          <h1 style={styles.heading}>3D Model Inspector</h1>
          <p style={styles.description}>
            Inspect, rotate and compare original GLB models.
          </p>
        </div>

        <span style={styles.status}>READ ONLY</span>
      </header>

      <section style={styles.layout}>
        <div style={styles.viewerColumn}>
          <div style={styles.toolbar}>
            <label style={styles.label} htmlFor="model-select">
              SELECT MODEL
            </label>

            <select
              id="model-select"
              value={selectedModel}
              onChange={(event) =>
                setSelectedModel(event.target.value)
              }
              style={styles.select}
            >
              <option value="dressed">DRESSED Base</option>
              <option value="mannequin">Mannequin</option>
            </select>
          </div>

          <div style={styles.viewer}>
            <div ref={mountRef} style={styles.canvas} />

            {loading && (
              <div style={styles.overlay}>
                Loading 3D model...
              </div>
            )}

            {error && (
              <div style={styles.overlay}>
                {error}
              </div>
            )}

            {!loading && !error && (
              <span style={styles.viewerHint}>
                Drag to rotate · Scroll to zoom
              </span>
            )}
          </div>

          <div style={styles.viewControls}>
            <button onClick={() => setView("front")} style={styles.button}>
              Front
            </button>
            <button onClick={() => setView("side")} style={styles.button}>
              Side
            </button>
            <button onClick={() => setView("back")} style={styles.button}>
              Back
            </button>
            <button
              onClick={() => setView("threeQuarter")}
              style={styles.button}
            >
              ¾ View
            </button>
          </div>
        </div>

        <aside style={styles.panel}>
          <h2 style={styles.panelHeading}>Model information</h2>

          {modelInfo ? (
            <>
              <p style={styles.modelName}>{modelInfo.name}</p>

              <h3 style={styles.sectionHeading}>DIMENSIONS</h3>

              <div style={styles.metricGrid}>
                <Metric label="Width" value={modelInfo.width} />
                <Metric label="Height" value={modelInfo.height} />
                <Metric label="Depth" value={modelInfo.depth} />
              </div>

              <h3 style={styles.sectionHeading}>GEOMETRY</h3>

              <InfoRow label="Meshes" value={modelInfo.meshes} />
              <InfoRow label="Vertices" value={modelInfo.vertices.toLocaleString("en-US")} />
              <InfoRow label="Triangles" value={modelInfo.triangles.toLocaleString("en-US")} />
              <InfoRow label="Materials" value={modelInfo.materials} />

              <h3 style={styles.sectionHeading}>TECHNICAL</h3>

              <InfoRow label="Normals" value={modelInfo.normals ? "Present" : "Missing"} />
              <InfoRow label="UV coordinates" value={modelInfo.uv ? "Present" : "Missing"} />
              <InfoRow label="Skins" value={modelInfo.skins} />
              <InfoRow label="Animations" value={modelInfo.animations} />

              <div style={styles.note}>
                Dimensions are displayed in the model's source units.
                The Y-axis is treated as vertical. Front orientation
                has not yet been visually verified.
              </div>
            </>
          ) : (
            <p style={styles.empty}>
              Model information will appear here after loading.
            </p>
          )}
        </aside>
      </section>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div style={styles.metric}>
      <span style={styles.metricLabel}>{label}</span>
      <strong style={styles.metricValue}>
        {value?.toFixed(3)}
      </strong>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={styles.infoRow}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "#fff8fb",
    color: "#493440",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  eyebrow: {
    fontSize: "11px",
    letterSpacing: "2px",
    color: "#b16b91",
    fontWeight: 700,
  },
  heading: {
    fontSize: "32px",
    margin: "10px 0 5px",
  },
  description: {
    color: "#947d8a",
    fontSize: "14px",
  },
  status: {
    border: "1px solid #d8b4c8",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "10px",
    letterSpacing: "1px",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 300px",
    gap: "24px",
    alignItems: "start",
  },
  viewerColumn: {
    minWidth: 0,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "14px",
    background: "#fff",
    border: "1px solid #eedce6",
    borderBottom: "none",
    borderRadius: "12px 12px 0 0",
  },
  label: {
    fontSize: "10px",
    letterSpacing: "1px",
    fontWeight: 700,
    color: "#947d8a",
  },
  select: {
    padding: "8px 12px",
    border: "1px solid #e5cbd9",
    borderRadius: "7px",
    background: "#fff8fb",
    color: "#493440",
  },
  viewer: {
    height: "min(70vh, 720px)",
    minHeight: "450px",
    position: "relative",
    overflow: "hidden",
    background: "#f7edf2",
    border: "1px solid #eedce6",
  },
  canvas: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    background: "rgba(247,237,242,0.85)",
    padding: "20px",
    textAlign: "center",
    color: "#765568",
    fontSize: "14px",
  },
  viewerHint: {
    position: "absolute",
    bottom: "15px",
    left: "15px",
    fontSize: "11px",
    color: "#765568",
    background: "rgba(255,255,255,0.8)",
    padding: "8px 12px",
    borderRadius: "20px",
    pointerEvents: "none",
  },
  viewControls: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "14px",
    background: "#fff",
    border: "1px solid #eedce6",
    borderTop: "none",
    borderRadius: "0 0 12px 12px",
  },
  button: {
    border: "1px solid #e5cbd9",
    background: "#fff8fb",
    color: "#65495a",
    padding: "9px 16px",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "12px",
  },
  panel: {
    background: "#fff",
    border: "1px solid #eedce6",
    borderRadius: "12px",
    padding: "20px",
  },
  panelHeading: {
    fontSize: "17px",
    margin: "0 0 15px",
  },
  modelName: {
    color: "#a35e83",
    fontWeight: 700,
    fontSize: "14px",
  },
  sectionHeading: {
    fontSize: "10px",
    letterSpacing: "1.5px",
    color: "#aa8198",
    marginTop: "25px",
    marginBottom: "12px",
  },
  metricGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "8px",
  },
  metric: {
    background: "#fff8fb",
    padding: "12px",
    borderRadius: "7px",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  metricLabel: {
    fontSize: "12px",
    color: "#947d8a",
  },
  metricValue: {
    fontSize: "13px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    padding: "9px 0",
    borderBottom: "1px solid #f2e7ed",
    fontSize: "12px",
  },
  note: {
    marginTop: "20px",
    padding: "12px",
    background: "#fff8fb",
    borderRadius: "7px",
    color: "#947d8a",
    fontSize: "11px",
    lineHeight: 1.6,
  },
  empty: {
    color: "#947d8a",
    fontSize: "13px",
  },
};
