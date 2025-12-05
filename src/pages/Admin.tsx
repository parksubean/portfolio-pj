import { styled, css } from "styled-components";
import React, { JSX, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
   ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
   CategoryScale,
   ArcElement,
   Tooltip,
   Legend,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

import {
   faUser,
   faAddressCard,
   faComment,
} from "@fortawesome/free-regular-svg-icons";

import { faCoins } from "@fortawesome/free-solid-svg-icons";

const CardListWrap = styled.div`
   display: flex;
   justify-content: space-between;
`;

const CardWrap = styled.div`
   background-color: #fff3e9;
   width: calc(100% / 4 - 15px);
   height: 110px;
   border-radius: 15px;
   display: flex;
   gap: 60px;
   justify-content: center;
   align-items: center;
`;
const CardIcon = styled(FontAwesomeIcon)`
   background-color: #ff916c;
   font-size: 25px;
   color: #fff;
   padding: 15px;
   border-radius: 10px;
`;
const CardTxtWrap = styled.div``;
const CardMainTxt = styled.div`
   font-weight: 700;
   font-size: 20px;
`;
const CardDefultCss = css`
   background-color: #fff;
   border-radius: 15px;
   border: 1px solid #efecec;
   padding: 20px;
`;
const CardSubTxt = styled.div`
   font-size: 16px;
   color: #9c9fa6;
`;

const CttMainTxt = styled.div`
   font-size: 14px;
   font-weight: 800;
   color: #424242;
`;

const ChartWrap = styled.div`
   height: 43%;
   width: 100%;
   display: flex;
   gap: 20px;
`;

const LineChartWrap = styled.div`
   ${CardDefultCss}
   display: flex;
   flex-direction: column;
   width: 43%;
`;
const DouNChartWrap = styled.div`
   ${CardDefultCss}
   width: 25%;
   box-sizing: border-box;
`;

const CardItem = [
   { icon: faUser, mainTxt: "385+", subTxt: "오늘 방문자 수" },
   { icon: faAddressCard, mainTxt: "120+", subTxt: "오늘 회원가입 수" },
   { icon: faCoins, mainTxt: "350+", subTxt: "오늘 판매갯수" },
   { icon: faComment, mainTxt: "10+", subTxt: "새로운 문의" },
];

const CustomerWrap = styled.div`
   ${CardDefultCss}
   width: 32%;
`;

const CustomerCttWrap = styled.div`
   width: 100%;
   font-size: 14px;
   padding: 0px 0 20px;
   font-weight: 600;
`;
const InfoWrap = styled.div`
   display: flex;
`;

const Cname = styled.span``;
const Ctit = styled.span`
   margin-left: auto;
   color: #9c9fa6;
`;
const Cnumber = styled.span`
   margin-left: 10px;
   color: #ff5160;
`;
const CnumberBar = styled.div`
   background-color: #ededed;
   width: 100%;
   border-radius: 40px;
   height: 7px;
   margin-top: 10px;
`;

const Fill = styled.div<{ fill: number }>`
   width: ${({ fill }) => fill}%;
   background-color: #ff5160;
   height: 7px;
   border-radius: 40px;
`;

const BarSubTxt = styled.div`
   text-align: right;
   font-size: 12px;
   margin-top: 5px;
   padding: 3px 5px;
   border: 1px solid #ffffff;
   background-color: #f0f0f0;
   border-radius: 10px;
`;

type Customer = {
   name: string;
   number: number;
   grade: string;
   fill: number;
};

const customerList: Customer[] = [
   { name: "홍길동", number: 39, grade: "골드", fill: 70 },
   { name: "김철수", number: 26, grade: "골드", fill: 60 },
   { name: "김영희", number: 15, grade: "실버", fill: 45 },
   { name: "한딸기", number: 13, grade: "실버", fill: 38 },
];

const ScrollWrap = styled.div`
   height: calc(100% - 20px);
   overflow: auto;
   scrollbar-width: none;
   -ms-overflow-style: none;
   &::-webkit-scrollbar {
      display: none;
   }
`;
const BoardWrap = styled.div`
   ${CardDefultCss}
   display: flex;
   gap: 90px;
   height: 300px;
`;
const BoardCttWrap = styled.div`
   width: 33.333%;
`;

const Flex = styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 20px;
`;
const MoreBtn = styled.button`
   font-size: 12px;
   color: #797979;
   margin-left: auto;
`;
const BoardList = styled.button`
   display: flex;
   align-items: center;
   width: 100%;
   margin: 8px 0;
`;
const BTitle = styled.span`
   font-weight: 600;
   color: #2b2b2b;
`;
const BDate = styled.span`
   color: #797979;
   margin-left: auto;
`;

const noticeList = [
   { title: "신규 회원 가입 이벤트 시작", date: "2025-08-25" },
   { title: "시스템 점검 안내 (9/1 새벽 2시~5시)", date: "2025-08-28" },
   { title: "여름 시즌 오프 세일 안내", date: "2025-07-15" },
   { title: "무이자 할부 카드 안내", date: "2025-06-30" },
   { title: "고객센터 운영시간 변경", date: "2025-06-01" },
   { title: "봄맞이 사은품 증정 이벤트", date: "2025-03-20" },
   { title: "택배 파업 관련 배송 지연 안내", date: "2025-02-05" },
   { title: "신상품 출시 안내", date: "2025-01-15" },
];

const inquiryList = [
   { title: "배송 기간은 얼마나 걸리나요?", date: "2025-09-12" },
   { title: "교환/반품 절차가 어떻게 되나요?", date: "2025-08-30" },
   { title: "무이자 할부 가능한 카드 종류는?", date: "2025-08-18" },
   { title: "회원 등급별 혜택은 무엇이 있나요?", date: "2025-07-22" },
   { title: "상품 재입고 알림 신청은 가능한가요?", date: "2025-07-05" },
   { title: "비회원도 주문이 가능한가요?", date: "2025-06-25" },
   { title: "쿠폰 사용 방법을 알려주세요", date: "2025-05-19" },
   { title: "배송지를 변경하고 싶어요", date: "2025-04-08" },
];

const eventList = [
   { title: "추석 맞이 전 상품 10% 할인 이벤트", date: "2025-09-05" },
   { title: "신규 회원 가입 시 사은품 증정", date: "2025-08-20" },
   { title: "여름 시즌 오프 세일 시작", date: "2025-07-10" },
   { title: "카드사 무이자 할부 이벤트", date: "2025-06-25" },
   { title: "봄맞이 포인트 2배 적립 이벤트", date: "2025-03-15" },
   { title: "한정 수량 무료 배송 이벤트", date: "2025-02-28" },
   { title: "신상품 런칭 기념 할인 이벤트", date: "2025-01-20" },
   { title: "홈페이지 리뉴얼 기념 이벤트", date: "2024-12-15" },
];

const memberStats = [
   {
      colName: "7월",
      col1: 125,
      col2: 30,
      col3: 10,
      col4: 2,
      col5: 2,
      col6: 2,
   },
   {
      colName: "8월",
      col1: 125,
      col2: 30,
      col3: 10,
      col4: 2,
      col5: 2,
      col6: 2,
   },
   {
      colName: "9월",
      col1: 125,
      col2: 30,
      col3: 10,
      col4: 2,
      col5: 2,
      col6: 2,
   },
   {
      colName: "10월",
      col1: 125,
      col2: 30,
      col3: 10,
      col4: 2,
      col5: 2,
      col6: 2,
   },
];

const MemberTBWrap = styled.div`
   ${CardDefultCss}
`;

const MemberTB = styled.table`
   margin-top: 20px;
   table-layout: fixed;
   width: 100%;
   font-size: 14px;
   border-collapse: collapse;
   th {
      background-color: #ff916d67;
   }

   th,
   td {
      border: 1px solid #e9e9e9;
      height: 40px;
      text-align: center;
   }

   th:first-child,
   td:first-child {
      width: 200px;
   }
`;
// -------------------------------------------------------------
type OutletContext = { setTitle: (title: string) => void };

function Admin(): JSX.Element {
   const { setTitle } = useOutletContext<OutletContext>();

   useEffect(() => {
      setTitle("대시보드");
   }, [setTitle]);

   const labels = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
   ];

   const data = {
      labels,
      datasets: [
         {
            label: "2021년",
            data: [65, 59, 80, 81, 56, 55, 30, 10, 68],
            borderColor: "#ff5160",
            backgroundColor: "#ff5160",
            tension: 0,
            borderWidth: 1.5,
         },
         {
            label: "2022년",
            data: [10, 130, 20, 36, 100, 90, 30, 60, 80],
            borderColor: "#fe7771",
            backgroundColor: "#fe7771",
            tension: 0,
            borderWidth: 1.5,
         },
         {
            label: "2023년",
            data: [80, 30, 90, 94, 50, 68, 30, 76, 98],
            borderColor: "#ff916c",
            backgroundColor: "#ff916c",
            tension: 0,
            borderWidth: 1.5,
         },
      ],
   };

   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: "top" as const,
         },
         layout: {
            padding: {
               top: 60, // 범례 아래 차트 시작 간격
            },
         },
      },
   };

   const data2 = {
      labels: ["보석", "원석", "큐빅", "기타"], // 카테고리
      datasets: [
         {
            label: "카테고리별 매출 비율",
            data: [40, 28, 15, 25], // 비율 값
            backgroundColor: ["#ff5160", "#fe7771", "#ff916c", "#ffb06b"],
            borderWidth: 2,
         },
      ],
   };

   const options2 = {
      responsive: true,
      maintainAspectRatio: false, // 부모 div에 맞춰 크기 조절
      plugins: {
         legend: {
            position: "top" as const,
         },
      },
      layout: {
         padding: {
            top: 10, // 차트 위 여백
            bottom: 20,
         }, // top, bottom, left, right 모두 적용
      },
   };

   return (
      <>
         <CardListWrap>
            {CardItem.map((item, index) => (
               <CardWrap key={index}>
                  <CardTxtWrap>
                     <CardMainTxt>{item.mainTxt}</CardMainTxt>
                     <CardSubTxt>{item.subTxt}</CardSubTxt>
                  </CardTxtWrap>
                  <CardIcon icon={item.icon as IconProp}></CardIcon>
               </CardWrap>
            ))}
         </CardListWrap>
         <ChartWrap>
            <LineChartWrap>
               <CttMainTxt>매출 현황 그래프</CttMainTxt>
               <Line options={options} data={data} />
            </LineChartWrap>
            <DouNChartWrap>
               <CttMainTxt>카테고리별 매출 비율</CttMainTxt>
               <Doughnut options={options2} data={data2} />
            </DouNChartWrap>
            <CustomerWrap>
               <CttMainTxt style={{ marginBottom: "20px" }}>
                  단골 등급 현황
               </CttMainTxt>
               <ScrollWrap>
                  {customerList.map((item, index) => (
                     <CustomerCttWrap key={index}>
                        <InfoWrap>
                           <Cname>{item.name}</Cname>
                           <Ctit>구매횟수</Ctit>
                           <Cnumber>{item.number}회</Cnumber>
                        </InfoWrap>
                        <CnumberBar>
                           <Fill fill={item.fill}></Fill>
                        </CnumberBar>
                        <BarSubTxt>다음등급 : {item.grade}</BarSubTxt>
                     </CustomerCttWrap>
                  ))}
               </ScrollWrap>
            </CustomerWrap>
         </ChartWrap>
         <BoardWrap>
            <BoardCttWrap>
               <Flex>
                  <CttMainTxt>공지사항 관리</CttMainTxt>
                  <MoreBtn>더보기 +</MoreBtn>
               </Flex>
               {noticeList.map((itme, index) => (
                  <BoardList key={index}>
                     <BTitle>{itme.title}</BTitle>
                     <BDate>{itme.date}</BDate>
                  </BoardList>
               ))}
            </BoardCttWrap>
            <BoardCttWrap>
               <Flex>
                  <CttMainTxt>1:1문의 관리</CttMainTxt>
                  <MoreBtn>더보기 +</MoreBtn>
               </Flex>
               {inquiryList.map((itme, index) => (
                  <BoardList key={index}>
                     <BTitle>{itme.title}</BTitle>
                     <BDate>{itme.date}</BDate>
                  </BoardList>
               ))}
            </BoardCttWrap>
            <BoardCttWrap>
               <Flex>
                  <CttMainTxt>이벤트 관리</CttMainTxt>
                  <MoreBtn>더보기 +</MoreBtn>
               </Flex>
               {eventList.map((itme, index) => (
                  <BoardList key={index}>
                     <BTitle>{itme.title}</BTitle>
                     <BDate>{itme.date}</BDate>
                  </BoardList>
               ))}
            </BoardCttWrap>
         </BoardWrap>
         <MemberTBWrap>
            <CttMainTxt>회원현황</CttMainTxt>
            <MemberTB>
               <tr>
                  <th></th>
                  <th>전체회원</th>
                  <th>방문자</th>
                  <th>신규가입</th>
                  <th>탈퇴회원</th>
                  <th>휴먼회원</th>
                  <th>로그인 횟수</th>
               </tr>
               {memberStats.map((item, index) => (
                  <tr key={index}>
                     <th className="month">{item.colName}</th>
                     <td>{item.col1}</td>
                     <td>{item.col2}</td>
                     <td>{item.col3}</td>
                     <td>{item.col4}</td>
                     <td>{item.col5}</td>
                     <td>{item.col6}</td>
                  </tr>
               ))}
            </MemberTB>
         </MemberTBWrap>
      </>
   );
}

export default Admin;
