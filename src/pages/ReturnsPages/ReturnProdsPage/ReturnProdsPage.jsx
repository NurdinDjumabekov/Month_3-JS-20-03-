/////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

/////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import ViewProds from "../../../common/ViewProds/ViewProds";

/////// fns
import { getMyEveryInvoice } from "../../../store/reducers/invoiceSlice";

////// style
import "./style.scss";

const ReturnProdsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { invoice_guid, codeid } = location.state;
  const { total_price, total_count } = location.state; //// хранятся данные накладной

  const { listProdEveryInvoice } = useSelector((state) => state.invoiceSlice);

  useEffect(() => {
    dispatch(getMyEveryInvoice(invoice_guid));
  }, [invoice_guid]);

  useEffect(() => {
    /// get накладные воврата
  }, []);

  const keys = {
    key1: "product_name",
    key2: "count",
    key3: "count_per",
    key4: "price",
  };

  return (
    <>
      <NavMenu navText={`Накладная возврата №${codeid}`} />
      <div className="returnHistoryPage">
        <ViewProds
          list={listProdEveryInvoice}
          keys={keys}
          total_price={total_price}
          total_count={total_count}
        />
      </div>
    </>
  );
};

export default ReturnProdsPage;
