//////// hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// fns
import {
  historySendInvoice,
  historySendInvoiceReturn,
} from "../../../store/reducers/invoiceSlice";

////// icons
import ArrowNav from "@mui/icons-material/ArrowForwardIosSharp";

////// helpers
import { roundingNum } from "../../../helpers/totals";
import { transformActionDate } from "../../../helpers/transformDate";

////// style
import "./style.scss";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

const SenderInvoiceReturnPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { listInvoiceReturn } = useSelector((state) => state.invoiceSlice);

  useEffect(() => {
    // История отпущенных накладных ТА
    const send = {
      sender_guid: dataSave?.guid,
      reciver_type: 4,
      date: transformActionDate(new Date()),
    };
    dispatch(historySendInvoiceReturn(send));
  }, [dispatch, dataSave?.guid]);

  const clickInvoice = (item) => navigate(`/invoice/view`, { state: item });

  console.log(listInvoiceReturn, "listInvoiceReturn");

  return (
    <>
      <NavMenu navText={"Возврат в цех"} />
      {listInvoiceReturn?.length == 0 ? (
        <div className="emptyData">
          <p>Список пустой</p>
        </div>
      ) : (
        <div className="acceptInvoicePage">
          {listInvoiceReturn?.map((item) => (
            <button
              key={item?.codeid}
              className="invoiceParent"
              onClick={() => clickInvoice(item)}
            >
              <div className="invoiceParent__inner">
                <div className="mainData">
                  <p className="indexNums">{item?.codeid}</p>
                  <div>
                    <p className="titleDate role">Админ</p>
                    <p className="titleDate">{item?.date}</p>
                  </div>
                </div>
                {!!item?.comment ? (
                  <p className="comments">{item.comment}</p>
                ) : (
                  <p className="comments"> ...</p>
                )}
              </div>
              <div className="mainDataArrow">
                <div>
                  <p style={{ color: "green" }}>Принято</p>
                  <span className="totalPrice">
                    {roundingNum(item?.total_price, 2)} сом
                  </span>
                </div>
                <div className="arrows">
                  <ArrowNav sx={{ color: "rgba(162, 178, 238, 0.839)" }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default SenderInvoiceReturnPage;
