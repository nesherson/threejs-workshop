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