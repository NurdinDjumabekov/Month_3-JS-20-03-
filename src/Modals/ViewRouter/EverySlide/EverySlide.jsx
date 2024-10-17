////// hooks
import React from "react";
import { useRef } from "react";

///// icons
import ArrowIcon from "@mui/icons-material/ArrowForward";

////// components
import Slider from "react-slick";

////// style
import "./style.scss";

////// helpers
import { checkIsFile } from "../../../helpers/validations";

const EverySlide = ({ i }) => {
  let sliderRef = useRef(null);

  //////////////////// Slider
  const settings = {
    dots: false,
    infinite: i.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: i.length > 1,
  };

  if (i?.files?.length > 0) {
    return (
      <div className="mapMenuSlider">
        <Slider
          ref={(slider) => {
            sliderRef = slider;
          }}
          {...settings}
        >
          {i?.files?.map((photo, index) => (
            <div className="everySlide" key={index}>
              {checkIsFile(photo?.file_path) === "image" ? (
                <div className="photoBlock">
                  <img src={photo?.file_path} alt="###" />
                  <div className="dateTime">
                    <p>{photo?.date}</p>
                  </div>
                </div>
              ) : (
                <div className="videoBlock">
                  <video controls>
                    <source src={photo?.file_path} type="video/mp4" />
                  </video>
                  <div className="dateTime">
                    <p>{photo?.date}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Slider>
        <button className="prev" onClick={() => sliderRef.slickPrev()}>
          <ArrowIcon />
        </button>
        <button className="next" onClick={() => sliderRef.slickNext()}>
          <ArrowIcon />
        </button>
      </div>
    );
  }
};

export default EverySlide;
