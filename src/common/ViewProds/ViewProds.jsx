import React from "react";

////// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

////// style
import "./style.scss";

///// helpers
import { roundingNum } from "../../helpers/totals";

const ViewProds = ({ list, keys, total_price, total_count }) => {
  const { key1, key2, key3, key4 } = keys;

  return (
    <div className="viewProds">
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "100%" }}
        className="scroll_table standartTable"
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "46%", padding: 5 }}>Товары</TableCell>
              <TableCell align="left" style={{ width: "18%" }}>
                Кг
              </TableCell>
              <TableCell align="left" style={{ width: "18%" }}>
                Шт
              </TableCell>
              <TableCell align="left" style={{ width: "18%" }}>
                Цена
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((row) => (
              <TableRow key={row?.product_guid}>
                <TableCell component="th" scope="row" style={{ width: "46%" }}>
                  {row?.[key1]}
                </TableCell>
                <TableCell align="left" style={{ width: "18%" }}>
                  {roundingNum(+row?.[key2])}
                </TableCell>
                <TableCell align="left" style={{ width: "18%" }}>
                  {roundingNum(+row?.[key3])}
                </TableCell>
                <TableCell align="left" style={{ width: "18%" }}>
                  {roundingNum(+row?.[key4])}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow className="footereTable">
            <TableCell colSpan={1} align="left">
              Итого
            </TableCell>
            <TableCell align="left">{roundingNum(+total_count || 0)}</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left">{roundingNum(+total_price || 0)}</TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewProds;
