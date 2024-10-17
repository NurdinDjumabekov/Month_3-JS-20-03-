import MainRoutes from "./routers/MainRoutes";
import "react-toastify/dist/ReactToastify.css";

/////// hooks
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import { sendGeoUser, setMapGeo } from "./store/reducers/mapSlice";

const App = () => {
  const dispatch = useDispatch();

  const { guid } = useSelector((state) => state.saveDataSlice?.dataSave);
  const { user_type } = useSelector((state) => state.saveDataSlice?.dataSave);

  const isWithinAllowedTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= 5 && currentHour < 21; // Разрешенное время с 5:00 до 21:00
  };

  useEffect(() => {
    const getLocationAndSend = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(setMapGeo({ latitude, longitude }));

            if (isWithinAllowedTime()) {
              dispatch(sendGeoUser({ guid, latitude, longitude }));
            }
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocationAndSend();

    if (user_type == 1) {
      //// только для ТА
      const intervalId = setInterval(getLocationAndSend, 10000);

      // Очищаем таймер при размонтировании компонента
      return () => clearInterval(intervalId);
    }
  }, []);

  return <MainRoutes />;
};

export default App;
