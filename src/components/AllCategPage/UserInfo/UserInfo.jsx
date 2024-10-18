////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

////// imgs
import userImg from "../../../assets/images/user.png";

////// helpers

////// components

////style
import "./style.scss";
import { useState } from "react";

const UserInfo = () => {
  const dispatch = useDispatch();

  const [look, setLook] = useState(false);

  const { dataSave } = useSelector((state) => state.saveDataSlice);

  return (
    <div className="headerParent">
      <img src={userImg} alt="()" />
      <div>
        <p className="userRole">{dataSave?.fio}</p>
        <p onClick={() => setLook(!look)} className="userName">
          {look ? "Долг: 10000 сом" : dataSave?.phone}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
