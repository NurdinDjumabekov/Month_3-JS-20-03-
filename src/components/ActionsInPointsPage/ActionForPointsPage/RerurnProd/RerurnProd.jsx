////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// fns
import { getListProdsInInvoiceNur } from "../../../../store/reducers/standartSlice";
import { getDataInvoiceReturn } from "../../../../store/reducers/standartSlice";
import { clearListOrdersNurFN } from "../../../../store/reducers/standartSlice";

///// helpers
import { roundingNum } from "../../../../helpers/totals";

const RerurnProd = ({ return_guid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { activeSlide, listOrdersNur } = useSelector(
    (state) => state.standartSlice
  );
  const { reportEveryTT } = useSelector((state) => state.standartSlice);

  const getData = () => dispatch(getListProdsInInvoiceNur(return_guid));
  /// список товаров определённой накладной

  useEffect(() => {
    if (activeSlide == 1) {
      getData();
    } else {
      dispatch(clearListOrdersNurFN());
    }
    dispatch(getDataInvoiceReturn(return_guid));
  }, [return_guid, activeSlide]);

  const count_kg =
    listOrdersNur?.length == 0 ? 0 : listOrdersNur?.[0]?.total_count_kg;

  const count =
    listOrdersNur?.length == 0 ? 0 : listOrdersNur?.[0]?.total_count;

  const price =
    listOrdersNur?.length == 0 ? 0 : listOrdersNur?.[0]?.total_price;

  const createReturn = () => {
    const obj = {
      action: 1,
      date_from: "",
      date_to: "",
      invoice_guid: return_guid,
      checkTypeProds: 0, /// все товары
      type_point_text: location.state?.type_point_text, /// для типов точек (нужен только для ФТ)
    };

    navigate("/app/crud_invoice", { state: obj });
  };

  const checkEdit = !!!reportEveryTT?.end_time && !!reportEveryTT?.start_time;
  //// редактирование и добавление не возможно

  const viewProds = async () => {
    const res = await dispatch(getDataInvoiceReturn(return_guid)).unwrap();
    navigate(`/invoice/view`, { state: res });
  };

  return (
    <div className="mainInfo rerurnProd">
      <div className="mainInfo__inner">
        <div className="info">
          <p>Cумма возврата: </p>
          <span>{roundingNum(price)} сом</span>
        </div>
        <div className="info">
          <p>Общий вес возврата: </p>
          <span>{roundingNum(count_kg)} кг</span>
        </div>
        <div className="info">
          <p>Количество возврата: </p>
          <span>{roundingNum(count)} шт</span>
        </div>
        <button className="pdfBtn">
          <a href={listOrdersNur?.[0]?.file} target="_blank">
            <p>Распечатать накладную возврата</p>
          </a>
        </button>
        <button className="pdfBtn viewProd">
          <a onClick={viewProds}>
            <p>Посмотреть товары</p>
          </a>
        </button>
      </div>
      {checkEdit && (
        <button className="startEndTA" onClick={createReturn}>
          <p>+ Оформить возврат</p>
        </button>
      )}
    </div>
  );
};

export default RerurnProd;
