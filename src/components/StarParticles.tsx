import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

const ParticlesBackground: React.FC = () => {
   const particlesInit = async (engine: Engine) => {
      await loadFull(engine);
   };

   return (
      <Particles
         id="tsparticles"
         init={particlesInit}
         options={{
            fullScreen: { enable: true },
            background: { color: "#ffffff0" },
            particles: {
               number: { value: 100, density: { enable: true, area: 800 } },
               color: { value: "#527ea0" },
               shape: { type: "star" },
               opacity: { value: 0.9, random: true },
               size: { value: 2, random: true },
               move: {
                  enable: true,
                  speed: 0.5,
                  direction: "none",
                  random: true,
                  outModes: "out",
               },
            },
         }}
      />
   );
};

export default ParticlesBackground;
