// Importing required packages
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

// Initializing the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Appending the element in DOM
document.body.appendChild(renderer.domElement);

// Creating the scene
const scene = new THREE.Scene();

// Creating the camera
const fov = 75;
const aspectRatio = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);

// Adding orbit controller
const orbit = new OrbitControls(camera, renderer.domElement);

// Creating the axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Creating a cube
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0X00FF00, wireframe: false });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// Resetting the camera position to view the cube
camera.position.set(1, 2, 5);

// Updating the orbit controller when changing the camera position
orbit.update();

// Creating the sphere
const sphereGeometry = new THREE.SphereGeometry(1, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0XFF0000, wireframe: false });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(1.5, 1.5, 1.5);
scene.add(sphere);

// Rendering the scene and camera
function animate(time) {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);