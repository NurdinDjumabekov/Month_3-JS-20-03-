/////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

////// components
import Slider from "react-slick";
import NavMenu from "../../../common/NavMenu/NavMenu";
import { NoneBtn } from "../../ApplicationsPages/CreateInvoicePage/CreateInvoicePage";
import MainInfo from "../../../components/ActionsInPointsPage/ActionForPointsPage/MainInfo/MainInfo";
import PayInfo from "../../../components/ActionsInPointsPage/ActionForPointsPage/PayInfo/PayInfo";
import Realization from "../../../components/ActionsInPointsPage/ActionForPointsPage/Realization/Realization";
import RerurnProd from "../../../components/ActionsInPointsPage/ActionForPointsPage/RerurnProd/RerurnProd";

////// style
import "./style.scss";

///// fns
import {
  activeSlideFN,
  getDataInvoiceReturn,
  getDataInvoiceSend,
} from "../../../store/reducers/standartSlice";
import { useEffect } from "react";

const ActionForPointsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const sliderRef = useRef(null);
  const listActionsRef = useRef(null);
  const menuRefs = useRef([]);

  const { guid, point, balance, seller_fio } = location.state;
  const { route_sheet_guid, seller_guid, seller_number } = location.state;
  const { start_time, end_time } = location.state;

  const return_guid = location?.state?.return_guid;
  const send_guid = location?.state?.send_guid;

  const { listMenu, activeSlide } = useSelector((state) => state.standartSlice);
  const { inviceData } = useSelector((state) => state.standartSlice);

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
    sliderRef.current.slickGoTo(codeid);
  };

  useEffect(() => {
    dispatch(getDataInvoiceReturn(return_guid));
    dispatch(getDataInvoiceSend(send_guid));
  }, [activeSlide]);

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
              <MainInfo />
            </div>
            <div className="everySlide">
              <RerurnProd return_guid={return_guid} />
            </div>
            <div className="everySlide">
              <Realization send_guid={send_guid} />
            </div>
            <div className="everySlide">
              <PayInfo props={location.state} inviceData={inviceData} />
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
};

export default ActionForPointsPage;
