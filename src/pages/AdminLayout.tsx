import { styled, css } from "styled-components";
import React, { JSX, useRef, useState, useEffect } from "react";
import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faWindowRestore,
   faUser,
   faRectangleList,
   faComment,
   faChartBar,
   faBell as faBellRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
   faArrowRight,
   faMagnifyingGlass,
   faRightFromBracket,
   faBell,
   faGears,
} from "@fortawesome/free-solid-svg-icons";

const AllWrap = styled.div`
   display: flex;
   flex-direction: row;
`;
const LeftManuWrap = styled.div`
   background-color: #fff3e9;
   width: 250px;
   height: 100vh;
   position: relative;
   border-right: 1px solid #f5f5f5;
`;

const LogoWrap = styled.div`
   width: 130px;
   height: 42px;
   margin: 20px 30px;
`;
const MenuList = styled.ul`
   > li {
      /* background-color: #28bb4099; */
      height: 42px;
      margin: 10px;
      border-radius: 13px;
      display: flex;
      align-items: center;
   }
`;

const FontIcon = styled(FontAwesomeIcon)`
   margin-right: 10px;
   font-size: 17px;
`;

const MeunBtn = styled(NavLink)<{ active?: boolean; devIng?: boolean }>`
   color: #837272;
   font-weight: 700;
   width: 100%;
   padding-left: 20px;
   text-align: left;
   height: 100%;
   font-size: 14px;
   border-radius: 10px;
   display: flex;
   align-items: center;
   /* background-color: ${({ active }) => (active ? "#ff5160" : "")}; */

   &.active {
      background-color: ${({ devIng }) => (devIng ? "" : "#ff916c")};
      color: ${({ devIng }) => (devIng ? "" : "#fff")};
   }
`;
const LogOutBtn = styled(NavLink)`
   padding-left: 30px;
   color: #9c9fa6;
   text-align: left;
   width: 250px;
   height: 45px;
   position: absolute;
   bottom: 30px;
`;

const RightWrap = styled.div`
   width: calc(100vw - 250px);
   height: 100dvh;
`;

const TopBar = styled.div`
   height: 82px;
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0 20px;
`;
const SearchWrap = styled.div`
   width: 18%;
   height: 40px;
   position: relative;
   display: flex;
   align-items: center;
   transition: all 0.3s ease-in;
   &:focus-within {
      width: 25%;
      height: 45px;
   }
`;

const SearchBar = styled.input`
   &:focus {
      outline: none;
   }
   background-color: #f5f5f5;
   height: 100%;
   width: 100%;
   border-radius: 10px;
   border: none;
   padding: 0 30px 0 15px;
   font-size: 14px;
`;
const SearchIcon = styled(FontAwesomeIcon)`
   color: #bdbdbd;
   position: absolute;
   right: 15px;
`;
const TopLeftWrap = styled.div`
   display: flex;
   gap: 15px;
`;
const ProfileWrap = styled.div`
   display: flex;
   align-items: center;
`;
const ProfileTxt = styled.div``;

const ProfileImg = styled.div`
   width: 40px;
   margin-right: 10px;
`;
const UserInfo = styled.div`
   font-size: 14px;
   font-weight: 700;
`;
const TopIconWrap = styled(NavLink)`
   background-color: #fff;
   width: 40px;
   height: 40px;
   border-radius: 10px;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #f7f7f7;
`;
const LeftIcon = styled(FontAwesomeIcon)`
   color: #bdbdbd;
   font-size: 18px;
`;

const BottomRightWrap = styled.div`
   width: 100%;
   height: calc(100% - 82px);
   padding: 0 20px;
   display: flex;
   flex-direction: column;
   gap: 20px;
   overflow: auto;
`;

const MainTit = styled.span`
   &::before {
      content: "";
      width: 5px;
      height: 20px;
      background-color: #ff7771;
      position: absolute;
      left: -15px;
   }
   font-size: 18px;
   font-weight: 800;
   color: #6b6b6b;
   margin-left: 20px;
   position: relative;
   display: flex;
   align-items: center;
`;

const DavIng = styled.span`
   font-size: 12px;
   color: #ff5858;
   margin-left: auto;
`;

const UserTxtSub = styled.span`
   color: #747474;
   font-size: 12px;
   font-weight: 500;
`;
const ExpTxt = styled.span`
   padding: 7px 5px;
   color: #ff916c;
   font-size: 14px;
   text-align: center;
   width: 211px;
   border: 1px solid #ff916c;
   position: absolute;
   bottom: 30px;
   margin: 0px 19px;
`;

function AdminLayout(): JSX.Element {
   const [title, setTitle] = useState("");
   const loginUser = localStorage.getItem("loginUser") || "{}";
   const { id, companyName } = JSON.parse(loginUser);
   const navgate = useNavigate();
   if (loginUser === "{}") {
      navgate("/login");
   }

   return (
      <>
         <AllWrap>
            <LeftManuWrap>
               <LogoWrap>
                  <img src="/images/c_Logo.png" alt="로고" />
               </LogoWrap>
               <MenuList>
                  <li>
                     <MeunBtn to="/Admin" end>
                        <FontIcon icon={faWindowRestore} />
                        대시보드
                     </MeunBtn>
                  </li>
                  <li>
                     <MeunBtn to="/Admin/User">
                        <FontIcon icon={faUser} />
                        사용자 관리
                     </MeunBtn>
                  </li>
                  <li>
                     <MeunBtn to="/Admin/Contents">
                        <FontIcon icon={faRectangleList} />
                        콘텐츠 관리
                     </MeunBtn>
                  </li>
                  <li>
                     <MeunBtn to="/Admin/Notice">
                        <FontIcon icon={faChartBar} />
                        공지사항 관리
                     </MeunBtn>
                  </li>
                  <li>
                     <MeunBtn to="#" devIng={true}>
                        <FontIcon icon={faBellRegular} />
                        알림 관리
                        <DavIng>WIP</DavIng>
                     </MeunBtn>
                  </li>
                  <li>
                     <MeunBtn to="#" devIng={true}>
                        <FontIcon icon={faComment} />
                        1:1문의 관리
                        <DavIng>WIP</DavIng>
                     </MeunBtn>
                  </li>
               </MenuList>
               {/* <LogOutBtn
                  to="/login"
                  onClick={() => {
                     localStorage.removeItem("loginUser");
                  }}
               >
                  <FontIcon icon={faArrowRight} />
                  LogOut
               </LogOutBtn> */}
               <ExpTxt>
                  페이지이동,새로고침시 자동 localStorage초기화 됩니다.
               </ExpTxt>
            </LeftManuWrap>
            <RightWrap>
               <TopBar>
                  {/* <SearchWrap>
                     <SearchBar type="text" placeholder="검색어 입력" />
                     <SearchIcon icon={faMagnifyingGlass} />
                  </SearchWrap> */}
                  {title && <MainTit>{title}</MainTit>}
                  <TopLeftWrap>
                     <ProfileWrap>
                        <ProfileImg>
                           <img
                              src="/images/profile.png"
                              alt="프로필기본이미지"
                           />
                        </ProfileImg>
                        <ProfileTxt>
                           <UserInfo>
                              {id}
                              <UserTxtSub> 님</UserTxtSub>
                           </UserInfo>
                           <UserInfo>
                              <UserTxtSub>회사명</UserTxtSub> {companyName}
                           </UserInfo>
                        </ProfileTxt>
                     </ProfileWrap>
                     {/* <TopIconWrap>
                        <LeftIcon icon={faBell} />
                     </TopIconWrap> */}
                     <TopIconWrap
                        onClick={() => {
                           localStorage.removeItem("loginUser");
                        }}
                        to="/login"
                     >
                        <LeftIcon icon={faRightFromBracket} />
                     </TopIconWrap>
                  </TopLeftWrap>
               </TopBar>
               <BottomRightWrap>
                  <Outlet context={{ setTitle }} />
               </BottomRightWrap>
            </RightWrap>
         </AllWrap>
      </>
   );
}

export default AdminLayout;
