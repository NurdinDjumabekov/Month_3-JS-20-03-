import React from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

/////// fns
import { changeCountCheckedListProds } from "../../../store/reducers/mainSlice";

////// helpers
import { validNums } from "../../../helpers/validations";

////// style
import "./style.scss";

const ListrReturnsProds = () => {
  const dispatch = useDispatch();

  const { listProds } = useSelector((state) => state.mainSlice);
  const { checkInvoice } = useSelector((state) => state.mainSlice);

  const onChangeCount = (e, item) => {
    const count = e?.target?.value?.replace(",", ".");

    if (validNums(count)) {
      //// валидация на числа
      return;
    }

    dispatch(changeCountCheckedListProds({ ...item, count }));
    ///// изменение ключа count в списке товаров
  };

  const handleIncrement = (item) => {
    const count = parseFloat(item?.count || 0) + 1;
    dispatch(changeCountCheckedListProds({ ...item, count }));
  };

  const handleDecrement = (item) => {
    let count = parseFloat(item?.count || 0) - 1;
    if (count < 0) count = 0;
    dispatch(changeCountCheckedListProds({ ...item, count }));
  };

  return (
    <div className="listProdCRUD returnsBlockProd">
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "100%" }}
        className="scroll_table standartTable"
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: "8%" }}>
                №
              </TableCell>
              <TableCell style={{ width: "58%" }}>Продукт</TableCell>
              <TableCell align="left" style={{ width: "14%" }}>
                Кол-во
              </TableCell>
              <TableCell align="left" style={{ width: "20%" }}>
                Цена
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProds?.map((row, index) => (
              <TableRow key={row?.product_guid}>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  style={{ width: "8%" }}
                  onClick={() => handleDecrement(row)}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: "58%" }}
                  onClick={() => handleDecrement(row)}
                >
                  {row?.product_name}
                </TableCell>
                <TableCell
                  align="left"
                  style={{ width: "14%", padding: 0 }}
                  className="counterRow"
                >
                  <div className="counterContainer">
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
                  onClick={() => handleIncrement(row)}
                >
                  {row?.workshop_price} сом
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListrReturnsProds;
