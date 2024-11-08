////// hooks
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// components
import { Table, TableBody, TableCell, Tooltip } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

/////// fns
import { getListProdsInInvoiceNur } from "../../../store/reducers/standartSlice";
import { delProdsInInvoiceNur } from "../../../store/reducers/standartSlice";

////// style
import "./style.scss";

////// helpers
import { roundingNum } from "../../../helpers/totals";
import { myAlert } from "../../../helpers/MyAlert";

////// icons
import DeleteIcon from "@mui/icons-material/Delete";

const ListAcceptProd = ({ invoice_guid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listOrdersNur } = useSelector((state) => state.standartSlice);

  const delProd = async (props) => {
    const { product_guid, invoice_guid, price, count_kg } = props;

    const products = [{ product_guid, count: count_kg, workshop_price: price }];
    const data = { invoice_guid, comment: "", status: -1, products };
    const res = await dispatch(delProdsInInvoiceNur({ data })).unwrap();

    if (res?.[0]?.result == 1) {
      myAlert("Удалено");
      getData();
    } else {
      myAlert(res?.[0]?.msg, "error");
    }
  };

  const editProd = (obj) => {
    const send = { invoice_guid, action: 2, workshop_price: obj?.price };
    navigate("/app/input_prods", { state: { ...send, ...obj } });
    ///// редактирование кол-ва товара
  };

  const getData = () => dispatch(getListProdsInInvoiceNur(invoice_guid));
  /// список товаров определённого заказа

  useEffect(() => {
    getData();
  }, [invoice_guid]);

  if (listOrdersNur?.length == 0) {
    return (
      <div className="emptyData">
        <p>Список пустой</p>
      </div>
    );
  }

  const delStyle = { color: "rgba(213, 42, 42, 0.848)", width: 20, height: 20 };

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
              <TableCell style={{ width: "10%" }} align="center">
                №
              </TableCell>
              <TableCell style={{ width: "40%" }}>Продукт</TableCell>
              <TableCell align="left" style={{ width: "20%" }}>
                Вес
              </TableCell>
              <TableCell align="left" style={{ width: "20%" }}>
                Цена
              </TableCell>
              <TableCell
                align="center"
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
                  style={{ width: "10%" }}
                  onClick={() => editProd(row)}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: "40%" }}
                  onClick={() => editProd(row)}
                >
                  {row?.product_name}
                </TableCell>
                <TableCell
                  align="left"
                  style={{ width: "20%" }}
                  onClick={() => editProd(row)}
                >
                  {row?.count_kg} кг
                </TableCell>
                <TableCell
                  align="left"
                  style={{ width: "20%" }}
                  onClick={() => editProd(row)}
                >
                  {roundingNum(row?.price)} сом
                </TableCell>
                <TableCell align="center" style={{ width: "10%" }}>
                  <Tooltip title={"Удалить"} placement="top" disableInteractive>
                    <button className="actionsDel" onClick={() => delProd(row)}>
                      <DeleteIcon sx={delStyle} />
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
                {roundingNum(listOrdersNur?.[0]?.total_count_kg)} кг
              </TableCell>
              <TableCell colSpan={2} align="left" className="footerTable">
                {roundingNum(listOrdersNur?.[0]?.total_price)} сом
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListAcceptProd;
