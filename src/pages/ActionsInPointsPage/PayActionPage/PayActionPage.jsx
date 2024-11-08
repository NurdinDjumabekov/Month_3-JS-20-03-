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
import { sendPayAgent } from "../../../store/reducers/standartSlice";

const PayActionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const { paid, tt_dolg, total_to_pay } = location?.state;
  const { count_kg, point, action, point_guid } = location?.state;
  const { sum_accept, sum_return } = location?.state;

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
    setCount({ returnCount: sum_return, sendCount: sum_accept });
    setTimeout(() => {
      inputRef?.current.focus();
    }, 200);
  }, [action]);

  const createPay = async (e) => {
    e.preventDefault();

    if (!!!count?.sendCount || !!!count?.returnCount) {
      myAlert("Поля не могут быть пустыми, введите значение '0'", "error");
      return;
    }
    const send = {
      user_guid_to: point_guid,
      user_type_to: 4,
      amount: count?.sendCount,
      return_amount: count?.returnCount,
      comment: "Оплачиваю",
    };
    const res = await dispatch(sendPayAgent(send)).unwrap();
    if (!!res?.result) {
      myAlert("Оплата прошла успешно");
      navigate(-1);
    }
  };

  return (
    <>
      <NavMenu navText={"Назад"} />
      <form className="payAction" onSubmit={createPay}>
        <div className="titles">
          <h3>{point}.</h3>
          <h4></h4>
          <div onClick={() => navigate(-1)}>
            <img src={krest} alt="x" />
          </div>
        </div>

        <div className="info">
          <p>Долг точки: </p>
          <span>{roundingNum(+tt_dolg)} сом</span>
        </div>

        <div className="info inputData">
          <p>Сумма возврата: </p>
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
          <p>Сумма прихода:</p>
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
        <div className="info result">
          <p>Оплачено: </p>
          <span>{roundingNum(+paid)} сом</span>
        </div>

        {/* <div className="info result">
          <p>Итого к оплате: </p>
          <span>{roundingNum(+total_to_pay)} сом</span>
        </div> */}

        <button className="startEndTA" type="submit">
          <p>+ Произвести оплату</p>
        </button>
      </form>
    </>
  );
};

export default PayActionPage;
