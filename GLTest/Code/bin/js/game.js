var Game;
(function (Game) {
    class GameMain {
        constructor() {
            new Game.Test3();
        }
    }
    Game.GameMain = GameMain;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Test0 {
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
        Animate() {
            requestAnimationFrame(this.Animate.bind(this));
            this._mesh.rotation.x += 0.01;
            this._mesh.rotation.y += 0.02;
            this._renderer.render(this._scene, this._camera);
        }
    }
    Game.Test0 = Test0;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Test1 {
        constructor() {
            this.init();
            this.animate();
        }
        init() {
            this.container = document.createElement('div');
            document.body.appendChild(this.container);
            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
            this.camera.position.y = 400;
            this.scene = new THREE.Scene();
            let light, object;
            this.scene.add(new THREE.AmbientLight(0x404040));
            light = new THREE.DirectionalLight(0xffffff);
            light.position.set(0, 1, 0);
            this.scene.add(light);
            let map = THREE.ImageUtils.loadTexture('res/textures/hdr.jpg');
            map.wrapS = map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 16;
            let material = new THREE.MeshLambertMaterial({ map: map, side: THREE.DoubleSide });
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
            let points = [];
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
            object = new THREE.Mesh(new THREE.ParametricGeometry((u, v, dest) => {
                dest.set(u, v, 0);
            }, 25, 25));
            object = new THREE.AxesHelper(50);
            object.position.set(200, 0, -200);
            this.scene.add(object);
            object = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 50);
            object.position.set(400, 0, -200);
            this.scene.add(object);
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.container.appendChild(this.renderer.domElement);
            this.stats = new Stats();
            this.stats.dom.style.position = 'absolute';
            this.stats.dom.style.top = '0px';
            this.container.appendChild(this.stats.dom);
            window.addEventListener('resize', this.onWindowResize.bind(this), false);
        }
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
        animate() {
            requestAnimationFrame(this.animate.bind(this));
            this.render();
            this.stats.update();
        }
        render() {
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
    Game.Test1 = Test1;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Test2 {
        constructor() {
            this.SCREEN_WIDTH = window.innerWidth;
            this.SCREEN_HEIGHT = window.innerHeight;
            this.FLOOR = -250;
            this.mouseX = 0;
            this.mouseY = 0;
            this.windowHalfX = window.innerWidth / 2;
            this.windowHalfY = window.innerHeight / 2;
            this.clock = new THREE.Clock();
            this.init();
            this.animate();
        }
        init() {
            this.container = document.createElement('div');
            document.body.appendChild(this.container);
            this.camera = new THREE.PerspectiveCamera(30, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, 10000);
            this.camera.position.z = 2200;
            this.scene = new THREE.Scene();
            this.scene.fog = new THREE.Fog(0xffffff, 2000, 10000);
            this.scene.add(this.camera);
            let geometry = new THREE.PlaneBufferGeometry(16000, 16000);
            let material = new THREE.MeshPhongMaterial({ emissive: 0x888888 });
            let ground = new THREE.Mesh(geometry, material);
            ground.position.set(0, this.FLOOR, 0);
            ground.rotation.x = -Math.PI / 2;
            this.scene.add(ground);
            ground.receiveShadow = true;
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
                this.createScene(geometry, materials, 0, this.FLOOR, -300, 60);
                this.initGUI();
            });
            window.addEventListener('resize', this.onWindowResize.bind(this), false);
        }
        onWindowResize() {
            this.windowHalfX = window.innerWidth / 2;
            this.windowHalfY = window.innerHeight / 2;
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
        createScene(geometry, materials, x, y, z, s) {
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
            }
            this.mesh = new THREE.SkinnedMesh(geometry, materials);
            this.mesh.position.set(x, y - bb.min.y * s, z);
            this.mesh.scale.set(s, s, s);
            this.mesh.quaternion.setFromEuler(new THREE.Euler(0, 90, 0));
            this.scene.add(this.mesh);
            this.mesh.castShadow = true;
            this.mesh.receiveShadow = true;
            this.helper = new THREE.SkeletonHelper(this.mesh);
            this.helper.visible = false;
            this.scene.add(this.helper);
            let clipMorpher = THREE.AnimationClip.CreateFromMorphTargetSequence('facialExpressions', this.mesh.geometry.morphTargets, 3, true);
            let clipBones = geometry.animations[0];
            this.mixer = new THREE.AnimationMixer(this.mesh);
        }
        initGUI() {
            this.mesh.visible = true;
            this.helper.visible = true;
        }
        onDocumentMouseMove(event) {
            this.mouseX = (event.clientX - this.windowHalfX);
            this.mouseY = (event.clientY - this.windowHalfY);
        }
        animate() {
            requestAnimationFrame(this.animate.bind(this));
            this.render();
            this.stats.update();
        }
        render() {
            let delta = 0.75 * this.clock.getDelta();
            this.camera.position.x += (this.mouseX - this.camera.position.x) * .05;
            this.camera.position.y = THREE.Math.clamp(this.camera.position.y + (-this.mouseY - this.camera.position.y) * .05, 0, 1000);
            this.camera.lookAt(this.scene.position);
            if (this.mixer) {
                this.mixer.update(delta);
            }
            this.renderer.render(this.scene, this.camera);
        }
    }
    Game.Test2 = Test2;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Test3 {
        constructor() {
            this.SCREEN_WIDTH = window.innerWidth;
            this.SCREEN_HEIGHT = window.innerHeight;
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
            let loader = new THREE.JSONLoader();
            loader.load("res/models/skinned/Samba Dancing.json", (geometry, materials) => {
                let mesh = new THREE.Mesh(geometry, materials);
                this.scene.add(mesh);
                console.log("done");
            }, null, (e) => { console.error(e); });
            this.stats = new Stats();
            this.stats.dom.style.position = 'absolute';
            this.stats.dom.style.top = '0px';
            this.container.appendChild(this.stats.dom);
            window.addEventListener('resize', this.onWindowResize.bind(this), false);
            this.update();
        }
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
        update() {
            requestAnimationFrame(this.update.bind(this));
            this.render();
            this.stats.update();
        }
        render() {
            let timer = Date.now() * 0.0001;
            this.camera.position.x = Math.cos(timer) * 800;
            this.camera.position.z = Math.sin(timer) * 800;
            this.camera.lookAt(this.scene.position);
            this.renderer.render(this.scene, this.camera);
        }
    }
    Game.Test3 = Test3;
})(Game || (Game = {}));
//# sourceMappingURL=game.js.map