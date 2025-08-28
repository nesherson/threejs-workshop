import * as THREE from "three";

const size = {
    width: 800,
    height: 600
}

const canvas = document.querySelector(".canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
const scene = new THREE.Scene();
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

camera.position.z = 3;

renderer.setSize(size.width, size.height);
scene.add(boxMesh);
scene.add(camera);
renderer.render(scene, camera);
