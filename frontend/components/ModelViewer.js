// components/ModelViewer.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import PropTypes from 'prop-types';

const ModelViewer = ({ modelPath, texturePath }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Constants
    const BACKGROUND_COLOR = 0xf0f0f0;
    const CAMERA_POSITION_Z = 5;
    const LIGHT_INTENSITY = {
      ambient: 0.5,
      directional: 0.8
    };

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BACKGROUND_COLOR);

    // Helpers
    const helpers = {
      axes: new THREE.AxesHelper(5),
      grid: new THREE.GridHelper(10, 10)
    };
    scene.add(helpers.axes);
    scene.add(helpers.grid);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = CAMERA_POSITION_Z;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const lights = {
      ambient: new THREE.AmbientLight(0xffffff, LIGHT_INTENSITY.ambient),
      directional: new THREE.DirectionalLight(0xffffff, LIGHT_INTENSITY.directional)
    };
    lights.directional.position.set(1, 1, 1);
    scene.add(lights.ambient);
    scene.add(lights.directional);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Model loading
    const loadModel = () => {
      const objLoader = new OBJLoader();
      const textureLoader = new THREE.TextureLoader();

      objLoader.load(
        modelPath,
        (obj) => {
          textureLoader.load(
            texturePath,
            (texture) => {
              applyMaterialToModel(obj, texture);
              centerAndScaleModel(obj);
              scene.add(obj);
              adjustCameraToModel(obj, camera, controls);
            },
            undefined,
            (error) => console.error('Texture loading error:', error)
          );
        },
        (xhr) => console.log(`Model loading: ${(xhr.loaded / xhr.total) * 100}%`),
        (error) => console.error('Model loading error:', error)
      );
    };

    const applyMaterialToModel = (obj, texture) => {
      obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.7,
            metalness: 0.0,
          });
        }
      });
    };

    const centerAndScaleModel = (obj) => {
      const box = new THREE.Box3().setFromObject(obj);
      const center = box.getCenter(new THREE.Vector3());
      obj.position.sub(center);
    };

    const adjustCameraToModel = (obj, camera, controls) => {
      const box = new THREE.Box3().setFromObject(obj);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      camera.position.z = maxDim * 2;
      controls.update();
    };

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    // Event handlers
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };

    // Initial setup
    loadModel();
    animate();
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [modelPath, texturePath]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

ModelViewer.propTypes = {
  modelPath: PropTypes.string.isRequired,
  texturePath: PropTypes.string.isRequired
};

export default ModelViewer;