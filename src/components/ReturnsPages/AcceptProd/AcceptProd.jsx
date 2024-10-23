/////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

////// helpers
import { transformLists } from "../../../helpers/transformLists";

/////// components
import Select from "react-select";

////// style
import "./style.scss";

////// fns

//////// icons
import AddIcon from "../../../assets/MyIcons/AddIcon";

//////// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import { validNums } from "../../../helpers/validations";
import {
  changeCountCheckedListProds,
  getListCategs,
  getListProds,
  getListWorkShop,
} from "../../../store/reducers/mainSlice";
import {
  setActiveCategs,
  setActiveWorkShop,
} from "../../../store/reducers/selectsSlice";
import { createProdsReturn } from "../../../store/reducers/invoiceSlice";
import { myAlert } from "../../../helpers/MyAlert";

const AcceptProd = ({ invoiceGuid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { guid } = useSelector((state) => state.saveDataSlice?.dataSave);
  const { activeCategs } = useSelector((state) => state.selectsSlice);
  const { activeWorkShop } = useSelector((state) => state.selectsSlice);
  const { listProds } = useSelector((state) => state.mainSlice);

  const { listWorkshop } = useSelector((state) => state.mainSlice);
  const { listCategs } = useSelector((state) => state.mainSlice);

  const workShop = transformLists(listWorkshop, "guid", "name");
  const categs = transformLists(listCategs, "category_guid", "category_name");

  const onChangeWS = (item) => {
    dispatch(setActiveWorkShop(item)); ///// выбор селекта цехов
    dispatch(getListCategs(item)); /// для получение категорий
  };

  const onChangeCateg = (item) => {
    dispatch(setActiveCategs(item)); ///// выбор селекта категорий

    const obj = { guid: activeWorkShop?.guid, guidCateg: item?.category_guid };
    dispatch(getListProds(obj));
    /// для получение списка товаров
  };

  useEffect(() => {
    dispatch(getListWorkShop());
    ////  get список цехов (остатки ТА)
  }, []);

  const onChangeCount = (e, item) => {
    const count = e?.target?.value?.replace(",", ".");

    if (validNums(count)) return;
    //// валидация на числа

    dispatch(changeCountCheckedListProds({ ...item, count }));
    ///// изменение ключа count в списке товаров
  };

  const handleIncrement = (item) => {
    const count = parseFloat(item?.count || 0) + 1;
    if (count > item?.amount) return;

    dispatch(changeCountCheckedListProds({ ...item, count }));
  };

  const handleDecrement = (item) => {
    let count = parseFloat(item?.count || 0) - 1;
    if (count < 0) count = 0;
    if (count > item?.amount) return;
    dispatch(changeCountCheckedListProds({ ...item, count }));
  };

  const addProdInInvoice = async () => {
    const list = listProds?.filter((i) => i?.count !== 0 && i?.count !== "");

    const products = list?.map(({ count, workshop_price, product_guid }) => {
      return { product_guid, count, workshop_price };
    });

    const data = {
      invoice_guid: invoiceGuid,
      products,
      comment: "Накладная возврата",
    };

    const res = await dispatch(createProdsReturn(data)).unwrap();
    if (res?.result == 1) {
      myAlert("Товар добавлен");
      const obj = {
        guid: activeWorkShop?.guid,
        guidCateg: activeCategs?.category_guid,
      };
      dispatch(getListProds(obj));
    }
  };

  return (
    <div className="listReturn">
      <div className="listReturn__header">
        <div className="myInputs">
          <h6>Цех</h6>
          <Select
            options={workShop}
            className="select"
            onChange={onChangeWS}
            value={activeWorkShop}
          />
        </div>
        <div className="myInputs">
          <h6>Категории</h6>
          <Select
            options={categs}
            className="select"
            onChange={onChangeCateg}
            value={activeCategs}
          />
        </div>
      </div>
      <div className="listProdCRUD">
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
                  Возврат в кг
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
      <button className="createReturn" onClick={addProdInInvoice}>
        <AddIcon width={16} height={16} color={"#fff"} />
        <p>Добавить товары в накладную</p>
      </button>
    </div>
  );
};

export default AcceptProd;
