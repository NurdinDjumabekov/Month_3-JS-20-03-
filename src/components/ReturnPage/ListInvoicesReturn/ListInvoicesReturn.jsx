////// hooks
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import Select from "react-select";

////// style
import "./style.scss";

////// helpers
import { transformLists } from "../../../helpers/transformLists";
import { myAlert } from "../../../helpers/MyAlert";
import { chechEmptyCount, checkBoolFN } from "../../../helpers/validations";

////// fns
import { setActiveWorkShop } from "../../../store/reducers/selectsSlice";
import { setActiveCategs } from "../../../store/reducers/selectsSlice";
import {
  getDefaultList,
  getListCategs,
  getListWorkShop,
} from "../../../store/reducers/mainSlice";
import { getListProds } from "../../../store/reducers/mainSlice";

////// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ListrReturnsProds from "../ListrReturnsProds/ListrReturnsProds";
import { createProdsReturn } from "../../../store/reducers/invoiceSlice";

const ListInvoicesReturn = ({ invoice_guid }) => {
  const dispatch = useDispatch();

  const { listWorkshop } = useSelector((state) => state.mainSlice);
  const { listCategs } = useSelector((state) => state.mainSlice);
  const { listProds, listTA } = useSelector((state) => state.mainSlice);
  const { activeWorkShop } = useSelector((state) => state.selectsSlice);
  const { activeCategs } = useSelector((state) => state.selectsSlice);

  const workShop = transformLists(listWorkshop, "guid", "name");
  const categs = transformLists(listCategs, "category_guid", "category_name");

  const onChangeWS = (item) => {
    dispatch(setActiveWorkShop(item)); ///// выбор селекта цехов
    dispatch(getListCategs(item)); /// для получение категорий
  };

  const onChangeCateg = (item) => {
    dispatch(setActiveCategs(item)); ///// выбор селекта категорий

    const obj = { guid: activeWorkShop?.guid, guidCateg: item?.category_guid };
    dispatch(getListProds(obj));
    /// для получение списка товаров
  };

  const actionsProdInInvoice = async () => {
    ///// создание и редактирование твоаров в заявке
    if (checkBoolFN(listProds)) {
      myAlert("Выберите товар", "error");
      return;
    }

    if (chechEmptyCount(listProds)) {
      myAlert("Поля не должны быть пустыми или равны 0", "error");
      return;
    }

    const products = listProds
      ?.filter((i) => +i?.count > 0) // Отфильтровываем элементы с count <= 1
      ?.map((i) => ({
        product_guid: i?.product_guid,
        count: i?.count,
        workshop_price: i?.workshop_price,
      }));

    const sendData = { invoice_guid: invoice_guid, products, comment: "111" };

    const res = await dispatch(createProdsReturn(sendData)).unwrap();

    if (res?.result == 1) {
      dispatch(getDefaultList()); //// очищаю counts всего списка
      myAlert("Товар добавлен!");
    }
  };

  //   console.log(listProds, "listProds");
  return (
    <div className="listInvoice returnsBlock">
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
            <div className="myInputs comm">
              <h6>Комментарий</h6>
              <input
                type="text"
                className="input"
                // value={comment}
                // onChange={onChangeComm}
              />
            </div>
          </div>
          <button className="saveAction" onClick={actionsProdInInvoice}>
            <LibraryAddIcon sx={{ width: 16, height: 16 }} />
            <p>Добавить</p>
          </button>
        </div>
      </div>

      <ListrReturnsProds list={listProds} />
    </div>
  );
};

export default ListInvoicesReturn;
