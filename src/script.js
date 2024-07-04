import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import fragmentShader from "./shaders/test/fragment.glsl";
import vertexShader from "./shaders/test/vertex.glsl";
import { BufferAttribute } from "three";
import image from "/assets/particles/dirt_01.png";
import Stats from "stats.js";

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load(image);

console.log(texture);

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

const count = geometry.attributes.position.count;

const sizesAttribute = new Float32Array(count);
const rotationAttribute = new Float32Array(count);

for (let i = 0; i < count; i++) {
  sizesAttribute[i] = Math.random();
  rotationAttribute[i] = Math.random() * Math.PI * 2;
}

geometry.setAttribute("aSize", new BufferAttribute(sizesAttribute, 1));
geometry.setAttribute("aRotation", new BufferAttribute(rotationAttribute, 1));

console.log(geometry.attributes);

// Material
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide,
  transparent: true,
  depthWrite: false,
  uniforms: {
    uFrequency: { value: new THREE.Vector2(10, 10) },
    uTime: { value: 0 },
    uTexture: { value: texture },
    uParticleSize: { value: 3.0 },
    uParticleRotation: { value: 0.0 },
  },
});

console.log(material.uniforms);

gui
  .add(material.uniforms.uFrequency.value, "x")
  .min(0)
  .max(20)
  .step(0.01)
  .name("frequencyX");
gui
  .add(material.uniforms.uFrequency.value, "y")
  .min(0)
  .max(20)
  .step(0.01)
  .name("frequencyY");
gui
  .add(material.uniforms.uParticleSize, "value")
  .min(1.0)
  .max(20.0)
  .step(0.1)
  .name("particleSize");
gui
  .add(material.uniforms.uParticleRotation, "value")
  .min(0.0)
  .max(Math.PI * 2)
  .step(0.1)
  .name("particleRotation");

// Mesh
const points = new THREE.Points(geometry, material);
scene.add(points);

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
  100,
);
camera.position.set(0.25, -0.25, 1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  stats.begin();

  const elapsedTime = clock.getElapsedTime();

  // Update material
  material.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
  stats.end();
};

tick();
