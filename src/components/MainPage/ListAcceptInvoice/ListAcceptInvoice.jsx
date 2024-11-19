////// hooks
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// components
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import ListAcceptProd from "../ListAcceptProd/ListAcceptProd";

////// helpers
import { searchActiveOrdersTA } from "../../../helpers/searchActiveOrdersTA";
import { myAlert } from "../../../helpers/MyAlert";
import { transformDateTime } from "../../../helpers/transformDate";

////// fns
import { editInvoice } from "../../../store/reducers/orderSlice";

////// icons
import AddIcon from "../../../assets/MyIcons/AddIcon";

////// style
import "./style.scss";
import { acceptInvoice } from "../../../store/reducers/standartSlice";

const ListAcceptInvoice = ({ invoice_guid, returnCheck }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [delInvoice, setDelInvoice] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const { listTA } = useSelector((state) => state.orderSlice);
  const { activeDate } = useSelector((state) => state.orderSlice);
  const { dataSave } = useSelector((state) => state.saveDataSlice);

  const delIInvoice = () => {
    const agents_guid = searchActiveOrdersTA(listTA);
    const data = { invoice_guid, status: -1 }; /// удаление -1 заявки
    const time = { date_from: "2024-09-09 18:00", date_to: "2024-09-09 21:30" };
    const send = { data: { ...data, ...time }, activeDate, agents_guid };
    dispatch(editInvoice(send));
  };

  console.log(!!returnCheck, "returnCheck");

  const confirmInvoice = async () => {
    // подтверждение накладной агентом
    const data = {
      invoice_guid,
      date_from: transformDateTime(new Date()),
      date_to: transformDateTime(new Date()),
      status: 1, // 1 подтвержден агентом
      user_guid: dataSave?.guid,
      user_type: 1, // 1 agent
      user_type1: 1, // 1 agent
    };
    const res = await dispatch(acceptInvoice({ data, navigate })).unwrap();
    if (!!res?.result) {
      navigate(-1);
      myAlert("Накладная отправлена в цех");
    }
  };

  return (
    <>
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
        {!!returnCheck && (
          <>
            <button className="confirmReturn" onClick={() => setConfirm(true)}>
              <AddIcon width={16} height={16} color={"#fff"} />
              <p>Подтвердить накладную возврата</p>
            </button>
          </>
        )}
      </div>
      <ConfirmModal
        state={confirm}
        yesFN={confirmInvoice}
        noFN={() => setConfirm(false)}
        title={"Подтвердить возврат?"}
      />
    </>
  );
};

export default ListAcceptInvoice;
