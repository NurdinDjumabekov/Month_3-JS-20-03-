////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

////// fns

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

////// style
import "./style.scss";

//// icons

const ActionsInvoicePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const list = [
    {
      codeid: 1,
      name: "Накладные отпуска",
      img: "https://img.freepik.com/free-vector/flat-university-concept_23-2148184535.jpg?t=st=1714467037~exp=1714470637~hmac=5c4ad18c3bd18c0d4b01c395340bf0b264b4c3ec37090fd429ec276be7a41b7d&w=900",
      nav: "/history_accept",
      count: 1,
    },
    {
      codeid: 2,
      name: "Накладные возврата",
      more: "",
      img: "https://img.freepik.com/free-vector/balance-sheet-cartoon-web-icon-accounting-process-finance-analyst-calculating-tools-financial-consulting-idea-bookkeeping-service_335657-2313.jpg?t=st=1711965019~exp=1711968619~hmac=635d5b94c27cf917e8532dfd722c44aba43db051d262065031cdac53408da1ab&w=900",
      nav: "/history_return",
      count: 1,
    },
    {
      codeid: 3,
      name: "Оплатить в кассу",
      more: "",
      img: "https://img.freepik.com/free-vector/euro-coins-concept-illustration_114360-15485.jpg?t=st=1710925698~exp=1710929298~hmac=4fb3746133437b6b0ca94daa3d06c8c634817a0562bb3e4ac1df5e613f3512bd&w=740",
      nav: "/history_return",
      count: 1,
    },
  ];

  const clickTypePoint = ({ nav }) => navigate(`/invoice${nav}`);

  return (
    <>
      <NavMenu navText={"Действия в цехе"} />
      <div className="pointsMain actionsInvoice">
        <div className="pointsMain__inner">
          {list?.map((i) => (
            <div
              className="every"
              onClick={() => clickTypePoint(i)}
              key={i?.codeid}
            >
              <div className="texts">
                <div className="title">
                  <p>
                    {i?.name} {!!i?.more && <>({i?.more})</>}
                  </p>
                </div>
                <span>{+i?.count}+</span>
              </div>
              <div className="icons">
                <img src={i?.img} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ActionsInvoicePage;
