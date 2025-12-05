import React, { JSX, useState, useEffect, useRef } from "react";
import { styled, css, keyframes } from "styled-components";
import RainEffects from "../components/RainEffects";

//style 정의

const RowWrap = styled.div`
   height: 100vh;
   background-color: #fff;
   width: 100vw;
   z-index: 1000;
   position: absolute;
`;

const SparkleWrapper = styled.div`
  position: fixed;
  pointer-events: none;
  inset: 0;
  z-index: 9999; // 최상단
`;

function Test(): JSX.Element {
   const effectAreaRef = useRef<HTMLDivElement>(null);

   return (
      <>
         <RowWrap>
            <SparkleWrapper> <RainEffects /></SparkleWrapper>
           

            <div>하이</div>
            <div>하이</div>
            <div>하이</div>
            <div>하이</div>
         </RowWrap>
      </>
   );
}

export default Test;
