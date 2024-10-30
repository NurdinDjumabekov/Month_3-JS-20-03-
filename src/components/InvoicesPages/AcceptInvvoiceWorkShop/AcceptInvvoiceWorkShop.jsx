////// hooks
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

///// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

///// components
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";

///// store
import {
  acceptInvoice,
  getMyInvoice,
} from "../../../store/reducers/invoiceSlice";

////// helpers
import { transformDateTime } from "../../../helpers/transformDate";
import { myAlert } from "../../../helpers/MyAlert";

const AcceptInvvoiceWorkShop = ({ invoice_guid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dataSave } = useSelector((state) => state.saveDataSlice);

  const [modal, setMoodal] = useState(false);

  const accept = async () => {
    // принятие накладной агентом
    const data = {
      invoice_guid,
      date_from: transformDateTime(new Date()),
      date_to: transformDateTime(new Date()),
      status: 2, // по умолчанию 0, если удаление -1, 1 - потвержден оператором, 2 подтвержден агентом
      user_guid: dataSave?.guid,
      user_type: 1, // 1 agent 2 admin
      user_type1: 1, // 1 agent 2 admin
    };
    const res = await dispatch(acceptInvoice({ data, navigate })).unwrap();
    if (!!res?.result) {
      dispatch(getMyInvoice(data?.user_guid));
      navigate(-1);
      myAlert("Накладная принята");
    }
  };

  return (
    <>
      <div className="fixedBootonBtn" onClick={() => setMoodal(true)}>
        <LibraryAddIcon sx={{ width: 16, height: 16 }} />
        <p>Принять накладную</p>
      </div>
      <ConfirmModal
        state={modal}
        yesFN={accept}
        noFN={() => setMoodal(false)}
        title={"Принять накладную ?"}
      />
    </>
  );
};

export default AcceptInvvoiceWorkShop;
