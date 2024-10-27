///// hooks
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

/////  components

////// helpers

///// fns

////// styles
import "./style.scss";
import { dataCategory } from "../../helpers/LocalData";
import UserInfo from "../../components/AllCategPage/UserInfo/UserInfo";
import { LogOut } from "../../components/AllCategPage/LogOut/LogOut";
import NavMenu from "../../common/NavMenu/NavMenu";
import { useState } from "react";

const AllCategPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { data } = useSelector((state) => state.saveDataSlice);
  // const { balance } = useSelector((state) => state.requestSlice);

  const getData = () => {
    // dispatch(getBalance(data?.seller_guid));
  };

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goPage = () => navigate("/pay/history");

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
      <div className="parentBlock">
        <div className="balance" onClick={goPage}>
          <div>
            <div className="balance__inner">
              <p>Баланс</p>
              <div></div>
            </div>
          </div>
          <p className="balance__history">История</p>
        </div>
      </div>

      <div className="allCateg">
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
    </>
  );
};

export default AllCategPage;
