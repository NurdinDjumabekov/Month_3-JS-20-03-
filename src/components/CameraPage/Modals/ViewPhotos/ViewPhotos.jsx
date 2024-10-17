////// hooks
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

////// components
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Slider from "react-slick";

////// style
import "./style.scss";

////// fns
import { getListPhotos } from "../../../../store/reducers/photoSlice";
import { checkIsFile } from "../../../../helpers/validations";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewPhotos = (props) => {
  const { setViewPhotos, viewPhotos, guid_point, route_guid } = props;
  const dispatch = useDispatch();

  const { guid } = useSelector((state) => state.saveDataSlice?.dataSave);
  const { listPhotos } = useSelector((state) => state.photoSlice);

  const [viewSlider, setViewSlider] = React.useState(false);
  const [slideIndex, setSlideIndex] = React.useState(0);

  const handleClose = () => {
    if (viewSlider) {
      setViewSlider(false);
      return;
    }
    setViewPhotos(false);
  };

  useEffect(() => {
    dispatch(getListPhotos({ guid, guid_point, route_guid }));
  }, [guid_point, route_guid]);

  const clickPhoto = (index) => {
    //// для просмотра каждой фотки
    setSlideIndex(index);
    setViewSlider(true);
  };

  const fileUrl =
    "https://riha-production.333.kg/files/previews/Q4OVzBJZ8iUnJojS36SubScII.png";
  const fileType = checkIsFile(fileUrl);

  console.log(fileType, "fileType");

  //////////////////// Slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: slideIndex,
  };

  const listPhotosNew = listPhotos?.filter(
    (item) => checkIsFile(item.file_path) === "image"
  );

  console.log(listPhotosNew, "listPhotosNew");

  return (
    <Dialog
      fullScreen
      open={viewPhotos}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div className="viewPhotos">
        <div className="viewPhotos__inner">
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ flex: 1 }} variant="h6" component="div">
                Галерея
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>

        {viewSlider ? (
          <div className="mainSlider">
            <Slider {...settings}>
              {listPhotosNew?.map((i) => (
                <div>
                  <img src={i?.file_path} alt="###" />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="viewPhotos__main">
            {listPhotos?.map((i, index) => (
              <div key={index}>
                {checkIsFile(i?.file_path) === "image" ? (
                  <img
                    src={i?.file_path}
                    alt="###"
                    onClick={() => clickPhoto(index)}
                  />
                ) : (
                  <div className="videoBlock">
                    <video controls>
                      <source src={i?.file_path} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default ViewPhotos;
