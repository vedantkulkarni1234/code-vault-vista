
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PasswordSphere = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;

    // Set up scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // transparent background
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    
    // Create sphere geometry
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    
    // Create points material
    const material = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x9b87f5,
      transparent: true,
      opacity: 0.8
    });
    
    // Create points mesh
    const sphere = new THREE.Points(geometry, material);
    scene.add(sphere);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Add point light
    const pointLight = new THREE.PointLight(0x0ea5e9, 2, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);
    
    // Add wireframe sphere
    const wireGeometry = new THREE.SphereGeometry(2.1, 16, 16);
    const wireMaterial = new THREE.LineBasicMaterial({ 
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.3,
    });
    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(wireGeometry),
      wireMaterial
    );
    scene.add(wireframe);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      sphere.rotation.x += 0.002;
      sphere.rotation.y += 0.002;
      
      wireframe.rotation.x -= 0.001;
      wireframe.rotation.y -= 0.001;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      className="w-full h-full min-h-[300px] sm:min-h-[400px]" 
    />
  );
};

export default PasswordSphere;
