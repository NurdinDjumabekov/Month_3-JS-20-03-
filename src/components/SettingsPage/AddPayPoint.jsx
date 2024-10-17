/////// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// fns
import {
  clearDataPay,
  sendPayFN,
  setDataPay,
} from "../../store/reducers/paySlice";

////// components
import SendInput from "../../common/SendInput/SendInput";
import Modals from "../../components/Modals/Modals";
import Select from "react-select";

////// style
import "./style.scss";

////// helpers
import { transformLists } from "../../helpers/transformLists";

const AddPayPoint = ({ viewApp, setViewApp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { dataPay } = useSelector((state) => state.paySlice);
  const { listPointsEveryTA } = useSelector((state) => state.mapSlice);

  const sendPay = () => {
    const data = {
      ...dataPay,
      user_type: "1",
      create_user_guid: "B85094A9-D70A-46AB-A724-5F3D7A506B37",
      create_user_type: "2", /// данные админа
    };
    dispatch(sendPayFN(data));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(setDataPay({ ...dataPay, [name]: value }));
  };

  const onChangePoint = (value) => {
    dispatch(setDataPay({ ...dataPay, point: value }));
  };

  const list_point = transformLists(listPointsEveryTA, "guid", "text");

  console.log(dataPay);

  if (!!dataPay?.user_guid) {
    return (
      <div>
        <Modals
          openModal={!!dataPay?.user_guid}
          closeModal={() => dispatch(clearDataPay())}
          title={"Оплата"}
        >
          <div className="createPay">
            <SendInput
              value={dataPay?.amount}
              onChange={onChange}
              title={"Сумма"}
              name={"amount"}
              type="number"
            />

            <SendInput
              value={dataPay?.comment}
              onChange={onChange}
              title={"Ваш комментарий"}
              name={"comment"}
              type="text"
              typeInput="textarea"
            />

            <button className="sendData" onClick={sendPay}>
              Произвести оплату
            </button>
          </div>
        </Modals>
      </div>
    );
  }

  const closeModal = () => {
    setViewApp(false);
    dispatch(clearDataPay());
  };

  if (viewApp) {
    return (
      <div>
        <Modals openModal={viewApp} closeModal={closeModal} title={"Оплата"}>
          <div className="createPay">
            <div className="myInputs">
              <h6>Цех</h6>
              <Select
                options={list_point}
                className="select"
                onChange={onChangePoint}
                value={dataPay?.point}
              />
            </div>

            <SendInput
              value={dataPay?.amount}
              onChange={onChange}
              title={"Сумма"}
              name={"amount"}
              type="number"
            />

            <SendInput
              value={dataPay?.comment}
              onChange={onChange}
              title={"Ваш комментарий"}
              name={"comment"}
              type="text"
              typeInput="textarea"
            />

            <button className="sendData" onClick={sendPay}>
              Произвести оплату
            </button>
          </div>
        </Modals>
      </div>
    );
  }
};

export default AddPayPoint;
