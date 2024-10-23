import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

////// helpers
import { transformLists } from "../../helpers/transformLists";

/////// components
import Select from "react-select";
import NavMenu from "../../common/NavMenu/NavMenu";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

////// style
import "./style.scss";
import {
  getListCategs,
  getListProds,
  getListWorkShop,
} from "../../store/reducers/invoiceSlice";
import {
  setActiveCategs,
  setActiveWorkShop,
} from "../../store/reducers/selectsSlice";
import ViewProds from "../../common/ViewProds/ViewProds";

const LeftoversPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { guid } = useSelector((state) => state.saveDataSlice?.dataSave);
  const { activeCategs } = useSelector((state) => state.selectsSlice);
  const { activeWorkShop } = useSelector((state) => state.selectsSlice);
  const { listCategsSI } = useSelector((state) => state.invoiceSlice);
  const { listWorkshopSI } = useSelector((state) => state.invoiceSlice);
  const { listProdsSI } = useSelector((state) => state.invoiceSlice);

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
  };

  const onChangeCateg = (item) => {
    dispatch(setActiveCategs(item)); ///// выбор селекта категорий

    const obj = {
      guid: activeWorkShop?.workshop_guid,
      guidCateg: item?.category_guid,
    };
    dispatch(getListProds({ ...obj, agent_guid: guid }));
    /// для получение списка товаров
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(getListWorkShop({ listInner: true, agent_guid: guid }));
      ////  get список цехов (остатки ТА)
    }, 500);
  }, []);

  const keys = {
    key1: "product_name",
    key2: "amount",
    key3: "amount_per",
    key4: "price",
  };

  return (
    <>
      <NavMenu navText={"Список остатков"} />
      <div className="leftoversPage">
        <div className="leftoversPage__header">
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

        <ViewProds list={listProdsSI} keys={keys} total_price={""} />
      </div>
    </>
  );
};

export default LeftoversPage;
