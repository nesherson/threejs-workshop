import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

window.addEventListener("resize", (e) => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    camera.aspect = size.width / size.height;

    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", (e) => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    }
    else {
        document.exitFullscreen();
    }
});

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector(".canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
const orbitControls = new OrbitControls(camera, canvas);
const scene = new THREE.Scene();
const geometry = new THREE.BufferGeometry();
const count = 25;
const positions = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 5;
}

const positionsAttribute = new THREE.BufferAttribute(positions, 3);

geometry.setAttribute("position", positionsAttribute);

const geometryMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
const geometryMesh = new THREE.Mesh(geometry, geometryMaterial);

camera.position.z = 5;
orbitControls.enableDamping = true;

renderer.setSize(size.width, size.height);
scene.add(geometryMesh);
scene.add(camera);

function tick() {
    orbitControls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();