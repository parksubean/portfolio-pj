import { styled } from "styled-components";
import React, { JSX, useRef, useState, useEffect } from "react";
import { useNavigate,NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBuilding } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const BackgroundWrap = styled.div`
   background-color: #ffe0c6;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
`;
const LoginWrap = styled.div`
   background-color: #fdfdfd;
   width: 420px;
   padding: 20px;
   display: flex;
   flex-direction: column;
   gap: 15px;
   border-radius: 7px;

   p {
      text-align: center;
   }
`;

const LoginAreaWrap = styled.div`
   position: relative;
   display: flex;
   align-items: center;
`;

const LoginArea = styled.input.attrs({ type: "text" })`
   border: none;
   background-color: #e7e7e7;
   border-radius: 7px;
   height: 40px;
   padding-left: 40px;
   width: 100%;
`;

const InputIcon = styled(FontAwesomeIcon)`
   color: #bdbdbd;
   font-size: 16px;
   position: absolute;
   left: 10px;
`;

const GoNextBtn = styled.button`
   background-color: #fe7771;
   border-radius: 7px;
   padding: 15px;
   color: #fff;
   font-size: 14px;
   font-weight: 700;
   margin-top: 20px;
`;

const asd = styled.div``;

function Login(): JSX.Element {
   const [id, setId] = useState("");
   const [companyName, setCompanyName] = useState("");
   const goNext = useNavigate();

   const loginAction = () => {
      if (!id || !companyName)
         return alert("아이디 또는 회사명이 비어있습니다. (아무거나 입력해주세요)");
      localStorage.setItem("loginUser", JSON.stringify({ id, companyName }));
      goNext("/Admin");
   };

   return (
      <>
         <BackgroundWrap>
            <LoginWrap>
               <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  style={{ fontSize: "40px", color: "#fe9371" }}
               />

               <p style={{ fontSize: "20px", fontWeight: "700" }}>로그인</p>
               <p style={{ fontSize: "12px", color: "#696969" }}>
                  * 임의의 아이디와 회사명을 입력해주세요. <br />
                  (입력하신 정보는 저장되지 않습니다.)
               </p>
               <LoginAreaWrap>
                  <LoginArea
                     value={id}
                     onChange={(e) => {
                        setId(e.target.value);
                     }}
                     placeholder="이름을 입력해주세요"
                  />
                  <InputIcon icon={faUser} />
               </LoginAreaWrap>
               <LoginAreaWrap>
                  <LoginArea
                     value={companyName}
                     onChange={(e) => {
                        setCompanyName(e.target.value);
                     }}
                     placeholder="회사명을 입력해주세요"
                  />
                  <InputIcon icon={faBuilding} />
               </LoginAreaWrap>
               <GoNextBtn onClick={loginAction}>로그인하기</GoNextBtn>
            </LoginWrap>
         </BackgroundWrap>
      </>
   );
}

export default Login;
