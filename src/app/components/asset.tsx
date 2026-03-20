"use client";
import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, OrthographicCamera, Html } from '@react-three/drei'
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

export function Model(props: any) {
  const groupRef = useRef<any>(null);
  const { nodes, materials } = useGLTF('/macbook_pro_copy.gltf') as any;

  // Entrance animation state
  const [entrance, setEntrance] = useState(false);
  // Phase 2 reveal state
  useEffect(() => {
    if (props.onPhase2) {
      const t = setTimeout(() => props.onPhase2(), 1000);
      return () => clearTimeout(t);
    }
  }, [props.onPhase2]);

  // Signal when model is loaded
  useEffect(() => {
    if (props.onReady) props.onReady();
    setTimeout(() => setEntrance(true), 10); // trigger entrance after mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scrub state
  const [scrubAngle, setScrubAngle] = useState(Math.PI);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  // Mouse/touch event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
  };
  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastX.current;
    lastX.current = e.clientX;
    setScrubAngle((prev) => prev + deltaX * 0.01);
  };
  const handlePointerUp = () => {
    isDragging.current = false;
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('pointermove', handlePointerMove);
  };

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrubAngle;
    }
  });

  // Animated style for entrance
  const style = {
    transition: 'transform 1s cubic-bezier(0.16,1,0.3,1), filter 1s cubic-bezier(0.16,1,0.3,1), opacity 1s cubic-bezier(0.16,1,0.3,1)',
    transform: entrance ? 'scale(1)' : 'scale(0.9)',
    filter: entrance ? 'blur(0)' : 'blur(5px)',
    opacity: entrance ? 1 : 0,
    willChange: 'transform, filter, opacity',
  };

  return (
    <group {...props} dispose={null}>
      <group scale={0.003}>
        <group
          ref={groupRef}
          position={[0, 0, 0]}
          rotation={[0, scrubAngle, 0]}
          scale={0.225}
          onPointerDown={handlePointerDown}
        >
          {/* Removed the Html overlay that was covering the model */}
          <group position={[-1.273, -436.608, -17.856]} scale={[1, 1, 1.002]}>
            <group position={[-6.964, 478.108, 16.318]} scale={[1.957, 1.957, 1089621.131]}>
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={(nodes.logo_apple_1 as Mesh).geometry}
                position={[-22.723, 24.789, 0]}
                scale={[0.094, 0.094, 0]}
              >
                <meshStandardMaterial color="#b0b0ff" metalness={1} roughness={0.1} />
              </mesh>
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={(nodes.logo_apple_2 as Mesh).geometry}
                position={[0.139, 47.161, 0]}
                scale={[0.094, 0.094, 0]}
              >
                <meshStandardMaterial color="#b0b0ff" metalness={1} roughness={0.1} />
              </mesh>
            </group>
            <mesh
              castShadow={false}
              receiveShadow={false}
              geometry={(nodes.connector as Mesh).geometry}
              material={(nodes.connector as Mesh).material}
              position={[1.273, -20.522, -5.615]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={2.069}
            />
            {/* Screen */}
            <mesh
              castShadow={false}
              receiveShadow={false}
              geometry={(nodes.screen_1 as Mesh).geometry}
              position={[669.198, 44.158, 0.656]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={[0.899, 0.9, 0.9]}
            >
              <meshStandardMaterial color="#000" metalness={0.2} roughness={0.2} />
              {/* Overlay a working screen UI */}
              <Html
                center
                transform
                style={{ width: '300px', height: '180px', pointerEvents: 'none' }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(180deg, #eaeaea 60%, #d0d0d0 100%)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px #0002',
                  overflow: 'hidden',
                  fontFamily: 'sans-serif',
                  fontSize: '14px',
                  color: '#222'
                }}>
                  <div style={{
                    background: '#f5f5f5',
                    padding: '6px 12px',
                    borderBottom: '1px solid #ccc',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{ width: 8, height: 8, background: '#ff5f56', borderRadius: '50%', display: 'inline-block', marginRight: 4 }}></span>
                    <span style={{ width: 8, height: 8, background: '#ffbd2e', borderRadius: '50%', display: 'inline-block', marginRight: 4 }}></span>
                    <span style={{ width: 8, height: 8, background: '#27c93f', borderRadius: '50%', display: 'inline-block', marginRight: 8 }}></span>
                    <span style={{ flex: 1, color: '#888', fontSize: 12 }}>https://workspace.local</span>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ margin: 0, fontSize: 18, color: '#222' }}>Welcome!</h3>
                    <p style={{ margin: '8px 0 0 0', color: '#444' }}>This is your working laptop screen.</p>
                    <ul style={{ margin: '12px 0 0 0', padding: 0, listStyle: 'none', color: '#333' }}>
                      <li>• Code Editor</li>
                      <li>• Browser</li>
                      <li>• Terminal</li>
                    </ul>
                  </div>
                </div>
              </Html>
            </mesh>
            <mesh
              castShadow={false}
              receiveShadow={false}
              geometry={(nodes.green_light as Mesh).geometry}
              material={(nodes.green_light as Mesh).material}
              position={[-25.412, 906.024, 0.612]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={[0.818, 0.81, 0.922]}
            />
            <mesh
              castShadow={false}
              receiveShadow={false}
              geometry={(nodes.black_border_notch_screen as Mesh).geometry}
              material={(nodes.black_border_notch_screen as Mesh).material}
              position={[691.334, 915.76, 0.966]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.902, 0.902, 1.004]}
            />
            <mesh
              castShadow={false}
              receiveShadow={false}
              geometry={(nodes.grey_border_creen as Mesh).geometry}
              material={(nodes.grey_border_creen as Mesh).material}
              position={[0.451, 448.36, 9.162]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={[0.902, 0.902, 1.004]}
            />
            <mesh
              castShadow={false}
              receiveShadow={false}
              geometry={(nodes.Rectangle_1 as Mesh).geometry}
              material={(nodes.Rectangle_1 as Mesh).material}
              position={[0, 448.36, 15.068]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={[0.902, 0.902, 1.004]}
            />
            <mesh
              castShadow={false}
              receiveShadow={false}
              geometry={(nodes.metalic_screen as Mesh).geometry}
              material={(nodes.metalic_screen as Mesh).material}
              position={[0, 448.36, 10.166]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={[0.902, 0.902, 1.004]}
            />
            <mesh
              castShadow={false}
              receiveShadow={false}
              geometry={(nodes.camera as Mesh).geometry}
              material={(nodes.camera as Mesh).material}
              position={[-3.459, 906.024, 0.612]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={[0.818, 0.81, 0.922]}
            />
            <mesh
              castShadow={false}
              receiveShadow={false}
              geometry={(nodes.border_black_camera as Mesh).geometry}
              material={(nodes.border_black_camera as Mesh).material}
              position={[-3.459, 906.024, 0.841]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={[0.818, 0.81, 0.922]}
            />
          </group>
          <group position={[-56.341, -457.519, -546.112]}>
            {/* Case */}
            <mesh
              castShadow={false}
              receiveShadow={false}
              geometry={(nodes.Cube as Mesh).geometry}
              position={[56.341, 17.747, 516.407]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={[2.069, 2.069, 2.074]}
            >
              <meshStandardMaterial color="#cccccc" metalness={0.5} roughness={0.2} />
            </mesh>
            {/* Case (base) */}
            <group position={[5.418, -7.126, -0.405]} rotation={[-Math.PI, 0, -Math.PI]}>
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={(nodes.base_2 as Mesh).geometry}
                position={[10.976, 13.354, 134.945]}
              >
                <meshStandardMaterial color="#cccccc" metalness={0.7} roughness={0.3} />
              </mesh>
            </group>
            {/* Case (side panels) */}
            <group position={[1.277, 32.071, 180.03]} rotation={[-Math.PI, 0, -Math.PI]}>
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={(nodes.Rectangle_2 as Mesh).geometry}
                position={[585.274, 0.305, -16.442]}
                rotation={[-Math.PI / 2, 0, -Math.PI]}
              >
                <meshStandardMaterial color="#cccccc" metalness={0.7} roughness={0.3} />
              </mesh>
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={(nodes.Rectangle_2 as Mesh).geometry}
                position={[-697.577, 0.305, -16.442]}
                rotation={[-Math.PI / 2, 0, -Math.PI]}
              >
                <meshStandardMaterial color="#cccccc" metalness={0.7} roughness={0.3} />
              </mesh>
            </group>
            <group position={[51.909, -18.233, -11.947]} rotation={[-Math.PI, 0, -Math.PI]}>
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={(nodes.Subdiv_3 as Mesh).geometry}
                material={(nodes.Subdiv_3 as Mesh).material}
                position={[466.778, 3.425, -412.464]}
                rotation={[0, 0, -Math.PI]}
                scale={[-1.092, 1.146, 1.127]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={(nodes.Subdiv_3_1 as Mesh).geometry}
                material={(nodes.Subdiv_3_1 as Mesh).material}
                position={[466.778, -2.641, -412.464]}
                rotation={[0, 0, -Math.PI]}
                scale={[-1, 1.05, 1.033]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={(nodes.Subdiv_3_2 as Mesh).geometry}
                material={(nodes.Subdiv_3_2 as Mesh).material}
                position={[-466.778, 3.425, -412.464]}
                rotation={[0, 0, -Math.PI]}
                scale={[-1.092, 1.146, 1.127]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={(nodes.Subdiv_3_3 as Mesh).geometry}
                material={(nodes.Subdiv_3_3 as Mesh).material}
                position={[-463.996, -3.761, -412.392]}
                rotation={[0, 0, -Math.PI]}
                scale={[-1, 1.05, 1.033]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={(nodes.Subdiv_2 as Mesh).geometry}
                material={(nodes.Subdiv_2 as Mesh).material}
                position={[466.778, 3.425, 326.825]}
                rotation={[0, 0, -Math.PI]}
                scale={[-1.092, 1.146, 1.127]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={(nodes.Subdiv_2_1 as Mesh).geometry}
                material={(nodes.Subdiv_2_1 as Mesh).material}
                position={[466.778, -2.641, 326.825]}
                rotation={[0, 0, -Math.PI]}
                scale={[-1, 1.05, 1.033]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={(nodes.Subdiv as Mesh).geometry}
                material={(nodes.Subdiv as Mesh).material}
                position={[-466.778, 3.425, 326.825]}
                rotation={[0, 0, -Math.PI]}
                scale={[-1.092, 1.146, 1.127]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={(nodes.Cylinder as Mesh).geometry}
                material={(nodes.Cylinder as Mesh).material}
                position={[-466.778, -2.641, 326.825]}
                rotation={[0, 0, -Math.PI]}
                scale={[-1, 1.05, 1.033]}
              />
            </group>
            <group position={[57.789, 37.671, 198.94]} rotation={[-Math.PI, 0, -Math.PI]}>
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={(nodes.Torus as Mesh).geometry}
                material={(nodes.Torus as Mesh).material}
                position={[542.483, -3.08, -197.924]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1.167}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.keybord_lign.geometry}
                material={nodes.keybord_lign.material}
                position={[306.674, -9.042, 198.694]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.keybord_lign_1.geometry}
                material={nodes.keybord_lign_1.material}
                position={[-550.659, -9.042, 198.694]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.keybord_lign_2.geometry}
                material={nodes.keybord_lign_2.material}
                position={[-364.399, -9.042, 120.028]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.keybord_lign_3.geometry}
                material={nodes.keybord_lign_3.material}
                position={[-405.798, -9.042, 40.694]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.keybord_lign_4.geometry}
                material={nodes.keybord_lign_4.material}
                position={[-429.326, -9.042, -40.639]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_6.geometry}
                material={nodes.Rectangle_6.material}
                position={[-39.254, -9.042, 198.255]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_7.geometry}
                material={nodes.Rectangle_7.material}
                position={[214.76, -9.042, 198.255]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_5.geometry}
                material={nodes.Rectangle_5.material}
                position={[-293.933, -9.042, 198.255]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_14.geometry}
                material={nodes.Rectangle_14.material}
                position={[466.157, -8.966, 180.772]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[1, 1, 2.667]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_13.geometry}
                material={nodes.Rectangle_13.material}
                position={[466.157, -8.966, 215.498]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[1, 1, 2.667]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_12.geometry}
                material={nodes.Rectangle_12.material}
                position={[548.766, -8.966, 215.498]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[1, 1, 2.667]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_11.geometry}
                material={nodes.Rectangle_11.material}
                position={[386.568, -8.966, 215.498]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[1, 1, 2.667]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_8.geometry}
                material={nodes.Rectangle_8.material}
                position={[494.676, -9.042, 120.419]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_4.geometry}
                material={nodes.Rectangle_4.material}
                position={[-499.797, -9.042, 120.419]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_9.geometry}
                material={nodes.Rectangle_9.material}
                position={[513.917, -9.042, 40.905]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_3.geometry}
                material={nodes.Rectangle_3.material}
                position={[-519.297, -9.042, 40.905]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_10.geometry}
                material={nodes.Rectangle_10.material}
                position={[523.26, -9.042, -119.429]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_2_1.geometry}
                material={nodes.Rectangle_2_1.material}
                position={[-530.797, -9.042, -40.801]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_3.geometry}
                material={nodes.Rectangle_3.material}
                position={[-529.297, -9.042, -196.639]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.keybord_lign_5.geometry}
                material={nodes.keybord_lign_5.material}
                position={[-429.326, -9.042, -196.639]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.keybord_lign_6.geometry}
                material={nodes.keybord_lign_6.material}
                position={[-549.326, -9.042, -118.989]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              {/* Keyboard */}
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.keyboard_1.geometry}
                position={[0, -7.703, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[1, 1, 2.159]}
              >
                <meshStandardMaterial color="#cccccc" metalness={0.2} roughness={0.7} />
              </mesh>
              <group position={[-550.659, -9.042, 198.694]} rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_26_instance_1.geometry}
                  material={nodes.mesh_26_instance_1.material}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_26_instance_2.geometry}
                  material={nodes.mesh_26_instance_2.material}
                  position={[81, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_26_instance_3.geometry}
                  material={nodes.mesh_26_instance_3.material}
                  position={[162, 0, 0]}
                />
              </group>
              <group position={[-364.399, -9.042, 120.028]} rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_27_instance_1.geometry}
                  material={nodes.mesh_27_instance_1.material}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_27_instance_2.geometry}
                  material={nodes.mesh_27_instance_2.material}
                  position={[81, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_27_instance_3.geometry}
                  material={nodes.mesh_27_instance_3.material}
                  position={[162, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_27_instance_4.geometry}
                  material={nodes.mesh_27_instance_4.material}
                  position={[243, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_27_instance_5.geometry}
                  material={nodes.mesh_27_instance_5.material}
                  position={[324, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_27_instance_6.geometry}
                  material={nodes.mesh_27_instance_6.material}
                  position={[405, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_27_instance_7.geometry}
                  material={nodes.mesh_27_instance_7.material}
                  position={[486, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_27_instance_8.geometry}
                  material={nodes.mesh_27_instance_8.material}
                  position={[567, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_27_instance_9.geometry}
                  material={nodes.mesh_27_instance_9.material}
                  position={[648, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_27_instance_10.geometry}
                  material={nodes.mesh_27_instance_10.material}
                  position={[729, 0, 0]}
                />
              </group>
              <group position={[-405.798, -9.042, 40.694]} rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_28_instance_1.geometry}
                  material={nodes.mesh_28_instance_1.material}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_28_instance_2.geometry}
                  material={nodes.mesh_28_instance_2.material}
                  position={[81, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_28_instance_3.geometry}
                  material={nodes.mesh_28_instance_3.material}
                  position={[162, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_28_instance_4.geometry}
                  material={nodes.mesh_28_instance_4.material}
                  position={[243, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_28_instance_5.geometry}
                  material={nodes.mesh_28_instance_5.material}
                  position={[324, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_28_instance_6.geometry}
                  material={nodes.mesh_28_instance_6.material}
                  position={[405, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_28_instance_7.geometry}
                  material={nodes.mesh_28_instance_7.material}
                  position={[486, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_28_instance_8.geometry}
                  material={nodes.mesh_28_instance_8.material}
                  position={[567, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_28_instance_9.geometry}
                  material={nodes.mesh_28_instance_9.material}
                  position={[648, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_28_instance_10.geometry}
                  material={nodes.mesh_28_instance_10.material}
                  position={[729, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_28_instance_11.geometry}
                  material={nodes.mesh_28_instance_11.material}
                  position={[810, 0, 0]}
                />
              </group>
              <group position={[-429.326, -9.042, -40.639]} rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_29_instance_1.geometry}
                  material={nodes.mesh_29_instance_1.material}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_29_instance_2.geometry}
                  material={nodes.mesh_29_instance_2.material}
                  position={[81, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_29_instance_3.geometry}
                  material={nodes.mesh_29_instance_3.material}
                  position={[162, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_29_instance_4.geometry}
                  material={nodes.mesh_29_instance_4.material}
                  position={[243, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_29_instance_5.geometry}
                  material={nodes.mesh_29_instance_5.material}
                  position={[324, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_29_instance_6.geometry}
                  material={nodes.mesh_29_instance_6.material}
                  position={[405, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_29_instance_7.geometry}
                  material={nodes.mesh_29_instance_7.material}
                  position={[486, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_29_instance_8.geometry}
                  material={nodes.mesh_29_instance_8.material}
                  position={[567, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_29_instance_9.geometry}
                  material={nodes.mesh_29_instance_9.material}
                  position={[648, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_29_instance_10.geometry}
                  material={nodes.mesh_29_instance_10.material}
                  position={[729, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_29_instance_11.geometry}
                  material={nodes.mesh_29_instance_11.material}
                  position={[810, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_29_instance_12.geometry}
                  material={nodes.mesh_29_instance_12.material}
                  position={[891, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_29_instance_13.geometry}
                  material={nodes.mesh_29_instance_13.material}
                  position={[972, 0, 0]}
                />
              </group>
              <group position={[-429.326, -9.042, -196.639]} rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_44_instance_1.geometry}
                  material={nodes.mesh_44_instance_1.material}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_44_instance_2.geometry}
                  material={nodes.mesh_44_instance_2.material}
                  position={[81, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_44_instance_3.geometry}
                  material={nodes.mesh_44_instance_3.material}
                  position={[162, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_44_instance_4.geometry}
                  material={nodes.mesh_44_instance_4.material}
                  position={[243, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_44_instance_5.geometry}
                  material={nodes.mesh_44_instance_5.material}
                  position={[324, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_44_instance_6.geometry}
                  material={nodes.mesh_44_instance_6.material}
                  position={[405, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_44_instance_7.geometry}
                  material={nodes.mesh_44_instance_7.material}
                  position={[486, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_44_instance_8.geometry}
                  material={nodes.mesh_44_instance_8.material}
                  position={[567, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_44_instance_9.geometry}
                  material={nodes.mesh_44_instance_9.material}
                  position={[648, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_44_instance_10.geometry}
                  material={nodes.mesh_44_instance_10.material}
                  position={[729, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_44_instance_11.geometry}
                  material={nodes.mesh_44_instance_11.material}
                  position={[810, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_44_instance_12.geometry}
                  material={nodes.mesh_44_instance_12.material}
                  position={[891, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_44_instance_13.geometry}
                  material={nodes.mesh_44_instance_13.material}
                  position={[972, 0, 0]}
                />
              </group>
              <group position={[-549.326, -9.042, -118.989]} rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_45_instance_1.geometry}
                  material={nodes.mesh_45_instance_1.material}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_45_instance_2.geometry}
                  material={nodes.mesh_45_instance_2.material}
                  position={[81, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_45_instance_3.geometry}
                  material={nodes.mesh_45_instance_3.material}
                  position={[162, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_45_instance_4.geometry}
                  material={nodes.mesh_45_instance_4.material}
                  position={[243, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_45_instance_5.geometry}
                  material={nodes.mesh_45_instance_5.material}
                  position={[324, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_45_instance_6.geometry}
                  material={nodes.mesh_45_instance_6.material}
                  position={[405, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_45_instance_7.geometry}
                  material={nodes.mesh_45_instance_7.material}
                  position={[486, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_45_instance_8.geometry}
                  material={nodes.mesh_45_instance_8.material}
                  position={[567, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_45_instance_9.geometry}
                  material={nodes.mesh_45_instance_9.material}
                  position={[648, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_45_instance_10.geometry}
                  material={nodes.mesh_45_instance_10.material}
                  position={[729, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_45_instance_11.geometry}
                  material={nodes.mesh_45_instance_11.material}
                  position={[810, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_45_instance_12.geometry}
                  material={nodes.mesh_45_instance_12.material}
                  position={[891, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_45_instance_13.geometry}
                  material={nodes.mesh_45_instance_13.material}
                  position={[972, 0, 0]}
                />
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_25_instance_1.geometry}
                material={nodes.mesh_25_instance_1.material}
                position={[306.674, -9.042, 198.694]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
            </group>
            <group position={[-4.129, 34.514, -284.996]} rotation={[-Math.PI, 0, -Math.PI]}>
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.trackpad_top.geometry}
                material={nodes.trackpad_top.material}
                position={[-61.189, -1.672, -41.264]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[0.834, 0.835, 5]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.trackpad_border.geometry}
                material={nodes.trackpad_border.material}
                position={[-61.189, -2.481, -41.264]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[0.834, 0.835, 5]}
              />
            </group>
            <group position={[-633.046, 12.571, 270.937]} rotation={[-Math.PI, 0, -Math.PI]}>
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_9_1.geometry}
                material={nodes.Rectangle_9_1.material}
                position={[-2.047, -20.268, 425.433]}
                rotation={[Math.PI / 2, 1.276, -Math.PI / 2]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_10_1.geometry}
                material={nodes.Rectangle_10_1.material}
                position={[0, 0, -105.067]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_9_2.geometry}
                material={nodes.Rectangle_9_2.material}
                position={[0, 2.5, -26.067]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_8_1.geometry}
                material={nodes.Rectangle_8_1.material}
                position={[0, 2.945, 79.567]}
                rotation={[0, Math.PI / 2, 0]}
              />
            </group>
            <group position={[745.729, 14.036, 293.612]}>
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_8_2.geometry}
                material={nodes.Rectangle_8_2.material}
                position={[-1.384, -18.907, -448.108]}
                rotation={[Math.PI / 2, 1.231, -Math.PI / 2]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_3_1.geometry}
                material={nodes.Rectangle_3_1.material}
                position={[0.772, 1.08, 83.997]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Ellipse.geometry}
                material={nodes.Ellipse.material}
                position={[0.485, -0.08, -113.497]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_6_1.geometry}
                material={nodes.Rectangle_6_1.material}
                position={[0.485, 0.575, -58.939]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_5_1.geometry}
                material={nodes.Rectangle_5_1.material}
                position={[0.485, 0.575, 5.16]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Rectangle_4_1.geometry}
                material={nodes.Rectangle_4_1.material}
                position={[0.485, 1.08, 83.997]}
                rotation={[0, Math.PI / 2, 0]}
              />
            </group>
          </group>
        </group>
        <OrthographicCamera
          makeDefault={false}
          far={50000}
          near={0}
          position={[40.958, 1.219, 1000]}>
          <directionalLight intensity={0.6} rotation={[-0.7, 0.648, 0.949]} />
        </OrthographicCamera>
        <OrthographicCamera
          makeDefault={false}
          far={100000}
          near={0}
          position={[40.958, 1.219, 1000]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/macbook_pro_copy.gltf')