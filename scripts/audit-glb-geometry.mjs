import fs from "node:fs";
import path from "node:path";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const files = [
  "public/model-3d/dressed-base.glb",
  "public/model-3d/mannequin.glb",
];

const loader = new GLTFLoader();

async function inspectModel(file) {
  console.log("\n" + "=".repeat(70));
  console.log(`GEOMETRIANALYSE: ${file}`);
  console.log("=".repeat(70));

  if (!fs.existsSync(file)) {
    console.log("FEJL: Filen blev ikke fundet.");
    return;
  }

  const buffer = fs.readFileSync(file);
  const arrayBuffer = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );

  try {
    const gltf = await loader.parseAsync(arrayBuffer, "");
    const scene = gltf.scene;

    scene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    console.log("\nSAMLEDE DIMENSIONER");
    console.log(`Bredde X: ${size.x.toFixed(5)}`);
    console.log(`Højde Y:  ${size.y.toFixed(5)}`);
    console.log(`Dybde Z:  ${size.z.toFixed(5)}`);
    console.log(
      `Centrum: X=${center.x.toFixed(5)}, Y=${center.y.toFixed(5)}, Z=${center.z.toFixed(5)}`
    );

    console.log("\nBOUNDING BOX");
    console.log(`Min: ${box.min.toArray().map(v => v.toFixed(5)).join(", ")}`);
    console.log(`Max: ${box.max.toArray().map(v => v.toFixed(5)).join(", ")}`);

    console.log("\nSCENE-ROTATION OG ROOT");
    console.log(`Scene position: ${scene.position.toArray().join(", ")}`);
  const q = scene.quaternion;

console.log(
  `Scene quaternion: ${[q.x, q.y, q.z, q.w]
    .map(v => Number(v).toFixed(5))
    .join(", ")}`
);
   console.log(
  `Scene scale: ${scene.scale.toArray().map(v => Number(v).toFixed(5)).join(", ")}`
);

    let meshCount = 0;
    let vertexCount = 0;
    let triangleCount = 0;

    console.log("\nMESH-GEOMETRI");

    scene.traverse((object) => {
      if (!object.isMesh) return;

      meshCount++;

      const geometry = object.geometry;
      const position = geometry.getAttribute("position");
      const normal = geometry.getAttribute("normal");
      const uv = geometry.getAttribute("uv");
      const index = geometry.index;

      const vertices = position?.count ?? 0;
      const triangles = index
        ? index.count / 3
        : vertices / 3;

      vertexCount += vertices;
      triangleCount += triangles;

      console.log(`\nMesh ${meshCount}: ${object.name || "Unavngivet"}`);
      console.log(`Vertices: ${vertices}`);
      console.log(`Triangles: ${triangles}`);
      console.log(`Indekseret geometri: ${Boolean(index)}`);
      console.log(`Normals: ${Boolean(normal)}`);
      console.log(`UV-koordinater: ${Boolean(uv)}`);
      console.log(`Materialer: ${Array.isArray(object.material) ? object.material.length : 1}`);
      console.log(`Synlig: ${object.visible}`);

      if (position) {
        geometry.computeBoundingBox();
        const meshBox = geometry.boundingBox;
        const meshSize = new THREE.Vector3();
        meshBox.getSize(meshSize);

        console.log(
          `Lokal størrelse: ${meshSize.toArray().map(v => v.toFixed(5)).join(", ")}`
        );
      }

      console.log(
        `World position: ${object.getWorldPosition(new THREE.Vector3()).toArray().map(v => v.toFixed(5)).join(", ")}`
      );

      if (normal) {
        let invalidNormals = 0;

        for (let i = 0; i < normal.count; i++) {
          const x = normal.getX(i);
          const y = normal.getY(i);
          const z = normal.getZ(i);
          const length = Math.sqrt(x * x + y * y + z * z);

          if (!Number.isFinite(length) || length < 0.9 || length > 1.1) {
            invalidNormals++;
          }
        }

        console.log(`Normals uden for tolerance: ${invalidNormals}`);
      }
    });

    console.log("\nSAMLET GEOMETRI");
    console.log(`Meshes: ${meshCount}`);
    console.log(`Vertices: ${vertexCount}`);
    console.log(`Triangles: ${triangleCount}`);

    console.log("\nFORTOLKNING");
    console.log("glTF bruger som standard Y-aksen som op-akse.");
    console.log("Dimensionerne viser modellens udstrækning i hver akse.");
    console.log("Frontretning og egnethed til rigging kræver også visuel kontrol.");
  } catch (error) {
    console.log("FEJL VED INDLÆSNING:", error.message);
  }
}

for (const file of files) {
  await inspectModel(path.resolve(file));
}
