import React, { JSX, useState, useRef, useEffect } from "react";
import { styled, css, keyframes } from "styled-components";
import { useOutletContext } from "react-router-dom";
import { itemGroup as dummyCttData, itme } from "../data/dummyCtt";
import Modal from "../components/Modal";
import { Background } from "../components";
import { Table } from "../components/Table";


// const CttTable = styled.table`
//    th {
//       border: 1px solid #ffb473;
//       background-color: #ffc898;
//       padding: 8px 10px;
//       text-align: left;
//    }

//    tr {
//       height: 30px;
//    }

//    td {
//       border: 1px solid #cfcfcf;
//       border-top: 0px;
//       height: 30px;
//    }
//    font-size: 14px;
//    text-align: center;
// `;

const TableWrap = styled.div`
   background-color: #fff;
   border-radius: 10px;
   height: 100%;
   border: 1px solid #efecec;
`;

const CttTable = styled.table`
   tr {
      border-bottom: 1px solid #f3f3f3;
   }
   tr > td,
   th {
      padding-left: 20px;
   }

   th {
      font-weight: 700;
      height: 50px;
   }

   td:not(:last-child) {
      height: 54px;
      border-right: 1px solid #f3f3f3;
   }
   width: 100%;
   text-align: left;
   font-size: 14px;
`;

const ItemImg = styled.div`
   > img {
      height: 90px;
   }

   vertical-align: middle;
   display: inline-block;
`;
const ItemNameBox = styled.input<{ active: boolean }>`
   &:focus {
      outline: none;
   }
   padding: 5px;
   background-color: ${({ active }) => (active ? "#f5f5f5" : "#efecec")};
   border: 1px solid ${({ active }) => (active ? "#a4b5ff" : "#d3d3d3")};
   border-radius: 5px;
`;
const btnBorderColor: Record<number, string> = {
   1: "#008cff",
   2: "#ff0000",
   3: "#464646",
};

const btnBackColor: Record<number, string> = {
   1: "#c6e3fc",
   2: "#ffe2e2",
   3: "#eeeeee",
};

const EditBtn = styled.button<{ index: number }>`
   /* border: 1px solid ${({ index }) => btnBorderColor[index]}; */
   background-color: ${({ index }) => btnBackColor[index]};
   color: ${({ index }) => btnBorderColor[index]};
   font-weight: 800;
   padding: 4px 11px;
   border-radius: 7px;
   font-size: 12px;
   margin-right: 4px;
   &:last-child {
      margin-right: 0px;
   }
`;

const NavWrap = styled.div`
   display: flex;
   padding-bottom: 20px;
`;
const NavBtn = styled.button<{ active?: boolean }>`
   height: 25px;
   width: 25px;
   text-align: center;
   font-weight: ${({ active }) => (active ? "800" : "500")};
   color: #4d4d4d;
`;

const dx = styled.div``;

type OutletContext = { setTitle: (title: string) => void };

function Contents(): JSX.Element {
   const { setTitle } = useOutletContext<OutletContext>();
   const [itemGroup, setItemGroup] = useState(dummyCttData);

   useEffect(() => {
      setTitle("콘텐츠 관리");
   }, [setTitle]);

   // 페이지네이션
   const VIEW_USER_NUM = 7;
   const [activePage, setActivePage] = useState(1);
   const totalPage = Math.ceil(itemGroup.length / VIEW_USER_NUM);

   const veiwUsers = itemGroup.slice(
      (activePage - 1) * VIEW_USER_NUM,
      activePage * VIEW_USER_NUM
   );
   // 페이지네이션 끝

   // 수정버튼

   const [editingIndex, setEditingIndex] = useState<number | null>(null);
   const [textBox1, setTextBox1] = useState("");
   const [textBox2, setTextBox2] = useState("");
   const [textBox3, setTextBox3] = useState<number | null>(null);
   const [edit, setEdit] = useState("");

   const handleClick = (id: number) => {
      if (editingIndex === id) {
         //저장버튼 눌렀을때
         setItemGroup((p) =>
            p.map((item) =>
               item.id === id
                  ? {
                       ...item,
                       name: textBox1.trim() === "" ? item.name : textBox1,
                       price: textBox2.trim() === "" ? item.price : textBox2,
                       count: textBox3 !== null ? textBox3 : item.count,
                    }
                  : item
            )
         );
         setEditingIndex(null);
      } else {
         //수정버튼 눌렀을때
         const target = veiwUsers.find((item) => item.id === id);
         if (target) {
            setEditingIndex(id);
            setTextBox1("");
            setTextBox2("");
            setTextBox3(null);
         }
      }
   };
   // 수정버튼 끝

   // 삭제버튼

   const [modalOpen, setModalOpen] = useState(false);
   const [targetId, setTargetId] = useState<number | null>(null);

   const deleteItem = () => {
      if (targetId === null) return;
      setItemGroup((p) => p.filter((item) => item.id !== targetId));
      setModalOpen(false);
   };

   // 삭제버튼 끝

   // 숨김버튼

   const [btnNumber, setBtnNumber] = useState<number | null>(null);
   const hideItem = () => {
      if (targetId === null) return;
      setItemGroup((p) =>
         p.map((item) =>
            item.id === targetId
               ? { ...item, status: item.status !== 1 ? 1 : 2 }
               : item
         )
      );
      setModalOpen(false);
   };

   // 숨김버튼 끝

   return (
      <>
         <Table
            tableRowNum={11}
            contents={veiwUsers}
            renderRow={(item) => (
               <>
                  <tr key={item.id}>
                     <td>{item.code}</td>
                     <td>
                        <ItemImg>
                           <img src={item.img} alt="상품사진" />
                        </ItemImg>
                     </td>
                     <td>
                        <ItemNameBox
                           type="text"
                           value={
                              editingIndex === item.id ? textBox1 : item.name
                           }
                           readOnly={editingIndex === item.id ? false : true}
                           onChange={(e) => {
                              if (editingIndex === item.id)
                                 setTextBox1(e.target.value);
                           }}
                           active={editingIndex === item.id}
                        />
                     </td>
                     <td>
                        <ItemNameBox
                           type="text"
                           value={
                              editingIndex === item.id ? textBox2 : item.price
                           }
                           readOnly={editingIndex === item.id ? false : true}
                           onChange={(e) => {
                              if (editingIndex === item.id)
                                 setTextBox2(e.target.value);
                           }}
                           active={editingIndex === item.id}
                        />
                     </td>
                     <td>
                        <ItemNameBox
                           type="text"
                           value={
                              editingIndex === item.id
                                 ? (textBox3 ?? "").toString()
                                 : item.count.toString()
                           }
                           readOnly={editingIndex === item.id ? false : true}
                           onChange={(e) => {
                              if (editingIndex === item.id)
                                 setTextBox3(Number(e.target.value));
                           }}
                           active={editingIndex === item.id}
                        />
                     </td>
                     <td>{item.veiw}</td>
                     <td>
                        <EditBtn index={1} onClick={() => handleClick(item.id)}>
                           {editingIndex === item.id ? "저장" : "수정"}
                        </EditBtn>
                        <EditBtn
                           index={2}
                           onClick={() => {
                              setModalOpen(true);
                              setTargetId(item.id);
                              setBtnNumber(1);
                           }}
                        >
                           삭제
                        </EditBtn>
                        <EditBtn
                           index={3}
                           onClick={() => {
                              setModalOpen(true);
                              setTargetId(item.id);
                              setBtnNumber(2);
                           }}
                        >
                           {item.status === 2 ? "해제" : "숨김"}
                        </EditBtn>
                     </td>
                  </tr>
               </>
            )}
            colgroup={
               <>
                 <col style={{ width: "50px" }} />
                  <col style={{ width: "100px" }} />
                  <col style={{ width: "250px" }} />
                  <col style={{ width: "150px" }} />
                  <col style={{ width: "100px" }} />
                  <col style={{ width: "80px" }} />
                  <col style={{ width: "120px" }} />
               </>
            }
            header={
               <>
                 <th>상품코드</th>
                  <th>상품이미지</th>
                  <th>상품명</th>
                  <th>상품가격</th>
                  <th>재고</th>
                  <th>조회</th>
                  <th>관리</th>
               </>
            }
         ></Table>

         {/* <TableWrap>
            <CttTable>
               
               {veiwUsers.map((item, index) => (
                  <tr
                     key={index}
                     style={{
                        backgroundColor:
                           item.status === 2 ? "#ececec8f" : undefined,
                     }}
                  >
                     
                  </tr>
               ))}
            </CttTable>
         </TableWrap> */}
         <NavWrap>
            <NavBtn onClick={() => setActivePage((p) => Math.max(p - 1, 1))}>
               {"<"}
            </NavBtn>
            {Array.from({ length: totalPage }, (_, i) => i + 1).map((num) => (
               <NavBtn
                  key={num}
                  onClick={() => setActivePage(num)}
                  style={{
                     fontWeight: activePage === num ? "800" : "normal",
                     color: activePage === num ? "#ff5160" : "#4d4d4d",
                  }}
               >
                  {num}
               </NavBtn>
            ))}

            <NavBtn
               onClick={() => setActivePage((p) => Math.min(p + 1, totalPage))}
            >
               {">"}
            </NavBtn>
         </NavWrap>
         {/* 모달창 */}
         {modalOpen && (
            <Modal
               closeOn={() => {
                  setModalOpen(false);
                  setTargetId(null);
                  setBtnNumber(null);
               }}
               confimOn={btnNumber === 1 ? deleteItem : hideItem}
               title={btnNumber === 1 ? "데이터 삭제" : "데이터 숨김"}
               mainTxt={
                  btnNumber === 1
                     ? "등록된 상품을 삭제하시겠습니까?"
                     : "등록된 상품을 숨기시겠습니까?"
               }
               psTxt={
                  btnNumber === 1
                     ? "※ 실제 데이터에서는 삭제되지 않습니다."
                     : ""
               }
            ></Modal>
         )}
      </>
   );
}

export default Contents;
