////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

///// icons
import krest from "../../../assets/icons/krest.svg";
import { myAlert } from "../../../helpers/MyAlert";

///// fns
import {
  addProdsInInvoiceNur,
  getListProdsInInvoiceNur,
} from "../../../store/reducers/standartSlice";

const InputInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const { product_name, invoice_guid, product_price } = location?.state;
  const { category_name, product_guid } = location?.state;

  const [inputProd, setInputProd] = useState("");

  const { dataSave } = useSelector((state) => state.saveDataSlice);

  const onChange = (e) => {
    const value = e.target.value;

    // Проверка: цифры и до 3 цифр после точки
    if (/^\d*\.?\d{0,3}$/.test(value)) {
      setInputProd(value);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef?.current.focus();
    }, 500);
  }, []);

  const sendProds = async (e) => {
    e.preventDefault();

    if (!!!inputProd) {
      myAlert("Поля не должны быть пустыми или равны 0", "error");
      return;
    }

    const data = {
      invoice_guid,
      comment: "...",
      // products: [
      //   { product_guid, count: inputProd, workshop_price: product_price },
      // ],
      products: [
        {
          count: "12",
          product_guid: "8ED65AD8-4977-11E6-8293-000C29BE2924",
          workshop_price: 370,
        },
      ],
      user_guid: dataSave?.guid,
      user_type: 1,
    };

    const res = await dispatch(addProdsInInvoiceNur({ data })).unwrap();

    if (!!res?.results?.[0]) {
      navigate(-1);
      /// список товаров определённого заказа
      dispatch(getListProdsInInvoiceNur(invoice_guid));
    }
  };

  return (
    <>
      <NavMenu navText={"Назад"} />

      <div className="inputInvoice">
        <div className="titles">
          <h3>Категория товара: {category_name}</h3>
          <h4>Наименование товара: {product_name}</h4>
          <button onClick={() => navigate(-1)}>
            <img src={krest} alt="x" />
          </button>
        </div>
        {/* <div className="lefttovers">
          <p>Остаток в кг: 100кг</p>
          <p>Остаток в шт: 100шт</p>
        </div> */}
        <div className="price">
          <div className="inputSend">
            <p>Цена товара</p>
            <input value={`${product_price} сом`} readOnly />
          </div>
        </div>

        <form className="count" onSubmit={sendProds}>
          <div className="inputSend">
            <p>Введите итоговый вес товара</p>
            <input
              value={inputProd}
              onChange={onChange}
              ref={inputRef}
              type="tel"
              inputMode="decimal"
            />
          </div>
          <button type="submit">
            <p>Добавить</p>
          </button>
        </form>
      </div>
    </>
  );
};

export default InputInvoicePage;
