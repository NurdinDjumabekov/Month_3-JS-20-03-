///////
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import HourglassEmptyIcon from "@mui/icons-material/Cached";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

///////
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

///////
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";

/////// icons
import HomeOutlinedIcon from "@mui/icons-material/FormatListNumbered";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AvTimerOutlinedIcon from "@mui/icons-material/AvTimerOutlined";
import ChecklistIcon from "@mui/icons-material/Checklist";
import TaxiAlertIcon from "@mui/icons-material/TaxiAlert";

/////// icons
import RoomIcon from "@mui/icons-material/Room";
// import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import HistoryIcon from "@mui/icons-material/History";
import AddHomeIcon from "@mui/icons-material/AddBusiness";

import time from "../assets/images/back-in-time.png";
import calendare from "../assets/images/calendar.png";
import prod from "../assets/images/web-settings.png";
import end from "../assets/images/good-signal.png";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import NearMeIcon from "@mui/icons-material/NearMe";

export const objStatusOrders = {
  0: {
    text: "Заявка подана",
    img: calendare,
    color: "#2196f3",
    class: "edit",
    icon: <InventoryOutlinedIcon />,
  },
  "-2": {
    text: "Идёт подготовка к производству, редактирование невозможно!",
    img: time,
    color: "#e7515a",
    class: "noEdit",
    icon: <InventoryOutlinedIcon />,
  },
  1: {
    text: "Заявка уже в производстве",
    img: prod,
    color: "#4361ee",
    class: "prod",
    icon: <AccessTimeOutlinedIcon />,
  },
  2: {
    text: "Товары на складе и готовы к отгрузке",
    img: end,
    color: "#00ab55",
    class: "sgp",
    icon: <CheckCircleOutlinedIcon />,
  },
  3: {
    text: "Отгружено торговому агенту",
    img: end,
    color: "#00ab55",
    class: "sgp",
    icon: <CheckCircleOutlinedIcon />,
  },
};

export const objStatusOrdersMini = {
  0: "Заявка подана",
  "-2": "Подготовка к производству",
  1: "В производстве",
  2: "Товары на складе",
  3: "Отгружено торговому агенту",
};

export const listStatusOrders = [
  {
    text: "Заявка подана",
    img: calendare,
    color: "#2196f3",
    class: "edit",
    icon: <InventoryOutlinedIcon />,
  },
  // {
  //   text: "Идёт подготовка к производству, редактирование невозможно!",
  //   img: time,
  //   color: "#e7515a",
  //   class: "noEdit",
  //   icon: <InventoryOutlinedIcon />,
  // },
  {
    text: "Заявка уже в производстве",
    img: prod,
    color: "#4361ee",
    class: "prod",
    icon: <AccessTimeOutlinedIcon />,
  },
  {
    text: "Товары на складе и готовы к отгрузке",
    img: end,
    color: "#00ab55",
    class: "sgp",
    icon: <CheckCircleOutlinedIcon />,
  },
  // {
  //   text: "Товары на складе и готовы к отгрузке",
  //   img: end,
  //   color: "#00ab55",
  //   class: "sgp",
  //   icon: <CheckCircleOutlinedIcon />,
  // },
];

export const objActionInvoice = {
  1: {
    text: "Сохранить",
    img: <LibraryAddIcon sx={{ width: 16, height: 16 }} />,
  },
  2: {
    text: "Редактировать",
    img: <BorderColorOutlinedIcon sx={{ width: 16, height: 16 }} />,
  },
};

export const listActionsTitle = [
  {
    id: 1,
    name: "Список товаров",
    img: <ContentPasteSearchOutlinedIcon sx={{ color: "#fff", width: 16 }} />,
    imgActive: (
      <ContentPasteSearchOutlinedIcon sx={{ color: "#1976d2", width: 16 }} />
    ),
  },
  {
    id: 2,
    name: "Ингредиенты",
    img: <ChecklistRtlIcon sx={{ color: "#fff", width: 16 }} />,
    imgActive: <ChecklistRtlIcon sx={{ color: "#1976d2", width: 16 }} />,
  },
  {
    id: 3,
    name: "Замесы",
    img: <EventRepeatIcon sx={{ color: "#fff", width: 16 }} />,
    imgActive: <EventRepeatIcon sx={{ color: "#1976d2", width: 16 }} />,
  },
];

export const objStatusText = {
  1: "Товар добавлен!",
  2: "Товар обновлён!",
};

export const listMenu = [
  {
    id: 1,
    title: "Реестр заявок",
    icon: <ReceiptLongIcon sx={{ color: "#fff" }} />,
    iconActive: <ReceiptLongIcon sx={{ color: "#988c7d" }} />,
    link: "/",
  },
  {
    id: 4,
    title: "Производство",
    icon: <AvTimerOutlinedIcon sx={{ color: "#fff" }} />,
    iconActive: <AvTimerOutlinedIcon sx={{ color: "#988c7d" }} />,
    link: "/",
  },
  {
    id: 5,
    title: "Склад готовой продукции",
    icon: <HomeWorkIcon sx={{ color: "#fff" }} />,
    link: "/",
  },
  {
    id: 6,
    title: "Маршруты ТА",
    icon: <TaxiAlertIcon sx={{ color: "#fff" }} />,
    link: "/all_agents",
  },
  {
    id: 7,
    title: "Долги и оплаты ТА",
    icon: <PaymentsIcon sx={{ color: "#fff" }} />,
    link: "/all_agents",
  },
  {
    id: 10,
    title: "Настройки",
    icon: <SettingsSuggestOutlinedIcon sx={{ color: "#fff" }} />,
    link: "/asd",
  },
  {
    id: 15,
    title: "Отчеты",
    icon: <SummarizeOutlinedIcon sx={{ color: "#fff" }} />,
    link: "/asd",
  },
  {
    id: 26,
    title: "Справочники",
    icon: <AccountTreeOutlinedIcon sx={{ color: "#fff" }} />,
    link: "/as",
  },
];

export const listActionRoute = [
  {
    id: 1,
    title: "Координаты всех ТА",
    icon: <RoomIcon sx={{ color: "#fff" }} />,
    link: "/",
  },
  {
    id: 2,
    title: "Список маршрутов",
    icon: <ChecklistRtlIcon sx={{ color: "#fff" }} />,
    link: "/",
  },
  {
    id: 3,
    title: "История маршрутов",
    icon: <HistoryIcon sx={{ color: "#fff" }} />,
    link: "/",
  },
];

export const styleRoutes = {
  routeLineWidth: ["interpolate", ["linear"], ["zoom"], 5, 1, 2, 3],
  substrateLineWidth: ["interpolate", ["linear"], ["zoom"], 1, 3, 2, 5],
  haloLineWidth: 5,
};

export const styleRoutesNoPlan = {
  routeLineWidth: ["interpolate", ["linear"], ["zoom"], 5, 1, 2, 3],
  substrateLineWidth: ["interpolate", ["linear"], ["zoom"], 1, 3, 2, 5],
  haloLineWidth: 15,
};

export const listAcceptInvoiceTem = [
  {
    codeid: 1,
    guid: "qcwerqwrqwerqwer32",
    total_price: 100,
    date_create: "22-10-2024 19:00",
    file: "http://mttp-renaissance.333.kg/files/5P4ZMTXT9RNEosDmFLCvXB60k.pdf",
    sender: "админ",
  },
  {
    codeid: 2,
    guid: "231123",
    total_price: 100,
    date_create: "22-10-2024 19:00",
    file: "http://mttp-renaissance.333.kg/files/5P4ZMTXT9RNEosDmFLCvXB60k.pdf",
    sender: "админ",
  },
  {
    codeid: 3,
    guid: "asdasdas",
    total_price: 100,
    date_create: "22-10-2024 19:00",
    file: "http://mttp-renaissance.333.kg/files/5P4ZMTXT9RNEosDmFLCvXB60k.pdf",
    sender: "админ",
  },
];

export const listActionsMap = [
  {
    id: 1,
    name: "Добавить новую торговую точку",
    color: "#4361ee",
    icon: <AddHomeIcon />,
    link: "/create_points",
  },
  {
    id: 2,
    name: "Добавить точку в маршрут",
    color: "#805dca",
    icon: <NearMeIcon />,
    link: "/add_points_route",
  },
];

export const objTypeInvoice = {
  0: { text: "На складе", color: "red" },
  1: { text: "Отгружено", color: "red" },
  2: { text: "Принято", color: "green" },
};
