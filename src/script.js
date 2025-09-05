import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

// Texture loading
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorAmbientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

// Debug
const debugObject = {};
const debugUI = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector(".canvas");

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  150
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 50;

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Meshes
// const meshMaterial = new THREE.MeshBasicMaterial({
//   map: doorColorTexture
// });
const meshMaterial = new THREE.MeshStandardMaterial({ color: "#FFFFFF"});

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(15, 32, 16),
  meshMaterial
);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), meshMaterial);
const torus = new THREE.Mesh(new THREE.TorusGeometry(10, 5), meshMaterial);

debugUI.add(meshMaterial, "metalness")
.min(0).max(1).step(0.0001);
debugUI.add(meshMaterial, "roughness")
.min(0).max(1).step(0.0001);

// Lights
const ambientLight = new THREE.AmbientLight("#FFFFFF", 1);
const pointLight = new THREE.PointLight("#FFFFFF", 30);

pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Add meshes to scene
scene.add(ambientLight);
scene.add(pointLight);
scene.add(sphere, plane, torus);

sphere.position.x = -30;
torus.position.x = 30;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  torus.rotation.y = 0.08 * elapsedTime;
  plane.rotation.y = 0.08 * elapsedTime;
  sphere.rotation.y = 0.08 * elapsedTime;
  torus.rotation.x = -0.08 * elapsedTime;
  plane.rotation.x = -0.08 * elapsedTime;
  sphere.rotation.x = -0.08 * elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
