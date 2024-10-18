import React, { useEffect } from "react";
import NavMenu from "../../common/NavMenu/NavMenu";
import { getTasks } from "../../store/reducers/pointsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArrowNav from "@mui/icons-material/ArrowForwardIosSharp";

////// style
import "./style.scss";
import { useState } from "react";

import { BottomSheet } from "react-spring-bottom-sheet";
import SendInput from "../../common/SendInput/SendInput";
import Modals from "../../components/Modals/Modals";

const TasksPage = () => {
  const dispatch = useDispatch();

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { listsTasks } = useSelector((state) => state.pointsSlice);

  const { route_guid, guid_point } = useParams();

  const [active, setActive] = useState({});
  const [comm, setComm] = useState("");

  useEffect(() => {
    dispatch(getTasks({ agent_guid: dataSave?.guid, point_guid: guid_point }));
  }, []);

  return (
    <>
      <NavMenu navText={"Задания от руководителя"} />

      <div className="tasksPage">
        <div className="tasksPage__lists">
          {listsTasks?.map((item, index) => (
            <button className="invoiceParent" onClick={() => setActive(item)}>
              <div className="invoiceParent__inner">
                <div className="mainData">
                  <p className="indexNums">{index + 1}</p>
                  <div>
                    <p className="titleDate role">{item?.user}</p>
                    <p className="titleDate">{item.date}</p>
                  </div>
                </div>
                {!!item?.comment ? (
                  <p className="comments">{item.comment}</p>
                ) : (
                  <p className="comments"> ...</p>
                )}
              </div>
              <div className="mainDataArrow">
                <div>
                  <p>{item?.status_name}</p>
                  <span className="totalPrice">
                    {/* {roundingNum(item?.total_price, 2)} сом */}
                  </span>
                </div>
                <div className="arrows">
                  <ArrowNav sx={{ color: "rgba(162, 178, 238, 0.839)" }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Modals
        openModal={!!active?.codeid}
        closeModal={() => setActive({})}
        title={"Оплата"}
      >
        <div className="listProdCRUD_SI ">
          <SendInput
            value={comm}
            onChange={(e) => setComm(e.target.value)}
            title={"Ваш комментарий"}
            name={"comment"}
            type="text"
            typeInput="textarea"
          />
          {/* <TableContainer
            component={Paper}
            sx={{ maxHeight: "100%" }}
            className="scroll_table standartTable"
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "46%" }}>Продукт</TableCell>
                  <TableCell align="left" style={{ width: "18%" }}>
                    Кг
                  </TableCell>
                  <TableCell align="left" style={{ width: "18%" }}>
                    Шт
                  </TableCell>
                  <TableCell align="left" style={{ width: "18%" }}>
                    Цена
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listProdsReturn?.map((row) => (
                  <TableRow key={row?.product_guid}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "46%" }}
                    >
                      {row?.product_name}
                    </TableCell>
                    <TableCell align="left" style={{ width: "18%" }}>
                      {row?.amount}
                    </TableCell>
                    <TableCell align="left" style={{ width: "18%" }}>
                      {row?.amount_per}
                    </TableCell>
                    <TableCell align="left" style={{ width: "18%" }}>
                      {row?.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}

          <SendInput
            value={comm}
            onChange={(e) => setComm(e.target.value)}
            // title={"Ваш комментарий"}
            name={"comment"}
            type="file"
          />
        </div>
      </Modals>
    </>
  );
};

export default TasksPage;
