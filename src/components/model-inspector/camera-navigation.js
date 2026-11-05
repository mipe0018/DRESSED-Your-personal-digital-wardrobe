import * as THREE from "three";

export const CAMERA_PADDING = 1.15;
export const ZOOM_IN_FACTOR = 0.8;
export const ZOOM_OUT_FACTOR = 1.25;

export const CAMERA_PRESETS = {
  front: { label: "Front", shortcut: "1", direction: [0, 0, 1] },
  back: { label: "Back", shortcut: "2", direction: [0, 0, -1] },
  left: { label: "Left", shortcut: "3", direction: [-1, 0, 0] },
  right: { label: "Right", shortcut: "4", direction: [1, 0, 0] },
  threeQuarter: {
    label: "¾ View",
    shortcut: "5",
    direction: [1, 0, 1],
  },
};

export const CAMERA_PRESET_KEYS = Object.keys(CAMERA_PRESETS);

const WORLD_UP = new THREE.Vector3(0, 1, 0);
const FALLBACK_UP = new THREE.Vector3(0, 0, 1);

export function getPresetDirection(preset) {
  const definition = CAMERA_PRESETS[preset];

  if (!definition) {
    throw new Error(`Unknown camera preset: ${preset}`);
  }

  return new THREE.Vector3(...definition.direction).normalize();
}

export function getViewDirection(position, target) {
  const direction = position.clone().sub(target);

  if (
    direction.lengthSq() < 1e-12 ||
    ![direction.x, direction.y, direction.z].every(Number.isFinite)
  ) {
    return getPresetDirection("front");
  }

  return direction.normalize();
}

export function clampCameraDistance(distance, minimum, maximum) {
  return THREE.MathUtils.clamp(distance, minimum, maximum);
}

export function calculateCameraFit({
  bounds,
  direction,
  aspect,
  fov = 40,
  padding = CAMERA_PADDING,
}) {
  if (!bounds || bounds.isEmpty()) {
    throw new Error("Camera fitting requires a non-empty bounding box.");
  }

  if (!Number.isFinite(aspect) || aspect <= 0) {
    throw new Error("Camera fitting requires a positive viewport aspect ratio.");
  }

  if (!Number.isFinite(fov) || fov <= 0 || fov >= 180) {
    throw new Error("Camera fitting requires a field of view between 0 and 180.");
  }

  if (!Number.isFinite(padding) || padding < 1) {
    throw new Error("Camera fitting padding must be at least 1.");
  }

  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());
  const diagonal = size.length();

  if (
    !Number.isFinite(diagonal) ||
    diagonal <= 1e-8 ||
    ![center.x, center.y, center.z].every(Number.isFinite)
  ) {
    throw new Error("Camera fitting requires finite, non-degenerate model bounds.");
  }

  const viewDirection = direction.clone();

  if (
    viewDirection.lengthSq() < 1e-12 ||
    ![viewDirection.x, viewDirection.y, viewDirection.z].every(Number.isFinite)
  ) {
    throw new Error("Camera fitting requires a valid viewing direction.");
  }

  viewDirection.normalize();

  const right = new THREE.Vector3().crossVectors(WORLD_UP, viewDirection);

  if (right.lengthSq() < 1e-10) {
    right.crossVectors(FALLBACK_UP, viewDirection);
  }

  right.normalize();
  const up = new THREE.Vector3().crossVectors(viewDirection, right).normalize();
  const tanVertical = Math.tan(THREE.MathUtils.degToRad(fov) / 2);
  const tanHorizontal = tanVertical * aspect;
  const corner = new THREE.Vector3();
  let requiredDistance = 0;

  for (const x of [bounds.min.x, bounds.max.x]) {
    for (const y of [bounds.min.y, bounds.max.y]) {
      for (const z of [bounds.min.z, bounds.max.z]) {
        corner.set(x, y, z).sub(center);

        const projectedX = Math.abs(corner.dot(right));
        const projectedY = Math.abs(corner.dot(up));
        const projectedDepth = corner.dot(viewDirection);
        const cornerDistance =
          Math.max(projectedX / tanHorizontal, projectedY / tanVertical) +
          projectedDepth;

        requiredDistance = Math.max(requiredDistance, cornerDistance);
      }
    }
  }

  const minDistance = Math.max(diagonal * 0.05, 0.001);
  const distance = Math.max(
    requiredDistance * padding,
    (diagonal * padding) / 2,
    minDistance * 2
  );
  const maxDistance = Math.max(
    distance * 4,
    diagonal * 5,
    minDistance * 10
  );
  const near = Math.max(
    Math.min(diagonal / 1000, minDistance / 10),
    0.0001
  );
  const far = Math.max(
    maxDistance + diagonal * 4,
    distance + diagonal * 2,
    near * 1000
  );
  const target = center.clone();
  const position = target.clone().addScaledVector(viewDirection, distance);

  return {
    center,
    size,
    diagonal,
    direction: viewDirection,
    target,
    position,
    distance,
    minDistance,
    maxDistance,
    near,
    far,
  };
}

export function easeInOutCubic(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export function createCameraNavigator({
  camera,
  controls,
  onActivePresetChange = () => {},
  shouldReduceMotion = () => false,
}) {
  let bounds = null;
  let activePreset = "front";
  let transition = null;

  function notifyActivePreset(preset) {
    activePreset = preset;
    onActivePresetChange(preset);
  }

  function cancel() {
    transition = null;
    controls.enableDamping = true;
  }

  function handleManualNavigation() {
    cancel();
    notifyActivePreset(null);
  }

  function prepareMotion() {
    cancel();
    controls.enableDamping = false;
    controls.update();
  }

  function applyFitSettings(fit) {
    camera.near = fit.near;
    camera.far = fit.far;
    camera.updateProjectionMatrix();
    controls.minDistance = fit.minDistance;
    controls.maxDistance = fit.maxDistance;
  }

  function startMotion(position, target, preset, immediate) {
    notifyActivePreset(preset);

    if (immediate || shouldReduceMotion()) {
      transition = null;
      controls.target.copy(target);
      camera.position.copy(position);
      controls.update();
      controls.enableDamping = true;
      return;
    }

    const fromSpherical = new THREE.Spherical().setFromVector3(
      camera.position.clone().sub(controls.target)
    );
    const toSpherical = new THREE.Spherical().setFromVector3(
      position.clone().sub(target)
    );
    const thetaDelta =
      THREE.MathUtils.euclideanModulo(
        toSpherical.theta - fromSpherical.theta + Math.PI,
        Math.PI * 2
      ) - Math.PI;

    transition = {
      startTime: performance.now(),
      fromTarget: controls.target.clone(),
      toTarget: target.clone(),
      toPosition: position.clone(),
      fromSpherical,
      toSpherical,
      thetaDelta,
      offset: new THREE.Vector3(),
    };
  }

  function getFit(direction) {
    return calculateCameraFit({
      bounds,
      direction,
      aspect: camera.aspect,
      fov: camera.fov,
    });
  }

  function setView(preset, { immediate = false } = {}) {
    if (!bounds) return false;

    prepareMotion();
    const fit = getFit(getPresetDirection(preset));
    applyFitSettings(fit);
    startMotion(fit.position, fit.target, preset, immediate);
    return true;
  }

  function fitView({ immediate = false } = {}) {
    if (!bounds) return false;

    if (activePreset) {
      return setView(activePreset, { immediate });
    }

    prepareMotion();
    const direction = getViewDirection(camera.position, controls.target);
    const fit = getFit(direction);
    applyFitSettings(fit);
    startMotion(fit.position, fit.target, null, immediate);
    return true;
  }

  function zoom(factor, { immediate = false } = {}) {
    if (!bounds) return false;

    prepareMotion();
    const target = controls.target.clone();
    const direction = getViewDirection(camera.position, target);
    const currentDistance = Math.max(
      camera.position.distanceTo(target),
      controls.minDistance
    );
    const distance = clampCameraDistance(
      currentDistance * factor,
      controls.minDistance,
      controls.maxDistance
    );
    const position = target.clone().addScaledVector(direction, distance);

    startMotion(position, target, null, immediate);
    return true;
  }

  function resize(previousAspect, nextAspect) {
    if (!bounds) return false;

    cancel();

    if (activePreset) {
      return setView(activePreset, { immediate: true });
    }

    const direction = getViewDirection(camera.position, controls.target);
    const previousFit = calculateCameraFit({
      bounds,
      direction,
      aspect: previousAspect,
      fov: camera.fov,
    });
    const nextFit = calculateCameraFit({
      bounds,
      direction,
      aspect: nextAspect,
      fov: camera.fov,
    });
    const target = controls.target.clone();
    const currentDistance = Math.max(
      camera.position.distanceTo(target),
      previousFit.minDistance
    );
    const distance = clampCameraDistance(
      currentDistance * (nextFit.distance / previousFit.distance),
      nextFit.minDistance,
      nextFit.maxDistance
    );

    applyFitSettings(nextFit);
    camera.position.copy(target).addScaledVector(direction, distance);
    controls.update();
    return true;
  }

  function update(time) {
    if (!transition) {
      controls.update();
      return;
    }

    const progress = Math.min((time - transition.startTime) / 250, 1);
    const eased = easeInOutCubic(progress);
    const { fromSpherical, toSpherical } = transition;

    transition.offset.setFromSphericalCoords(
      THREE.MathUtils.lerp(fromSpherical.radius, toSpherical.radius, eased),
      THREE.MathUtils.lerp(fromSpherical.phi, toSpherical.phi, eased),
      fromSpherical.theta + transition.thetaDelta * eased
    );
    controls.target.lerpVectors(
      transition.fromTarget,
      transition.toTarget,
      eased
    );
    camera.position.copy(controls.target).add(transition.offset);
    camera.lookAt(controls.target);

    if (progress === 1) {
      controls.target.copy(transition.toTarget);
      camera.position.copy(transition.toPosition);
      transition = null;
      controls.update();
      controls.enableDamping = true;
    }
  }

  controls.addEventListener("start", handleManualNavigation);

  return {
    setBounds(nextBounds) {
      if (nextBounds) {
        calculateCameraFit({
          bounds: nextBounds,
          direction: getPresetDirection("front"),
          aspect: camera.aspect,
          fov: camera.fov,
        });
      }

      cancel();
      bounds = nextBounds ? nextBounds.clone() : null;
    },
    hasBounds() {
      return Boolean(bounds);
    },
    setView,
    reset(options) {
      return setView("front", options);
    },
    fit: fitView,
    zoom,
    resize,
    update,
    handleManualNavigation,
    cancel,
    dispose() {
      controls.removeEventListener("start", handleManualNavigation);
      cancel();
      bounds = null;
    },
  };
}
