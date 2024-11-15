/////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

////// helpers
import { transformLists } from "../../helpers/transformLists";

/////// components
import Select from "react-select";
import NavMenu from "../../common/NavMenu/NavMenu";
import ViewProds from "../../common/ViewProds/ViewProds";

////// fns
import { getListProds } from "../../store/reducers/leftoversSlice";
import { getListCategs } from "../../store/reducers/leftoversSlice";
import { getListWorkShop } from "../../store/reducers/leftoversSlice";
import { setActiveWorkShop } from "../../store/reducers/selectsSlice";
import { setActiveCategs } from "../../store/reducers/selectsSlice";

////// style
import "./style.scss";

const LeftoversPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { guid } = useSelector((state) => state.saveDataSlice?.dataSave);
  const { activeCategs } = useSelector((state) => state.selectsSlice);
  const { activeWorkShop } = useSelector((state) => state.selectsSlice);
  const { listCategsSI } = useSelector((state) => state.leftoversSlice);
  const { listWorkshopSI } = useSelector((state) => state.leftoversSlice);
  const { listProdsSI } = useSelector((state) => state.leftoversSlice);

  const text = "workshop_guid";
  const workShop = transformLists(listWorkshopSI, text, "workshop_name");
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
    dispatch(getListWorkShop({ listInner: true, agent_guid: guid }));
    ////  get список цехов (остатки ТА)
  }, []);

  const keys = {
    name: "product_name",
    count_kg: "amount_kg",
    count: "amount",
    price: "price",
    total_count_kg: "total_count_kg",
    total_count: "total_count",
    total_price: "total_price",
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
              isSearchable={false}
            />
          </div>
          <div className="myInputs">
            <h6>Категории</h6>
            <Select
              options={categs}
              className="select"
              onChange={onChangeCateg}
              value={activeCategs}
              isSearchable={false}
            />
          </div>
        </div>

        <ViewProds list={listProdsSI} keys={keys} total_price={""} />
      </div>
    </>
  );
};

export default LeftoversPage;
