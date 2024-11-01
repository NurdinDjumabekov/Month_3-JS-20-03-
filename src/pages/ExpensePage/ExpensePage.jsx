////hooks
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

/////// fns
import {
  createExpenseTA,
  delExpenseTA,
  getListExpense,
  getListExpenseTA,
} from "../../store/reducers/stateSlice";

/////// components
import NavMenu from "../../common/NavMenu/NavMenu";
import Modals from "../../components/Modals/Modals";
import SendInput from "../../common/SendInput/SendInput";

////// style
import "./style.scss";

////// icons
import AddIcon from "../../assets/MyIcons/AddIcon";

////// helpers
import { myAlert } from "../../helpers/MyAlert";
import DeleteIcon from "../../assets/MyIcons/DeleteIcon";
import { statusExpense } from "../../helpers/objs";

const ExpensePage = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({ amount: "", comment: "" });

  const { listExpenseTA } = useSelector((state) => state.stateSlice);
  const { dataSave } = useSelector((state) => state.saveDataSlice);

  useEffect(() => {
    dispatch(getListExpense());
    dispatch(getListExpenseTA(dataSave?.guid));
  }, []);

  const length = listExpenseTA?.length == 0;

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const createExpense = async () => {
    if (!!!data?.comment) return myAlert("Заполните комментарий", "error");
    if (!!!data?.amount) return myAlert("Заполните сумму", "error");

    const expense_type_guid = "8C8388E6-9F6A-4E74-B191-D4730BE6663B";
    const send = { ...data, expense_type_guid };
    const res = await dispatch(createExpenseTA(send)).unwrap();
    if (!!res?.result) {
      dispatch(getListExpenseTA(dataSave?.guid));
      setData({ amount: "", comment: "" });
    }
  };

  const openModalFN = () => {
    setData({ user_guid: dataSave?.guid, user_type: 1 });
  };

  const delExpense = async ({ guid }) => {
    const send = { expense_guid: guid };
    const res = await dispatch(delExpenseTA(send))?.unwrap();
    if (!!res?.result) {
      dispatch(getListExpenseTA(dataSave?.guid));
    }
  };

  return (
    <>
      <NavMenu navText={"Траты"} />
      <div className="expensePage">
        <button className="createExpense" onClick={openModalFN}>
          <AddIcon width={16} height={16} color={"#fff"} />
          <p>Добавить трату</p>
        </button>
        <div className="expensePage__inner">
          {length ? (
            <div className="emptyDataInner">
              <p>Список пустой</p>
            </div>
          ) : (
            <div className="list">
              {listExpenseTA?.map((item) => (
                <div>
                  <div className="mainData">
                    <p>{item?.date}</p>
                    <span>{item?.comment || "..."}</span>
                  </div>
                  <div className="status">
                    <p style={{ color: statusExpense?.[item?.status]?.color }}>
                      {statusExpense?.[item?.status]?.text}
                    </p>
                    <p>{item?.amount} сом</p>
                  </div>
                  {item?.status == 0 && (
                    <button className="del" onClick={() => delExpense(item)}>
                      <DeleteIcon width={22} height={22} color={"red"} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Modals
        openModal={!!data?.user_guid}
        closeModal={() => setData({})}
        title={"Добавить трату"}
      >
        <div className="createPay createExpense">
          <SendInput
            value={data?.amount}
            onChange={onChange}
            title={"Сумма"}
            name={"amount"}
            type="number"
          />

          <SendInput
            value={data?.comment}
            onChange={onChange}
            title={"Ваш комментарий"}
            name={"comment"}
            type="text"
            typeInput="textarea"
          />

          <button className="sendData" onClick={createExpense}>
            <AddIcon width={20} height={20} color={"#fff"} />
            <p>Добавить</p>
          </button>
        </div>
      </Modals>
    </>
  );
};

export default ExpensePage;
