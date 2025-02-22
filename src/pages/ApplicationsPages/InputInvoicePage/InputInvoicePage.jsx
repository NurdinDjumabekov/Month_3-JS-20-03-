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

///// helpers
import { myAlert } from "../../../helpers/MyAlert";
import { roundingNum } from "../../../helpers/totals";

///// fns
import { getListProdsInInvoiceNur } from "../../../store/reducers/standartSlice";
import { editProdsInInvoiceNur } from "../../../store/reducers/standartSlice";
import { addProdsInInvoiceNur } from "../../../store/reducers/standartSlice";

const InputInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  /// action - 1 - создание заявки
  /// action - 2 - редактирвоание заявки

  const { product_name, invoice_guid, workshop_price } = location?.state;
  const { category_name, product_guid, action } = location?.state;
  const { count_kg, type_unit, checkTypeProds } = location?.state;
  const amount = location?.state?.amount;
  const amount_kg = location?.state?.amount_kg;

  const [count, setCount] = useState("");

  const onChange = (e) => {
    const value = e.target.value;

    // Проверка: цифры и до 3 цифр после точки
    if (/^\d*\.?\d{0,3}$/.test(value)) {
      setCount(value);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef?.current.focus();
    }, 300);

    switch (action) {
      case 1:
        setCount(count_kg);
        break;
      case 2:
        setCount(count_kg);
        break;

      default:
        break;
    }
  }, [action]);

  const addProds = async (e) => {
    e.preventDefault();

    if (!!!count) {
      myAlert("Поля не должны быть пустыми или равны 0", "error");
      return;
    }

    const products = [{ product_guid, count, workshop_price }];
    const data = { invoice_guid, comment: "...", products };
    const res = await dispatch(addProdsInInvoiceNur({ data })).unwrap();

    console.log(res?.results?.[0]);
    /// список товаров определённого заказа
    if (res?.results?.[0] == 1) {
      dispatch(getListProdsInInvoiceNur(invoice_guid));
      navigate(-1);
    }
    if (res?.results?.[0] == -2) {
      myAlert("Вакуммный товар не может быть добавлен на завтра", "error");
      // navigate(-1);
    }
    if (res?.results?.[0] == -3) {
      myAlert(
        "В список вакуумных товаров нельзя добавить без вакуум, создайте новую заявку!",
        "error"
      );
      // navigate(-1);
    }
    if (res?.results?.[0] == -4) {
      myAlert(
        "В список без вакуумных товаров нельзя добавить вакуум, создайте новую заявку!",
        "error"
      );
      // navigate(-1);
    }
  };

  const editProds = async (e) => {
    e.preventDefault();
    if (!!!count) {
      myAlert("Поля не должны быть пустыми или равны 0", "error");
      return;
    }

    const products = [{ product_guid, count, workshop_price }];
    const data = { invoice_guid, comment: "...", products, status: 2 };
    const res = await dispatch(editProdsInInvoiceNur({ data })).unwrap();

    if (res?.[0]?.result == 1) {
      myAlert("Отредактировано успешно");
      /// список товаров определённого заказа
      dispatch(getListProdsInInvoiceNur(invoice_guid));
      navigate(-1);
    } else {
      myAlert(res?.[0]?.msg, "error");
    }
  };

  const crateaction = (e) => {
    switch (action) {
      case 1:
        addProds(e);
        break;
      case 2:
        editProds(e);
        break;

      default:
        break;
    }
  };

  const objUnit = {
    1: "Введите итоговое кол-во товара",
    2: "Введите итоговый вес товара",
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
        {!!checkTypeProds && (
          <>
            <div className="info lefttovers">
              <p>Остаток в кг: </p>
              <span>{roundingNum(amount_kg)} кг</span>
            </div>
            <div className="info lefttovers">
              <p>Остаток в шт: </p>
              <span>{roundingNum(amount)} шт</span>
            </div>
          </>
        )}
        <div className="price">
          <div className="inputSend">
            <p>Цена товара</p>
            <input value={`${workshop_price} сом`} readOnly />
          </div>
        </div>

        <form className="count" onSubmit={crateaction}>
          <div className="inputSend">
            <p>{objUnit?.[type_unit]}</p>
            <input
              value={count}
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
