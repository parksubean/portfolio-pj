export interface itme {
   id: number;
   code: number;
   img: string;
   name: string;
   price: string;
   count: number;
   veiw: number;
   status: number;
}

export const itemGroup: itme[] = [
   {
      id: 0,
      code: 123578,
      img: "/images/jewel1.jpg",
      name: "아이템1",
      price: "123,323",
      count: 2345,
      veiw: 245,
      status: 1,
   },
   {
      id: 1,
      code: 234566,
      img: "/images/jewel2.jpg",
      name: "아이템2",
      price: "124,133",
      count: 8678,
      veiw: 4673,
      status: 1,
   },
   {
      id: 2,
      code: 577432,
      img: "/images/jewel3.jpg",
      name: "아이템3",
      price: "24,323",
      count: 5731,
      veiw: 232,
      status: 1,
   },
   {
      id: 3,
      code: 123543,
      img: "/images/jewel4.jpg",
      name: "아이템4",
      price: "3,323",
      count: 54723,
      veiw: 611,
      status: 2,
   },
   {
      id: 4,
      code: 634232,
      img: "/images/jewel5.jpg",
      name: "아이템5",
      price: "12,323",
      count: 2384,
      veiw: 645,
      status: 1,
   },
];
