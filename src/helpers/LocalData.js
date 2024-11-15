export const confirmAllDay =
  "Нельзя добавить событие на весь день. Пожалуйста, выберите временной интервал.";

export const pastGeoData = {
  end_time: "",
  ordering: "",
  status: 1,
  comment: "",
  set_start_time: null,
  set_end_time: null,
  point_guid: "",
  start_time: "02.10.2024",
  route_sheet_guid: "",
  guid: "",
  myGeo: true,
  point: "Стартовая точка",
};

export const dataCategory = [
  {
    codeid: 1,
    name: "Мои заявки",
    link: "/app/main",
    img: "https://img.freepik.com/premium-vector/budget-planning-flat-illustration-is-scalable-and-easy-to-use_203633-7957.jpg?w=900",
    pathApi: "/app/main",
  },
  {
    codeid: 2,
    name: "Цех",
    link: "/invoice/main",
    img: "https://img.freepik.com/premium-vector/teamwork-web-concept-with-character-scene-man-woman-work-together-construct-cubes-developing-project-people-situation-flat-design-vector-illustration-social-media-marketing-material_9209-12505.jpg?w=1380",
    pathApi: "/invoice/main",
  },
  {
    codeid: 3,
    name: "Остатки",
    link: "/leftovers",
    img: "https://img.freepik.com/free-vector/button-style-concept-illustration_114360-4428.jpg?size=626&ext=jpg&ga=GA1.1.712878996.1706520692&semt=ais",
    pathApi: "/leftovers",
  },
  {
    codeid: 4,
    name: "Торговые точки",
    link: "/points/main",
    img: "https://img.freepik.com/free-vector/balance-sheet-cartoon-web-icon-accounting-process-finance-analyst-calculating-tools-financial-consulting-idea-bookkeeping-service_335657-2313.jpg?t=st=1711965019~exp=1711968619~hmac=635d5b94c27cf917e8532dfd722c44aba43db051d262065031cdac53408da1ab&w=900",
    pathApi: "/points/main",
  },
  // {
  //   codeid: 5,
  //   name: "Возврат",
  //   link: "/return/history",
  //   img: "https://img.freepik.com/free-vector/balance-sheet-cartoon-web-icon-accounting-process-finance-analyst-calculating-tools-financial-consulting-idea-bookkeeping-service_335657-2313.jpg?t=st=1711965019~exp=1711968619~hmac=635d5b94c27cf917e8532dfd722c44aba43db051d262065031cdac53408da1ab&w=900",
  //   pathApi: "/return/history",
  // },
  // {
  //   codeid: 6,
  //   name: "Оплата и долги",
  //   link: "/pay",
  //   img: "https://img.freepik.com/free-vector/euro-coins-concept-illustration_114360-15485.jpg?t=st=1710925698~exp=1710929298~hmac=4fb3746133437b6b0ca94daa3d06c8c634817a0562bb3e4ac1df5e613f3512bd&w=740",
  //   pathApi: "/pay",
  // },
  {
    codeid: 7,
    name: "Траты",
    link: "expense",
    img: "https://img.freepik.com/free-vector/finance-department-employees-are-calculating-expenses-company-s-business_1150-41782.jpg?t=st=1711965120~exp=1711968720~hmac=96a672de3602a7397d6e0b7452abfa17eaa700d42fd08a2a3e244eb154b7bd30&w=1380",
    pathApi: "expense",
  },
  // {
  //   codeid: 1,
  //   name: "Мои заявки",
  //   link: "main_invoice/accept_prod",
  //   img: "https://img.freepik.com/free-vector/posts-concept-illustration_114360-112.jpg?w=740&t=st=1710925459~exp=1710926059~hmac=1fceb9efe8e3f24d7d4bcee953232bf181a89b4fc703a7086866134fe73cd5d7",
  //   pathApi: "main_invoice/accept_prod",
  // },
];

export const listMenuLocal = [
  { name: "Информация", codeid: 0 },
  { name: "Возврат", codeid: 1 },
  { name: "Реализация", codeid: 2 },
  { name: "Оплата", codeid: 3 },
  { name: "Фото отчёт", codeid: 4 },
  { name: "Задания от руководителя", codeid: 5 },
];
