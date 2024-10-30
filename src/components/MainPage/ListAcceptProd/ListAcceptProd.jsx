////// hooks
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import { Table, TableBody, TableCell, Tooltip } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

/////// fns
import { delProdInInvoice } from "../../../store/reducers/mainSlice"; /// delete

////// style
import "./style.scss";

////// helpers

////// icons
import DeleteIcon from "@mui/icons-material/Delete";
import { getListProdsInInvoiceNur } from "../../../store/reducers/standartSlice";

const ListAcceptProd = ({ invoice_guid }) => {
  const dispatch = useDispatch();

  const { listOrdersNur } = useSelector((state) => state.standartSlice);
  const { guid } = useSelector((state) => state.mainSlice?.invoiceInfo);
  const { activeDate } = useSelector((state) => state.mainSlice);
  const { listTA } = useSelector((state) => state.mainSlice);

  const delProd = ({ product_guid, invoice_guid, price, count }) => {
    const products = [{ product_guid, count, workshop_price: price }];
    const data = { invoice_guid, comment: "", status: -1, products };
    const obj = { listTA, activeDate, action: 3 };
    dispatch(delProdInInvoice({ data, ...obj, guid }));
  };

  const getData = () => {
    /// список товаров определённого заказа
    dispatch(getListProdsInInvoiceNur(invoice_guid));
  };

  useEffect(() => {
    getData();
  }, [invoice_guid]);

  console.log(listOrdersNur, "listOrdersNur");

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
                Вес
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
            {listOrdersNur?.map((row, index) => (
              <TableRow key={row?.product_guid}>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  style={{ width: "8%" }}
                >
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row" style={{ width: "50%" }}>
                  {row?.product_name}
                </TableCell>
                <TableCell align="left" style={{ width: "10%" }}>
                  {row?.count}
                </TableCell>
                <TableCell align="left" style={{ width: "20%" }}>
                  {row?.price} сом
                </TableCell>
                <TableCell align="center" style={{ width: "10%" }}>
                  <Tooltip title={"Удалить"} placement="top" disableInteractive>
                    <button className="actionsDel" onClick={() => delProd(row)}>
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
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                {listOrdersNur?.[0]?.total_count} кг
              </TableCell>
              <TableCell colSpan={2} align="left" className="footerTable">
                {listOrdersNur?.[0]?.total_price} сом
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListAcceptProd;
