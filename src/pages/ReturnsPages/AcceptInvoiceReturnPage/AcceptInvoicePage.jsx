//////// hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// fns
import {
  historyAcceptInvoice,
  historyAcceptInvoiceReturn,
} from "../../../store/reducers/invoiceSlice";

////// icons
import ArrowNav from "@mui/icons-material/ArrowForwardIosSharp";

////// helpers
import { roundingNum } from "../../../helpers/totals";

////// style
import "./style.scss";
import NavMenu from "../../../common/NavMenu/NavMenu";

const AcceptInvoiceReturnPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { listInvoiceReturn } = useSelector((state) => state.invoiceSlice);

  useEffect(() => {
    // История отпускных накладных ТА в виде PDF
    dispatch(historyAcceptInvoiceReturn({ agent_guid: dataSave?.guid }));
  }, [dispatch, dataSave?.guid]);

  const clickInvoice = (item) => {
    navigate(`/invoice/view`, { state: item });
  };

  console.log(listInvoiceReturn);

  return (
    <>
      <NavMenu navText={"Возврат с точек"} />
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
                    <p className="titleDate role">{item?.reciever}</p>
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

export default AcceptInvoiceReturnPage;
