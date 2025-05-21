<template>
  <div ref="canvasContainer" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvasContainer = ref<HTMLDivElement | null>(null);

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let model: THREE.Group | null = null;
let animationFrameId: number | null = null;
let controls: OrbitControls | null = null;

onMounted(() => {
  if (!canvasContainer.value) return;

  // Scene
  scene = new THREE.Scene();
  // scene.background = new THREE.Color(0xf0f0f0); // Removed for transparent background

  // Camera
  camera = new THREE.PerspectiveCamera(75, canvasContainer.value.clientWidth / canvasContainer.value.clientHeight, 0.1, 1000);
  camera.position.set(0, 1, 5); // Adjusted camera position

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Added alpha for transparency
  renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  canvasContainer.value.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Softer ambient light
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Stronger directional light
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  // GLTF Loader
  const loader = new GLTFLoader();
  loader.load(
    '/models/shoe.gltf', // Path relative to the public directory
    (gltf) => {
      model = gltf.scene;
      // Adjust model scale and position if necessary - placeholder cube might need this
      // Example: Scale up the placeholder cube
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim; // Scale to fit a 2-unit bounding box
      model.scale.set(scale, scale, scale);
      model.position.sub(center.multiplyScalar(scale)); // Center the model

      scene?.add(model);
      if (camera) { // Ensure camera is not null
          camera.lookAt(model.position);
      }
    },
    undefined, // onProgress callback (optional)
    (error) => {
      console.error('An error happened during model loading:', error);
    }
  );

  // OrbitControls
  if (camera && renderer) { // Ensure camera and renderer are not null
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1; // Adjusted min distance
    controls.maxDistance = 20; // Adjusted max distance
    controls.target.set(0, 0, 0); // Assuming model is centered at origin after adjustment
  }
  
  // Animation loop
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    if (model) {
      model.rotation.y += 0.005; // Slower rotation speed
    }
    controls?.update(); // only required if controls.enableDamping or controls.autoRotate are set to true
    if (renderer && scene && camera) { // Ensure renderer, scene and camera are not null
        renderer.render(scene, camera);
    }
  };

  animate();

  // Handle window resize
  const handleResize = () => {
    if (canvasContainer.value && renderer && camera) { // Ensure all are not null
      const width = canvasContainer.value.clientWidth;
      const height = canvasContainer.value.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
  };
  window.addEventListener('resize', handleResize);
  // Clean up resize listener on unmount
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  // Dispose of Three.js objects
  renderer?.dispose();
  scene?.traverse(object => {
    if (object instanceof THREE.Mesh) {
      object.geometry?.dispose();
      object.material?.dispose();
    }
  });
  // If model has textures, they need to be disposed too.
  // This is a basic cleanup, more complex scenes might need more.
  model = null;
  scene = null;
  camera = null;
  renderer = null;
  controls?.dispose();
});
</script>

<style scoped>
/* Ensure the canvas container and thus the canvas fill the allocated space */
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
/* Optional: Add a border for debugging layout */
/* div {
  border: 1px solid red;
} */
</style>
