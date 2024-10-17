////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// style
import "./style.scss";

////// components
import SearchShop from "./SearchShop/SearchShop";
import { Tooltip } from "@mui/material";

////// imgs
import plus from "../../../assets/icons/plus-square.svg";
import minus from "../../../assets/icons/minus-square.svg";
import user from "../../../assets/images/iAm.jpg";

////// fns
import { getListOrders } from "../../../store/reducers/mainSlice";
import { editListAgents } from "../../../store/reducers/mainSlice";
import { searchActiveOrdersTA } from "../../../helpers/searchActiveOrdersTA";

const MenuLeft = () => {
  const dispatch = useDispatch();

  const { listTA, activeDate } = useSelector((state) => state.mainSlice);

  const [look, setLook] = useState(true);
  const [checked, setChecked] = useState(true);

  const onChange = (guid) => {
    dispatch(editListAgents(guid));
    setChecked(!checked);
  };

  useEffect(() => {
    const agents_guid = searchActiveOrdersTA(listTA);
    dispatch(getListOrders({ ...activeDate, agents_guid }));
    /// get обновленный список каждой заявки по часам
  }, [checked]);

  // console.log(listTA, "listTA");

  return (
    <div className="menuLeft">
      <div className="menuLeft__inner">
        <SearchShop />
        <div className="title" onClick={() => setLook(!look)}>
          <h2>Торговые агенты</h2>
          <button>
            <img src={look ? minus : plus} alt="-" />
          </button>
        </div>
        <ul className={`content scroll_table ${look ? "show" : ""}`}>
          {listTA?.map((item) => (
            <li key={item?.guid} onClick={() => onChange(item?.guid)}>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={!!item?.is_checked}
                  onChange={(e) => onChange(item?.guid, e)}
                />
                <span className="slider"></span>
              </label>
              <div className="logo">
                <Tooltip
                  title={
                    <div style={{ borderRadius: "50%" }}>
                      <img
                        src={user}
                        alt="user"
                        style={{ width: 140, height: 140, borderRadius: "50%" }}
                      />
                    </div>
                  }
                  placement="right"
                  disableInteractive
                >
                  <img src={user} alt="user icon" />
                </Tooltip>
              </div>
              <p>{item?.fio}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuLeft;
