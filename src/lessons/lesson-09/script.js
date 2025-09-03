import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";
import gsap from "gsap";

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

window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "h") {
        gui.show(gui._hidden);
    }
})

const gui = new GUI({
    title: "Debug UI",
    closeFolders: true
});
const debugObject = {};

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}
debugObject.color = "#5e4555";
debugObject.spin = () => {
    gsap.to(boxMesh.rotation, { duration: 1, y: boxMesh.rotation.y + Math.PI * 2});
}
debugObject.subdivision = 2;

const canvas = document.querySelector(".canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
const orbitControls = new OrbitControls(camera, canvas);
const scene = new THREE.Scene();
const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const boxMaterial = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

camera.position.z = 5;
orbitControls.enableDamping = true;

renderer.setSize(size.width, size.height);
scene.add(boxMesh);
scene.add(camera);

const boxTweaks = gui.addFolder("Box");

boxTweaks.add(boxMesh.position, "y").name("Y").min(-3).max(3).step(0.01);
boxTweaks.add(boxMesh.position, "x").name("X").min(-3).max(3).step(0.01);
boxTweaks.add(boxMesh, "visible");
boxTweaks.add(boxMaterial, "wireframe");
boxTweaks.addColor(debugObject, "color")
   .onChange(() => {
    boxMaterial.color.set(debugObject.color);
})
boxTweaks.add(debugObject, "spin");
boxTweaks.add(debugObject, "subdivision")
   .min(1)
   .max(10)
   .step(1)
   .onFinishChange(() => {
    boxMesh.geometry.dispose();
    boxMesh.geometry = 
        new THREE.BoxGeometry(1, 1, 1, debugObject.subdivision, debugObject.subdivision, debugObject.subdivision);
   });

function tick() {
    orbitControls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();