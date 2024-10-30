////// hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// components
import Select from "react-select";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

///// icons

////// fns
import { setActiveWorkShop } from "../../store/reducers/selectsSlice";

////// helpers
import { transformLists } from "../../helpers/transformLists";
import { getListProdsNur } from "../../store/reducers/standartSlice";

const ListChoiceProds = ({ setSearch, search, invoice_guid, action }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeWorkShop } = useSelector((state) => state.selectsSlice);

  const { listWorkShopsNur } = useSelector((state) => state.standartSlice);
  const { listProdsNur } = useSelector((state) => state.standartSlice);

  const onChangeWS = (item) => {
    dispatch(setActiveWorkShop(item)); ///// выбор селекта цехов
    const links = `get_workshop`;
    dispatch(getListProdsNur({ links, guid: item?.value }));
    // get список товаров с категориями
    setSearch("");
  };

  const workShop = transformLists(listWorkShopsNur, "guid", "name");

  const clickProd = (obj) => {
    const send = { ...obj, invoice_guid, action };
    navigate("/app/input_prods", { state: send });
  };

  return (
    <div className="listChoiceProds">
      <div className="listChoiceProds__prods">
        <div className="myInputs">
          <Select
            options={workShop}
            className="select"
            onChange={onChangeWS}
            value={activeWorkShop}
            isSearchable={false}
          />
        </div>
      </div>
      <div className="listProdCRUD">
        <div className="helpers">
          <div>
            <span className="vakuum"></span>
            <p>Вакуум</p>
          </div>
          <div>
            <span></span> <p>Без вакуум</p>
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
                    <TableCell
                      colSpan={3}
                      align="left"
                      style={{ width: "12%" }}
                    >
                      {item?.name}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item?.prods?.map((row) => (
                    <TableRow
                      key={row?.product_guid}
                      onClick={() => clickProd(row)}
                    >
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
    </div>
  );
};

export default ListChoiceProds;
