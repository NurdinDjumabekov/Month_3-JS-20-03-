////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

////// fns

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

////// style
import "./style.scss";

///// icons
import krest from "../../../assets/icons/krest.svg";
import RestoreIcon from "@mui/icons-material/Restore";

////// helpers
import { roundingNum } from "../../../helpers/totals";
import { myAlert } from "../../../helpers/MyAlert";
import { sendPayFN } from "../../../store/reducers/paySlice";

const PayInWhPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const { balanceTA } = location.state;

  const [count, setCount] = useState({ amount: "", comment: "" });

  useEffect(() => {
    setCount(+balanceTA);
    setTimeout(() => {
      inputRef?.current.focus();
    }, 200);
  }, [balanceTA]);

  const createPay = async (e) => {
    e.preventDefault();

    if (!!!count?.amount) {
      return myAlert("Введите сумму оплаты", "error");
    }

    const send = {
      user_guid_to: "B85094A9-D70A-46AB-A724-5F3D7A506B37",
      user_type_to: "2", /// данные админа
      return_amount: 0,
      amount: count?.amount || "0",
      comment: count?.comment || "оплачиваю",
    };

    const result = await dispatch(sendPayFN(send)).unwrap();
    if (!!result) {
      navigate(-1);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name == "amount") {
      // Проверка: цифры и до 3 цифр после точки
      if (/^\d*\.?\d{0,3}$/.test(value)) {
        setCount({ ...count, amount: value });
      }
    } else if (name == "comment") {
      setCount({ ...count, comment: value });
    }
  };

  const lookHistoryPay = () => {
    navigate("/invoice/pay_history");
  };

  return (
    <>
      <NavMenu navText={"Оплата в кассу"} />
      <form className="payAction payWH" onSubmit={createPay}>
        <div className="titles">
          <h3>Оплата в кассу</h3>
          <h4></h4>
          <div onClick={() => navigate(-1)}>
            <img src={krest} alt="x" />
          </div>
        </div>
        <div className="info">
          <p>Ваш долг цеху: </p>
          <span>{roundingNum(+balanceTA)} сом</span>
        </div>
        <div className="info inputData">
          <p>Сумма оплаты: </p>
          <span>
            <input
              type="tel"
              name="amount"
              ref={inputRef}
              onChange={onChange}
              inputMode="decimal"
              value={count?.amount}
            />
          </span>
        </div>

        <textarea
          name="comment"
          onChange={onChange}
          value={count?.comment}
          placeholder="Ваш комментарий"
        />

        <button className="startEndTA" type="submit">
          <p>+ Произвести оплату</p>
        </button>

        <div className="startEndTA history" onClick={lookHistoryPay}>
          <RestoreIcon />
          <p>Посмотреть историю платежей</p>
        </div>
      </form>
    </>
  );
};

export default PayInWhPage;
