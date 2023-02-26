import {
	WebGLRenderer,
	Scene,
	PerspectiveCamera,
	PlaneGeometry,
	MeshBasicMaterial,
	Mesh,
	AxesHelper,
	GridHelper,
	DoubleSide,
	SphereGeometry,
	MeshStandardMaterial,
	AmbientLight,
	DirectionalLight,
	DirectionalLightHelper,
	CameraHelper,
	SpotLight,
	SpotLightHelper,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createBox } from '@components';
import { GUI } from 'dat.gui';

const renderer = new WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

const scene = new Scene();

//Создание камеры
const camera = new PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);
camera.position.set(-10, 30, 30);

// Возможность управления камеры мышью
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// Создание куба
const box = createBox();
scene.add(box);

// Создание Сферы
const sphereGeometry = new SphereGeometry(4, 30, 30);
const sphereMaterial = new MeshStandardMaterial({
	color: 0x0000ff,
	wireframe: false,
});
const sphere = new Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;
scene.add(sphere);

// параметры для анимации сферы
let step = 0;
const sphereMove = (speed) => {
	step += speed;
	sphere.position.y = 10 * Math.abs(Math.sin(step));
};

// Интерфейс управления
const gui = new GUI();
const options = {
	sphereColor: sphere.material.color.getStyle(),
	wireframe: false,
	speed: 0.01,
	angle: 0.2,
	penumbra: 0,
	intensity: 1,
};

// Изменение цвета сферы
gui
	.addColor(options, 'sphereColor')
	.onChange((e) => {
		sphere.material.color.set(e);
	});

// Показ/скрытие сетки сферы
gui
	.add(options, 'wireframe')
	.onChange((e) => {
		sphere.material.wireframe = e;
	});

// Регулирование скорости сферы
gui.add(options, 'speed', 0, 0.1);

// Регулирование источника света
gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 1);

// Создание плоскости
const planeGeometry = new PlaneGeometry(30, 30);
const planeMaterial = new MeshStandardMaterial({
	color: 0xffffff,
	side: DoubleSide,
});
const plane = new Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
scene.add(plane);

// Создание света
// const ambientLight = new AmbientLight(0x333333);
// scene.add(ambientLight);

// const directionLight = new DirectionalLight(0xffffff, 0.8);
// directionLight.position.set(-30, 50, 0);
// directionLight.castShadow = true;
// directionLight.shadow.camera.bottom = -12;
// scene.add(directionLight);

const spotLight = new SpotLight(0xFFFFFF);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;
scene.add(spotLight);

// Обновление данных света
const spotLoghtSettings = ({ angle, penumbra, intensity }) => {
	spotLight.angle = angle;
	spotLight.penumbra = penumbra;
	spotLight.intensity = intensity;
	sLightHelper.update();
};


// Помошники
const axesHelper = new AxesHelper(5);
scene.add(axesHelper);

const gridHelper = new GridHelper(30);
scene.add(gridHelper);

// const dLightHelper = new DirectionalLightHelper(directionLight, 5);
// scene.add(dLightHelper);

// const dLightShadowHelper = new CameraHelper(directionLight.shadow.camera);
// scene.add(dLightShadowHelper);

const sLightHelper = new SpotLightHelper(spotLight);
scene.add(sLightHelper);

// Обновление картинки
const animate = () => {
	requestAnimationFrame(animate);
	box.rotate(0.01);
	sphereMove(options.speed);
	spotLoghtSettings(options);

	renderer.render(scene, camera);
};

animate();
