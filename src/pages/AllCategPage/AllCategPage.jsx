///// hooks
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

/////  components
import UserInfo from "../../components/AllCategPage/UserInfo/UserInfo";
import { LogOut } from "../../components/AllCategPage/LogOut/LogOut";
import NavMenu from "../../common/NavMenu/NavMenu";
import { BottomSheet } from "react-spring-bottom-sheet";

////// helpers
import { dataCategory } from "../../helpers/LocalData";

///// icons
import ArrowNav from "@mui/icons-material/ArrowForwardIosSharp";

////// styles
import "./style.scss";

const AllCategPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { balanceTA } = useSelector((state) => state.standartSlice);

  const [look, setLook] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const clickCateg = (obj) => {
    navigate(`${obj?.link}`, {
      id: obj?.codeid,
      name: obj?.name,
      pathApi: obj?.pathApi,
    });
  };

  return (
    <>
      <NavMenu>
        <UserInfo /> <LogOut />
      </NavMenu>

      <div className="allCateg">
        <div className="parentBlock" onClick={() => setLook(true)}>
          <div className="balance">
            <div>
              <div className="balance__inner">
                <p>Баланс</p>
                <div></div>
              </div>
              <p className="balance__num">{balanceTA?.balance || 0} сом</p>
            </div>
            <p className="balance__history">Подробнее...</p>
          </div>
        </div>
        {dataCategory?.map((item, index) => (
          <button
            key={index}
            className="parentCateg"
            onClick={() => clickCateg(item)}
          >
            <div className="shadow"></div>
            <img src={item?.img} className="backgroundImage" />
            <div className="main">
              <p className="textTitle">{item?.name}</p>
            </div>
          </button>
        ))}
      </div>

      <BottomSheet
        open={look}
        onDismiss={() => setLook(false)}
        defaultSnap={({ maxHeight }) => maxHeight * 0.7}
        snapPoints={({ maxHeight }) => maxHeight * 0.7}
      >
        <div className="balanceModal">
          <div>
            <p>Ваш баланс: {balanceTA?.balance || 0} сом</p>
          </div>
          <div>
            <p>Долг цеху: {balanceTA?.dold_workshop || 0} сом</p>
          </div>
          <div>
            <p>Долги торговых точек: {balanceTA?.dolg_tt || 0} сом</p>
          </div>
          <div className="lookPay">
            <p>Посмотреть историю платежей ...</p>
            <ArrowNav sx={{ color: "#fff" }} />
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default AllCategPage;
