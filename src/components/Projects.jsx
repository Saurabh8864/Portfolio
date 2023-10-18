import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "ecom",
    // url: "https://r3f-wawatmos-final.vercel.app/",
    image: "projects/ecom.png",
    description: "Recreating the Atmos Awwwards website with React Three Fiber",
  },
  {
    title: "chair",
    // url: ,
    image: "projects/chair.png",
    description: "Learn how to bake a 3D model with Blender and use it in r3f",
  },
  {
    title: "todo list",
    // url: ,
    image: "projects/todo.png",
    description: "Learn how to bake a 3D model with Blender and use it in r3f",
  },
  
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[3.8, 2.3, 2.9]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={4}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.3}
        position={[-1, -0.5, 1.5]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={3}
        anchorX="left"
        anchorY="top"
        fontSize={0.15}
        position={[-1.5, -0.7, 2]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
   
    <group position-y={-viewport.height * 2.1 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 3, 0, -3.5]}
          animate={{
            x: -1 + (index - currentProject) * 8,
            y: currentProject === index ? 0.3 : -0.2,
            z: currentProject === index ? -3 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 4,
            rotateZ: currentProject === index ? 0 : 0.8 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
