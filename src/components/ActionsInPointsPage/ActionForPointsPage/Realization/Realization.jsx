////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// components

////// style
import "./style.scss";

////// fns
import { getListProdsInInvoiceNur } from "../../../../store/reducers/standartSlice";
import { getDataInvoiceSend } from "../../../../store/reducers/standartSlice";
import { clearListOrdersNurFN } from "../../../../store/reducers/standartSlice";

///// helpers
import { roundingNum } from "../../../../helpers/totals";

const Realization = ({ send_guid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { reportEveryTT } = useSelector((state) => state.standartSlice);
  const { listOrdersNur, activeSlide } = useSelector(
    (state) => state.standartSlice
  );

  const getData = () => dispatch(getListProdsInInvoiceNur(send_guid));
  /// список товаров определённой накладной

  useEffect(() => {
    if (activeSlide == 2) {
      getData();
    } else {
      dispatch(clearListOrdersNurFN());
    }
    dispatch(getDataInvoiceSend(send_guid));
  }, [send_guid, activeSlide]);

  const count_kg =
    listOrdersNur?.length == 0 ? 0 : listOrdersNur?.[0]?.total_count_kg;

  const count =
    listOrdersNur?.length == 0 ? 0 : listOrdersNur?.[0]?.total_count;

  const price =
    listOrdersNur?.length == 0 ? 0 : listOrdersNur?.[0]?.total_price;

  const createInvoice = () => {
    const obj = {
      action: 1,
      date_from: "",
      date_to: "",
      invoice_guid: send_guid,
      checkTypeProds: 1, /// остатки товара
    };
    navigate("/app/crud_invoice", { state: obj });
  };

  const checkEdit = !!!reportEveryTT?.end_time && !!reportEveryTT?.start_time;
  //// редактирование и добавление не возможно

  const viewProds = async () => {
    const res = await dispatch(getDataInvoiceSend(send_guid)).unwrap();
    navigate(`/invoice/view`, { state: res });
  };

  return (
    <div className="mainInfo rerurnProd">
      <div className="mainInfo__inner">
        <div className="info">
          <p>Сумма товара: </p>
          <span>{roundingNum(price)} сом</span>
        </div>
        <div className="info">
          <p>Общий вес товара: </p>
          <span>{roundingNum(count_kg)} кг</span>
        </div>
        <div className="info">
          <p>Количество товара: </p>
          <span>{roundingNum(count)} шт</span>
        </div>
        <button className="pdfBtn">
          <a href={listOrdersNur?.[0]?.file} target="_blank">
            <p>Распечатать накладную отпуска</p>
          </a>
        </button>
        <button className="pdfBtn viewProd">
          <a onClick={viewProds}>
            <p>Посмотреть товары</p>
          </a>
        </button>
      </div>
      {checkEdit && (
        <button className="startEndTA" onClick={createInvoice}>
          <p>+ Оформить товар</p>
        </button>
      )}
    </div>
  );
};

export default Realization;
