/////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";

////// components
import Slider from "react-slick";
import NavMenu from "../../../common/NavMenu/NavMenu";
import { NoneBtn } from "../../ApplicationsPages/CreateInvoicePage/CreateInvoicePage";
import MainInfo from "../../../components/ActionsInPointsPage/ActionForPointsPage/MainInfo/MainInfo";
import PayInfo from "../../../components/ActionsInPointsPage/ActionForPointsPage/PayInfo/PayInfo";
import Realization from "../../../components/ActionsInPointsPage/ActionForPointsPage/Realization/Realization";
import RerurnProd from "../../../components/ActionsInPointsPage/ActionForPointsPage/RerurnProd/RerurnProd";
import PhotosInfo from "../../../components/ActionsInPointsPage/ActionForPointsPage/PhotosInfo/PhotosInfo";
import TasksInfo from "../../../components/ActionsInPointsPage/ActionForPointsPage/TasksInfo/TasksInfo";

////// style
import "./style.scss";

///// fns
import {
  activeSlideFN,
  getDataInvoiceReturn,
  getDataInvoiceSend,
  getListTypeVisit,
  getReportEveryTT,
  getReportPayEveryTT,
} from "../../../store/reducers/standartSlice";

const ActionForPointsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const sliderRef = useRef(null);
  const listActionsRef = useRef(null);
  const menuRefs = useRef([]);

  const { guid, point, balance, seller_fio } = location.state;
  const { route_sheet_guid, seller_guid, seller_number } = location.state;
  const { start_time, end_time, point_guid, date } = location.state;

  const return_guid = location?.state?.return_guid;
  const send_guid = location?.state?.send_guid;

  const { listMenu, activeSlide } = useSelector((state) => state.standartSlice);
  const { inviceData } = useSelector((state) => state.standartSlice);
  const { reportEveryTT } = useSelector((state) => state.standartSlice);

  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NoneBtn />,
    prevArrow: <NoneBtn />,
    initialSlide: activeSlide,
    afterChange: (current) => {
      dispatch(activeSlideFN(current));
      const isLastElement = current === listMenu?.length - 1;
      if (isLastElement) {
        listActionsRef.current.scrollLeft = listActionsRef.current.scrollWidth;
      } else {
        menuRefs.current[current]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    },
  };

  const handleMenuClick = (codeid) => {
    dispatch(activeSlideFN(codeid));
    sliderRef.current?.slickGoTo(codeid);
  };

  useEffect(() => {
    dispatch(getDataInvoiceReturn(return_guid));
    dispatch(getDataInvoiceSend(send_guid));
  }, [activeSlide]);

  const getDataVisit = () => {
    /// для получения данных осчетов ТА
    dispatch(getReportEveryTT(point_guid));
    dispatch(getReportPayEveryTT({ date, point_guid }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getDataVisit();
    dispatch(getListTypeVisit());
    /// get список типов посещений точек (успешно, закрыто и т.д.)
  }, [date]);

  return (
    <>
      <NavMenu navText={point} />
      <div className="actionForPoints">
        <div className="listActions" ref={listActionsRef}>
          {listMenu?.map(({ codeid, name }, idx) => (
            <p
              key={codeid}
              ref={(el) => (menuRefs.current[idx] = el)}
              className={codeid === activeSlide ? "actives" : ""}
              onClick={() => handleMenuClick(codeid)}
            >
              {name}
            </p>
          ))}
        </div>
        <div className="actionForPoints__content">
          <Slider ref={sliderRef} {...settings}>
            <div className="everySlide">
              <MainInfo
                reportEveryTT={reportEveryTT}
                getDataVisit={getDataVisit}
                guid={guid}
                point={point}
                position={location.state}
              />
            </div>
            <div className="everySlide">
              <RerurnProd return_guid={return_guid} />
            </div>
            <div className="everySlide">
              <Realization send_guid={send_guid} />
            </div>
            <div className="everySlide">
              <PayInfo
                props={location.state}
                inviceData={inviceData}
                getDataVisit={getDataVisit}
                reportEveryTT={reportEveryTT}
              />
            </div>
            <div className="everySlide">
              <PhotosInfo
                props={location.state}
                reportEveryTT={reportEveryTT}
              />
            </div>
            <div className="everySlide">
              <TasksInfo props={location.state} reportEveryTT={reportEveryTT} />
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
};

export default ActionForPointsPage;
