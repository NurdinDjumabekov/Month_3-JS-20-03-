////// hooks
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ListData from "./ListData/ListData";
import HistoryData from "./HistoryData/HistoryData";

////// fns
import { setInvoiceInfo } from "../../../store/reducers/mainSlice";
import { setListProduction } from "../../../store/reducers/productionSlice";
import { clearSelects } from "../../../store/reducers/selectsSlice";

////// style
import "./style.scss";

////// helpers
import { menuProduction } from "../../../helpers/LocalData";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalProduction = () => {
  const dispatch = useDispatch();

  const [active, setActive] = useState(1);

  const { invoiceInfo } = useSelector((state) => state.mainSlice);

  const handleClose = () => {
    const obj = { guid: "", action: 0, listInvoice: [] };
    dispatch(setInvoiceInfo(obj));
  };

  useEffect(() => {
    if (invoiceInfo?.action == 4) {
    } else {
      dispatch(setListProduction([]));
      dispatch(clearSelects());
      //// при закрытии модалки очищаю списки
    }
  }, [invoiceInfo?.action]);

  const obj = { 1: <ListData />, 2: <HistoryData /> };

  return (
    <Dialog
      fullScreen
      open={invoiceInfo?.action == 4}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div className="modalProduction">
        <div className="modalProduction__inner">
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <div className="menu">
                {menuProduction?.map((i, index) => (
                  <button
                    className={i?.id == active ? "active" : ""}
                    onClick={() => setActive(i.id)}
                    key={index}
                  >
                    {i?.icons}
                    <p>{i?.name}</p>
                  </button>
                ))}
              </div>
              <span>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </span>
            </Toolbar>
          </AppBar>
        </div>
        {obj?.[active]}
      </div>
    </Dialog>
  );
};

export default ModalProduction;
