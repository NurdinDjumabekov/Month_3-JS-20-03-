////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import { Table, TableBody, TableCell, Tooltip } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

/////// fns
import { delProdInInvoice } from "../../../store/reducers/mainSlice"; /// delete
import { changeCountOrders } from "../../../store/reducers/mainSlice";

////// style
import "./style.scss";

////// helpers
import { validNums } from "../../../helpers/validations";
import { sumCountsFN, totalSum } from "../../../helpers/totals";

////// icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ListAcceptProd = () => {
  const dispatch = useDispatch();

  const { listSendOrders } = useSelector((state) => state.mainSlice);
  const { guid } = useSelector((state) => state.mainSlice?.invoiceInfo);
  const { activeDate } = useSelector((state) => state.mainSlice);
  const { listTA, checkInvoice } = useSelector((state) => state.mainSlice);

  const onChangeCount = (e, item) => {
    const count = e?.target?.value?.replace(",", ".");

    if (validNums(count)) {
      //// валидация на числа
      return;
    }
    dispatch(changeCountOrders({ ...item, count }));
  };

  const incrementCount = (item) => {
    const newCount = (parseFloat(item?.count) || 0) + 1;
    dispatch(changeCountOrders({ ...item, count: newCount.toString() }));
  };

  const decrementCount = (item) => {
    const newCount = Math.max((parseFloat(item?.count) || 0) - 1, 0); // Минимальное значение - 0
    dispatch(changeCountOrders({ ...item, count: newCount.toString() }));
  };

  const delProd = ({ product_guid, invoice_guid, price, count }) => {
    const products = [{ product_guid, count, workshop_price: price }];
    const data = { invoice_guid, comment: "", status: -1, products };
    const obj = { listTA, activeDate, action: 3 };
    dispatch(delProdInInvoice({ data, ...obj, guid }));
  };

  return (
    <div className="listAcceptProd">
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "100%" }}
        className="scroll_table standartTable"
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "8%" }} align="center">
                №
              </TableCell>
              <TableCell style={{ width: "50%" }}>Продукт</TableCell>
              <TableCell align="left" style={{ width: "10%" }}>
                Кол-во
              </TableCell>
              <TableCell align="left" style={{ width: "22%" }}>
                Цена
              </TableCell>
              <TableCell
                align="left"
                style={{ width: "10%" }}
                className="titleCheckbox"
              >
                *
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listSendOrders?.map((row, index) => (
              <TableRow key={row?.product_guid}>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  style={{ width: "8%" }}
                  onClick={() => decrementCount(row)}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: "50%" }}
                  onClick={() => decrementCount(row)}
                >
                  {row?.product_name}
                </TableCell>
                <TableCell
                  align="left"
                  style={{ width: "10%" }}
                  className="counterRow"
                >
                  <div className="countInputContainer">
                    <input
                      type="text"
                      onChange={(e) => onChangeCount(e, row)}
                      name="counts"
                      value={row?.count}
                      maxLength={10}
                      className="counts"
                      readOnly={!checkInvoice}
                    />
                  </div>
                </TableCell>
                <TableCell
                  align="left"
                  style={{ width: "20%" }}
                  onClick={() => incrementCount(row)}
                >
                  {row?.price} сом
                </TableCell>
                <TableCell align="center" style={{ width: "10%" }}>
                  <Tooltip title={"Удалить"} placement="top" disableInteractive>
                    <button
                      className="actionsDel"
                      disabled={!checkInvoice}
                      onClick={() => delProd(row)}
                    >
                      <DeleteIcon
                        sx={{
                          color: "rgba(213, 42, 42, 0.848)",
                          width: 20,
                          height: 20,
                        }}
                      />
                    </button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} align="left" className="footerTable">
                Итого
              </TableCell>
              <TableCell align="left" className="footerTable">
                {totalSum(listSendOrders, "count", "price")} сом
              </TableCell>
              <TableCell
                colSpan={2}
                align="left"
                style={{ fontWeight: "bold" }}
              >
                {sumCountsFN(listSendOrders, "count")} шт
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListAcceptProd;
