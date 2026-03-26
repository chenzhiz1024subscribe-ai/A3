import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { T3DModel } from "../types";

function addGround(scene: THREE.Scene, FLOOR: number, imgPath: string) {
    const gt = new THREE.TextureLoader().load(imgPath);
    const gg = new THREE.PlaneGeometry(20, 20);
    const gm = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: gt,
    });

    const ground = new THREE.Mesh(gg, gm);
    ground.rotation.x = -Math.PI / 2;

    if (ground.material.map) {
        ground.material.map.repeat.set(2, 2);
        ground.material.map.wrapS = THREE.RepeatWrapping;
        ground.material.map.wrapT = THREE.RepeatWrapping;
        ground.material.map.colorSpace = THREE.SRGBColorSpace;
    }

    ground.receiveShadow = true;
    ground.position.set(0, FLOOR, 0);
    ground.scale.set(100, 100, 100);

    scene.add(ground);
}

function onWindowResize(
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    w: number,
    h: number
) {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}

function addMorph(
    scene: THREE.Scene,
    mixer: THREE.AnimationMixer,
    morphs: THREE.Object3D[],
    mesh: THREE.Object3D,
    clip: THREE.AnimationClip,
    speed: number,
    duration: number,
    x: number,
    y: number,
    z: number,
    scale: number
) {
    const cloned = mesh.clone();

    // store custom speed so animate() can use it later
    (cloned as any).speed = speed;

    cloned.scale.set(scale, scale, scale);
    cloned.position.set(x, y, z);
    cloned.rotation.y = Math.PI / 2;
    cloned.castShadow = true;

    if (clip) {
        mixer
            .clipAction(clip, cloned)
            .setDuration(duration)
            .startAt(-duration * Math.random())
            .play();
    }

    scene.add(cloned);
    morphs.push(cloned);
}

function loadModels(
    models: T3DModel[],
    scene: THREE.Scene,
    mixer: THREE.AnimationMixer | null,
    morphs: THREE.Object3D[]
) {
    const gltfLoader = new GLTFLoader();

    const localMixer = new THREE.AnimationMixer(scene);

    models.forEach((model) => {
        gltfLoader.load(model.path, (gltf) => {
            const mesh = gltf.scene.children[0];
            const clip = gltf.animations[0];

            if (!mesh) return;

            addMorph(
                scene,
                localMixer,
                morphs,
                mesh,
                clip,
                model.speed,
                model.duration,
                model.x,
                model.y,
                model.z,
                model.scale
            );
        });
    });

    return localMixer;
}

export { addGround, onWindowResize, addMorph, loadModels };