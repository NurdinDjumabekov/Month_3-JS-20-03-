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

const ListProds = () => {
  const dispatch = useDispatch();

  const { listProds } = useSelector((state) => state.mainSlice);

  const onChangeCount = (e, item) => {
    const count = e?.target?.value?.replace(",", ".");

    if (validNums(count)) {
      //// валидация на числа
      return;
    }

    dispatch(changeCountCheckedListProds({ ...item, count }));
    ///// изменение ключа count в списке товаров
  };

  return (
    <div className="listProdCRUD">
      <div className="helpers">
        <div>
          <span className="vakuum"></span>
          <p>Ваакум</p>
        </div>
        <div>
          <span></span>
          <p>Без ваакум</p>
        </div>
      </div>
      <div className="listProdCRUD__inner">
        <TableContainer
          component={Paper}
          className="scroll_table standartTable"
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={3} align="left" style={{ width: "12%" }}>
                  Сосиски замороженые (20)
                </TableCell>
                {/* <TableCell style={{ width: "68%" }}>Продукт</TableCell> */}
                {/* <TableCell align="left" style={{ width: "16%" }}>
                  Вес
                </TableCell> */}
                {/* <TableCell align="left" style={{ width: "20%" }}>
                  Цена
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {listProds?.map((row, index) => (
                <TableRow key={row?.product_guid}>
                  {/* <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    style={{ width: "12%" }}
                  >
                    {index + 1}
                  </TableCell> */}
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "68%" }}
                  >
                    {row?.product_name}
                    {/* <div
                      className={`lineVaakum ${
                        !!row?.is_vakuum ? "is_vakuum" : ""
                      }`}
                    ></div> */}
                  </TableCell>
                  {/* <TableCell
                    align="left"
                    style={{ width: "16%", padding: 0 }}
                    className="counterRow"
                  >
                    <div className="counterContainer">
                      <input
                        type="number"
                        onChange={(e) => onChangeCount(e, row)}
                        name="counts"
                        value={row?.count}
                        maxLength={10}
                        className="counts"
                        readOnly={!checkInvoice}
                      />
                    </div>
                  </TableCell> */}
                  <TableCell align="left" style={{ width: "20%" }}>
                    {row?.workshop_price} сом
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ListProds;
