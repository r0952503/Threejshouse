import './style.css'
import * as THREE from 'three';
// orbit controls 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// dat.gui
import * as dat from 'dat.gui'
//gsap
import gsap from "gsap"; 


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  // shadows
  antialias: true,
  
});
renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

//dat gui
const gui = new dat.GUI();


// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add (ambientLight);

// directional light 
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);


// point light 
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 2, 0);
pointLight.castShadow.true;
scene.add(pointLight);
// helper
//const pointLightHelper = new THREE.PointLightHelper(pointLight);
//scene.add(pointLightHelper);


// dat gui, add position for pointLight
const pointLightFolder = gui.addFolder("Point Light");
pointLightFolder.add(pointLight.position, "x").min(-10).max(10).step(0.01);
pointLightFolder.add(pointLight.position, "y").min(-10).max(10).step(0.01);
pointLightFolder.add(pointLight.position, "z").min(-10).max(10).step(0.01);
pointLightFolder.add(pointLight, "intensity").min(0).max(10).step(0.01);


// gsap pointLight Z from 0 to -5 (infinite loop)
gsap.to(pointLight.position, {duration: 1, z:- 5, yoyo: true, repeat: -1 });


// orbit controls 
const controls = new OrbitControls (camera, renderer.domElement);
controls.enableDamping = true; 

//add axes help (de assen)
//const axesHelper = new THREE.AxesHelper(2);
//scene.add(axesHelper);



// white plane (platteland/grond)
const planeGeometry = new THREE.PlaneGeometry(20, 20, 20);
const planeMaterial = new THREE.MeshStandardMaterial ({ color: 0xffffff });
const plane = new THREE.Mesh (planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true;
scene.add (plane);




//BOX, 4x2x0.01
// load texture for painting 
const textureLoader = new THREE.TextureLoader();
const paintingTexture2 = textureLoader.load("garage.png");
const paintingTexture3 = textureLoader.load("brick.jpg");
const paintingTexture4 = textureLoader.load("door.jpg");
const paintingTexture5 = textureLoader.load("charlotte.jpg");

const paintingGeometry = new THREE.BoxGeometry(10, 2, 0.02 );
const paintingMaterial = new THREE.MeshStandardMaterial({ 
  color: 0xFFFFFF , 
  map: paintingTexture3,
});

const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
painting.position.z = -5;
scene.add (painting);


// wall2
const wall2 = new THREE.BoxGeometry(5, 2, 0.02 );
const wall2material = new THREE.MeshStandardMaterial({ 
  color: 0xFFFFFF , 
  map: paintingTexture3,
});
const wall2mesh = new THREE.Mesh(wall2, wall2material);
wall2mesh.position.z = 0;
wall2mesh.position.x = 2.5;
scene.add (wall2mesh);


// wall3
const wall3 = new THREE.BoxGeometry(0.02, 2, 5 );
const wall3material = new THREE.MeshStandardMaterial({ 
  color: 0xFFFFFF , 
  map: paintingTexture3,
});
const wall3mesh = new THREE.Mesh(wall3, wall3material);
wall3mesh.position.z = -2.5;
wall3mesh.position.x = -5;
scene.add (wall3mesh);

//wall4
const wall4 = new THREE.BoxGeometry(0.02, 2, 5 );
const wall4material = new THREE.MeshStandardMaterial({ 
  color: 0xFFFFFF , 
  map: paintingTexture3,
});
const wall4mesh = new THREE.Mesh(wall4, wall4material);
wall4mesh.position.z = -2.5;
wall4mesh.position.x = 5;
scene.add (wall4mesh);





//drive way
const driveway = new THREE.BoxGeometry(5, 0.01, 8 );
const drivewayMaterial = new THREE.MeshStandardMaterial({ 
  color: 0x696969 , 
});
const drivewayMesh = new THREE.Mesh(driveway, drivewayMaterial);
drivewayMesh.position.z = 1;
drivewayMesh.position.x = -2.5;
drivewayMesh.position.y = -1;

scene.add (drivewayMesh);

//lines on drive way 
const line = new THREE.BoxGeometry(0.1, 0.01, 8 );
const lineMaterial = new THREE.MeshStandardMaterial({ 
  color: 0xFFFFFF , 
});
const lineMesh = new THREE.Mesh(line, lineMaterial);
lineMesh.position.z = 1;
lineMesh.position.x = -4;
lineMesh.position.y = -0.99;
scene.add (lineMesh);


//lines on drive way 2
const line2 = new THREE.BoxGeometry(0.1, 0.01, 8 );
const line2Material = new THREE.MeshStandardMaterial({ 
  color: 0xFFFFFF , 
});
const line2Mesh = new THREE.Mesh(line2, line2Material);
line2Mesh.position.z = 1;
line2Mesh.position.x = -1;
line2Mesh.position.y = -0.99;
scene.add (line2Mesh);

//door on wall2
const door = new THREE.BoxGeometry(1, 2, 0.02 );
const doorMaterial = new THREE.MeshStandardMaterial({ 
  color: 0xFFFFFF , 
  map: paintingTexture4,
});
const doorMesh = new THREE.Mesh(door, doorMaterial);
doorMesh.position.z = 0.01;
doorMesh.position.x = 2.5;
scene.add (doorMesh);

// doormat 
const doormat = new THREE.BoxGeometry(1, 0.01, 0.5 );
const doormatMaterial = new THREE.MeshStandardMaterial({ 
  color: 0x8B4513 , 
});
const doormatMesh = new THREE.Mesh(doormat, doormatMaterial);
doormatMesh.position.z = 0.02;
doormatMesh.position.x = 2.5;
doormatMesh.position.y = -1;
scene.add (doormatMesh);





//garage
const garage = new THREE.BoxGeometry(5, 2, 0.02 );
const garageMaterial = new THREE.MeshStandardMaterial({ 
  color: 0xFFFFFF , 
  map: paintingTexture2,
});
const garageMesh = new THREE.Mesh(garage, garageMaterial);
garageMesh.position.z = 0;
garageMesh.position.x = -2.5;
scene.add (garageMesh);


//roof 
const roofGeometry = new THREE.ConeGeometry(3.8, 1, 4);
const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.y = 1.5;
roof.position.z = -2.5;
roof.position.x = -2.5; 

// Rotate the cone
roof.rotation.y = Math.PI / 4; // Rotate 45 degrees around the y-axis
scene.add(roof);



//roof2
const roof2 = new THREE.Mesh(roofGeometry, roofMaterial);
roof2.position.y = 1.5;
roof2.position.z = -2.5;
roof2.position.x = 2.5;
// Rotate the cone
roof2.rotation.y = -Math.PI / 4; // Rotate 45 degrees around the y-axis
scene.add(roof2);

const loader = new GLTFLoader();
loader.load(
    'countryside_path/scene.gltf', // Replace with the actual path to your model file
    function (gltf) {
        const countrysidePath = gltf.scene;
        countrysidePath.position.set(2.4, -1.2, 2.6); // Adjust position as needed
        countrysidePath.rotation.y = THREE.MathUtils.degToRad(165);
        scene.add(countrysidePath);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

// painting in house on wall on the inside 
const paintingInHouse = new THREE.BoxGeometry(2, 2, 0.02 );
const paintingInHouseMaterial = new THREE.MeshStandardMaterial({ 
  color: 0xFFFFFF , 
  map: paintingTexture5,
});
const paintingInHouseMesh = new THREE.Mesh(paintingInHouse, paintingInHouseMaterial);
paintingInHouseMesh.position.z = -4.95;
paintingInHouseMesh.position.x = 4;
paintingInHouseMesh.position.y = 0;

scene.add (paintingInHouseMesh);


// Functie om een mooiere wolk te maken
function createCloud() {
  const cloud = new THREE.Group();
  const cloudMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
  
  // Maak meerdere bolletjes en voeg ze samen voor een puffy effect
  for (let i = 0; i < 5; i++) {
    const puffSize = Math.random() * 1 + 0.8; // Maak elke 'puff' verschillend in grootte
    const cloudGeometry = new THREE.SphereGeometry(puffSize, 16, 16);
    const puff = new THREE.Mesh(cloudGeometry, cloudMaterial);
    
    // Plaats elke 'puff' op een willekeurige positie rondom het centrum
    puff.position.set(
      (Math.random() - 0.5) * 3, // x-positie
      (Math.random() - 0.5) * 1.5, // y-positie (iets minder variatie in hoogte)
      (Math.random() - 0.5) * 1.5 // z-positie
    );
    
    cloud.add(puff);
  }

  return cloud;
}


// Voeg meerdere wolken toe aan de lucht
for (let i = 0; i < 5; i++) {
  const cloud = createCloud();
  cloud.position.x = Math.random() * 20 - 10;
  cloud.position.z = Math.random() * 20 - 10;
  cloud.position.y = Math.random() * 5 + 5; // Zet de wolken in de lucht
  scene.add(cloud);
}


// Define the radius of the circular path around the house
const radius = 10;

// Calculate the camera's position in a circular path
const rotationDuration = 5; // Duration of the rotation in seconds
const enterDuration = 5; // Duration of the entering in seconds
const exitDuration = 5; // Duration of the exiting in seconds

const clock = new THREE.Clock();
function animate() {
  const elapsedTime = clock.getElapsedTime();

  if (elapsedTime < rotationDuration) {
    // Rotate around the house
    const angle = elapsedTime * 2 * Math.PI / rotationDuration; // Full rotation in rotationDuration seconds
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    camera.position.y = 5; // Keep the camera at a fixed height
  } else if (elapsedTime < rotationDuration + enterDuration) {
    // Move towards the painting inside the house
    const t = (elapsedTime - rotationDuration) / enterDuration; // Normalized time for entering
    camera.position.x = THREE.MathUtils.lerp(radius, paintingInHouseMesh.position.x, t);
    camera.position.z = THREE.MathUtils.lerp(0, paintingInHouseMesh.position.z, t);
    camera.position.y = THREE.MathUtils.lerp(5, paintingInHouseMesh.position.y, t); // Move down to the painting's height
  } else if (elapsedTime < rotationDuration + enterDuration + exitDuration) {
    // Move back outside in front of the house
    const t = (elapsedTime - rotationDuration - enterDuration) / exitDuration; // Normalized time for exiting
    camera.position.x = THREE.MathUtils.lerp(paintingInHouseMesh.position.x, 0, t);
    camera.position.z = THREE.MathUtils.lerp(paintingInHouseMesh.position.z, radius, t);
    camera.position.y = THREE.MathUtils.lerp(paintingInHouseMesh.position.y, 5, t); // Move up to the original height
  } else {
    // Final position outside in front of the house
    camera.position.set(0, 5, radius);
  }

  // Point the camera towards the painting or the house
  if (elapsedTime < rotationDuration + enterDuration) {
    camera.lookAt(paintingInHouseMesh.position); // Look at the painting
  } else {
    camera.lookAt(new THREE.Vector3(0, 1, 0)); // Look at the house
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
