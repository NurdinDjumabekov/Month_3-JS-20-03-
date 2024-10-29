////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

/////// fns
import { setListProdsSI } from "../../../store/reducers/invoiceSlice";
import { changeCountCheckedListProdsSI } from "../../../store/reducers/invoiceSlice";

////// helpers
import { validNums } from "../../../helpers/validations";

////// style
import "./style.scss";

const ListProdsSI = () => {
  const dispatch = useDispatch();

  const { listProdsSI } = useSelector((state) => state.invoiceSlice);
  const { checkInvoice } = useSelector((state) => state.invoiceSlice);

  const onChangeCheck = (e, { product_guid }) => {
    const newList = listProdsSI?.map((i) => {
      if (i?.product_guid === product_guid) {
        return { ...i, is_checked: !i?.is_checked };
      } else {
        return i;
      }
    });

    dispatch(setListProdsSI(newList));
  };

  const onChangeCount = (count, item) => {
    if (validNums(count)) {
      return; //// Валидация на числа
    }

    if (item?.amount < count || count < 0) {
      return; //// Проверка, чтобы количество не превышало остаток и не было меньше нуля
    }

    dispatch(changeCountCheckedListProdsSI({ ...item, count }));
  };

  const increaseCount = (item) => {
    const newCount = Number(item.count) + 1;
    if (item?.amount >= newCount) {
      onChangeCount(newCount, item);
    }
  };

  const decreaseCount = (item) => {
    const newCount = Number(item.count) - 1;
    if (newCount >= 0) {
      onChangeCount(newCount, item);
    }
  };

  return (
    <div className="listProdCRUD_SI">
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "100%" }}
        className="scroll_table standartTable"
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "50%" }}>Продукт</TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                Остаток
              </TableCell>
              <TableCell align="left" style={{ width: "10%" }}>
                Кол-во
              </TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                Цена
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProdsSI?.map((row) => (
              <TableRow key={row?.product_guid}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: "50%" }}
                  onClick={() => decreaseCount(row)}
                >
                  {row?.product_name}
                </TableCell>
                <TableCell
                  align="left"
                  style={{ width: "15%" }}
                  onClick={() => decreaseCount(row)}
                >
                  {row?.amount} шт
                </TableCell>
                <TableCell align="left" style={{ width: "10%" }}>
                  <input
                    type="text"
                    onChange={(e) => onChangeCount(e.target.value, row)}
                    name="counts"
                    value={row?.count}
                    maxLength={10}
                    className="counts"
                    readOnly={!checkInvoice}
                  />
                </TableCell>
                {/* <TableCell align="left" style={{ width: "10%" }}>
                  <input
                    type="checkbox"
                    onChange={(e) => onChangeCheck(e, row)}
                    className="checkboxInner"
                    name="check"
                    checked={row?.is_checked}
                    disabled={!checkInvoice}
                  />
                </TableCell> */}
                <TableCell
                  align="left"
                  style={{ width: "15%" }}
                  onClick={() => increaseCount(row)}
                >
                  {row?.price} сом
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListProdsSI;
