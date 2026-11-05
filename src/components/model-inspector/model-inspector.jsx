
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  CAMERA_PRESETS,
  CAMERA_PRESET_KEYS,
  ZOOM_IN_FACTOR,
  ZOOM_OUT_FACTOR,
  createCameraNavigator,
} from "./camera-navigation.js";
import "./model-inspector.css";

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

function disposeObjectResources(root) {
  if (!root) return;

  const geometries = new Set();
  const materials = new Set();
  const textures = new Set();
  const skeletons = new Set();

  if (root.isScene) {
    if (root.background?.isTexture) textures.add(root.background);
    if (root.environment?.isTexture) textures.add(root.environment);
  }

  root.traverse((object) => {
    if (object.geometry) geometries.add(object.geometry);
    if (object.skeleton) skeletons.add(object.skeleton);

    const objectMaterials = Array.isArray(object.material)
      ? object.material
      : object.material
        ? [object.material]
        : [];

    objectMaterials.forEach((material) => materials.add(material));
  });

  materials.forEach((material) => {
    Object.values(material).forEach((value) => {
      if (value?.isTexture) textures.add(value);
    });

    Object.values(material.uniforms ?? {}).forEach((uniform) => {
      if (uniform?.value?.isTexture) textures.add(uniform.value);
    });
  });

  textures.forEach((texture) => texture.dispose());
  materials.forEach((material) => material.dispose());
  geometries.forEach((geometry) => geometry.dispose());
  skeletons.forEach((skeleton) => skeleton.dispose());
}

export default function ModelInspector() {
  const mountRef = useRef(null);
  const engineRef = useRef(null);
  const modelRef = useRef(null);
  const loadRequestRef = useRef(0);

  const [selectedModel, setSelectedModel] = useState("dressed");
  const [modelInfo, setModelInfo] = useState(null);
  const [activePreset, setActivePreset] = useState("front");
  const [loading, setLoading] = useState(true);
  const [modelError, setModelError] = useState("");
  const [rendererError, setRendererError] = useState("");
  const [contextLost, setContextLost] = useState(false);
  const [modelRetry, setModelRetry] = useState(0);
  const [rendererRetry, setRendererRetry] = useState(0);

  const errorMessage = contextLost
    ? "The WebGL context was lost. The browser is attempting to restore the 3D view."
    : rendererError || modelError;
  const cameraControlsDisabled =
    !modelInfo || Boolean(rendererError) || contextLost;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let scene = null;
    let camera = null;
    let renderer = null;
    let controls = null;
    let navigation = null;
    let resizeObserver = null;
    let animationFrame = null;
    let engine = null;
    let disposed = false;
    let active = true;

    setRendererError("");
    setContextLost(false);

    function handleContextLost(event) {
      event.preventDefault();
      if (disposed) return;

      if (engine) engine.contextLost = true;
      setContextLost(true);
    }

    function handleContextRestored() {
      if (disposed) return;

      if (engine) engine.contextLost = false;
      setContextLost(false);
    }

    function cleanup() {
      if (disposed) return;
      disposed = true;

      if (engine) engine.disposed = true;
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();

      if (renderer) {
        renderer.domElement.removeEventListener(
          "webglcontextlost",
          handleContextLost
        );
        renderer.domElement.removeEventListener(
          "webglcontextrestored",
          handleContextRestored
        );
      }

      navigation?.dispose();
      controls?.dispose();

      if (scene) {
        disposeObjectResources(scene);
        scene.clear();
      }

      renderer?.dispose();

      if (renderer?.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }

      if (engineRef.current === engine) {
        engineRef.current = null;
        modelRef.current = null;
      }
    }

    try {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;

      scene = new THREE.Scene();
      scene.background = new THREE.Color("#f7edf2");

      camera = new THREE.PerspectiveCamera(40, width / height, 0.01, 100);
      camera.position.set(0, 1, 3.5);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mount.appendChild(renderer.domElement);

      renderer.domElement.addEventListener(
        "webglcontextlost",
        handleContextLost
      );
      renderer.domElement.addEventListener(
        "webglcontextrestored",
        handleContextRestored
      );

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.07;
      controls.target.set(0, 0.9, 0);
      controls.minDistance = 0.5;
      controls.maxDistance = 8;
      controls.listenToKeyEvents(renderer.domElement);

      renderer.domElement.tabIndex = 0;
      renderer.domElement.setAttribute("role", "img");
      renderer.domElement.setAttribute(
        "aria-label",
        "Interactive 3D model. Drag to rotate, scroll to zoom, right-drag to pan, or use the camera controls."
      );

      navigation = createCameraNavigator({
        camera,
        controls,
        onActivePresetChange: (preset) => {
          setActivePreset(preset);
        },
        shouldReduceMotion: () =>
          window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      });

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

      engine = {
        scene,
        camera,
        renderer,
        controls,
        navigation,
        grid,
        contextLost: false,
        disposed: false,
      };
      engineRef.current = engine;

      const animate = () => {
        if (disposed) return;

        animationFrame = requestAnimationFrame(animate);
        navigation.update(performance.now());

        if (!engine.contextLost) {
          renderer.render(scene, camera);
        }
      };

      animate();

      resizeObserver = new ResizeObserver(() => {
        if (disposed || !mount.clientWidth || !mount.clientHeight) return;

        const previousAspect = camera.aspect;
        const nextAspect = mount.clientWidth / mount.clientHeight;

        renderer.setSize(mount.clientWidth, mount.clientHeight);
        camera.aspect = nextAspect;
        camera.updateProjectionMatrix();
        navigation.resize(previousAspect, nextAspect);
      });

      resizeObserver.observe(mount);
    } catch (err) {
      console.error("3D renderer initialization error:", err);
      cleanup();
      queueMicrotask(() => {
        if (!active) return;

        setRendererError(
          "The 3D viewer could not be initialized. Check that WebGL and hardware acceleration are available, then try again."
        );
      });
    }

    return () => {
      active = false;
      cleanup();
    };
  }, [rendererRetry]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine || engine.disposed) return;

    const requestId = ++loadRequestRef.current;
    const modelDefinition = MODELS[selectedModel];
    let cancelled = false;

    function isObsolete() {
      return (
        cancelled ||
        loadRequestRef.current !== requestId ||
        engineRef.current !== engine ||
        engine.disposed
      );
    }

    async function loadModel() {
      setLoading(true);
      setModelError("");

      if (!modelRef.current) {
        setModelInfo(null);
      }

      let candidate = null;

      try {
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(modelDefinition.path);
        candidate = gltf.scene;

        if (!candidate) {
          throw new Error("The GLB file does not contain a displayable scene.");
        }

        if (isObsolete()) {
          disposeObjectResources(candidate);
          candidate = null;
          return;
        }

        const model = candidate;
        model.updateMatrixWorld(true);

        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();

        box.getSize(size);
        box.getCenter(center);

        // Center model horizontally and place its lowest point at Y=0.
        model.position.set(-center.x, -box.min.y, -center.z);
        model.updateMatrixWorld(true);

        const normalizedBounds = new THREE.Box3().setFromObject(model);

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

        const nextModelInfo = {
          name: modelDefinition.label,
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
        };

        engine.navigation.setBounds(normalizedBounds);

        const previousModel = modelRef.current;
        engine.scene.add(model);
        modelRef.current = model;
        candidate = null;

        if (previousModel && previousModel !== model) {
          engine.scene.remove(previousModel);
          disposeObjectResources(previousModel);
        }

        engine.navigation.reset({ immediate: true });
        engine.grid.position.y = 0;
        setModelInfo(nextModelInfo);
      } catch (err) {
        if (candidate) {
          candidate.removeFromParent();
          disposeObjectResources(candidate);
          candidate = null;
        }

        if (!isObsolete()) {
          console.error("GLB loading error:", err);
          setModelError(
            "The model could not be loaded. Check that the GLB file exists in public/model-3d and is valid, then try again."
          );
        }
      } finally {
        if (!isObsolete()) setLoading(false);
      }
    }

    loadModel();

    return () => {
      cancelled = true;
    };
  }, [selectedModel, modelRetry, rendererRetry]);

  function runCameraCommand(command) {
    const engine = engineRef.current;

    if (
      !engine ||
      engine.disposed ||
      engine.contextLost ||
      !engine.navigation.hasBounds()
    ) {
      return;
    }

    command(engine.navigation);
  }

  function setView(view) {
    runCameraCommand((navigation) => navigation.setView(view));
  }

  function handleViewportKeyDown(event) {
    if (
      event.target.closest(
        "button, input, select, textarea, [contenteditable='true']"
      )
    ) {
      return;
    }

    if (event.key.startsWith("Arrow")) {
      runCameraCommand((navigation) => navigation.handleManualNavigation());
      return;
    }

    if (event.ctrlKey || event.metaKey || event.altKey) return;

    const preset = CAMERA_PRESET_KEYS.find(
      (key) => CAMERA_PRESETS[key].shortcut === event.key
    );

    if (preset) {
      event.preventDefault();
      setView(preset);
      return;
    }

    switch (event.key.toLowerCase()) {
      case "r":
        event.preventDefault();
        runCameraCommand((navigation) => navigation.reset());
        break;
      case "f":
        event.preventDefault();
        runCameraCommand((navigation) => navigation.fit());
        break;
      case "+":
      case "=":
        event.preventDefault();
        runCameraCommand((navigation) => navigation.zoom(ZOOM_IN_FACTOR));
        break;
      case "-":
        event.preventDefault();
        runCameraCommand((navigation) => navigation.zoom(ZOOM_OUT_FACTOR));
        break;
      default:
        break;
    }
  }

  function retryViewer() {
    if (rendererError) {
      setRendererRetry((attempt) => attempt + 1);
      return;
    }

    if (modelError) {
      setModelRetry((attempt) => attempt + 1);
    }
  }

  return (
    <main className="dressed-mi-page">
      <header className="dressed-mi-header">
        <div>
          <span className="dressed-mi-eyebrow">DRESSED / DEVELOPMENT</span>
          <h1 className="dressed-mi-heading">3D Model Inspector</h1>
          <p className="dressed-mi-description">
            Inspect, rotate and compare original GLB models.
          </p>
        </div>

        <span className="dressed-mi-status">READ ONLY</span>
      </header>

      <section className="dressed-mi-layout">
        <div className="dressed-mi-viewerColumn">
          <div className="dressed-mi-toolbar">
            <label className="dressed-mi-label" htmlFor="model-select">
              SELECT MODEL
            </label>

            <select
              id="model-select"
              value={selectedModel}
              onChange={(event) =>
                setSelectedModel(event.target.value)
              }
              className="dressed-mi-select"
            >
              <option value="dressed">DRESSED Base</option>
              <option value="mannequin">Mannequin</option>
            </select>
          </div>

          <div
            className="dressed-mi-viewer"
            aria-busy={loading && !errorMessage}
            aria-describedby="model-viewport-instructions"
            aria-label="3D model inspection viewport"
            role="region"
            onKeyDown={handleViewportKeyDown}
          >
            <div ref={mountRef} className="dressed-mi-canvas" />

            <span id="model-viewport-instructions" className="dressed-mi-srOnly">
              Drag to rotate, scroll to zoom, and right-drag to pan. When the
              canvas is focused, use arrow keys to pan and Shift, Control, or
              Command with arrow keys to rotate. Camera shortcuts: 1 Front, 2
              Back, 3 Left, 4 Right, 5 three-quarter, R reset, F fit, plus to
              zoom in, and minus to zoom out.
            </span>

            {loading && !errorMessage && !modelInfo && (
              <div className="dressed-mi-overlay" role="status" aria-live="polite">
                Loading 3D model...
              </div>
            )}

            {loading && !errorMessage && modelInfo && (
              <span
                className="dressed-mi-loadingBadge"
                role="status"
                aria-live="polite"
              >
                Loading 3D model...
              </span>
            )}

            {errorMessage && (
              <div className="dressed-mi-overlay" role="alert">
                <div>
                  <p className="dressed-mi-errorMessage">{errorMessage}</p>
                  {!contextLost && (rendererError || modelError) && (
                    <button
                      type="button"
                      onClick={retryViewer}
                      className="dressed-mi-button"
                    >
                      Retry
                    </button>
                  )}
                </div>
              </div>
            )}

            {modelInfo && !errorMessage && (
              <span className="dressed-mi-viewerHint" aria-hidden="true">
                Drag to rotate · Scroll to zoom · Right-drag to pan
              </span>
            )}
          </div>

          <div className="dressed-mi-viewControls">
            <div
              className="dressed-mi-controlGroup"
              role="group"
              aria-label="Camera presets"
            >
              {CAMERA_PRESET_KEYS.map((key) => {
                const definition = CAMERA_PRESETS[key];
                const isActive = activePreset === key;

                return (
                  <button
                    key={key}
                    type="button"
                    className={`dressed-mi-button${isActive ? " dressed-mi-activeButton" : ""}`}
                    onClick={() => setView(key)}
                    disabled={cameraControlsDisabled}
                    aria-pressed={isActive}
                    aria-label={`${definition.label} camera preset`}
                    aria-keyshortcuts={definition.shortcut}
                    title={`${definition.label} (${definition.shortcut})`}
                  >
                    {definition.label}
                  </button>
                );
              })}
            </div>

            <div
              className="dressed-mi-controlGroup"
              role="group"
              aria-label="Camera actions"
            >
              <button
                type="button"
                className="dressed-mi-button"
                onClick={() =>
                  runCameraCommand((navigation) => navigation.reset())
                }
                disabled={cameraControlsDisabled}
                aria-label="Reset camera to the fitted front view"
                aria-keyshortcuts="R"
                title="Reset Camera (R)"
              >
                Reset Camera
              </button>
              <button
                type="button"
                className="dressed-mi-button"
                onClick={() => runCameraCommand((navigation) => navigation.fit())}
                disabled={cameraControlsDisabled}
                aria-label="Fit the current model to the viewport"
                aria-keyshortcuts="F"
                title="Fit to View (F)"
              >
                Fit to View
              </button>
              <button
                type="button"
                className="dressed-mi-button"
                onClick={() =>
                  runCameraCommand((navigation) =>
                    navigation.zoom(ZOOM_IN_FACTOR)
                  )
                }
                disabled={cameraControlsDisabled}
                aria-label="Zoom in on the current model"
                aria-keyshortcuts="+"
                title="Zoom In (+)"
              >
                Zoom In
              </button>
              <button
                type="button"
                className="dressed-mi-button"
                onClick={() =>
                  runCameraCommand((navigation) =>
                    navigation.zoom(ZOOM_OUT_FACTOR)
                  )
                }
                disabled={cameraControlsDisabled}
                aria-label="Zoom out from the current model"
                aria-keyshortcuts="-"
                title="Zoom Out (-)"
              >
                Zoom Out
              </button>
            </div>
          </div>
        </div>

        <aside className="dressed-mi-panel">
          <h2 className="dressed-mi-panelHeading">Model information</h2>

          {modelInfo ? (
            <>
              <p className="dressed-mi-modelName">{modelInfo.name}</p>

              <h3 className="dressed-mi-sectionHeading">DIMENSIONS</h3>

              <div className="dressed-mi-metricGrid">
                <Metric label="Width" value={modelInfo.width} />
                <Metric label="Height" value={modelInfo.height} />
                <Metric label="Depth" value={modelInfo.depth} />
              </div>

              <h3 className="dressed-mi-sectionHeading">GEOMETRY</h3>

              <InfoRow label="Meshes" value={modelInfo.meshes} />
              <InfoRow label="Vertices" value={modelInfo.vertices.toLocaleString("en-US")} />
              <InfoRow label="Triangles" value={modelInfo.triangles.toLocaleString("en-US")} />
              <InfoRow label="Materials" value={modelInfo.materials} />

              <h3 className="dressed-mi-sectionHeading">TECHNICAL</h3>

              <InfoRow label="Normals" value={modelInfo.normals ? "Present" : "Missing"} />
              <InfoRow label="UV coordinates" value={modelInfo.uv ? "Present" : "Missing"} />
              <InfoRow label="Skins" value={modelInfo.skins} />
              <InfoRow label="Animations" value={modelInfo.animations} />

              <div className="dressed-mi-note">
                Dimensions are displayed in the model&apos;s source units.
                The Y-axis is treated as vertical. Front orientation
                has not yet been visually verified.
              </div>
            </>
          ) : (
            <p className="dressed-mi-empty">
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
    <div className="dressed-mi-metric">
      <span className="dressed-mi-metricLabel">{label}</span>
      <strong className="dressed-mi-metricValue">
        {value?.toFixed(3)}
      </strong>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="dressed-mi-infoRow">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
