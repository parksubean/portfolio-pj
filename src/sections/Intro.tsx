import React, { JSX, useState, useEffect, useRef } from "react";
import { styled, css, keyframes } from "styled-components";
// import ParticlesBackground from "../components/StarParticles";

//style 정의

const AllWrap = styled.section`
   height: 100vh;
   position: relative;
`;

const Section_wrap = styled.section`
   width: 1470px;
   margin: 0 auto;
   height: 100vh;
`;

const Section_top = styled.section`
   height: 13.29%;
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

const LogoImg = styled.img``;

const Slogan = styled.span`
   color: #fff;
   font-size: 23px;
   font-weight: bold;
`;

const TopBtnWrap = styled.div``;

const BtnComm = css`
   height: 19px;
   width: 19px;
   background-color: #fff;
`;

const Btn_item_01 = styled.button`
   ${BtnComm}
   border-radius: 20px;
   background-color: #fff;
`;

const Btn_item_02 = styled.button`
   position: relative;
   top: -19px;
   width: 0px;
   height: 0px;
   border-bottom: 19px solid #fff;
   border-top: 10px solid transparent;
   border-left: 10px solid transparent;
   border-right: 10px solid transparent;
   margin: 0 10px;
`;

const Btn_item_03 = styled.button`
   ${BtnComm}
`;

const MainWrap = styled.section`
   display: flex;
   height: 67%;
   margin: 54px auto 0;
`;

const LeftCtt = styled.section`
   flex: 48%;
`;

const NameTxt = styled.p<{
   size: number;
   txtWeight?: boolean;
   txtMargin?: boolean;
}>`
   font-size: ${({ size }) => size}px;
   font-weight: ${({ txtWeight }) => (txtWeight ? "normal" : "bold")};
   margin-bottom: ${({ txtMargin }) => (txtMargin ? "10px" : "0")};
   color: #7cc6ff;
`;

const EmailTxt = styled.a`
   color: #fff;
   display: flex;
   align-items: center;
   position: absolute;
   top: 53%;
   font-size: 14px;
   &::before {
      content: "";
      background-image: url("./images/beanFullIcon.png");
      background-repeat: no-repeat;
      width: 34px;
      height: 24px;
      background-position: center;
      display: inline-block;
      margin-right: 8px;
   }
`;

const RightCtt = styled.section`
   flex: 52%;
   overflow: auto;
   max-height: 100vh;
   direction: rtl;
   padding-left: 3dvh;

   & > * {
      direction: ltr;
   }

   &::-webkit-scrollbar {
      width: 3px;
   }

   &::-webkit-scrollbar-thumb {
      background-color: #ffffff52;
      border-radius: 10px;
      height: 30px;
   }
`;

const ExpTxt = styled.p<{ lastItem?: boolean }>`
   color: #fff;
   margin-bottom: ${({ lastItem }) => (lastItem ? "100px" : "32px")};
   font-size: 16px;
`;

const HistoryAllWrap = styled.div`
   color: #9fa0a1;
   display: flex;
   flex-direction: column;
   margin-bottom: 70px;
`;

const HistoryWrap = styled.div`
   display: flex;
`;

const PeriodTxt = styled.p`
   width: 23%;
   font-size: 14px;
`;

const JabTxpWrap = styled.div`
   width: 77%;
`;

const TitTxt = styled.p`
   font-weight: lighter;
`;

const JabTxt = styled.p`
   color: #fff;
   margin: 5px 0;
`;

const TagWrap = styled.div`
   display: flex;
   margin-top: 40px;
`;

const TagStyle = styled.div`
   padding: 5px 15px;
   background-color: #5f686f;
   color: #6cbaf7;
   border-radius: 30px;
   font-size: 12px;
   margin-right: 8px;
`;

const BottomTxt = styled.span`
   font-size: 25px;
   color: #fff;
`;

const EmploymentHistory = [
   {
      period: "2024.01 ~ 2024.07",
      title: "오플라시스템",
      job: "프론트엔드 엔지니어",
      jobExp:
         "자회사 애플리케이션의 유지보수를 담당하며, 협력 개발업체와의 공동 작업을 병행하였음. 또한, 자회사 프로그램을 사용하는 외부 기업 개발자들에게 사용법을 안내하고 기술 지원을 수행함.",
      tag: ["JavaScript", "Jquery", "HTML", "CSS", "PHP"],
   },
   {
      period: "2022.04 ~ 2024.01",
      title: "(주)에이치에스엠클라우디피아",
      job: "프론트엔드 엔지니어 (주임)",
      jobExp:
         "외부 업체 프로그램의 유지보수 및 신규 개발을 진행, 회원정보 관리와 회원관리 프로그램 제작을 포함한 다양한 기능을 개발함. 또한, 데이터베이스 관리와 결제 API 연동, PHP를 활용한 백엔드 프로그래밍을 수행함 하이브리드 애플리케이션의 프론트엔드 개발 및 웹앱 구현도 함께 담당",
      tag: ["JavaScript", "Jquery", "HTML", "CSS", "PHP", "SQL"],
   },
   {
      period: "2019.09 ~ 2020.09",
      title: "이레",
      job: "웹 퍼블리셔 , 웹디자이너",
      jobExp:
         "협업 업체 쇼핑몰 관리 보조 및 웹 디자인 외부업체 웹 , 그래픽 디자인 및 웹 전반적인 퍼블리싱 담당",
      tag: ["JavaScript", "Jquery", "HTML", "CSS"],
   },
   {
      period: "2017.02 ~ 2017.11",
      title: "(주)다우에스엔에스",
      job: "웹디자이너",
      jobExp:
         "자회사 홈페이지 디자인 및 일러스트레이터를 이용한 그래픽 디자인 HTML/CSS에 대한 실무감각 채득, 구조적인 마크업과 반응형 웹 구현.외주 인력과 협력하여 자회사의 새로운 프로젝트 진행",
      tag: ["JavaScript", "HTML", "CSS"],
   },
];

const arrow = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  20% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const ArrowItem = styled.div<{ delay: number }>`
   width: 0;
   height: 0;
   margin: 2px 0;
   border-left: 6px solid transparent;
   border-right: 6px solid transparent;
   border-top: 12px solid #7cc6ff;
   animation: ${arrow} 4s ease-out infinite;
   opacity: 0;
   animation-delay: ${({ delay }) => delay}s;
`;

const ArrowWrap = styled.div`
   float: left;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 10px;
   margin-right: 20px;
   margin-top: 13px;
`;

function Intro(): JSX.Element {
   const rightCtt = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const wheelEvent = (e: WheelEvent) => {
         const rightCttCrt = rightCtt.current;
         if (!rightCttCrt) return;
         const atTop = rightCttCrt.scrollTop === 0;
         const atBottom =
            rightCttCrt.scrollHeight - rightCttCrt.scrollTop ===
            rightCttCrt.clientHeight;

         if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
            return;
         } else {
            e.stopPropagation();
         }
      };

      const node = rightCtt.current;
      node?.addEventListener("wheel", wheelEvent, { passive: false });

      return () => {
         node?.removeEventListener("wheel",wheelEvent);
      };
   }, []);

   return (
      <>
         <AllWrap>
            <Section_wrap>
               <Section_top>
                  <LogoImg src="./images/logo.png" alt="Logo" />
                  <Slogan>" Pixels don't lie "</Slogan>
                  <TopBtnWrap>
                     <Btn_item_01 />
                     <Btn_item_02 />
                     <Btn_item_03 />
                  </TopBtnWrap>
               </Section_top>
               <MainWrap>
                  <LeftCtt>
                     <NameTxt size={40}>PARK SU BEAN</NameTxt>
                     <NameTxt size={25} txtMargin>
                        Front End Engineer
                     </NameTxt>
                     <NameTxt size={20} txtWeight>
                        작은 픽셀 
                        <br />
                        신중하게 고민하며 웹을 만듭니다.
                     </NameTxt>
                     <EmailTxt href="mailto:suqls9612@gmail.com">suqls9612@gmail.com</EmailTxt>
                  </LeftCtt>
                  <RightCtt ref={rightCtt}>
                     {/* data-lenis-prevent */}
                     <ExpTxt>
                        저는 디자인의 디테일 하나까지도 놓치지 않고 집요하게
                        웹을 구현합니다. 또한 사용자 중심의 <br />
                        인터페이스 구현을 매우 중요하게 생각합니다. 단순히 예쁜
                        디자인, 보기 좋은 화면에 그치지 않고, <br />
                        사용자의 입장에서 한 번 더 생각하고 구현하는 것을
                        좋아합니다.
                     </ExpTxt>
                     <ExpTxt>
                        저는 스타트업, 일반 기업, 외주 프로젝트 등 다양한
                        환경에서의 경험을 보유하고 있습니다. <br />
                        또한 웹디자이너로서의 경력을 바탕으로 웹디자인에 대한
                        깊은 이해를 갖추고 있으며, <br />
                        이는 프론트엔드 개발 과정에서 큰 강점으로 작용합니다.
                     </ExpTxt>
                     <ExpTxt lastItem>
                        취미 활동으로 녹음 프로그램, 영상프로그램 작업등을 하며
                        꾸준히 저만의 능력을 키우는것을 <br />
                        좋아하며 지식을 얻고 쌓는것을 즐겁게 생각합니다.
                     </ExpTxt>
                     {EmploymentHistory.map((item) => (
                        <HistoryAllWrap key={item.title}>
                           <HistoryWrap>
                              <PeriodTxt>{item.period}</PeriodTxt>
                              <JabTxpWrap>
                                 <TitTxt>{item.title}</TitTxt>
                                 <JabTxt>{item.job}</JabTxt>
                                 <span>{item.jobExp}</span>
                              </JabTxpWrap>
                           </HistoryWrap>
                           <TagWrap>
                              {item.tag.map((tag) => (
                                 <TagStyle key={tag}>{tag}</TagStyle>
                              ))}
                           </TagWrap>
                        </HistoryAllWrap>
                     ))}
                  </RightCtt>
               </MainWrap>
               <div>
                  <ArrowWrap>
                     {[0, 1, 2, 3].map((i) => (
                        <ArrowItem key={i} delay={i * 1} />
                     ))}
                  </ArrowWrap>
                  <BottomTxt>
                     Continue <br />
                     scrolling
                  </BottomTxt>
               </div>
            </Section_wrap>
         </AllWrap>
      </>
   );
}

export default Intro;
