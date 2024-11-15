/////// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// fns
import {
  clearDataPay,
  getListPayTA,
  sendPayFN,
  setDataPay,
} from "../../store/reducers/paySlice";

////// components
import SendInput from "../../common/SendInput/SendInput";
import Modals from "../../common/Modals/Modals";
import Select from "react-select";

////// style
import "./style.scss";

////// helpers
import { transformLists } from "../../helpers/transformLists";
import { myAlert } from "../../helpers/MyAlert";

const AddPayPoint = ({ viewApp, setViewApp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { dataPay } = useSelector((state) => state.paySlice);
  const { listPointsEveryTA } = useSelector((state) => state.mapSlice);
  const { guid } = useSelector((state) => state.saveDataSlice?.dataSave);

  const sendPayForAdmin = async () => {
    if (!!!dataPay?.amount) {
      return myAlert("Введите сумму", "error");
    }
    if (!!!dataPay?.comment) {
      return myAlert("Введите комментарий", "error");
    }
    /// оплачиваю админу
    const data = {
      ...dataPay,
      user_guid_to: "B85094A9-D70A-46AB-A724-5F3D7A506B37",
      user_type_to: "2", /// данные админа
    };
    const result = await dispatch(sendPayFN(data)).unwrap();
    if (!!result) {
      dispatch(getListPayTA({ agent_guid: guid }));
      dispatch(clearDataPay());
    }
  };

  const sendPayForTT = async () => {
    if (!!!dataPay?.amount) {
      return myAlert("Введите сумму", "error");
    }
    if (!!!dataPay?.comment) {
      return myAlert("Введите комментарий", "error");
    }
    /// беру опалту у ТТ
    const { amount, comment } = dataPay;
    const data = {
      amount,
      comment,
      user_guid_to: dataPay?.point?.value,
      user_type_to: "4", /// данные ТТ
    };
    const result = await dispatch(sendPayFN(data)).unwrap();
    if (!!result) {
      dispatch(getListPayTA({ agent_guid: guid }));
      setViewApp(false);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(setDataPay({ ...dataPay, [name]: value }));
  };

  const onChangePoint = (value) => {
    dispatch(setDataPay({ ...dataPay, point: value }));
  };

  const list_point = transformLists(listPointsEveryTA, "guid", "text");

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

            <button className="sendData" onClick={sendPayForAdmin}>
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
              <h6>Торговые точки</h6>
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

            <button className="sendData" onClick={sendPayForTT}>
              Принять оплату
            </button>
          </div>
        </Modals>
      </div>
    );
  }
};

export default AddPayPoint;
