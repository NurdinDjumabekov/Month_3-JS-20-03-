/////// hooks
import React from "react";

////// helpers
import { roundingNum } from "../../helpers/totals";

////// icons
import ArrowNav from "@mui/icons-material/ArrowForwardIosSharp";

////// style
import "./style.scss";

const InvoiceComponent = (props) => {
  const { item, index, objRole, clickInvoice, objStatus } = props;
  const { title } = props;

  return (
    <button className="invoiceParent" onClick={() => clickInvoice(item)}>
      <div className="invoiceParent__inner">
        <div className="mainData">
          <p className="indexNums">{index + 1}</p>
          <div>
            <p className="titleDate role">
              {item?.[objRole?.[item?.[title]]] || item?.user}
            </p>
            <p className="titleDate">{item?.date}</p>
          </div>
        </div>
        {!!item?.comment ? (
          <p className="comments">{item?.comment}</p>
        ) : (
          <p className="comments"> ...</p>
        )}
      </div>
      <div className="mainDataArrow">
        <div className="statusSum">
          <p style={{ color: objStatus?.[item?.status]?.color }}>
            {objStatus?.[item?.status]?.text}
          </p>
          <span className="totalPrice">
            {roundingNum(item?.total_price, 1)} сом
          </span>
        </div>
        <div className="arrows">
          <ArrowNav sx={{ color: "rgba(162, 178, 238, 0.839)" }} />
        </div>
      </div>
    </button>
  );
};

export default InvoiceComponent;
