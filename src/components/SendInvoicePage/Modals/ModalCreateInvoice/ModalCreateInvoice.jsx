////// hooks
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// components
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ListInvoiceSI from "../../ListInvoiceSI/ListInvoiceSI";
import ListAcceptInvoiceSI from "../../ListAcceptInvoiceSI/ListAcceptInvoiceSI";

////// style
import "./style.scss";

////// fns
import { clearListOrdersSI } from "../../../../store/reducers/invoiceSlice";
import { getListWorkShop } from "../../../../store/reducers/invoiceSlice";
import { setViewApp } from "../../../../store/reducers/invoiceSlice";
import { setInvoiceSendInfo } from "../../../../store/reducers/invoiceSlice";
import { clearSelects } from "../../../../store/reducers/selectsSlice";

////// icons
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalCreateInvoice = ({ route_guid, guid_point }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { invoiceSendInfo, viewApp } = useSelector(
    (state) => state.invoiceSlice
  );

  const { guid } = useSelector((state) => state.saveDataSlice?.dataSave);

  const handleClose = () => {
    navigate(-1);
    dispatch(setInvoiceSendInfo({ seller_guid: "", invoice_guid: "" }));
  };

  const changeViewApp = (bool) => dispatch(setViewApp(bool));

  useEffect(() => {
    if (!!invoiceSendInfo?.seller_guid) {
      dispatch(getListWorkShop({ listInner: true, agent_guid: guid }));
      //// срабатывает только тогда, когда модалка открывается
    } else {
      dispatch(clearListOrdersSI());
      ///// очищаю временный список для отправки создания заказа от ТА
      dispatch(clearSelects());
      //// очищаю все активные селекты
      dispatch(setViewApp(true));
    }
  }, [!!invoiceSendInfo?.seller_guid]);

  return (
    <Dialog
      fullScreen
      open={invoiceSendInfo?.seller_guid}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div className={`mainInvoices ${viewApp ? "" : "mainInvoicesDesctopSI"}`}>
        <div className="mainInvoices__inner">
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ flex: 1 }} variant="h6" component="div">
                <div className="actionsBtns">
                  <button
                    className={viewApp ? "activeBtn" : ""}
                    onClick={() => changeViewApp(true)}
                  >
                    <ContentPasteSearchOutlinedIcon
                      sx={{ color: viewApp ? "#1976d2" : "#fff", width: 16 }}
                    />
                    <p>Список товаров</p>
                  </button>
                  <button
                    className={viewApp ? "" : "activeBtn"}
                    onClick={() => changeViewApp(false)}
                  >
                    <ContentPasteSearchOutlinedIcon
                      sx={{ color: viewApp ? "#fff" : "#1976d2", width: 16 }}
                    />
                    <p>Накладная</p>
                  </button>
                </div>
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>

        {/* ///// для mobile */}
        <div className={`listsCRUD mobile`}>
          {viewApp ? (
            <ListInvoiceSI route_guid={route_guid} guid_point={guid_point} />
          ) : (
            <ListAcceptInvoiceSI
              route_guid={route_guid}
              guid_point={guid_point}
            />
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default ModalCreateInvoice;
