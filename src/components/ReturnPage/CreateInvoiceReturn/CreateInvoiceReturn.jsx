//// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";

///// fns

///// components
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

////// style
import "./style.scss";
import { useEffect } from "react";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import ListInvoiceAcceptReturn from "../ListInvoiceAcceptReturn/ListInvoiceAcceptReturn";
import ListInvoicesReturn from "../ListInvoicesReturn/ListInvoicesReturn";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateInvoiceReturn = ({ invoice_guid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [viewApp, setViewApp] = useState(true);

  const handleClose = () => navigate(-1);

  return (
    <div className="createInvoiceReturn">
      <Dialog
        fullScreen
        open={true}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className={`mainOrders ${viewApp ? "" : "mainOrdersDesctop"} `}>
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

          <div className={`listsCRUD mobile`}>
            {viewApp ? (
              <ListInvoicesReturn invoice_guid={invoice_guid} />
            ) : (
              <ListInvoiceAcceptReturn invoice_guid={invoice_guid} />
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateInvoiceReturn;
