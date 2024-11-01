////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// components

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

  const { listOrdersNur, activeSlide } = useSelector(
    (state) => state.standartSlice
  );

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
    };
    navigate("/app/crud_invoice", { state: obj });
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
          <span>{roundingNum(count)} кг</span>
        </div>
        <button className="pdfBtn">
          <p>Распечатать накладную возврата</p>
        </button>
      </div>
      <button className="startEndTA" onClick={createReturn}>
        <p>+ Оформить возврат</p>
      </button>
    </div>
  );
};

export default RerurnProd;
