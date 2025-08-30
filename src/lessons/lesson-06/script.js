import * as THREE from "three";

const size = {
    width: 800,
    height: 600
}

const canvas = document.querySelector(".canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
const scene = new THREE.Scene();
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

camera.position.z = 5;

renderer.setSize(size.width, size.height);
scene.add(boxMesh);
scene.add(camera);

const clock = new THREE.Clock();

function tick() {

    const elapsedTime = clock.getElapsedTime();

    console.log(elapsedTime);

    boxMesh.position.x = Math.sin(elapsedTime);
    boxMesh.position.y = Math.cos(elapsedTime);
    camera.lookAt(boxMesh.position);
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();