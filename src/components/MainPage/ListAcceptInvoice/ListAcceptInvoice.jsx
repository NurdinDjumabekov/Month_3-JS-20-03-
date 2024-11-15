////// hooks
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import ListAcceptProd from "../ListAcceptProd/ListAcceptProd";

////// helpers
import { searchActiveOrdersTA } from "../../../helpers/searchActiveOrdersTA";

////// fns
import { editInvoice } from "../../../store/reducers/orderSlice";

////// icons
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";

////// style
import "./style.scss";

const ListAcceptInvoice = ({ invoice_guid }) => {
  const dispatch = useDispatch();

  const [delInvoice, setDelInvoice] = useState(false);

  const { listTA } = useSelector((state) => state.orderSlice);
  const { activeDate } = useSelector((state) => state.orderSlice);

  const delIInvoice = () => {
    const agents_guid = searchActiveOrdersTA(listTA);
    const data = { invoice_guid, status: -1 }; /// удаление -1 заявки
    const time = { date_from: "2024-09-09 18:00", date_to: "2024-09-09 21:30" };
    const send = { data: { ...data, ...time }, activeDate, agents_guid };
    dispatch(editInvoice(send));
  };

  return (
    <div className="listInvoice">
      <div className="acceptActions">
        <div className="acceptActions__inner">
          <ConfirmModal
            state={delInvoice}
            yesFN={delIInvoice}
            noFN={() => setDelInvoice(false)}
            title={"Удалить заявку ?"}
          />
        </div>
      </div>
      <ListAcceptProd invoice_guid={invoice_guid} />
    </div>
  );
};

export default ListAcceptInvoice;
