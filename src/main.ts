import * as THREE from 'three';



const points = [
  new THREE.Vector3( -10, 0, 0 ),
  new THREE.Vector3( 0, 5, 0 ),
  new THREE.Vector3( 10, 0, 0 ),
  new THREE.Vector3( 15, -10, 0 ),
  new THREE.Vector3( 20, -10, 0 ),
];


class Rope extends THREE.Curve<THREE.Vector3> {
	constructor( ) {
		super();
	}

	getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const index = t * (points.length - 1);
    const floorIndex = Math.floor(index);
    const ceilIndex = Math.ceil(index);

    const floorPoint = points[floorIndex];
    const ceilPoint = points[ceilIndex];

    optionalTarget.lerpVectors(floorPoint, ceilPoint, index - floorIndex);
    return optionalTarget;
	}
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x595959);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 100;

const rope = new Rope( );
const geometry = new THREE.TubeGeometry( rope, points.length - 1, 0.5, 8, false );
const material = new THREE.MeshBasicMaterial( { color: 0x42280E } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );


const clock = new THREE.Clock(true);

function animate() {
  const dt = clock.getDelta();


  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();




