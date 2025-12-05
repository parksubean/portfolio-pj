import React, { JSX, useEffect } from "react";
import { styled } from "styled-components";

// 스타일 정의

const LandingBack = styled.section`
   height: 100vh;
   background-color: #7cc6ff;
   background-image: url("images/pixcelImg.png");
   background-repeat: no-repeat;
   background-position: 36%;
   position: absolute;
   width: 100%;
   clip-path: circle(75%);
   transition: clip-path 1s ease-in-out;
   &.shrink {
      animation: circleShrink 1s forwards;
   }
   @keyframes circleShrink {
      from {
         clip-path: circle(75%);
      }
      to {
         clip-path: circle(0%);
      }
   }
   z-index: 1;
`;

const Container = styled.div`
   position: absolute;
   margin: 0 auto;
   width: 99vw;
   height: 150px;
   top: 48%;
   bottom: 0;
   filter: url(#threshold) blur(0.6px);
   transform: translate(0, -50%);
`;

const Text = styled.span`
   @font-face {
      font-family: "Tenada";
      src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2")
         format("woff2");
      font-weight: normal;
      font-style: normal;
   }
   color: #030832;
   position: absolute;
   width: 100%;
   display: inline-block;
   font-family: "Tenada", sans-serif;
   font-size: 150px;
   text-align: center;
   user-select: none;
`;

const SvgFilter = () => (
   <svg id="filters">
      <defs>
         <filter id="threshold">
            <feColorMatrix
               in="SourceGraphic"
               type="matrix"
               values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
            />
         </filter>
      </defs>
   </svg>
);

// 컴포넌트 정의
const Landing: React.FC = () => {
   useEffect(() => {
      document.body.style.overflow = "hidden";

      const text1 = document.getElementById("text1") as HTMLElement;
      const text2 = document.getElementById("text2") as HTMLElement;

      const texts = ["PIXCEL", "DON'T", "LIE"];
      const morphTime = 1;
      const cooldownTime = 0.10;

      let textIndex = texts.length - 1;
      let time = new Date();
      let morph = 0;
      let cooldown = cooldownTime;
      let animationFrameId: number;

      const setMorph = (fraction: number) => {
         text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
         text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

         fraction = 1 - fraction;
         text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
         text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

         text1.textContent = texts[textIndex % texts.length];
         text2.textContent = texts[(textIndex + 1) % texts.length];
      };

      const doMorph = () => {
         morph -= cooldown;
         cooldown = 0;

         let fraction = morph / morphTime;

         if (fraction > 1) {
            cooldown = cooldownTime;
            fraction = 1;
         }

         setMorph(fraction);
      };

      const doCooldown = () => {
         morph = 0;
         text2.style.filter = "";
         text2.style.opacity = "100%";
         text1.style.filter = "";
         text1.style.opacity = "0%";
      };

      const animate = () => {
         animationFrameId = requestAnimationFrame(animate);

         const newTime = new Date();
         const shouldIncrementIndex = cooldown > 0;
         const dt = (newTime.getTime() - time.getTime()) / 1000;
         time = newTime;

         cooldown -= dt;

         if (cooldown <= 0) {
            if (textIndex < texts.length + 2) {
               if (shouldIncrementIndex) {
                  textIndex++;
               }
               doMorph();
            } else {
               cancelAnimationFrame(animationFrameId);

               setTimeout(() => {
                  const landingBack = document.getElementById("landing-back");
                  if (landingBack) {
                     landingBack.classList.add("shrink");
                     document.body.style.overflow = "auto";
                  }
               }, 500);

               return;
            }
         } else {
            doCooldown();
         }
      };

      text1.textContent = texts[textIndex % texts.length];
      text2.textContent = texts[(textIndex + 1) % texts.length];

      animate();
   }, []);

   return (
      <>
         <LandingBack id="landing-back">
            <Container>
               <Text id="text1" />
               <Text id="text2" />
            </Container>
            <SvgFilter />
         </LandingBack>
      </>
   );
};

export default Landing;
