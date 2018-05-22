namespace Game {
	export class Test1 {
		private container: HTMLDivElement;
		private stats: Stats;
		private camera: THREE.PerspectiveCamera;
		private scene: THREE.Scene;
		private renderer: THREE.WebGLRenderer;

		constructor() {
			this.init();
			this.animate();
		}

		private init() {
			this.container = document.createElement('div');
			document.body.appendChild(this.container);

			this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
			this.camera.position.y = 400;

			this.scene = new THREE.Scene();

			let light: THREE.DirectionalLight, object: THREE.Mesh | THREE.AxesHelper | THREE.ArrowHelper;

			this.scene.add(new THREE.AmbientLight(0x404040));

			light = new THREE.DirectionalLight(0xffffff);
			light.position.set(0, 1, 0);
			this.scene.add(light);

			let map = THREE.ImageUtils.loadTexture('res/textures/hdr.jpg');
			map.wrapS = map.wrapT = THREE.RepeatWrapping;
			map.anisotropy = 16;

			let material = new THREE.MeshLambertMaterial({ map: map, side: THREE.DoubleSide });

			//

			object = new THREE.Mesh(new THREE.SphereGeometry(75, 20, 10), material);
			object.position.set(-400, 0, 200);
			this.scene.add(object);

			object = new THREE.Mesh(new THREE.IcosahedronGeometry(75, 1), material);
			object.position.set(-200, 0, 200);
			this.scene.add(object);

			object = new THREE.Mesh(new THREE.OctahedronGeometry(75, 2), material);
			object.position.set(0, 0, 200);
			this.scene.add(object);

			object = new THREE.Mesh(new THREE.TetrahedronGeometry(75, 0), material);
			object.position.set(200, 0, 200);
			this.scene.add(object);

			//

			object = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 4, 4), material);
			object.position.set(-400, 0, 0);
			this.scene.add(object);

			object = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100, 4, 4, 4), material);
			object.position.set(-200, 0, 0);
			this.scene.add(object);

			object = new THREE.Mesh(new THREE.CircleGeometry(50, 20, 0, Math.PI * 2), material);
			object.position.set(0, 0, 0);
			this.scene.add(object);

			object = new THREE.Mesh(new THREE.RingGeometry(10, 50, 20, 5, 0, Math.PI * 2), material);
			object.position.set(200, 0, 0);
			this.scene.add(object);

			object = new THREE.Mesh(new THREE.CylinderGeometry(25, 75, 100, 40, 5), material);
			object.position.set(400, 0, 0);
			this.scene.add(object);

			//

			let points: THREE.Vector2[] = [];

			for (let i = 0; i < 50; i++) {

				points.push(new THREE.Vector2(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, 0));

			}

			object = new THREE.Mesh(new THREE.LatheGeometry(points, 20), material);
			object.position.set(-400, 0, -200);
			this.scene.add(object);

			object = new THREE.Mesh(new THREE.TorusGeometry(50, 20, 20, 20), material);
			object.position.set(-200, 0, -200);
			this.scene.add(object);

			object = new THREE.Mesh(new THREE.TorusKnotGeometry(50, 10, 50, 20), material);
			object.position.set(0, 0, -200);
			this.scene.add(object);


			object = new THREE.Mesh(
				new THREE.ParametricGeometry(
					(u: number, v: number, dest: THREE.Vector3): void => {
						dest.set(u, v, 0);
					},
					25,
					25
				)
			);

			object = new THREE.AxesHelper(50);
			object.position.set(200, 0, -200);
			this.scene.add(object);

			object = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 50);
			object.position.set(400, 0, -200);
			this.scene.add(object);

			//

			this.renderer = new THREE.WebGLRenderer({ antialias: true });
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(window.innerWidth, window.innerHeight);

			this.container.appendChild(this.renderer.domElement);

			this.stats = new Stats();
			this.stats.dom.style.position = 'absolute';
			this.stats.dom.style.top = '0px';
			this.container.appendChild(this.stats.dom);

			//

			window.addEventListener('resize', this.onWindowResize.bind(this), false);

		}

		private onWindowResize() {

			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();

			this.renderer.setSize(window.innerWidth, window.innerHeight);

		}

		//

		private animate() {

			requestAnimationFrame(this.animate.bind(this));

			this.render();
			this.stats.update();

		}

		private render() {

			let timer = Date.now() * 0.0001;

			this.camera.position.x = Math.cos(timer) * 800;
			this.camera.position.z = Math.sin(timer) * 800;

			this.camera.lookAt(this.scene.position);

			for (let i = 0, l = this.scene.children.length; i < l; i++) {

				let object = this.scene.children[i];

				object.rotation.x = timer * 5;
				object.rotation.y = timer * 2.5;

			}

			this.renderer.render(this.scene, this.camera);
		}
	}
}