import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ObjectMap, useLoader } from '@react-three/fiber';
import skateModel from '../../assets/models/skate.glb';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { colorState } from '../../store/slices/colorSlice';
import { Mesh, TextureLoader } from 'three';
import tex from '../../assets/textures/tex4.jpg';

const ROTATE_Y_90 = Math.PI * 0.5;

export const Skate = ({ deckColor }: colorState) => {
  const skate = useLoader(GLTFLoader, skateModel) as GLTF & ObjectMap;
  const model = useRef(skate.scene);

  const newColor = new THREE.MeshPhongMaterial({
    color: new THREE.Color(deckColor),
    shininess: 10,
  });

  const deck = skate.nodes['Rear_Truck_HP_bushing2_Wood_0'] as THREE.Mesh;
  const texture = useLoader(TextureLoader, tex);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);

  const newPrint = new THREE.MeshStandardMaterial({ map: texture });

  useEffect(() => {
    deck.material = newPrint;
  }, [texture]);
  // useEffect(() => {
  //   deck.material = newColor;
  // }, [deckColor]);

  return <primitive ref={model} object={skate.scene} scale={[1, 1, 1]} rotation={[0, -ROTATE_Y_90, 0]} />;
};
