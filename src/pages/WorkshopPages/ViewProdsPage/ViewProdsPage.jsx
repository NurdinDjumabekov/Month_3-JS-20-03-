////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

////// fns
import { getMyEveryInvoice } from "../../../store/reducers/invoiceSlice";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import ViewProds from "../../../common/ViewProds/ViewProds";

////// style
import "./style.scss";

//// icons
import SummarizeIcon from "@mui/icons-material/Summarize";
import AcceptInvvoiceWorkShop from "../../../components/InvoicesPages/AcceptInvvoiceWorkShop/AcceptInvvoiceWorkShop";

const ViewProdsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { guid, codeid, file, invoice_guid, action } = location.state;
  //// хранятся данные накладной

  const { listProdEveryInvoice } = useSelector((state) => state.invoiceSlice);

  useEffect(() => {
    if (!!guid) {
      dispatch(getMyEveryInvoice(guid));
    } else {
      dispatch(getMyEveryInvoice(invoice_guid));
    }
  }, [guid]);

  const keys = {
    name: "product_name",
    count_kg: "count_kg",
    count: "count",
    price: "price",
    total_count_kg: "total_count_kg",
    total_count: "total_count",
    total_price: "total_price",
  };

  const obj = {
    1: <AcceptInvvoiceWorkShop invoice_guid={invoice_guid} />, /// принятие накладйно от цеха
  };

  const check = action == 0;

  return (
    <>
      <div className={`viewProdsPage ${check ? "" : "allViewAction"}`}>
        <NavMenu navText={`Накладная №${codeid}`} />
        <div className="viewProdsPage__inner">
          <ViewProds list={listProdEveryInvoice} keys={keys} />
          <a className="lookPdf" href={file}>
            <SummarizeIcon />
          </a>
        </div>
      </div>
      {obj?.[action]}
    </>
  );
};

export default ViewProdsPage;
