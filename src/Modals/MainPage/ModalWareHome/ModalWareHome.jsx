////// hooks
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ListsWareHome from "../../../components/MainPage/WareHome/ListsWareHome";
import ListsSendTA from "../../../components/MainPage/WareHome/ListsSendTA";
import Select from "react-select";
import HistoryInvoice from "./HistoryInvoice/HistoryInvoice";

////// fns
import { setInvoiceInfo } from "../../../store/reducers/mainSlice";
import {
  addProdInInvoiceTA,
  clearAllWareHome,
  getPastProdsTa,
  sendInvoiceTAsale,
  getListTAForWH,
  getListCategsWH,
  getListProdsWH,
  getListWorkShopWH,
} from "../../../store/reducers/wareHouseSlice";

import { setActiveWorkShop } from "../../../store/reducers/selectsSlice";
import { setActiveTA } from "../../../store/reducers/selectsSlice";
import { setActiveCategs } from "../../../store/reducers/selectsSlice";

////// helpers
import {
  chechEmptyCount,
  checkBoolFN,
  emptyCountCheck,
} from "../../../helpers/validations";
import { myAlert } from "../../../helpers/MyAlert";
import { transformListsWH } from "../../../helpers/transformLists";
import { transformLists } from "../../../helpers/transformLists";
import { menuSGP } from "../../../helpers/LocalData";

////// style
import "./style.scss";

////// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalWareHome = () => {
  const dispatch = useDispatch();

  const [active, setActive] = useState(1);

  const { invoiceInfo } = useSelector((state) => state.mainSlice);
  const { activeWorkShop } = useSelector((state) => state.selectsSlice);
  const { activeCategs, activeTA } = useSelector((state) => state.selectsSlice);

  const { listWorkshopWH } = useSelector((state) => state.wareHouseSlice);
  const { listCategsWH } = useSelector((state) => state.wareHouseSlice);
  const { allProdsWH } = useSelector((state) => state.wareHouseSlice);
  const { listTA, invoiceGuid } = useSelector((state) => state.wareHouseSlice);
  const { listWHProdTA } = useSelector((state) => state.wareHouseSlice);

  const { dataSave } = useSelector((state) => state.saveDataSlice);

  const handleClose = () => {
    const obj = { guid: "", action: 0, listInvoice: [] };
    dispatch(setInvoiceInfo(obj));
  };

  const workShop = transformLists(listWorkshopWH, "guid", "name");
  const categs = transformLists(listCategsWH, "category_guid", "category_name");
  const sortListTA = transformLists(listTA, "guid", "fio");

  const onChangeWS = (item) => {
    dispatch(setActiveWorkShop(item)); ///// выбор селекта цехов
    dispatch(getListCategsWH(item)); /// для получение категорий
  };

  const onChangeCateg = (item) => {
    dispatch(setActiveCategs(item)); ///// выбор селекта категорий
    const obj = { guid: activeWorkShop?.guid, guidCateg: item?.category_guid };
    dispatch(getListProdsWH(obj));
    /// для получение списка товаров
  };

  const onChangeAgents = (item) => {
    dispatch(setActiveTA(item));
    ///// выбор селекта ТА

    const data = {
      sender_guid: dataSave?.guid, // guid отправителя
      sender_type: 2,
      reciever_guid: item?.guid, // guid получателя
      reciever_type: 1,
      user_guid: dataSave?.guid, // guid человека кто создает
      user_type: 2,
    };

    dispatch(getPastProdsTa(item?.guid));
    //// беру список товаров и данные накладной ( заранее созданной накланой)

    // dispatch(createInvoiceSendTA({ data, agent_guid: item?.guid }));
    /// создания накладной для отпуска ТА которого выбрали
    /// при выборе ТА, автоматически создается накладная, туда уже надо будет добавить новый товар или отредактировать старый
  };

  const actionsProdInInvoice = () => {
    ///// создание и редактирование твоаров в заявке
    if (checkBoolFN(allProdsWH)) {
      myAlert("Выберите товар", "error");
      return;
    }

    if (chechEmptyCount(allProdsWH)) {
      myAlert("Поля не должны быть пустыми или равны 0", "error");
      return;
    }

    if (invoiceGuid == "") {
      myAlert("Выберите торгового агента", "error");
      return;
    }

    const products = transformListsWH(allProdsWH);

    const data = { products, comment: "", invoice_guid: invoiceGuid };

    const obj = { ...activeCategs, ...activeWorkShop };

    dispatch(addProdInInvoiceTA({ data, agent_guid: activeTA?.guid, obj }));
    ///// добавление и редактирование товаров в заявке
  };

  const sendInvoiceTA = () => {
    ///// отпуская товар торговвому агенту

    if (emptyCountCheck(listWHProdTA)) {
      myAlert("Поля не должны быть пустыми или равны 0", "error");
      return;
    }

    if (listWHProdTA?.length == 0) {
      myAlert("Список пустой!", "error");
      return;
    }

    const data = {
      invoice_guid: invoiceGuid,
      date_from: "2024-06-09 11:00",
      date_to: "2024-06-09 17:30",
      status: 1, // 1 - потвержден оператором,
      user_guid: dataSave?.guid,
      user_type: 2, // 1 agent 2 admin
      user_type1: 2, // 1 agent 2 admin
    };

    dispatch(sendInvoiceTAsale({ data }));
    ///// добавление и редактирование товаров в заявке
  };

  const clickPdf = () => {
    const url =
      "https://riha-production.333.kg/files/invoice/Otpusk-nakladnaya-5-2024-10-01(18:21:33).pdf";
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (invoiceInfo?.action == 5) {
      dispatch(getListWorkShopWH());
      dispatch(getListTAForWH());
      /// для получения категшорий , цехов и товаров (внутри еще 2 функции есть)
    } else {
      dispatch(clearAllWareHome());
      dispatch(setActiveTA({}));
      //// при закрытии модалки очищаю список всего склада
    }
  }, [invoiceInfo?.action]);

  const check = active === 1 ? "" : "modalwareHomeHistory";

  return (
    <Dialog
      fullScreen
      open={invoiceInfo?.action == 5}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div className={`modalwareHome ${check}`}>
        <div className="modalwareHome__inner">
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <div className="menu">
                {menuSGP?.map((i, index) => (
                  <button
                    className={i?.id == active ? "active" : ""}
                    onClick={() => setActive(i.id)}
                    key={index}
                  >
                    {i?.icons}
                    <p>{i?.name}</p>
                  </button>
                ))}
              </div>
              <span>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </span>
            </Toolbar>
          </AppBar>
        </div>

        {active === 1 && (
          <div className="modalwareHome__sortDate">
            <div className="sortActions">
              <div className="sortActions__inner">
                <div className="myInputs">
                  <h6>Торговые Агенты</h6>
                  <Select
                    options={sortListTA}
                    className="select"
                    onChange={onChangeAgents}
                    value={activeTA}
                  />
                </div>
                <div className="myInputs">
                  <h6>Цех</h6>
                  <Select
                    options={workShop}
                    className="select"
                    onChange={onChangeWS}
                    value={activeWorkShop}
                  />
                </div>
                <div className="myInputs">
                  <h6>Категории</h6>
                  <Select
                    options={categs}
                    className="select"
                    onChange={onChangeCateg}
                    value={activeCategs}
                  />
                </div>
              </div>
              <button
                className="saveAction"
                onClick={actionsProdInInvoice}
                // disabled={!checkInvoice}
              >
                <LibraryAddIcon sx={{ width: 16, height: 16 }} />
                <p>Добавить</p>
              </button>
            </div>
            <div className="sendActions">
              <button className="saveAction generatePdf" onClick={clickPdf}>
                <FileCopyIcon sx={{ width: 16, height: 16 }} />
                <p>Сгенерировать документ</p>
              </button>

              <button
                className="saveAction"
                onClick={sendInvoiceTA}
                // disabled={!checkInvoice}
              >
                <NoteAddIcon sx={{ width: 16, height: 16 }} />
                <p>Отпустить товар </p>
              </button>
            </div>
          </div>
        )}

        {active === 1 ? (
          <div className="modalwareHome__invoice">
            <ListsWareHome />
            <ListsSendTA />
          </div>
        ) : (
          <HistoryInvoice />
        )}
      </div>
    </Dialog>
  );
};

export default ModalWareHome;
