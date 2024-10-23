////// hooks
import * as React from "react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import debounce from "debounce";
import Select from "react-select";
import ListProds from "../ListProds/ListProds";

////// style
import "./style.scss";

////// helpers
import { transformLists } from "../../../helpers/transformLists";
import { myAlert } from "../../../helpers/MyAlert";
import { chechEmptyCount, checkBoolFN } from "../../../helpers/validations";

////// fns
import {
  setActiveTA,
  setActiveWorkShop,
} from "../../../store/reducers/selectsSlice";
import { setActiveCategs } from "../../../store/reducers/selectsSlice";
import {
  createInvoice,
  getListCategs,
  setListTA,
} from "../../../store/reducers/mainSlice";
import { getListProds } from "../../../store/reducers/mainSlice";
import { getListWorkShop } from "../../../store/reducers/mainSlice";
import { searchListProds } from "../../../store/reducers/mainSlice";
import { createEditProdInInvoice } from "../../../store/reducers/mainSlice";

////// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const ListInvoice = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [comment, setComment] = useState("");

  const { listWorkshop } = useSelector((state) => state.mainSlice);
  const { listCategs } = useSelector((state) => state.mainSlice);
  const { listProds, listTA } = useSelector((state) => state.mainSlice);
  const { activeDate, invoiceInfo } = useSelector((state) => state.mainSlice);
  const { guid, action } = useSelector((state) => state.mainSlice.invoiceInfo);
  const { activeTA } = useSelector((state) => state.selectsSlice);
  const { activeWorkShop } = useSelector((state) => state.selectsSlice);
  const { activeCategs } = useSelector((state) => state.selectsSlice);
  const { checkInvoice } = useSelector((state) => state.mainSlice);
  const { dataSave } = useSelector((state) => state.saveDataSlice);

  const workShop = transformLists(listWorkshop, "guid", "name");
  const categs = transformLists(listCategs, "category_guid", "category_name");
  const TAListCateg = transformLists(listTA, "guid", "fio");

  const adminCheck = dataSave?.user_type == 2;

  const onChangeWS = (item) => {
    dispatch(setActiveWorkShop(item)); ///// выбор селекта цехов
    dispatch(getListCategs(item)); /// для получение категорий
    setSearch("");
  };

  const onChangeCateg = (item) => {
    dispatch(setActiveCategs(item)); ///// выбор селекта категорий

    const obj = { guid: activeWorkShop?.guid, guidCateg: item?.category_guid };
    dispatch(getListProds(obj));
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
    ///// создание и редактирование твоаров в заявке
    if (checkBoolFN(listProds)) {
      myAlert("Выберите товар", "error");
      return;
    }

    if (chechEmptyCount(listProds)) {
      myAlert("Поля не должны быть пустыми или равны 0", "error");
      return;
    }

    //// если это админ и он не выбрал никакого ТА
    if (adminCheck && guid == "временно создан") {
      myAlert("Выберите торгового агента", "error");
      return;
    }

    const forCreate = { listProds, comment };

    const newListTA = adminCheck
      ? [...listTA, { is_checked: 1, guid: activeTA?.guid }]
      : listTA;

    const forGetInvoice = { activeDate, listTA: newListTA };
    const obj = { forGetInvoice, forCreate };
    const invoiceInfo = { guid, action: 1 }; //// добавление товара(action: 1)
    dispatch(createEditProdInInvoice({ ...obj, invoiceInfo }));
    ///// добавление и редактирование товаров в заявке

    if (adminCheck) {
      // у админа checkbox в true и отправляю запроca
      dispatch(setListTA(activeTA?.guid));
    }
  };

  // console.log(listTA, "listTA"); /// is_checked

  //// только для админа
  const onChangeTA = (item) => {
    dispatch(setActiveTA(item)); /// для активного ТА
    const { date_from, date_to } = invoiceInfo;
    const { guid } = item;
    const data = { date_from, date_to, agent_guid: guid, user_guid: guid };
    dispatch(createInvoice({ ...data, user_type: 1 }));
    //// создаю накладную от имени ТА (создает админ)
  };

  return (
    <div className="listInvoice">
      <div className="selectsAll selectsAllActive">
        <div className="selectsAll__inner">
          <div className="choiceSel">
            {adminCheck && action == 1 && (
              <div className="myInputs selectPosition noMobile">
                <h6>Торговые агенты</h6>
                <Select
                  options={TAListCateg}
                  className="select"
                  onChange={onChangeTA}
                  value={activeTA}
                />
              </div>
            )}
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
            <div className="myInputs">
              <h6>Поиск товаров </h6>
              <input
                type="text"
                className="input"
                onChange={onChangeSearch}
                value={search}
              />
            </div>
            <div className="myInputs">
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

      <ListProds list={listProds} />
    </div>
  );
};

export default ListInvoice;
