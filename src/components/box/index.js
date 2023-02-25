import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

export function createBox () {
	const boxGeometry = new BoxGeometry(2, 2, 2);
	const boxMaterial = new MeshBasicMaterial({ color: 'purple' });
	const box = new Mesh(boxGeometry, boxMaterial);

	box.rotate = (delta) => {
		box.rotation.z += delta;
		box.rotation.x += delta;
		box.rotation.y += delta;
	};

	return box;
}