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
  //// delete
  const dispatch = useDispatch();

  const { listProdsNur } = useSelector((state) => state.standartSlice);

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
          <p>Вакуум</p>
        </div>
        <div>
          <span></span>
          <p>Без вакуум</p>
        </div>
      </div>
      <div className="listProdCRUD__inner">
        {listProdsNur?.map((item) => (
          <TableContainer
            component={Paper}
            className="scroll_table standartTable"
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3} align="left" style={{ width: "12%" }}>
                    {item?.name}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item?.prods?.map((row) => (
                  <TableRow key={row?.product_guid}>
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

                    <TableCell align="left" style={{ width: "20%" }}>
                      {row?.price} сом
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ))}
      </div>
    </div>
  );
};

export default ListProds;
