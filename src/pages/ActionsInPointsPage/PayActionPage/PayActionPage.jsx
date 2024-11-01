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

///// fns
import { roundingNum } from "../../../helpers/totals";

const PayActionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const { product_name, invoice_guid, workshop_price } = location?.state;
  const { category_name, product_guid, action } = location?.state;
  const { count_kg, point } = location?.state;

  const [count, setCount] = useState({ returnCount: "", sendCount: "" });

  const onChange = (e) => {
    const value = e.target?.value;
    const name = e.target?.name;
    // Проверка: цифры и до 3 цифр после точки
    if (/^\d*\.?\d{0,3}$/.test(value)) {
      setCount({ ...count, [name]: value });
    }
  };

  useEffect(() => {
    inputRef?.current.focus();
  }, [action]);

  const createPay = (e) => {};

  return (
    <>
      <NavMenu navText={"Назад"} />
      <div className="payAction">
        <div className="titles">
          <h3>{point}.</h3>
          <h4></h4>
          <button onClick={() => navigate(-1)}>
            <img src={krest} alt="x" />
          </button>
        </div>

        <div className="info">
          <p>Долг точки: </p>
          <span>{roundingNum(105)} сом</span>
        </div>

        <div className="info inputData">
          <p>Сумма прихода: </p>
          <span>
            <input
              type="tel"
              name="returnCount"
              ref={inputRef}
              onChange={onChange}
              inputMode="decimal"
              value={count?.returnCount}
            />
          </span>
        </div>
        <div className="info inputData">
          <p>Сумма возврата: </p>
          <span>
            <input
              type="tel"
              name="sendCount"
              onChange={onChange}
              inputMode="decimal"
              value={count?.sendCount}
            />
          </span>
        </div>
        <div className="info">
          <p>Оплачено: </p>
          <span>{roundingNum(105)} сом</span>
        </div>

        <div className="info result">
          <p>Итого к оплате: </p>
          <span>{roundingNum(105)} сом</span>
        </div>

        <button className="startEndTA" onClick={createPay}>
          <p>+ Произвести оплату</p>
        </button>
      </div>
    </>
  );
};

export default PayActionPage;
