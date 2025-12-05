import React, { JSX } from "react";
import { styled } from "styled-components";
import ParticlesBackground from "../components/StarParticles";

const Section_wrap = styled.section`
   width: 100vw;
   margin: 0 auto;
   background: linear-gradient(
         to top,
         rgba(124, 198, 255, 0.4) 0%,
         rgba(124, 198, 255, 0.27) 10%,
         rgba(124, 198, 255, 0.11) 30%,
         rgba(0, 0, 0, 0.03) 50%,
         rgba(12, 11, 12, 0) 80%
      ),
      #000;
   height: 100vh;
   position: fixed;
`;

function Background(): JSX.Element {
   return (
      <Section_wrap>
         <ParticlesBackground />
      </Section_wrap>
   );
}

export default Background;
