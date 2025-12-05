import { styled, css } from "styled-components";
import React, { JSX, useRef, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { dummyNotice } from "../data/dummyNotice";
import { Table } from "../components/Table";

const SearchWrap = styled.div`
   display: flex;
   padding: 20px;
   box-shadow: 0 0 6px 5px #f5f5f5;
   margin-top: 10px;
`;
const SearchArea = styled.input.attrs({ type: "text" })`
   width: 100%;
   height: 35px;
   padding-left: 10px;
   border: 1px solid #efecec;
   border-radius: 7px;

   &:focus {
      outline: none;
   }
`;
const SearchBtn = styled.button`
   background-color: #ff7771;
   padding: 10px;
   width: 80px;
   margin-left: 10px;
   border-radius: 7px;
   color: #fff;
   height: 34px;
   display: flex;
   align-items: center;
   justify-content: center;
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

const WriteBtn = styled.button`
   border: 1px solid #ff916c;
   padding: 10px;
   width: 80px;
   margin-left: 10px;
   border-radius: 7px;
   color: #ff916c;
   font-weight: 800;
   height: 34px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-left: auto;
`;

const WriteWrap = styled.div<{ active: boolean }>`
   position: fixed;
   display: ${({ active }) => (active ? "flex" : "none")};
   align-items: center;
   justify-content: center;
   background-color: #00000014;
   width: 100%;
   height: 100%;
   left: 0;
   top: 0;
   opacity: 0%;
   animation: fadeIn 0.3s ease-in forwards;

   @keyframes fadeIn {
      from {
         opacity: 0;
      }
      to {
         opacity: 1;
      }
   }
`;

const WriteSubWrap = styled.div`
   p > span {
      font-size: 14px;
      margin-right: 50px;
      width: 100px;
      display: flex;
      align-items: center;
      font-weight: 700;
   }
   p {
      width: 100%;
      display: flex;
      align-items: center;
   }
   display: flex;
   padding: 40px;
   width: 1300px;
   height: 760px;
   background-color: #ffffff;
   border-radius: 7px;
   flex-direction: column;
   gap: 20px;
`;
const WriteTitle = styled.input.attrs({ type: "text" })<{ error: boolean }>`
   font-size: 14px;
   padding: 10px;
   background-color: #efecec;
   border: none;
   height: 35px;
   width: 100%;
   border: ${({ error }) => (error ? "1px solid #ff9b9b" : "none")};
`;
const WriteCtt = styled.textarea<{ error: boolean }>`
   height: 520px;
   width: 100%;
   padding: 10px;
   border: 1px solid ${({ error }) => (error ? " #ff9b9b" : "#efecec")};
`;
const WriteCttBtnWrap = styled.div`
   margin-left: auto;
   display: flex;
   align-items: center;
`;
const btnStyle = css`
   width: 60px;
   height: 35px;
   font-weight: 700;
   border-radius: 7px;
`;

const CancleBtn = styled.button`
   ${btnStyle}
   background-color: #efecec;
   color: #686868;
`;
const ConfirmBtn = styled.button`
   ${btnStyle}
   background-color: #ff7771;
   color: #fff;
   margin-left: 10px;
`;

const CheckBoxLabel = styled.label`
   font-size: 14px;
   margin-left: 5px;
`;

const CheckBox = styled.input.attrs({ type: "checkBox" })`
   appearance: none;
   border: 1px solid #999;
   border-radius: 4px;
   width: 14px;
   height: 14px;
   margin-left: -10px;
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

const btnBackColor: Record<number, string> = {
   1: "#00d6722c",
   2: "#eeeeee",
   3: "#c6e3fc",
   4: "#eeeeee",
};

const btnFontColor: Record<number, string> = {
   1: "#08af78",
   2: "#8a8a8a",
   3: "#008cff",
   4: "#8a8a8a",
};

const BtnStyled = styled.button<{ manage: number }>`
   background-color: ${({ manage }) => btnBackColor[manage]};
   padding: 4px 11px;
   width: 60px;
   color: ${({ manage }) => btnFontColor[manage]};
   border-radius: 7px;
   font-size: 12px;
   font-weight: 800;
`;

function Notice(): JSX.Element {
   type OutletContext = { setTitle: (title: string) => void };

   const { setTitle } = useOutletContext<OutletContext>();
   useEffect(() => {
      setTitle("사용자 관리");
   }, [setTitle]);

   // 글쓰기 버튼
   const [dummyData, setDummyData] = useState(dummyNotice);
   const [plusTitle, setPlusTitle] = useState("");
   const [plusCtt, setPlusCtt] = useState("");
   const [checkBoxStatus, setCheckBoxStatus] = useState(false);
   const [plusTitleNone, setPlusTitleNone] = useState(false);
   const [plusCttNone, setPlusCttNone] = useState(false);
   const addDummyData = () => {
      const nowDate = new Date();
      setDummyData((p) => [
         ...p,
         {
            id: p.length + 1,
            title: plusTitle,
            writer: "testUser",
            date: `${nowDate.getFullYear()}-${
               nowDate.getMonth() + 1
            }-${nowDate.getDate()}`,
            pin: checkBoxStatus ? 1 : 2,
            hide: 4,
         },
      ]);
   };

   const addBtnConfirm = () => {
      setPlusTitleNone(plusTitle === "");
      setPlusCttNone(plusCtt === "");
      if (plusTitle && plusCtt) {
         addDummyData();
         setCheckBoxStatus(false);
         setPlusTitle("");
         setPlusCtt("");
         setWriteOpen(false);
      }
   };

   // 글쓰기 버튼 끝

   // 고정 , 숨김버튼

   const btnManage = (id: number, division: "pin" | "hide") => {
      setDummyData((p) =>
         p.map((item) => {
            if (item.id !== id) return item;

            if (division === "pin") {
               return { ...item, pin: item.pin === 1 ? 2 : 1 };
            } else if (division === "hide") {
               return { ...item, hide: item.hide === 3 ? 4 : 3 };
            }
            return item;
         })
      );
   };

   // 고정 , 숨김버튼 끝

   // 검색
   const [search, setSearch] = useState("");

   const serchNotice = dummyData.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
   );
   // 검색 끝

   const [writeOpen, setWriteOpen] = useState(false);
   return (
      <>
         <SearchWrap>
            <SearchArea
               placeholder="제목을 검색하세요"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            ></SearchArea>
            {/* <SearchBtn>검색하기</SearchBtn> */}
         </SearchWrap>
         <WriteBtn
            onClick={() => {
               setWriteOpen(true);
            }}
         >
            + 글쓰기
         </WriteBtn>
         <WriteWrap active={writeOpen}>
            <WriteSubWrap>
               <p>
                  <span>분류</span>
                  <CheckBox
                     id="pin"
                     checked={checkBoxStatus}
                     onChange={(e) => setCheckBoxStatus(e.target.checked)}
                  />
                  <CheckBoxLabel htmlFor="pin">게시글 고정</CheckBoxLabel>
               </p>
               <p>
                  <span>제목</span>
                  <WriteTitle
                     value={plusTitle}
                     onChange={(e) => {
                        setPlusTitle(e.target.value);
                     }}
                     error={plusTitleNone}
                     placeholder="제목을 입력하세요"
                  />
               </p>
               <p>
                  <span>내용</span>
                  <WriteCtt
                     value={plusCtt}
                     onChange={(e) => {
                        setPlusCtt(e.target.value);
                     }}
                     error={plusCttNone}
                     placeholder="내용을 입력하세요"
                  />
               </p>
               <WriteCttBtnWrap>
                  <span
                     style={{
                        fontSize: "13px",
                        marginRight: "10px",
                        color: "#919191",
                        fontWeight: "700",
                     }}
                  >
                     * 목록에는 일시적으로 추가되지만 로그아웃시 초기화 됩니다.
                  </span>
                  <CancleBtn
                     onClick={() => {
                        setWriteOpen(false);
                        setCheckBoxStatus(false);
                        setPlusTitle("");
                        setPlusCtt("");
                        setPlusTitleNone(false);
                        setPlusCttNone(false);
                     }}
                  >
                     취소
                  </CancleBtn>
                  <ConfirmBtn onClick={addBtnConfirm}>등록</ConfirmBtn>
               </WriteCttBtnWrap>
            </WriteSubWrap>
         </WriteWrap>
         <Table
            tableRowNum={11}
            contents={serchNotice}
            renderRow={(item) => (
               <>
                  <tr key={item.id}>
                     <td>{item.id}</td>
                     <td>
                        <a href="">{item.title}</a>
                     </td>
                     <td>{item.writer}</td>
                     <td>{item.date}</td>
                     <td>
                        <BtnStyled
                           manage={item.pin}
                           onClick={() => {
                              btnManage(item.id, "pin");
                           }}
                        >
                           {(() => {
                              switch (item.pin) {
                                 case 1:
                                    return "고정됨";
                                 case 2:
                                    return "비고정";
                              }
                           })()}
                        </BtnStyled>
                     </td>
                     <td>
                        <BtnStyled
                           manage={item.hide}
                           onClick={() => {
                              btnManage(item.id, "hide");
                           }}
                        >
                           {(() => {
                              switch (item.hide) {
                                 case 3:
                                    return "공개";
                                 case 4:
                                    return "숨김";
                              }
                           })()}
                        </BtnStyled>
                     </td>
                  </tr>
               </>
            )}
            colgroup={
               <>
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
               </>
            }
            header={
               <>
                  <th>번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th>고정</th>
                  <th>숨김</th>
               </>
            }
         ></Table>
      </>
   );
}

export default Notice;
