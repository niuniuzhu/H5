namespace Game {
	export class Test0 {
		private _camera: THREE.PerspectiveCamera;
		private _scene: THREE.Scene;
		private _mesh: THREE.Mesh;
		private _renderer: THREE.WebGLRenderer;
		private _geometry: THREE.BoxGeometry;
		private _material: THREE.MeshNormalMaterial;

		constructor() {
			this._camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
			this._camera.position.z = 1;

			this._scene = new THREE.Scene();

			this._geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
			this._material = new THREE.MeshNormalMaterial();

			this._mesh = new THREE.Mesh(this._geometry, this._material);
			this._scene.add(this._mesh);

			this._renderer = new THREE.WebGLRenderer({ antialias: true });
			this._renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(this._renderer.domElement);
			this.Animate();
		}

		private Animate(): any {
			requestAnimationFrame(this.Animate.bind(this));
			this._mesh.rotation.x += 0.01;
			this._mesh.rotation.y += 0.02;
			this._renderer.render(this._scene, this._camera);

		}
	}
}