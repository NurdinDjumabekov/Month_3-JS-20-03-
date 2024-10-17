////// hooks
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

////// fns
import { setInvoiceInfo } from "../../store/reducers/mainSlice";
import { getListTA } from "../../store/reducers/mainSlice";
import { clearSelects } from "../../store/reducers/selectsSlice";

////// style
import "./style.scss";

////// helpers
import { listActionRoute } from "../../helpers/objs";

////// components
import RouteTA from "./RouteTA/RouteTA";
import ViewAgents from "./ViewAgents/ViewAgents";
import HistoryRouteTA from "./HistoryRouteTA/HistoryRouteTA";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewRouter = () => {
  const dispatch = useDispatch();
  const { invoiceInfo } = useSelector((state) => state.mainSlice);

  const [active, setActive] = React.useState(1);

  const handleClose = () => dispatch(setInvoiceInfo({ guid: "", action: 0 }));

  useEffect(() => {
    if (invoiceInfo?.action === 6) {
      dispatch(getListTA({ first: true }));
    } else {
      dispatch(clearSelects());
    }
  }, [invoiceInfo?.action, dispatch]);

  const obj = { 1: <ViewAgents />, 2: <RouteTA />, 3: <HistoryRouteTA /> };

  return (
    <Dialog
      fullScreen
      open={invoiceInfo?.action == 6}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div className="viewAllAgents">
        <div className="viewAllAgents__inner">
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <div className="listActions">
                <div className="listActions__inner">
                  {listActionRoute?.map((i, index) => (
                    <button
                      onClick={() => setActive(i.id)}
                      className={active == i.id ? "active" : ""}
                      key={index}
                    >
                      {i?.icon}
                      <p>{i?.title}</p>
                    </button>
                  ))}
                </div>
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

export default ViewRouter;

{
  /* <div className="listAgents">
        <TableContainer
          component={Paper}
          sx={{ height: "100%" }}
          className="scroll_table standartTable"
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "7%" }}>№</TableCell>
                <TableCell align="left" style={{ width: "63%" }}>
                  ФИО
                </TableCell>
                <TableCell align="left" style={{ width: "30%" }}>
                  Долг
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listRouteAllTA?.map((row, index) => (
                <TableRow key={row?.product_guid}>
                  <TableCell component="th" scope="row" style={{ width: "7%" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" style={{ width: "63%" }}>
                    {row?.fio}
                  </TableCell>
                  <TableCell align="left" style={{ width: "30%" }}>
                    {row?.duty} сом
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div> */
}
