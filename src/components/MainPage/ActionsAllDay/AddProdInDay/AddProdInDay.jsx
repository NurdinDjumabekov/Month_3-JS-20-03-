////// hooks
import React from "react";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import Select from "react-select";
import debounce from "debounce";

/////// fns
import { createInvoiceAdmin } from "../../../../store/reducers/mainSlice";
import { addEveryProd } from "../../../../store/reducers/mainSlice";
import { getListCategs } from "../../../../store/reducers/mainSlice";
import { getListProds } from "../../../../store/reducers/mainSlice";
import { getListWorkShop } from "../../../../store/reducers/mainSlice";
import { searchListProds } from "../../../../store/reducers/mainSlice";
import { changeCountListProds } from "../../../../store/reducers/mainSlice";
import { setActiveWorkShop } from "../../../../store/reducers/selectsSlice";
import { setActiveTA } from "../../../../store/reducers/selectsSlice";
import { setActiveCategs } from "../../../../store/reducers/selectsSlice";

////// helpers
import { validNums } from "../../../../helpers/validations";
import { transformLists } from "../../../../helpers/transformLists";
import { myAlert } from "../../../../helpers/MyAlert";
import { addDateFN } from "../../../../helpers/transformDate";
import { searchActiveOrdersTA } from "../../../../helpers/searchActiveOrdersTA";

/////// style
import "./style.scss";

/////// icons
import AddBoxIcon from "@mui/icons-material/AddBox";

const AddProdInDay = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { listWorkshop } = useSelector((state) => state.mainSlice);
  const { listCategs } = useSelector((state) => state.mainSlice);
  const { listProds } = useSelector((state) => state.mainSlice);
  const { listTA } = useSelector((state) => state.mainSlice);
  const { invoiceInfo } = useSelector((state) => state.mainSlice);

  const { activeWorkShop } = useSelector((state) => state.selectsSlice);
  const { activeCategs } = useSelector((state) => state.selectsSlice);
  const { activeTA } = useSelector((state) => state.selectsSlice);
  const { checkInvoice } = useSelector((state) => state.mainSlice);

  const workShop = transformLists(listWorkshop, "guid", "name");
  const categs = transformLists(listCategs, "category_guid", "category_name");
  const list_TA = transformLists(listTA, "guid", "fio");

  const onChangeWS = (item) => {
    dispatch(setActiveWorkShop(item)); ///// выбор селекта цехов
    dispatch(getListCategs(item)); /// для получение категорий
    setSearch("");
  };

  const onChangeCateg = (item) => {
    dispatch(setActiveCategs(item)); ///// выбор селекта категорий
    const obj = { guid: activeWorkShop?.guid, guidCateg: item?.category_guid };
    dispatch(getListProds(obj));
    /// для получение списка товаров
    setSearch("");
  };

  const handleSearch = useCallback(
    //// поиск товара через запрос
    debounce((value) => {
      dispatch(searchListProds(value));
    }, 500),
    []
  );

  const onChangeSearch = (e) => {
    const value = e?.target?.value;
    setSearch(value);
    if (value?.length === 0) {
      dispatch(getListWorkShop());
    } else {
      handleSearch(value);
    }
  };

  const onChangeAgents = (item) => {
    dispatch(setActiveTA(item));
    ///// выбор селекта ТА

    const { date_from, date_to } = addDateFN(invoiceInfo?.date_from);
    const obj = { date_from, date_to, agent_guid: item?.value };
    dispatch(createInvoiceAdmin(obj));
    ///// создание накладной админом за ТА
  };

  const addProdInvoice = (obj) => {
    const { product_guid, count, workshop_price } = obj;
    if (!!!activeTA?.guid) {
      myAlert("Выберите торгового агента!", "error");
      return;
    }

    if (obj?.count == "" || obj?.count == 0) {
      myAlert("Введите количество товара", "error");
      return;
    }

    const data = {
      invoice_guid: invoiceInfo?.guid,
      comment: "",
      products: [{ product_guid, count, workshop_price }],
    }; //// для добавление товара по олному в заявку

    const agents_guid = searchActiveOrdersTA(listTA);
    const updateData = {
      agents_guid: [...agents_guid, activeTA?.guid],
      date_from: invoiceInfo?.date_from,
      date_to: invoiceInfo?.date_from,
      //// для отпраки данных на обнолвение (после успешного добаление вызывается другой запрос)
    };

    dispatch(addEveryProd({ data, updateData }));
    //// добавление товаров в заявку по одному(внутр есть хапрос на обновление)
  };

  //////////////////////////////////////////// selects

  const onChangeCount = (e, item) => {
    const count = e?.target?.value?.replace(",", ".");

    if (validNums(count)) {
      //// валидцаия на числа
      return;
    }

    dispatch(changeCountListProds({ ...item, count }));
    /////изменение ключа count в списке товаров
  };

  return (
    <div className="addProdInDay indridients">
      <div className="selectsAll__inner daySelects">
        <div className="myInputs">
          <h6>Поиск товаров </h6>
          <input
            type="text"
            className="input"
            onChange={onChangeSearch}
            value={search}
          />
        </div>
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
        <div className="myInputs">
          <h6>Агенты</h6>
          <Select
            options={list_TA}
            className="select"
            onChange={onChangeAgents}
            value={activeTA}
          />
        </div>
      </div>
      <TableContainer
        component={Paper}
        sx={{ height: "99%" }}
        className="scroll_table standartTable"
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "60%" }}>Продукт</TableCell>
              <TableCell align="left" style={{ width: "20%" }}>
                Цена
              </TableCell>
              <TableCell align="left" style={{ width: "20%" }}>
                Кол-во (кг)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProds?.map((row) => (
              <TableRow key={row?.product_guid}>
                <TableCell component="th" scope="row" style={{ width: "60%" }}>
                  {row?.product_name}
                </TableCell>
                <TableCell align="left" style={{ width: "20%" }}>
                  {row?.workshop_price} сом
                </TableCell>
                <TableCell align="left" style={{ width: "20%" }}>
                  <div className="input">
                    <input
                      type="text"
                      onChange={(e) => onChangeCount(e, row)}
                      name="counts"
                      value={row?.count}
                      maxLength={10}
                      className="counts"
                      readOnly={!checkInvoice}
                    />
                    <button
                      onClick={() => addProdInvoice(row)}
                      disabled={!checkInvoice}
                    >
                      <AddBoxIcon sx={{ color: "#299b31" }} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AddProdInDay;
