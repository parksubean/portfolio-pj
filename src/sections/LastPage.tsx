import React, { JSX, useState, useRef, useEffect } from "react";
import { styled, css, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const AllWrap = styled.div`
   width: 100%;
   height: 100vh;
   background-color: #fff;
   position: relative;
`;

const InnerWrap = styled.div`
   width: 1900px;
   margin: 0 auto;
   position: relative;
   height: 100vh;
`;

const ImgBubble = styled.div`
   width: 100px;
   height: 100px;
   background-color: #e2edf6;
   border-radius: 100px;
   position: absolute;
`;

type BubbleType = {
   src: string;
   scale: number;
   top: number;
   left: number;
   active?: boolean;
};

const ItemMoveCss = css<{ top: number; left: number; active?: boolean }>`
   opacity: ${({ active }) => (active ? "100%" : "0%")};
   top: ${({ active, top }) => (active ? `${top}px` : "50%")};
   left: ${({ active, left }) => (active ? `${left}px` : "50%")};
   transition: all 0.8s ease;
`;

const BubbleItemList: BubbleType[] = [
   { src: "/images/react.png", scale: 1.3, top: 110, left: 1070 },
   { src: "/images/html0.png", scale: 0.8, top: 341, left: 634 },
   { src: "/images/html0.png", scale: 1.3, top: 575, left: 1300 },
   { src: "/images/php0.png", scale: 1.1, top: 142, left: 163 },
   { src: "/images/php0.png", scale: 1.1, top: 533, left: 1661 },
   { src: "/images/react.png", scale: 1.3, top: 312, left: 1372 },
   { src: "/images/css0.png", scale: 0.9, top: 115, left: 632 },
   { src: "/images/sql0.png", scale: 1.1, top: 242, left: 163 },
   { src: "/images/jq.png", scale: 1.3, top: 86, left: 1586 },
   { src: "/images/jq.png", scale: 1.3, top: 552, left: 136 },
];

const BubbleItem = styled(ImgBubble)<BubbleType>`
   transform: scale(${({ scale }) => scale});
   ${ItemMoveCss};
   &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: url(${({ src }) => src}) no-repeat 50% 50%;
      background-size: 40%;
   }
`;

type TextType = {
   text?: string;
   top: number;
   left: number;
   active?: boolean;
};

const TextList: TextType[] = [
   { text: "$_POST", top: 80, left: 180 },
   { text: "<? php ?>", top: 280, left: 450 },
   { text: "array()", top: 550, left: 350 },
   { text: ".click()", top: 100, left: 850 },
   { text: "echo", top: 300, left: 1800 },
   { text: "document.getElementById", top: 350, left: 1000 },
   { text: "sum", top: 200, left: 1400 },
   { text: ".on", top: 450, left: 1700 },
   { text: "var", top: 700, left: 550 },
   { text: "LEFT JOIN", top: 680, left: 1500 },
   { text: "F12", top: 50, left: 1800 },
];

const TextItem = styled.div<TextType>`
   position: absolute;
   ${ItemMoveCss};
   font-size: 14px;
   font-weight: 600;
`;

const TxtWrap = styled.div`
   position: absolute;
   bottom: 270px;
   left: 50%;
   transform: translateX(-50%);
   display: flex;
   flex-direction: column;
   gap: 15px;
`;

const MainTxt = styled.span`
   text-align: center;
   font-size: 45px;
   font-weight: 600;
   line-height: 1.4;
`;
const SubTxt = styled.span`
   text-align: center;
   font-weight: 400;
   font-size: 20px;
   color: #606060;
`;

const BtnBox = styled.a`
   height: 49px;
   width: 151px;
   border-radius: 10px;
   background-color: #0871ff;
   color: #fff;
   font-size: 17px;
   position: absolute;
   bottom: 180px;
   left: 50%;
   transform: translateX(-50%);
   display: flex;
   align-items: center;
   justify-content: center;
`;
const InfoWrap = styled.div`
   position: absolute;
   right: 50px;
   bottom: 50px;
   text-align: right;
`;

const dd = styled.span``;

function LastPage(): JSX.Element {
   const [active, setActive] = useState(false);
   const sectionRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const heandleScroll = (e: Event) => {
         const event = e as WheelEvent;
         event.preventDefault();
         const rect = sectionRef.current?.getBoundingClientRect();
         if (!rect) return;
         console.log(rect);
         if (
            rect.top !== window.innerHeight * 2 &&
            rect.top !== window.innerHeight * 3 &&
            rect.top >= window.innerHeight
         ) {
            setActive(true);
            document.body.style.overflow = "hidden";
         } else if (event.deltaY < 0) {
            setActive(false);
         }
      };

      window.addEventListener("wheel", heandleScroll, { passive: false });
      return () => window.removeEventListener("wheel", heandleScroll);
   }, []);
   return (
      <>
         <AllWrap ref={sectionRef}>
            <InnerWrap>
               {BubbleItemList.map((item, idx) => (
                  <BubbleItem
                     key={idx}
                     top={item.top}
                     scale={item.scale}
                     left={item.left}
                     src={item.src}
                     active={active}
                  />
               ))}
               {TextList.map((item, idx) => (
                  <TextItem
                     key={idx}
                     top={item.top}
                     left={item.left}
                     active={active}
                  >
                     {item.text}
                  </TextItem>
               ))}
               <TxtWrap>
                  <MainTxt>
                     오늘의 경험으로, 내일
                     <span style={{ color: "#0d1ca3" }}>더</span> 나아가는
                     <br />
                     프론트앤드 개발자 입니다.
                  </MainTxt>
                  <SubTxt>
                     저의 포트폴리오 프로젝트를 함께 즐겨주시고 빛내주셔서
                     감사합니다.
                  </SubTxt>
               </TxtWrap>
               <BtnBox href="mailto:suqls9612@gmail.com">
                  Contact
                  <FontAwesomeIcon
                     icon={faEnvelope}
                     style={{ marginLeft: "5px" }}
                  ></FontAwesomeIcon>
               </BtnBox>
               <InfoWrap>
                  PARK SUBEAN
                  <br />
                  1996.12.07
                  <br />
                  suqls9612@gmail.com
                  <br />
                  +82)01-5498-3757
                  <br />
               </InfoWrap>
               {/* <button
                  style={{ position: "absolute", top: "50%" }}
                  onClick={() => setActive(!active)}
               >
                  클릭클릭
               </button> */}
            </InnerWrap>
         </AllWrap>
      </>
   );
}

export default LastPage;
