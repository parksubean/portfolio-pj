import {
   Intro,
   Landing,
   Stack,
   SideProject,
   Test,
   LastPage,
} from "../sections";
import { Background } from "../components";
import { styled } from "styled-components";
import React, { useRef, useState, useEffect } from "react";

const ScrollWrap = styled.div`
   position: relative;
   width: 100%;
   height: 100vh;
   transition: top 0.5s ease-in-out;
`;

function PortfolioPack() {
   const [page, setPage] = useState(0);
   const sections = [
      <Intro key="Intro" />,
      <Stack key="Stack" />,
      <SideProject key="SideProject" />,
      <LastPage key="LastPage" />,
   ];

   const lastPage: number = sections.length - 1;

   useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
         e.preventDefault();

         setPage((prev) => {
            let next = prev;
            if (e.deltaY > 0) {
               next = Math.min(prev + 1, lastPage);
            } else if (e.deltaY < 0) {
               next = Math.max(prev - 1, 0);
            }
            return next;
         });
      };

      window.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
         window.removeEventListener("wheel", handleWheel);
      };
   }, [lastPage]);

   return (
      <>
         {/* <Landing /> */}
         <Background />
         <ScrollWrap style={{ top: `${page * -100}vh` }}>
            {/* <Landing />
            <Background />
            <Intro />
            <Stack />
            <SideProject />
            <LastPage /> */}
            {sections}
         </ScrollWrap>

         {/* <Test /> */}
      </>
   );
}

export default PortfolioPack;
