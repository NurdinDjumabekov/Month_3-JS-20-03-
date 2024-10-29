////// hooks
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

////// style
import "./style.scss";

////// fns
import { setInvoiceInfo } from "../../../../store/reducers/mainSlice";
import { getMyEveryInvoice } from "../../../../store/reducers/invoiceSlice";
import { acceptInvoice } from "../../../../store/reducers/invoiceSlice";

////// helpers

////// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useNavigate } from "react-router-dom";
import { roundingNum } from "../../../../helpers/totals";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EveryInvoiceModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { invoiceInfo } = useSelector((state) => state.mainSlice);
  const { listProdEveryInvoice } = useSelector((state) => state.invoiceSlice);
  const { dataSave } = useSelector((state) => state.saveDataSlice);

  const handleClose = () => dispatch(setInvoiceInfo({ guid: "", action: 0 }));

  const acceptFN = () => {
    //// принятие накладной агентом
    const data = {
      invoice_guid: invoiceInfo?.guid,
      date_from: "2024-06-09 11:00",
      date_to: "2024-06-09 17:30",
      status: 2, // по умолчанию 0, если удаление -1, 1 - потвержден оператором, 2 подтвержден агентом
      user_guid: dataSave?.guid,
      user_type: 1, // 1 agent 2 admin
      user_type1: 1, // 1 agent 2 admin
    };
    dispatch(acceptInvoice({ data, navigate }));
  };

  useEffect(() => {
    if (invoiceInfo?.action == 8) {
      dispatch(getMyEveryInvoice(invoiceInfo?.guid));
    }

    // return () => handleClose();
  }, [invoiceInfo?.action]);

  return (
    <Dialog
      fullScreen
      open={true}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div className="everyProd">
        <div className="everyProd__inner">
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ flex: 1 }} variant="h6" component="div">
                Накладная {invoiceInfo?.index}
              </Typography>
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
        <div className="everyProd__table">
          <TableContainer
            component={Paper}
            sx={{ maxHeight: "100%" }}
            className="scroll_table standartTable"
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ width: "5%" }}>
                    №
                  </TableCell>
                  <TableCell style={{ width: "55%" }}>Продукт</TableCell>
                  <TableCell align="left" style={{ width: "20%" }}>
                    Цена
                  </TableCell>
                  <TableCell align="left" style={{ width: "20%" }}>
                    Кол-во
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listProdEveryInvoice?.map((row, index) => (
                  <TableRow key={row?.product_guid}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "5%" }}
                      align="center"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "55%" }}
                    >
                      {row?.product_name}
                    </TableCell>
                    <TableCell align="left" style={{ width: "20%" }}>
                      {roundingNum(row?.price)} сом
                    </TableCell>
                    <TableCell align="left" style={{ width: "20%" }}>
                      {roundingNum(row?.count)} шт
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {invoiceInfo?.sender_type == 2 && (
            <button className="saveAction" onClick={acceptFN}>
              <LibraryAddIcon sx={{ width: 16, height: 16 }} />
              <p>Принять накладную</p>
            </button>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default EveryInvoiceModal;
