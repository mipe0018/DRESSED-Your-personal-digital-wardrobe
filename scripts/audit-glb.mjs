import fs from "node:fs";
import path from "node:path";

const files = [
  "public/model-3d/dressed-base.glb",
  "public/model-3d/mannequin.glb",
];

function inspectGLB(file) {
  console.log("\n" + "=".repeat(65));
  console.log(`MODEL: ${file}`);
  console.log("=".repeat(65));

  if (!fs.existsSync(file)) {
    console.log("FEJL: Filen blev ikke fundet.");
    return;
  }

  const buffer = fs.readFileSync(file);

  if (buffer.toString("utf8", 0, 4) !== "glTF") {
    console.log("FEJL: Filen har ikke et gyldigt GLB-header.");
    return;
  }

  const version = buffer.readUInt32LE(4);
  const totalLength = buffer.readUInt32LE(8);

  let offset = 12;
  let document = null;

  while (offset < totalLength) {
    const chunkLength = buffer.readUInt32LE(offset);
    const chunkType = buffer.readUInt32LE(offset + 4);
    const chunkStart = offset + 8;

    // JSON chunk
    if (chunkType === 0x4E4F534A) {
      document = JSON.parse(
        buffer.toString("utf8", chunkStart, chunkStart + chunkLength)
      );
      break;
    }

    offset = chunkStart + chunkLength;
  }

  if (!document) {
    console.log("FEJL: Kunne ikke finde GLB JSON-data.");
    return;
  }

  const nodes = document.nodes ?? [];
  const meshes = document.meshes ?? [];
  const skins = document.skins ?? [];
  const animations = document.animations ?? [];
  const materials = document.materials ?? [];
  const accessors = document.accessors ?? [];
  const scenes = document.scenes ?? [];

  console.log("\nFIL");
  console.log(`Størrelse: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
  console.log(`GLB-version: ${version}`);
  console.log(`glTF-version: ${document.asset?.version ?? "Ukendt"}`);
  console.log(`Generator: ${document.asset?.generator ?? "Ikke angivet"}`);

  console.log("\nSCENE");
  console.log(`Antal scener: ${scenes.length}`);
  console.log(`Aktiv scene: ${document.scene ?? "Ikke angivet"}`);
  console.log(`Nodes: ${nodes.length}`);
  console.log(`Meshes: ${meshes.length}`);
  console.log(`Materialer: ${materials.length}`);

  console.log("\nMESHES");
  meshes.forEach((mesh, index) => {
    const primitiveCount = mesh.primitives?.length ?? 0;
    const vertexCounts = (mesh.primitives ?? []).map((primitive) => {
      const accessor = accessors[primitive.attributes?.POSITION];
      return accessor?.count ?? "?";
    });

    console.log(
      `${index + 1}. ${mesh.name ?? "Unavngivet"} | ` +
      `${primitiveCount} primitive(s) | ` +
      `Vertices: ${vertexCounts.join(", ") || "Ukendt"}`
    );
  });

  console.log("\nNODES");
  nodes.forEach((node, index) => {
    const labels = [];
    if (node.mesh !== undefined) labels.push(`mesh=${node.mesh}`);
    if (node.skin !== undefined) labels.push(`skin=${node.skin}`);
    if (node.camera !== undefined) labels.push(`camera=${node.camera}`);
    if (node.children?.length) labels.push(`children=${node.children.length}`);

    console.log(
      `${index}. ${node.name ?? "Unavngivet"} ` +
      `${labels.length ? "| " + labels.join(", ") : ""}`
    );
  });

  console.log("\nSKELET / SKINNING");
  console.log(`Antal skins: ${skins.length}`);

  skins.forEach((skin, index) => {
    console.log(
      `Skin ${index + 1}: ${skin.name ?? "Unavngivet"} | ` +
      `Joints: ${skin.joints?.length ?? 0} | ` +
      `Skeleton root: ${
        skin.skeleton !== undefined
          ? nodes[skin.skeleton]?.name ?? skin.skeleton
          : "Ikke angivet"
      }`
    );

    (skin.joints ?? []).forEach((jointIndex) => {
      console.log(`  - ${jointIndex}: ${nodes[jointIndex]?.name ?? "Unavngivet"}`);
    });
  });

  console.log("\nANIMATIONER");
  console.log(`Antal animationer: ${animations.length}`);

  animations.forEach((animation, index) => {
    console.log(
      `${index + 1}. ${animation.name ?? "Unavngivet"} | ` +
      `Channels: ${animation.channels?.length ?? 0} | ` +
      `Samplers: ${animation.samplers?.length ?? 0}`
    );
  });

  console.log("\nMATERIALER");
  materials.forEach((material, index) => {
    console.log(
      `${index + 1}. ${material.name ?? "Unavngivet"} | ` +
      `Alpha mode: ${material.alphaMode ?? "OPAQUE"} | ` +
      `Double sided: ${material.doubleSided ?? false}`
    );
  });

  console.log("\nEKSTRA");
  console.log(`Teksturer: ${document.textures?.length ?? 0}`);
  console.log(`Billeder: ${document.images?.length ?? 0}`);
  console.log(`Samlet antal accessors: ${accessors.length}`);
}

for (const file of files) {
  inspectGLB(path.resolve(file));
}
