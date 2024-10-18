////// hooks
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import ListAcceptProds from "../ListAcceptProds/ListAcceptProds";

////// helpers
import { searchActiveOrdersTA } from "../../../helpers/searchActiveOrdersTA";
import { checkEditInputs } from "../../../helpers/validations";

////// fns
import { editInvoice } from "../../../store/reducers/mainSlice";
import { createEditProdInInvoice } from "../../../store/reducers/mainSlice";

////// icons
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

////// style
import "./style.scss";
import { useEffect } from "react";
import {
  changeStatusInvoiceReturn,
  getProdsReturn,
} from "../../../store/reducers/invoiceSlice";
import { useNavigate } from "react-router-dom";
import { myAlert } from "../../../helpers/MyAlert";

const ListInvoiceAcceptReturn = ({ invoice_guid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [delInvoice, setDelInvoice] = useState(false);

  const { listTA, checkInvoice } = useSelector((state) => state.mainSlice);
  const { guid } = useSelector((state) => state.mainSlice?.invoiceInfo);
  const { listSendOrders } = useSelector((state) => state.mainSlice);
  const { activeDate } = useSelector((state) => state.mainSlice);

  const delIInvoice = () => {
    const data = { invoice_guid, status: -1 };
    // по умолчанию 0, если удаление -1, 1 - потвержден ТА, 2 подтвержден Админом
    dispatch(changeStatusInvoiceReturn(data));
    navigate(-1);
    myAlert("Успешно");
  };

  const check = checkEditInputs(listSendOrders); /// если уже были изменения то возвращaть true

  const editProdInInvoice = () => {
    /////  редактирование твоаров в заявке
    const forCreate = { listProds: listSendOrders, comment: "" };
    const forGetInvoice = { activeDate, listTA };
    const obj = { forGetInvoice, forCreate };
    const invoiceInfo = { guid, action: 2 }; //// редактирование товара (action: 2)
    dispatch(createEditProdInInvoice({ ...obj, invoiceInfo }));
    ///// добавление и редактирование товаров в заявке
  };

  useEffect(() => {
    dispatch(getProdsReturn(invoice_guid));
  }, []);

  return (
    <div className="listInvoice returnList">
      <div className="acceptActions">
        <div className="acceptActions__inner">
          <ConfirmModal
            state={delInvoice}
            yesFN={delIInvoice}
            noFN={() => setDelInvoice(false)}
            title={"Удалить заявку ?"}
          />
          {check && (
            <button className="saveAction" onClick={editProdInInvoice}>
              <LibraryAddIcon sx={{ width: 16, height: 16 }} />
              <p>Сохранить</p>
            </button>
          )}

          <button
            className="saveAction del"
            onClick={() => setDelInvoice(true)}
          >
            <DeleteOutlineIcon sx={{ width: 18, height: 18 }} />
            <p>Удалить заявку</p>
          </button>
        </div>
      </div>
      <ListAcceptProds invoice_guid={invoice_guid} />
    </div>
  );
};

export default ListInvoiceAcceptReturn;
