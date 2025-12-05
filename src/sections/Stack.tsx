import React, { JSX, useState, useRef, useEffect } from "react";
import { styled, css, keyframes } from "styled-components";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputerMouse } from "@fortawesome/free-solid-svg-icons";

const AllWrap = styled.div`
   height: 100vh;
`;

const ContentWrap = styled.div`
   width: 1470px;
   margin: 0 auto;
   position: relative;
   height: 100vh;
`;

const TitWrap = styled(motion.div)<{ active: boolean }>`
   position: relative;
   left: ${({ active }) => (active ? "50%" : "-50%")};
   transform: translateX(${({ active }) => (active ? "-50%" : "0")});
   display: flex;
   flex-direction: column;
   align-items: center;
   padding-top: 140px;
   width: fit-content;
   transition: all 1s ease;
`;

const TitTxt = styled.p`
   color: #fff;
   font-size: 25px;
`;

const TitTxtEn = styled.p`
   color: #fff;
   font-size: 67px;
   font-weight: bold;
   text-shadow: -1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff;
   letter-spacing: 3.5px;
`;

const Line = styled.span`
   border: 1.5px solid #fff;
   width: 100vw;
   display: block;
   position: absolute;
   left: calc(-50vw + 727px);
   top: 42%;
   opacity: 35%;
`;

const RowWrap = styled.div`
   position: absolute;
   top: 41.5%;
   overflow-x: auto;
   width: 100vw;
   left: calc(-50vw + 727px);
   padding-left: calc(50vw - 727px);
   &::-webkit-scrollbar {
      display: none;
   }
`;

const ScrollInner = styled.div`
   display: flex;
   gap: 50px;
   padding: 0 calc(50vw - 727px);
`;

const CttWrap = styled.div``;

const Poin = styled.div`
   &::after {
      content: "";
      width: 8px;
      height: 8px;
      background-color: #1e2d39;
      display: block;
      border-radius: 10px;
      position: absolute;
      left: 3px;
      top: 3px;
   }
   &::before {
      content: "";
      width: 14px;
      height: 14px;
      background-color: #7cc6ff;
      display: block;
      border-radius: 10px;
      position: absolute;
   }

   margin-left: 16px;
   position: relative;
`;

const CttTitWrap = styled.div`
   display: flex;
   align-items: center;
   margin-top: 60px;
`;

const IconBox = styled.div`
   &::after {
      content: "";
      background-image: url(./images/ai.png);
      background-repeat: no-repeat;
      display: block;
      width: 35px;
      height: 35px;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      position: absolute;
   }
   background-color: #494949;
   width: 50px;
   height: 50px;
   border-radius: 10px;
   position: relative;
`;

const Bar = styled.div`
   width: 3px;
   height: 16px;
   background-color: #7cc6ff;
   margin-left: 15px;
`;

const IconTit = styled.div`
   font-size: 22px;
   color: #fff;
   margin-left: 15px;
`;

const ExpWrap = styled.div`
   background-color: #1d262d;
   color: #fff;
   padding: 15px;
   width: 365px;
   border-radius: 10px;
   margin-top: 20px;
   font-size: 16px;
   font-weight: 400;
`;

const ExpScroll = styled.span`
   position: absolute;
   bottom: 200px;
   left: 50%;
   transform: translateX(-50%);
   display: flex;
   align-items: center;
   > span {
      margin-right: 15px;
      color: #fff;
   }
`;

const SildeLeft = keyframes`
   0% {transform: translatex(0);}
   100% {transform: translatex(-8px);}
`;

const MoveIcon = styled(FontAwesomeIcon)`
   animation: ${SildeLeft} 1.2s ease-in-out infinite;
`;

const CttList = [
   {
      title: "HTML5",
      expTxt:
         "HTML로 웹 페이지의 기본 구조를 작성하고, 시맨틱 태그를 활용해 접근성과 유지보수성을 고려함. <br>UI 뼈대 구축 및 css , js 와 연동 작업",
   },
   {
      title: "jQuery",
      expTxt:
         "동적인 디자인작업 및 이벤트 처리, 애니메이션 <br>작업 Ajax 활용하여 비동기 통신을 구현, 사용자 <br>입력에 따른 동적 응답 처리 ",
   },
   {
      title: "CSS3",
      expTxt:
         "웹페이지의 디자인과 UI 레이아웃 구성, 미디어 쿼리를 이용하여 반응형 UI를 구현함 css 변수를 사용하여 유지보수성을 고려한 스타일링을 제작",
   },
   {
      title: "SQL",
      expTxt:
         "데이터베이스 정보를 JOIN하여 데이터를 삽입 ,<br>추출 작업을함 작업된 데이터를 아용해 웹페이지에 실시간으로 반영되도록 하고 화면으로 표시하는<br> 시스템을 개발",
   },
   {
      title: "PHP",
      expTxt:
         "php를 활용하여 서버사이드 로직을 구현하고 사용자의 요청에 따른 동적인 웹페이지를 구현함 <br>SQL을 연동하여 실시간으로 데이터를 입력받아 데이터베이스에 저장하고 관리하는 작업을 수행   ",
   },
   {
      title: "Photoshop",
      expTxt:
         "포토샵을 활용하여 웹/앱 UI디자인을 제작하고 프론트엔드 개발에 맞게 최적화하여 구현,<br> 그래픽 디자인 제작 포토샵에서 디자인 작업 후 HTML, CSS를 이용해 적용함 ",
   },
   {
      title: "Illustrator",
      expTxt:
         "일러스트레이터를 활용하여 웹에서 사용되는 <br>아이콘 및 로고 UI 요소 등을 벡터 기반으로 제작하여 웹페이지에 활용",
   },
];

function Stack(): JSX.Element {
   const containerRef = useRef<HTMLDivElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);
   const wheelRef = useRef<HTMLDivElement>(null);
   const [width, setWidth] = useState(0);

   const [active, setActive] = useState(false);

   useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
         const target = wheelRef.current?.getBoundingClientRect();
         if (!target) return;
         if (
            target.top >= window.innerHeight ||
            target.top === -window.innerHeight
         ) {
            setActive(true);
         } else if (target.top === 0) {
            setActive(false);
         }
      };

      window.addEventListener("wheel", handleWheel, { passive: true });
      return () => window.removeEventListener("wheel", handleWheel);
   });

   useEffect(() => {
      if (containerRef.current && contentRef.current) {
         setWidth(
            contentRef.current.scrollWidth - containerRef.current.offsetWidth
         );
      }
   }, []);

   return (
      <AllWrap ref={wheelRef}>
         <ContentWrap>
            <TitWrap active={active}>
               <TitTxt>실무 활용 기술</TitTxt>
               <TitTxtEn>Tech Stack</TitTxtEn>
            </TitWrap>
            <Line />
            <RowWrap>
               <div
                  ref={containerRef}
                  style={{
                     cursor: "grab",
                     userSelect: "none",
                     width: "100%",
                     display: "flex",
                     flexDirection: "row",
                  }}
               >
                  <motion.div
                     ref={contentRef}
                     style={{ display: "flex", gap: "50px" }}
                     drag="x"
                     dragConstraints={{ left: -width, right: 0 }}
                     dragElastic={0.2}
                     dragMomentum={true}
                     whileTap={{ cursor: "grabbing" }}
                  >
                     {CttList.map((item, index) => (
                        <CttWrap key={index} style={{ minWidth: 0 }}>
                           <Poin />
                           <CttTitWrap>
                              <IconBox />
                              <Bar />
                              <IconTit>{item.title}</IconTit>
                           </CttTitWrap>
                           <ExpWrap
                              dangerouslySetInnerHTML={{ __html: item.expTxt }}
                           />
                        </CttWrap>
                     ))}
                  </motion.div>
               </div>
            </RowWrap>
            <ExpScroll>
               <span>Click Drag</span>
               <MoveIcon
                  icon={faComputerMouse}
                  size="1x"
                  style={{ color: "#fff" }}
               />
            </ExpScroll>
         </ContentWrap>
      </AllWrap>
   );
}
export default Stack;
