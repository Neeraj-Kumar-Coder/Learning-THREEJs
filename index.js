import * as THREE from 'three';
import { OrbitControls } from "OrbitControls";
import * as dat from './node_modules/dat.gui/build/dat.gui.module.js';


const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

const scene = new THREE.Scene();

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(0, 2, 5);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

const sphereGeometry = new THREE.SphereGeometry(5, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({ wireframe: false, map: textureLoader.load("./earth.jpg") });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;
scene.add(sphere);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const gui = new dat.GUI();

const options = {
    sphereColor: 0x0000ff,
    wireFrame: false,
    speed: 0.01
};

gui.addColor(options, 'sphereColor').onChange((e) => {
    sphere.material.color.set(e);
});

gui.add(options, 'wireFrame').onChange((e) => {
    sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 1);

const directionalLight = new THREE.DirectionalLight(0XFFFFFF, 1);
directionalLight.position.set(-50, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -15;
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLightHelper);

const directionalLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(directionalLightShadowHelper);

let pos = 0;
function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    sphere.position.y = 5 + Math.sin(pos += options.speed);
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);