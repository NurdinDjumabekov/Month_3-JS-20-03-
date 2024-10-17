import React from "react";

////// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import { sumCountsFN, totalSum } from "../../../../helpers/totals";

const ListIngredients = ({ list }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ height: "99%", width: "60%" }}
      className="scroll_table standartTable"
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "3%" }} align="center">
              №
            </TableCell>
            <TableCell style={{ width: "67%" }}>Продукт</TableCell>
            <TableCell align="left" style={{ width: "15%" }}>
              Кол-во/вес
            </TableCell>
            <TableCell align="left" style={{ width: "15%" }}>
              ед. изм
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list?.map((row, index) => (
            <TableRow hover key={index}>
              <TableCell
                align="center"
                component="th"
                scope="row"
                style={{ width: "3%" }}
              >
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row" style={{ width: "67%" }}>
                {row?.name}
              </TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                {row?.amount}
              </TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                {row?.unit_name}
              </TableCell>
            </TableRow>
          ))}
          {/* <TableRow>
            <TableCell colSpan={2} align="left" className="footerTable">
              Итого
            </TableCell>
            <TableCell align="left" className="footerTable">
              {sumCountsFN(list, "amount")} сом
            </TableCell>
            <TableCell colSpan={2} align="left" style={{ fontWeight: "bold" }}>
              {sumCountsFN(list, "count")} {row?.unit_name}
              100 шт
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListIngredients;
