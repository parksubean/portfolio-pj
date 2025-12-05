import { styled, css, keyframes } from "styled-components";
import React, { JSX } from "react";

const PopupBack = styled.div`
   position: fixed;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100vw;
   height: 100vh;
   left: 0;
   top: 0;
   background-color: #00000022;
`;

const fadeIn = keyframes`
   0%{opacity: 0%}
   100%{opacity: 100%}
`;

const PopUpWrap = styled.div`
   position: fixed;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 450px;
   border-radius: 10px;
   background-color: #ffffff;
   box-shadow: 0px 1px 8px 0px #0000003d;
   padding: 30px;
   animation: ${fadeIn} 0.1s ease-in;
`;

const TitTxt = styled.span`
   font-size: 18px;
   font-weight: 700;
`;

const btnCss = styled.button`
   width: 100%;
   border-radius: 10px;
   padding: 12px 0;
   font-weight: 600;
`;

const ModalTxt = styled.span`
   padding: 30px 0 10px;
`;

const ModalSubTxt = styled.span`
   font-size: 12px;
   color: red;
`;

const CloseBtn = styled(btnCss)`
   background-color: #ffd1cd;
   border: 1px solid #ff9292;
   margin-top: 20px;
   color: #eb2020;
`;
const ConfimBtn = styled(btnCss)`
   background-color: #e5e5e5;
   margin-top: 15px;
`;

interface ModalProps {
   closeOn?: () => void;
   confimOn: () => void;
   title: string;
   mainTxt: string;
   psTxt?: string;
}

function Modal({ confimOn, closeOn, title, psTxt, mainTxt }: ModalProps) {
   return (
      <>
         <PopupBack>
            <PopUpWrap>
               <TitTxt>{title}</TitTxt>
               <ModalTxt>{mainTxt}</ModalTxt>
               {psTxt && <ModalSubTxt>{psTxt}</ModalSubTxt>}
               {closeOn && (
                  <CloseBtn
                     onClick={closeOn}
                     //   onClick={() => {
                     //      setPopupOpen(false);
                     //      setDelTargetId(null);
                     //   }}
                  >
                     취소
                  </CloseBtn>
               )}

               <ConfimBtn onClick={confimOn}>확인</ConfimBtn>
               {/* deleteItem */}
            </PopUpWrap>
         </PopupBack>
      </>
   );
}

export default Modal;
