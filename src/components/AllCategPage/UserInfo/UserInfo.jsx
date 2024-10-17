////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

////// imgs
import userImg from "../../../assets/images/user.png";

////// helpers

////// components

////style
import "./style.scss";

const UserInfo = () => {
  const dispatch = useDispatch();

  const { dataSave } = useSelector((state) => state.saveDataSlice);

  return (
    <div className="headerParent">
      <img src={userImg} alt="()" />
      <div>
        <p className="userRole">{dataSave?.fio}</p>
        <p className="userName">{dataSave?.phone}</p>
      </div>
    </div>
  );
};

export default UserInfo;
