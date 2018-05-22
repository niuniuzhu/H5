namespace Game {
	export class Test2 {
		private SCREEN_WIDTH = window.innerWidth;
		private SCREEN_HEIGHT = window.innerHeight;
		private FLOOR = -250;

		private container: HTMLElement;
		private stats: Stats;
		private camera: THREE.PerspectiveCamera;
		private scene: THREE.Scene;
		private renderer: THREE.WebGLRenderer;
		private mesh: THREE.Mesh;
		private helper: THREE.SkeletonHelper;
		private mixer: THREE.AnimationMixer;

		private mouseX = 0;
		private mouseY = 0;

		private windowHalfX = window.innerWidth / 2;
		private windowHalfY = window.innerHeight / 2;

		private clock = new THREE.Clock();

		constructor() {
			this.init();
			this.animate();
		}

		private init() {
			this.container = document.createElement('div');
			document.body.appendChild(this.container);

			this.camera = new THREE.PerspectiveCamera(30, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, 10000);
			this.camera.position.z = 2200;

			this.scene = new THREE.Scene();

			this.scene.fog = new THREE.Fog(0xffffff, 2000, 10000);

			this.scene.add(this.camera);

			// GROUND

			let geometry = new THREE.PlaneBufferGeometry(16000, 16000);
			let material = new THREE.MeshPhongMaterial({ emissive: 0x888888 });

			let ground = new THREE.Mesh(geometry, material);
			ground.position.set(0, this.FLOOR, 0);
			ground.rotation.x = -Math.PI / 2;
			this.scene.add(ground);

			ground.receiveShadow = true;


			// LIGHTS

			this.scene.add(new THREE.HemisphereLight(0x111111, 0x444444));

			let light = new THREE.DirectionalLight(0xebf3ff, 1.5);
			light.position.set(0, 140, 500).multiplyScalar(1.1);
			this.scene.add(light);

			light.castShadow = true;

			light.shadow.mapSize.width = 1024;
			light.shadow.mapSize.height = 1024;

			let d = 390;

			light.shadow.camera.left = -d;
			light.shadow.camera.right = d;
			light.shadow.camera.top = d * 1.5;
			light.shadow.camera.bottom = -d;
			light.shadow.camera.far = 3500;
			// light.shadowCameraVisible = true;

			// RENDERER

			this.renderer = new THREE.WebGLRenderer({ antialias: true });
			this.renderer.setClearColor(this.scene.fog.color);
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
			this.renderer.domElement.style.position = "relative";

			this.container.appendChild(this.renderer.domElement);

			this.renderer.gammaInput = true;
			this.renderer.gammaOutput = true;

			this.renderer.shadowMap.enabled = true;

			this.stats = new Stats();
			this.container.appendChild(this.stats.dom);

			let loader = new THREE.JSONLoader();
			loader.load("res/models/skinned/knight.json", (geometry, materials) => {
				this.createScene(geometry, materials as THREE.MeshPhongMaterial[], 0, this.FLOOR, - 300, 60);
				this.initGUI();
			});

			window.addEventListener('resize', this.onWindowResize.bind(this), false);
		}

		private onWindowResize() {

			this.windowHalfX = window.innerWidth / 2;
			this.windowHalfY = window.innerHeight / 2;

			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();

			this.renderer.setSize(window.innerWidth, window.innerHeight);

		}

		private createScene(geometry: THREE.Geometry, materials: THREE.MeshPhongMaterial[], x: number, y: number, z: number, s: number) {

			// ensureLoop( geometry.animation );

			geometry.computeBoundingBox();
			let bb = geometry.boundingBox;

			let path = "textures/cube/Park2/";
			let format = '.jpg';
			let urls = [
				path + 'posx' + format, path + 'negx' + format,
				path + 'posy' + format, path + 'negy' + format,
				path + 'posz' + format, path + 'negz' + format
			];

			for (let i = 0; i < materials.length; i++) {

				let m = materials[i];
				m.skinning = true;
				m.morphTargets = true;

				m.specular.setHSL(0, 0, 0.1);

				m.color.setHSL(0.6, 0, 0.6);

				// m.map = map;
				// m.envMap = envMap;
				// m.bumpMap = bumpMap;
				// m.bumpScale = 2;

				// m.combine = THREE.MixOperation;
				// m.reflectivity = 0.75;

			}

			this.mesh = new THREE.SkinnedMesh(geometry, materials);
			this.mesh.position.set(x, y - bb.min.y * s, z);
			this.mesh.scale.set(s, s, s);
			this.mesh.quaternion.setFromEuler(new THREE.Euler(0,90,0));
			this.scene.add(this.mesh);

			this.mesh.castShadow = true;
			this.mesh.receiveShadow = true;

			this.helper = new THREE.SkeletonHelper(this.mesh);
			// helper.material.linewidth = 3;
			this.helper.visible = false;
			this.scene.add(this.helper);


			let clipMorpher = THREE.AnimationClip.CreateFromMorphTargetSequence('facialExpressions', (this.mesh.geometry as THREE.Geometry).morphTargets, 3, true);
			let clipBones = geometry.animations[0];

			this.mixer = new THREE.AnimationMixer(this.mesh);
		}

		private initGUI() {
			this.mesh.visible = true;
			this.helper.visible = true;
		}

		private onDocumentMouseMove(event: MouseEvent) {

			this.mouseX = (event.clientX - this.windowHalfX);
			this.mouseY = (event.clientY - this.windowHalfY);

		}

		//

		private animate() {

			requestAnimationFrame(this.animate.bind(this));

			this.render();
			this.stats.update();

		}

		private render() {

			let delta = 0.75 * this.clock.getDelta();

			this.camera.position.x += (this.mouseX - this.camera.position.x) * .05;
			this.camera.position.y = THREE.Math.clamp(this.camera.position.y + (- this.mouseY - this.camera.position.y) * .05, 0, 1000);

			this.camera.lookAt(this.scene.position);

			if (this.mixer) {
				this.mixer.update(delta);
				// this.helper.update();
			}

			this.renderer.render(this.scene, this.camera);
		}
	}
}