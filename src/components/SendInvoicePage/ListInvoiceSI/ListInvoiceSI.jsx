////// hooks
import * as React from "react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import debounce from "debounce";
import Select from "react-select";
import ListProdsSI from "../ListProdsSI/ListProdsSI";

////// style
import "./style.scss";

////// helpers
import { transformLists } from "../../../helpers/transformLists";
import { myAlert } from "../../../helpers/MyAlert";
import { chechEmptyCount, checkBoolFN } from "../../../helpers/validations";

////// fns
import { setActiveWorkShop } from "../../../store/reducers/selectsSlice";
import { setActiveCategs } from "../../../store/reducers/selectsSlice";
import { createEditProdInInvoiceSI } from "../../../store/reducers/invoiceSlice";
import { getListCategs } from "../../../store/reducers/invoiceSlice";
import { getListProds } from "../../../store/reducers/invoiceSlice";
import { getListWorkShop } from "../../../store/reducers/invoiceSlice";
import { searchListProds } from "../../../store/reducers/invoiceSlice";

////// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const ListInvoiceSI = ({ route_guid, guid_point }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [comment, setComment] = useState("");

  const { listWorkshopSI, listCategsSI } = useSelector(
    (state) => state.invoiceSlice
  );
  const { activeCategs, activeWorkShop } = useSelector(
    (state) => state.selectsSlice
  );
  const { listProdsSI } = useSelector((state) => state.invoiceSlice);
  const { checkInvoice } = useSelector((state) => state.invoiceSlice);
  const { invoiceSendInfo } = useSelector((state) => state.invoiceSlice);
  const { guid } = useSelector((state) => state.saveDataSlice?.dataSave);

  const workShop = transformLists(
    listWorkshopSI,
    "workshop_guid",
    "workshop_name"
  );
  const categs = transformLists(listCategsSI, "category_guid", "category_name");

  const onChangeWS = (item) => {
    dispatch(setActiveWorkShop(item)); ///// выбор селекта цехов
    const obj = { guid: item?.workshop_guid, agent_guid: guid };
    dispatch(getListCategs(obj)); /// для получение категорий
    setSearch("");
  };

  const onChangeCateg = (item) => {
    dispatch(setActiveCategs(item)); ///// выбор селекта категорий

    const obj = {
      guid: activeWorkShop?.workshop_guid,
      guidCateg: item?.category_guid,
    };
    dispatch(getListProds({ ...obj, agent_guid: guid }));
    /// для получение списка товаров
    setSearch("");
  };

  const onChangeComm = (e) => {
    const value = e.target.value;
    if (value?.includes("'")) {
      return;
    }
    setComment(value);
  };

  const handleSearch = useCallback(
    //// поиск товара через запрос
    debounce((value) => {
      dispatch(searchListProds(value));
    }, 500),
    []
  );

  const onChangeSearch = (e) => {
    const value = e?.target?.value;
    setSearch(value);

    if (value?.length === 0) {
      dispatch(getListWorkShop());
    } else {
      handleSearch(value);
    }
  };

  const actionsProdInInvoice = () => {
    ///// создание и редактирование т0варов в заявке
    if (checkBoolFN(listProdsSI)) {
      myAlert("Выберите товар", "error");
      return;
    }

    if (chechEmptyCount(listProdsSI)) {
      myAlert("Поля не должны быть пустыми или равны 0", "error");
      return;
    }

    const list = listProdsSI?.map((i) => ({ ...i, workshop_price: i.price }));

    const forCreate = { listProdsSI: list, comment };

    const forSelect = {
      guid: activeWorkShop?.workshop_guid,
      guidCateg: activeCategs?.category_guid,
      agent_guid: guid,
    };

    const invoiceInfo = { ...invoiceSendInfo, action: 1 }; //// добавление товара (action: 1)
    dispatch(createEditProdInInvoiceSI({ forCreate, invoiceInfo, forSelect }));
    ///// добавление и редактирование товаров в накладной
  };

  return (
    <div className="listInvoiceSI">
      <div className="selectsAll selectsAllActive">
        <div className="selectsAll__inner">
          <div className="choiceSel">
            <div className="myInputs selectPosition">
              <h6>Цех</h6>
              <Select
                options={workShop}
                className="select"
                onChange={onChangeWS}
                value={activeWorkShop}
              />
            </div>
            <div className="myInputs selectPosition">
              <h6>Категории</h6>
              <Select
                options={categs}
                className="select"
                onChange={onChangeCateg}
                value={activeCategs}
              />
            </div>
            {/* <div className="myInputs">
              <h6>Поиск товаров </h6>
              <input
                type="text"
                className="input"
                onChange={onChangeSearch}
                value={search}
              />
            </div> */}
            <div className="myInputs comment">
              <h6>Комментарий</h6>
              <input
                type="text"
                className="input"
                value={comment}
                onChange={onChangeComm}
                readOnly={!checkInvoice}
              />
            </div>
          </div>
          <button
            className="saveAction"
            onClick={actionsProdInInvoice}
            disabled={!checkInvoice}
          >
            <LibraryAddIcon sx={{ width: 16, height: 16 }} />
            <p>Добавить</p>
          </button>
        </div>
      </div>

      <ListProdsSI />
    </div>
  );
};

export default ListInvoiceSI;
