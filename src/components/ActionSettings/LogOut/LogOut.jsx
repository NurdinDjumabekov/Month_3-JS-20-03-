/////// hooks
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

////// imgs
import lofOut from "../../../assets/images/logout.png";

////// style
import "./style.scss";

/////// components
import { Tooltip } from "@mui/material";

/////// fns
import { clearDataSave } from "../../../store/reducers/saveDataSlice";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(clearDataSave());

    setTimeout(() => {
      navigate("/");
    }, 300);
    // window.location.reload();
  };

  return (
    <Tooltip title={"Выйти"} placement="left">
      <div className="logOut">
        <button onClick={logOut}>
          <img src={lofOut} alt="()" />
        </button>
      </div>
    </Tooltip>
  );
};

export default LogOut;
