import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import SmoothScrollWrapper, { SmoothScrollHandle } from "./SmoothScroll";

const CircleItem = styled.div<{ scale: number }>`
   position: absolute;
   top: 50%;
   left: 50%;
   width: 100px;
   height: 100px;
   background-color: red; /* 테스트용 강한색 */
   border-radius: 50%;
   transform: translate(-50%, -50%)
      scale(${(props) => Math.max(props.scale, 0.1)});
   transform-origin: center;
   transition: transform 0.2s ease-out;
   z-index: 9999;
`;

type Props = {
   targetRef: React.RefObject<HTMLElement | null>;
   sideRef: React.RefObject<HTMLElement | null>;
   onAnimationEnd: () => void;
};

const AnimationItem = ({ targetRef, sideRef, onAnimationEnd }: Props) => {
   const [scaleStep, setScaleStep] = useState(0);
   const lastScrollY = useRef(window.scrollY);

   useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
         if (!targetRef.current) return;
         const rect = targetRef.current.getBoundingClientRect();
         const windowHeight = window.innerHeight;
         const isBottomNearViewport =
            rect.bottom <= windowHeight && rect.bottom > windowHeight - 200;

         if (!isBottomNearViewport) return;

         setScaleStep((prev) => {
            let next = prev; // 스크롤 1회당 커지는 정도

            if (e.deltaY > 0) {
               next = Math.min(prev + 1, 30);
            } else if (e.deltaY < 0) {
               next = Math.max(prev - 0.2, 0);
            }

            if (next >= 30) {
               document.body.style.overflow = "auto";
               onAnimationEnd();
               return 30;
            }

            console.log(next);
            return next;
         });
      };

      window.addEventListener("wheel", handleWheel, { passive: true });
      return () => window.removeEventListener("wheel", handleWheel);
   }, [targetRef, onAnimationEnd]);

   useEffect(() => {
      const handleScroll = () => {
         if (!targetRef.current || !sideRef.current) return;

         const stackRect = targetRef.current.getBoundingClientRect();
         const sideRect = sideRef.current.getBoundingClientRect();
         const windowHeight = window.innerHeight;

         const scrollY = window.scrollY;
         const scrollingUp = scrollY < lastScrollY.current;
         lastScrollY.current = scrollY;

         const isBackToStack =
            scrollingUp && sideRect.top > 0 && sideRect.top < windowHeight;

         if (isBackToStack && stackRect.top < windowHeight && scaleStep > 0) {
            setScaleStep((prev) => Math.max(prev - 1, 0));
         }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
   }, [scaleStep, targetRef, sideRef]);

   return <CircleItem scale={scaleStep} />;
};

export default AnimationItem;
