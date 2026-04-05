import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three';

import vertexShader from '../shaders/vertex.glsl?raw';
import fragmentShader from '../shaders/fragment.glsl?raw';

export default function ShaderPlane({ mousePosition }) {
  const materialRef = useRef();

  const { size, gl } = useThree();
  
  useEffect(() => {
    if (!materialRef.current) return;
    const root = document.documentElement;
    const backgroundColor =getComputedStyle(root).getPropertyValue('--dash-dark-color');
    const [r,g,b] = hexToRGB(backgroundColor);
    uniforms.current.ambient_color.value.set(r, g, b);
    materialRef.current.uniforms.aspect_ratio.value = size.width / size.height;
  }, [size])

  const idealFPS = 50;
  const frames = useRef(0);
  const startTime = useRef(0);
  const minResolution = 0.25;
  const resolution = useRef(1);
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      
      if(startTime.current == 0)startTime.current = clock.elapsedTime;
      frames.current++;

      const delta = clock.elapsedTime - startTime.current;
      const FPS = frames.current / delta;
      
      if(FPS < idealFPS){
        resolution.current = Math.max(minResolution, resolution.current * 0.9);
        gl.setPixelRatio(resolution.current);
      }else if(FPS > idealFPS * 1.1){
        resolution.current = Math.min(1.0, resolution.current * 1.1);
        gl.setPixelRatio(resolution.current);
      }

      materialRef.current.uniforms.time.value = clock.elapsedTime;
      
      materialRef.current.uniforms.mouse.value.set(
        mousePosition.current.x,
        mousePosition.current.y
      );

      materialRef.current.uniforms.light_position.value.x += (mousePosition.current.x * 2.5 - materialRef.current.uniforms.light_position.value.x) * 0.025;
    }
  });

  const uniforms = useRef({
    time: { value: 0 },
    aspect_ratio: { value: 1 },
    camera_position: { value: new THREE.Vector3(0, 0.75, 0) },
    ambient_color: { value: new THREE.Vector3() },
    light_position: { value: new THREE.Vector3(0, 1, 2) },
    light_intensity: { value : 4 },
    light_ambient: { value: 0.3 },
    mouse: {value: new THREE.Vector2(0, 0) },
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={false}
      />
    </mesh>
  );
}

function hexToRGB(hex) {
  const val = parseInt(hex.slice(1), 16);
  return [
    ((val >> 16) & 255) / 255,
    ((val >> 8) & 255) / 255,
    (val & 255) / 255,
  ];
}