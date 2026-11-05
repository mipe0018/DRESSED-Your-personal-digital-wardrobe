# DRESSED – Build and Continue the 3D Model Inspector

You are working on the existing DRESSED project, a 3D-first virtual wardrobe application built with Next.js, React, TypeScript/JavaScript, Supabase and Three.js.

Your task is to continue developing a dedicated **3D Model Inspector** that can be used as a permanent technical development tool for DRESSED.

## 1. First: Inspect the existing project

Before changing anything:

- Inspect the existing project structure.
- Inspect `package.json`.
- Inspect the existing Three.js installation.
- Inspect the two original GLB files:
  - `public/model-3d/dressed-base.glb`
  - `public/model-3d/mannequin.glb`
- Inspect the existing Model Inspector files:
  - `src/app/model-inspector/page.jsx`
  - `src/components/model-inspector/model-inspector.jsx`
- Understand how the current viewer works before making changes.

Do not create duplicate components or routes if they already exist.

If the existing Model Inspector is missing or incomplete, rebuild it while preserving the working functionality.

## 2. Main objective

Create a professional, interactive 3D Model Inspector window for DRESSED.

The inspector must function as a separate development and analysis tool.

It must not interfere with the existing wardrobe, authentication, Supabase configuration, profile, outfits or other application features.

The inspector should be accessible at:

`/model-inspector`

## 3. Visual design

Create a polished interface that fits DRESSED's existing visual identity.

Design direction:

- Feminine, modern Y2K-inspired interface.
- Pink and soft neutral color palette.
- Clean technical workspace.
- Rounded panels and subtle shadows.
- Clear labels and controls.
- Professional 3D software inspiration, but with DRESSED's own visual identity.

The interface should have:

**A. Main 3D viewport**

A large central viewing area showing the selected 3D model.

The model must be rendered using Three.js and GLTFLoader.

**B. Model selection**

Allow switching between:

- dressed-base.glb
- mannequin.glb

**C. Camera controls**

Include working controls for:

- Front
- Back
- Left
- Right
- ¾ view
- Reset camera
- Zoom in and out

The user must also be able to rotate the model using mouse interaction through OrbitControls.

**D. Technical information panel**

Display relevant information about the currently selected model:

- Filename
- Number of meshes
- Number of vertices
- Number of triangles
- Number of materials
- Whether normals exist
- Whether UV coordinates exist
- Whether a skeleton exists
- Whether animations exist
- Bounding box dimensions
- Model center and position

Read the values from the actual loaded GLB. Do not hardcode technical results.

## 4. Add a model inspection workspace

Build the inspector so it can gradually become a more advanced technical tool.

Add clearly separated sections or tabs for:

### Geometry
- Mesh information
- Vertex count
- Triangle count
- Bounding box
- Surface normals
- UV availability

### Materials
- Material names
- Material types
- Base colors
- Transparency
- Texture availability

### Skeleton
- Detect whether a skeleton exists.
- Display bone count if available.
- Display bone hierarchy if available.
- Clearly indicate when the model is not rigged.

### Animation
- Detect available animations.
- Display animation names and durations.
- If animations exist, allow the user to select and preview them.

Do not invent skeletons or animations for models that do not have them.

## 5. Visual inspection controls

Add optional viewport controls:

- Wireframe mode
- Normal visualization
- Grid helper
- Axes helper
- Bounding box helper
- Background toggle

These controls must work on the currently loaded model.

They must not permanently modify the original GLB file.

## 6. Model integrity and safety

This is extremely important.

The original files in `public/model-3d/` must NEVER be overwritten.

Do not:

- Replace the original GLB files.
- Export over original files.
- Change the existing avatar geometry.
- Add experimental rigging directly to the original assets.
- Delete existing project functionality.
- Change the Supabase configuration unnecessarily.
- Introduce demo models or placeholder avatars.

Any future model processing must use copies or separate generated files.

## 7. Technical requirements

Use the existing stack:

- Next.js App Router
- React
- Three.js
- GLTFLoader
- OrbitControls

Requirements:

- Client-side rendering for the 3D viewport.
- Proper cleanup of geometries, materials, renderers and event listeners.
- Responsive layout.
- Handle loading states.
- Handle GLB loading errors.
- Handle model switching without memory leaks.
- Handle browser resizing.
- Avoid unnecessary re-rendering.
- Keep the code modular and readable.

Do not introduce another 3D engine.

## 8. Architecture

Keep the Model Inspector independent from the actual wardrobe system.

The inspector is a development tool, not the final wardrobe interface.

It should eventually help us validate the avatar before integrating it into:

- The virtual wardrobe.
- Clothing placement.
- Outfit composition.
- Skeleton and rigging.
- AI-powered virtual try-on.

Do not implement these integrations yet.

## 9. Important workflow

Work in small, controlled steps.

First inspect the existing implementation.

Then:

1. Identify what already works.
2. Identify missing functionality.
3. Improve the existing inspector.
4. Test the route.
5. Verify that both original GLB files load.
6. Verify rotation and zoom.
7. Verify the technical information is based on the actual model.
8. Check that the rest of DRESSED still works.

Do not rewrite unrelated parts of the project.

Do not make assumptions about model orientation, units or anatomy without validating them.

## 10. Final report

When finished, provide:

- Files inspected.
- Files created or changed.
- Features implemented.
- Tests performed.
- Any errors or limitations.
- Confirmation that the original GLB files remain untouched.
- Recommended next step for the DRESSED 3D development process.

The priority is to build a reliable, reusable 3D Model Inspector that we can continue using throughout DRESSED's development.