////// hooks
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { useRef } from "react";

////// style
import "./style.scss";

////// components
import NavMenu from "../../common/NavMenu/NavMenu";
import debounce from "debounce";
import Select from "react-select";
import ListProds from "../../components/MainPage/ListProds/ListProds";

///// icons
import arrow from "../../assets/icons/arrowNav.svg";
import searchIcon from "../../assets/icons/searchIcon.png";
import krest from "../../assets/icons/krestBlack.svg";
import { useState } from "react";
import {
  setActiveCategs,
  setActiveWorkShop,
} from "../../store/reducers/selectsSlice";
import {
  getListCategs,
  getListProds,
  getListWorkShop,
  searchListProds,
} from "../../store/reducers/mainSlice";

////// helpers
import { transformLists } from "../../helpers/transformLists";

const ListChoiceProds = ({ setSearch, search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { action, invoice_guid } = location?.state;

  const { listWorkshop } = useSelector((state) => state.mainSlice);
  const { listCategs } = useSelector((state) => state.mainSlice);
  const { activeWorkShop } = useSelector((state) => state.selectsSlice);
  const { activeCategs } = useSelector((state) => state.selectsSlice);
  const { listProds } = useSelector((state) => state.mainSlice);

  const onChangeWS = (item) => {
    dispatch(setActiveWorkShop(item)); ///// выбор селекта цехов
    dispatch(getListCategs(item)); /// для получение категорий
    setSearch("");
  };

  //   const onChangeCateg = (item) => {
  //     dispatch(setActiveCategs(item)); ///// выбор селекта категорий

  //     const obj = { guid: activeWorkShop?.guid, guidCateg: item?.category_guid };
  //     dispatch(getListProds(obj));
  //     /// для получение списка товаров
  //     setSearch("");
  //   };

  const workShop = transformLists(listWorkshop, "guid", "name");
  const categs = transformLists(listCategs, "category_guid", "category_name");

  return (
    <div className="listChoiceProds">
      <div className="listChoiceProds__prods">
        <div className="myInputs">
          <Select
            options={workShop}
            className="select"
            onChange={onChangeWS}
            value={activeWorkShop}
            isSearchable={false}
          />
        </div>
        {/* <div className="myInputs">
          <h6>Категории</h6>
          <Select
            options={categs}
            className="select"
            onChange={onChangeCateg}
            value={activeCategs}
          />
        </div> */}
      </div>
      <ListProds list={listProds} />
    </div>
  );
};

export default ListChoiceProds;
