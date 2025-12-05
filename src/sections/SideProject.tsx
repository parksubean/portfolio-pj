import React, { JSX, useState, useRef, useEffect } from "react";
import { styled, css, keyframes } from "styled-components";
import { motion, useMotionValue, useSpring } from "framer-motion";
import RainEffects from "../components/RainEffects";
import { Link } from "react-router-dom";

const SectionAllWrap = styled.section`
   width: 100%;
   height: 100vh;
   background-color: #fff;
   position: relative;
   z-index: 2;
   background: linear-gradient(
      to bottom,
      #f1f5fa 0%,
      #f1f5fa 60%,
      #afcee7 100%
   );
`;

const SectionWrap = styled.div`
   width: 1470px;
   margin: 0 auto;
   height: 100vh;
`;

const TitTxtWrap = styled.div`
   display: flex;
   flex-direction: column;
   line-height: 45px;
   padding-top: 120px;
`;
const SubTit = styled.span`
   font-size: 20px;
   font-weight: 500;
   color: #797979;
`;
const MainTit = styled.span`
   font-size: 60px;
   font-weight: 900;
   letter-spacing: -1px;
`;

const CloudWrap = styled.div`
   position: absolute;
   top: 35%;
   left: 15%;
   user-select: none;
`;

const PathWrap = styled.div`
   position: absolute;
   top: 20px;
   left: -75px;
   width: 500px;
   font-size: 12px;
   textPath {
      fill: #707070;
   }
`;

const RaingPoint = styled.div`
   height: 260px;
   overflow: hidden;
   position: relative;

   &::after {
      content: "";
      z-index: 9999;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 80px;
      pointer-events: none;
      background: linear-gradient(to bottom, #ff9a9e00 0%, #c4daed 100%);
   }
`;

const MainCttWrap = styled.div`
   height: 500px;
   position: absolute;
   left: 50%;
   top: 26%;
   display: flex;
   /* background-color: #ff0; */
   width: 50%;
   overflow: auto;
   scrollbar-width: none;
   -ms-overflow-style: none;
   &::-webkit-scrollbar {
      display: none;
   }
   user-select: none;
`;

const SecPoint = styled.div`
   position: relative;
   height: 380px;
   width: 640px;
   left: 50%;
   top: 4%;

   &::after {
      content: "";
      border-top: 1px solid #67b2ec;
      border-left: 1px solid #67b2ec;
      width: 100px;
      height: 100px;
      position: absolute;
      top: 0;
      left: 0;
   }
   &::before {
      content: "";
      border-bottom: 1px solid #67b2ec;
      border-right: 1px solid #67b2ec;
      width: 100px;
      height: 100px;
      position: absolute;
      bottom: -26px;
      right: -0%;
   }
`;

const CttCase = styled.div<{ falstItem: boolean }>`
   user-select: none;
   /* position: absolute; */
   width: 640px;
   height: 380px;
   flex-shrink: 0;
   display: flex;
   flex-direction: column;
   align-items: center;
   /* ${({ falstItem }) =>
      falstItem &&
      css`
         margin-left: 0px;
      `} */
`;
const CttTit = styled.span`
   width: 100%;
   text-align: right;
   font-size: 18px;
   font-weight: 500;
   color: #797979;
`;
const CttImg = styled.img`
   margin-top: 25px;
   user-select: none;
   height: 280px;
`;

const BlankBox = styled.div`
   width: 33%;
   flex-shrink: 0;
`;

const TotalTxt = styled.span`
   position: absolute;
   left: 50%;
   bottom: 25%;
   color: #515151;
   width: 640px;
   height: 30px;
   background-color: #ffffff52;
   border-radius: 10px;
   padding-left: 15px;
   display: flex;
   align-items: center;
`;

const TxtColorB = styled.span`
   color: #007bda;
   padding-left: 2px;
`;

const BottomAllWrap = styled.div`
   position: absolute;
   height: 40px;
   bottom: 20px;
   width: 1470px;
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

const EmailTxt = styled.span`
   color: #fff;
   font-size: 15px;
   display: flex;
   align-items: center;
`;

const ExpTxt = styled.span`
   color: #797979;
   font-size: 15px;
`;

const GoBtn = styled.button`
   width: 100px;
   height: 30px;
   margin-top: 15px;
   color: #515151;
   font-size: 14px;
   font-weight: 600;
   text-decoration: underline;
   text-decoration-color: #515151;
`;

const CttTxtGp = [
   {
      tit: "프로그램 관리자 홈페이지",
      img: "../../public/images/port_01.png",
      go: "/Admin",
   },
];

function SideProhect(): JSX.Element {
   const THUMB_WIDTH = 100;
   const SCROLL_EXPAND_RATIO = 1.2;
   const contentRef = useRef<HTMLDivElement>(null);
   const trackRef = useRef<HTMLDivElement>(null);
   const [thumbLeft, setThumbLeft] = useState(0);
   const [dragging, setDragging] = useState(false);
   const startX = useRef(0);
   const startScrollLeft = useRef(0);

   const containerRef = useRef<HTMLDivElement>(null);

   const [width, setWidth] = useState(0);

   // framer-motion MotionValue, Spring 설정
   const x = useMotionValue(0);
   const springX = useSpring(x, { stiffness: 100, damping: 20 });

   // 컨텐츠 너비 계산 (스크롤 가능한 최대값)
   useEffect(() => {
      if (contentRef.current && containerRef.current) {
         setWidth(
            contentRef.current.scrollWidth - containerRef.current.offsetWidth
         );
      }
   }, []);

   return (
      <>
         <SectionAllWrap>
            <SectionWrap>
               <TitTxtWrap>
                  <SubTit>개인 프로젝트</SubTit>
                  <MainTit>Side Project</MainTit>
               </TitTxtWrap>
               <CloudWrap>
                  <img src="../../public/images/cloud.png" alt="구름 이미지" />
                  <PathWrap>
                     <svg
                        viewBox="0 0 500 500"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           id="curve"
                           d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
                           style={{ display: "none" }}
                        />
                        <text>
                           <textPath
                              alignmentBaseline="baseline"
                              xlinkHref="#curve"
                           >
                              별비 내려요
                           </textPath>
                        </text>
                     </svg>
                  </PathWrap>
                  <RaingPoint>
                     <RainEffects width={500} height={260} />
                  </RaingPoint>
               </CloudWrap>
               <SecPoint />

               <div
                  ref={containerRef}
                  style={{ overflow: "hidden", width: "100%" }}
               >
                  <MainCttWrap>
                     <motion.div
                        ref={contentRef}
                        style={{ display: "flex", userSelect: "none" }}
                        drag="x"
                        dragConstraints={{ left: -width, right: 0 }}
                        dragElastic={0.2}
                        dragMomentum={true}
                        whileTap={{ cursor: "grabbing" }}
                     >
                        {CttTxtGp.map((item, index) => (
                           <CttCase key={index} falstItem={index === 0}>
                              <CttTit>{item.tit}</CttTit>
                              <CttImg src={item.img} draggable={false} />
                              <Link
                                 to={item.go}
                                 target="_blank"
                                 onDragStart={(e) => e.preventDefault()}
                              >
                                 <GoBtn>View All→</GoBtn>
                              </Link>
                           </CttCase>
                        ))}
                        <BlankBox />
                     </motion.div>
                  </MainCttWrap>
               </div>

               <TotalTxt>
                  Total <TxtColorB>{CttTxtGp.length}</TxtColorB>
               </TotalTxt>

               {/* <ScrollbarWrap>
                  <ScrollbarTrack ref={trackRef} />
                  <ScrollbarThumb left={thumbLeft} onMouseDown={onMouseDown} />
               </ScrollbarWrap> 커스텀 스크롤바 */}

               <BottomAllWrap>
                  <EmailTxt>
                     <img
                        src="../../public/images/beanFullIcon.png"
                        alt="콩 아이콘"
                        style={{ marginRight: "10px" }}
                     />
                     suqls9612@gmail.com
                  </EmailTxt>
                  <ExpTxt>
                     포트폴리오 포함 프로젝트의 기획, 디자인, 개발을 모두
                     단독으로 진행했습니다.
                  </ExpTxt>
               </BottomAllWrap>
            </SectionWrap>
         </SectionAllWrap>
      </>
   );
}

export default SideProhect;
