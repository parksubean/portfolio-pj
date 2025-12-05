import { styled } from "styled-components";
import React, { JSX, useRef, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { dummyUser } from "../data/dummyUser";
import Modal from "../components/Modal";
import { Table } from "../components/Table";

const ToolBarWrap = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;
const FilterWrap = styled.div`
   font-size: 14px;
   font-weight: 700;
`;

const SelectBox = styled.select`
   border: none;
   height: 35px;
   margin-left: 10px;
   padding-left: 5px;
   width: 120px;
   border: 1px solid #efecec;

   &:focus {
      outline: none;
   }
`;

const SearchWrap = styled.div`
   display: flex;
   align-items: center;
`;

const SearchArea = styled.input.attrs({ type: "text" })`
   border: none;
   height: 35px;
   width: 250px;
   padding-left: 10px;
   margin-left: 20px;
   border: 1px solid #efecec;

   &:focus {
      outline: none;
   }
`;

const SearchBtn = styled.div`
   background-color: #ff7771;
   padding: 10px;
   color: #fff;
   height: 35px;
   width: 35px;
   display: flex;
   align-items: center;
`;
const SearchBtnIcon = styled(FontAwesomeIcon)`
   font-size: 14px;
`;

const CheckBoxWrap = styled.label`
   height: 35px;
   background-color: #fff;
   width: 140px;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 14px;
   color: #5a5a5a;
   margin-left: auto;
   border: 1px solid #efecec;
`;
const CheckBox = styled.input.attrs({ type: "checkbox" })`
   appearance: none;
   border: 1px solid #999;
   border-radius: 4px;
   width: 14px;
   height: 14px;
   margin-left: 5px;
   margin-bottom: 2px;
   &:checked {
      background-color: #ff7771;
      border: none;
   }
   &:checked::after {
      content: "✔";
      display: block;
      color: white;
      font-size: 9px;
      text-align: center;
      line-height: 15px;
   }
`;

const DaleteBtn = styled.button`
   background-color: #ff000021;
   padding: 4px 11px;
   /* border: 1px solid #ff0000; */
   color: #ff0000;
   border-radius: 7px;
   font-size: 12px;
   font-weight: 700;
   margin-left: 5px;
`;
const ControlBtn = styled.button<{ manage: number }>`
   background-color: ${({ manage }) =>
      manage === 1 ? "#00d6722c" : "#eeeeee"};
   padding: 4px 11px;
   width: 60px;
   /* border: 1px solid ${({ manage }) =>
      manage === 1 ? "#08be82" : " #adadad"}; */
   color: ${({ manage }) => (manage === 1 ? "#08af78" : " #8a8a8a")};
   border-radius: 7px;
   font-size: 12px;
   font-weight: 700;
`;

const QuitUser = styled.div`
   background-color: #ffffff;
   border: 1px solid #ffdede;
   padding: 4px 11px;
   width: 110px;
   border-radius: 7px;
   font-size: 12px;
   color: #ff7474;
   font-weight: 700;
   text-align: center;
`;

type OutletContext = { setTitle: (title: string) => void };

function User(): JSX.Element {
   const { setTitle } = useOutletContext<OutletContext>();
   useEffect(() => {
      setTitle("사용자 관리");
   }, [setTitle]);

   // 페이지네이션 , 페이지 구현
   const VIEW_USER_NUM = 13;
   const totalPage = Math.ceil(dummyUser.length / VIEW_USER_NUM);
   const [activePage, setActivePage] = useState(1);
   const [userGroup, setUserGroup] = useState(dummyUser);
   const [checkBoxStatus, setCheckBoxStatus] = useState(false);
   const [search, setSearch] = useState("");
   let sorted = [...userGroup];
   const [subuserGroup, setsubUserGroup] = useState(sorted);

   useEffect(() => {
      if (checkBoxStatus) {
         setUserGroup(dummyUser.filter((item) => item.manage !== 3));
      } else {
         setUserGroup(dummyUser);
      }
   }, [checkBoxStatus]);

   const searchUser = userGroup.filter(
      (item) =>
         item.name.toLowerCase().includes(search.toLowerCase()) ||
         item.email.toLowerCase().includes(search.toLowerCase()) ||
         item.id.toLowerCase().includes(search.toLowerCase())
   );

   const veiwUsers = searchUser.slice(
      (activePage - 1) * VIEW_USER_NUM,
      activePage * VIEW_USER_NUM
   );
   // 페이지네이션 , 페이지 구현 끝

   // 필터

   const runFilterLeft = (value: string) => {
      switch (value) {
         case "1": //전체
            sorted = dummyUser;
            break;
         case "2": // 이름순
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
         case "3": // 가입일순
            sorted.sort(
               (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            break;
         case "4": // 등급순
            sorted.sort((a, b) => b.level - a.level);
            break;
      }
      setUserGroup([...sorted]);
      setsubUserGroup([...sorted]);
   };

   const runFilterRight = (value: string) => {
      const manageNum: { [key: string]: number | null } = {
         "1": null,
         "2": 1,
         "3": 2,
         "4": 3,
      };
      const manageVal = manageNum[value];

      if (manageVal === null) {
         setUserGroup(subuserGroup);
      } else {
         setUserGroup(subuserGroup.filter((item) => item.manage == manageVal));
      }
   };

   // 필터끝

   // 버튼

   const [modalOpen, setModalOpen] = useState(false);
   const [targetId, setTargetId] = useState<number | null>(null);
   const [btnNumber, setBtnNumber] = useState<number | null>(null);

   const modalOpenBtn = (manageNum: number, idx: number) => {
      setModalOpen(true);
      setBtnNumber(manageNum);
      setTargetId(idx);
   };

   const quitUser = () => {
      //탈퇴버튼
      if (targetId === null) return;
      setUserGroup((p) => p.filter((item) => item.idx !== targetId));
      setModalOpen(false);
   };

   const inactiveUser = () => {
      //비활성 활성
      if (targetId === null) return;
      setUserGroup((p) =>
         p.map((item) =>
            item.idx === targetId
               ? { ...item, manage: btnNumber === 1 ? 2 : 1 }
               : item
         )
      );

      setModalOpen(false);
   };

   // 버튼끝

   return (
      <>
         <ToolBarWrap>
            <FilterWrap>
               <span>Filter :</span>
               <SelectBox
                  defaultValue=""
                  onChange={(e) => runFilterLeft(e.target.value)}
               >
                  <option hidden disabled>
                     정렬
                  </option>
                  <option value="1">전체</option>
                  <option value="2">이름순</option>
                  <option value="3">가입일순</option>
                  <option value="4">등급순</option>
               </SelectBox>

               <SelectBox onChange={(e) => runFilterRight(e.target.value)}>
                  <option hidden disabled>
                     상태
                  </option>
                  <option value="1">전체</option>
                  <option value="2">활성</option>
                  <option value="3">비활성</option>
                  <option value="4">탈퇴</option>
               </SelectBox>
            </FilterWrap>
            <CheckBoxWrap>
               <label htmlFor="check">탈퇴회원 제외</label>
               <CheckBox
                  id="check"
                  checked={checkBoxStatus}
                  onChange={(e) => setCheckBoxStatus(e.target.checked)}
               ></CheckBox>
            </CheckBoxWrap>
            <SearchWrap>
               <SearchArea
                  placeholder="유저이름,아이디,이메일 검색"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               ></SearchArea>
               <SearchBtn>
                  <SearchBtnIcon icon={faMagnifyingGlass}></SearchBtnIcon>
               </SearchBtn>
            </SearchWrap>
         </ToolBarWrap>

         <Table
            tableRowNum={13}
            contents={veiwUsers}
            renderRow={(item) => (
               <>
                  <tr key={item.idx}>
                     <td>{item.name}</td>
                     <td>{item.id}</td>
                     <td>{item.email}</td>
                     <td>{item.date}</td>
                     <td>
                        {(() => {
                           switch (item.level) {
                              case 1:
                                 return "브론즈";
                              case 2:
                                 return "실버";
                              case 3:
                                 return "골드";
                              case 4:
                                 return "플레티넘";
                              case 5:
                                 return "VIP";
                           }
                        })()}
                     </td>
                     <td>
                        {(() => {
                           switch (item.manage) {
                              case 1:
                                 return "활성";
                              case 2:
                                 return "비활성";
                              case 3:
                                 return "탈퇴";
                           }
                        })()}
                     </td>
                     <td>
                        {item.manage !== 3 && (
                           <>
                              <ControlBtn
                                 manage={item.manage}
                                 onClick={() => {
                                    modalOpenBtn(item.manage, item.idx);
                                 }}
                              >
                                 {item.manage !== 1 ? "비활성" : "활성"}
                              </ControlBtn>
                              <DaleteBtn
                                 onClick={() => {
                                    modalOpenBtn(3, item.idx);
                                 }}
                              >
                                 탈퇴
                              </DaleteBtn>
                           </>
                        )}
                        {item.manage === 3 && <QuitUser>탈퇴회원</QuitUser>}
                     </td>
                  </tr>
               </>
            )}
            colgroup={
               <>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "7%" }} />
                  <col style={{ width: "13%" }} />
               </>
            }
            header={
               <>
                  <th>이름</th>
                  <th>아이디</th>
                  <th>이메일</th>
                  <th>가입일</th>
                  <th>등급</th>
                  <th>상태</th>
                  <th>관리</th>
               </>
            }
         ></Table>

         {modalOpen && (
            <Modal
               closeOn={() => {
                  setModalOpen(false);
                  setTargetId(null);
                  setBtnNumber(null);
               }}
               confimOn={btnNumber !== 3 ? inactiveUser : quitUser}
               title={btnNumber !== 3 ? "상태변경" : "탈퇴"}
               mainTxt={
                  btnNumber !== 3
                     ? "상태변경 하시겠습니까?"
                     : "해당 유저를 탈퇴처리 하시겠습니까?"
               }
               psTxt={"※ 실제 데이터에는 변경되지 않습니다."}
            ></Modal>
         )}
      </>
   );
}

export default User;
