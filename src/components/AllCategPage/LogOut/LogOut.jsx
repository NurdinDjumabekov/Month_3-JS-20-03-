////// hooks
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

///// components
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";

///// fns
import { clearDataSave } from "../../../store/reducers/saveDataSlice";

////style
import "./style.scss";

export const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modal, setMoodal] = useState(false);

  const logOut = () => {
    dispatch(clearDataSave());
    navigate("/");
    // window.location.reload();
  };

  return (
    <>
      <button onClick={() => setMoodal(true)} className="logoutParent">
        <div className="logoutInner">
          <div className="lineLogOut">
            <div className="lineLogOut__inner"></div>
          </div>
        </div>
      </button>

      <ConfirmModal
        state={modal}
        yesFN={logOut}
        noFN={() => setMoodal(false)}
        title={"Выйти c приложения ?"}
      />
    </>
  );
};
