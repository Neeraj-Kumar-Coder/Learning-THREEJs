import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

const renderer = new THREE.WebGLRenderer();
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

const axeshelper = new THREE.AxesHelper(100);
scene.add(axeshelper);
camera.position.set(25, 25, 50);
orbit.update();

const sideLength = 500;
const planeTexture = textureLoader.load("./textures/grass_texture.jpg");
const planeGeometry = new THREE.PlaneGeometry(sideLength, sideLength, 100, 100);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0X00FF00, side: THREE.DoubleSide, wireframe: false, map: planeTexture });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;
scene.add(plane);

const breadth = 25;
const depth = 5;
const wallTexture = [
    new THREE.MeshBasicMaterial({ map: textureLoader.load("./textures/wall_texture.jpg") }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load("./textures/wall_texture.jpg") }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load("./textures/wall_texture.jpg") }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load("./textures/wall_texture.jpg") }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load("./textures/wall_texture.jpg") }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load("./textures/wall_texture.jpg") })
];
const wallGeometry = new THREE.BoxGeometry(sideLength, breadth, depth);
const wallMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    wireframe: false
});
const wall_1 = new THREE.Mesh(wallGeometry, wallTexture);
const wall_2 = new THREE.Mesh(wallGeometry, wallTexture);
const wall_3 = new THREE.Mesh(wallGeometry, wallTexture);
const wall_4 = new THREE.Mesh(wallGeometry, wallTexture);
wall_1.position.set(0, breadth / 2, -sideLength / 2 + depth / 2);
wall_2.position.set(0, breadth / 2, sideLength / 2 - depth / 2);
wall_3.rotation.y = Math.PI / 2;
wall_3.position.set(sideLength / 2 - depth / 2, breadth / 2, 0);
wall_4.rotation.y = Math.PI / 2;
wall_4.position.set(-sideLength / 2 + depth / 2, breadth / 2, 0);
scene.add(wall_1);
scene.add(wall_2);
scene.add(wall_3);
scene.add(wall_4);


function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);