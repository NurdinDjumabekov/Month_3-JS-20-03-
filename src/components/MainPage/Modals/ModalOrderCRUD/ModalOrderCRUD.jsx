////// hooks
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ListInvoice from "../../ListInvoice/ListInvoice";
import ListAcceptInvoice from "../../ListAcceptInvoice/ListAcceptInvoice";

////// fns
import { clearListOrders } from "../../../../store/reducers/mainSlice";
import { getListWorkShop } from "../../../../store/reducers/mainSlice";
import { setInvoiceInfo } from "../../../../store/reducers/mainSlice";
import { clearSelects } from "../../../../store/reducers/selectsSlice";

////// icons
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";

////// style
import "./style.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalOrderCRUD = () => {
  const dispatch = useDispatch();

  const [viewApp, setViewApp] = useState(true);

  const { invoiceInfo } = useSelector((state) => state.mainSlice);
  const { listSendOrders } = useSelector((state) => state.mainSlice);

  const handleClose = () => dispatch(setInvoiceInfo({ guid: "", action: 0 }));

  useEffect(() => {
    if (!!invoiceInfo?.guid) {
      dispatch(getListWorkShop({ listInner: true }));
      //// срабатывает только тогда, когда модалка открывается
      dispatch(clearListOrders());
      ///// очищаю временный список для отправки создания заказа от ТА

      if (invoiceInfo?.action == 1) {
        setViewApp(true); /// создание, сразу подставляю список товаров на выбор
      } else if (invoiceInfo?.action == 2) {
        setViewApp(false); /// редактирование, сразу подставляю накладную с выбраныым списком
      }
    } else {
      dispatch(clearSelects());
    }
  }, [invoiceInfo?.guid]);

  console.log(invoiceInfo, "invoiceInfo");

  const { guid, action } = invoiceInfo;

  const check = !!guid && (action == 1 || action == 2);

  const lengthList = listSendOrders?.length == 0;

  return (
    <Dialog
      fullScreen
      open={check}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div className={`mainOrders ${viewApp ? "" : "mainOrdersDesctop"}`}>
        <div className="mainOrders__inner">
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ flex: 1 }} variant="h6" component="div">
                <div className="actionsBtns">
                  <button
                    className={viewApp ? "activeBtn" : ""}
                    onClick={() => setViewApp(true)}
                  >
                    <ContentPasteSearchOutlinedIcon
                      sx={{ color: viewApp ? "#1976d2" : "#fff", width: 16 }}
                    />
                    <p>Заявка</p>
                  </button>
                  <button
                    className={viewApp ? "" : "activeBtn"}
                    onClick={() => setViewApp(false)}
                  >
                    <ContentPasteSearchOutlinedIcon
                      sx={{ color: viewApp ? "#fff" : "#1976d2", width: 16 }}
                    />
                    <p>Выбранные товары</p>
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
        {/* ///// для desktopa */}
        <div
          className={`listsCRUD ${lengthList ? "viewFirstList" : ""} desctop`}
        >
          <ListInvoice />
          <ListAcceptInvoice />
        </div>

        {/* ///// для mobile */}
        <div
          className={`listsCRUD ${lengthList ? "viewFirstList" : ""} mobile`}
        >
          {viewApp ? <ListInvoice /> : <ListAcceptInvoice />}
        </div>
      </div>
    </Dialog>
  );
};

export default ModalOrderCRUD;
