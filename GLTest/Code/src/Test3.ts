namespace Game {
	export class Test3 {
		private SCREEN_WIDTH = window.innerWidth;
		private SCREEN_HEIGHT = window.innerHeight;

		private stats: Stats;
		private container: HTMLElement;
		private camera: THREE.PerspectiveCamera;
		private scene: THREE.Scene;
		private renderer: THREE.WebGLRenderer;

		constructor() {
			this.container = document.createElement('div');
			document.body.appendChild(this.container);

			this.camera = new THREE.PerspectiveCamera(30, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 0.1, 1000);
			this.camera.position.z = 500;

			this.scene = new THREE.Scene();
			this.scene.add(new THREE.AmbientLight(0x404040));
			this.scene.add(this.camera);

			this.renderer = new THREE.WebGLRenderer({ antialias: true });
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
			this.renderer.domElement.style.position = "relative";

			this.container.appendChild(this.renderer.domElement);

			this.renderer.gammaInput = true;
			this.renderer.gammaOutput = true;

			let object = new THREE.AxesHelper(50);
			object.position.set(0, 0, 0);
			this.scene.add(object);

			let loader = new THREE.GLTF();
			loader.load("res/models/skinned/Samba Dancing.json", (geometry, materials) => {

				let mesh = new THREE.Mesh(geometry, materials);
				this.scene.add(mesh);
				console.log("done");
			}, null, (e) => { console.error(e) });

			this.stats = new Stats();
			this.stats.dom.style.position = 'absolute';
			this.stats.dom.style.top = '0px';
			this.container.appendChild(this.stats.dom);

			window.addEventListener('resize', this.onWindowResize.bind(this), false);
			this.update();
		}

		private onWindowResize() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();

			this.renderer.setSize(window.innerWidth, window.innerHeight);
		}

		private update() {
			requestAnimationFrame(this.update.bind(this));
			this.render();
			this.stats.update();
		}

		private render() {
			let timer = Date.now() * 0.0001;
			this.camera.position.x = Math.cos(timer) * 800;
			this.camera.position.z = Math.sin(timer) * 800;
			this.camera.lookAt(this.scene.position);
			this.renderer.render(this.scene, this.camera);
		}
	}
}