import React, { ReactNode, useState, useEffect } from "react";
import { styled } from "styled-components";

const TableWrap = styled.div`
   /* background-color: #fff; */
   border-radius: 10px;
   height: 100%;
   border: 1px solid #efecec;
`;

const TableList = styled.table`
   tr:not(:last-child),
   thead {
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

   td {
      height: 54px;
   }
   width: 100%;
   text-align: left;
   font-size: 14px;
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

interface tableType<T> {
   header: ReactNode;
   children?: ReactNode;
   contents: T[];
   renderRow: (item: T) => ReactNode;
   tableRowNum: number;
   colgroup?: ReactNode;
}

export const Table = <T,>({
   header,
   contents,
   tableRowNum,
   renderRow,
   colgroup,
}: tableType<T>) => {
   // 페이지네이션 , 페이지 구현
   const VIEW_USER_NUM = tableRowNum;
   const totalPage = Math.ceil(contents.length / VIEW_USER_NUM);
   const [activePage, setActivePage] = useState(1);

   const veiwUsers = contents.slice(
      (activePage - 1) * VIEW_USER_NUM,
      activePage * VIEW_USER_NUM
   );
   // 페이지네이션 , 페이지 구현 끝
   return (
      <>
         <TableWrap>
            <TableList>
               <colgroup>{colgroup}</colgroup>
               <thead>
                  <tr>{header}</tr>
               </thead>
               <tbody>{veiwUsers.map((item, index) => renderRow(item))}</tbody>
            </TableList>
         </TableWrap>

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
      </>
   );
};
