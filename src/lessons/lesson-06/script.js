import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const size = {
    width: 800,
    height: 600
}

const canvas = document.querySelector(".canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
const orbitControls = new OrbitControls(camera, canvas);
const scene = new THREE.Scene();
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

camera.position.z = 5;
orbitControls.enableDamping = true;

renderer.setSize(size.width, size.height);
scene.add(boxMesh);
scene.add(camera);

function tick() {
    orbitControls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();