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

camera.position.z = 10;

boxMesh.position.set(4, -4, 0);
boxMesh.scale.set(1, 1, 5);
boxMesh.rotation.y = Math.PI * 0.25;
boxMesh.rotation.x = Math.PI * 0.25;


renderer.setSize(size.width, size.height);
scene.add(boxMesh);
scene.add(camera);
scene.add(new THREE.AxesHelper());
renderer.render(scene, camera);
