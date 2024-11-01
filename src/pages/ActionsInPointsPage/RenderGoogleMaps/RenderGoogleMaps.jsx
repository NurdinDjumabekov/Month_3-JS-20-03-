//////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useMemo } from "react";
import { useCallback, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

////// styles
import "./style.scss";

////// components
import Preloader from "../../../common/Preloader/Preloader";
import Autocomplete from "../../../components/ActionsInPointsPage/RenderGoogleMaps/Autocomplete/Autocomplete";
import GoogleMapsRoute from "../../../components/ActionsInPointsPage/RenderGoogleMaps/GoogleMapsRoute/GoogleMapsRoute";

////// fns
import { getListRoutes_TA } from "../../../store/reducers/mapSlice";
import { getEveryRoutes_TA } from "../../../store/reducers/mapSlice";

/////// helpers
import { defaultCenter, getMyLocation } from "../../../helpers/GetMyGeo";

const RenderGoogleMaps = () => {
  const googleMapsApiKey = "AIzaSyD8hB-KDvF4vITv4idoxn2DqqMdJffJGd8";
  const dispatch = useDispatch();

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { everyRoutes_TA } = useSelector((state) => state.mapSlice);

  const [center, setCenter] = useState(everyRoutes_TA?.[0]);
  const [myCoords, setMyCoords] = useState(defaultCenter);
  const [directions, setDirections] = useState(null);
  const [zoom, setZoom] = useState(15);

  const libraries = useMemo(() => ["places", "directions"], []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
    libraries,
  });

  const renderRoute = useCallback(() => {
    if (!isLoaded || everyRoutes_TA?.length < 2) return;

    const origin = everyRoutes_TA?.[0];
    const destination = everyRoutes_TA?.[everyRoutes_TA?.length - 1];
    const waypoints = everyRoutes_TA?.slice(1, -1).map((location) => ({
      location,
      stopover: true,
    }));

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Ошибка построения маршрута", status);
        }
      }
    );
  }, [isLoaded, everyRoutes_TA, zoom]);

  useEffect(() => {
    if (isLoaded) {
      renderRoute();
    }
  }, [isLoaded, everyRoutes_TA, renderRoute, zoom]);

  const getData = async () => {
    const guid = await dispatch(getListRoutes_TA(dataSave?.guid)).unwrap();
    //// отправляю запрос для получения точек каждого агента
    if (!!guid) {
      getMyLocation()
        .then(({ lat, lng }) => {
          const myGeo = { lat, lng };
          dispatch(getEveryRoutes_TA({ route_sheet_guid: guid, myGeo }));
          setMyCoords(myGeo);
          setCenter(myGeo);
        })
        .catch(({ lat, lng }) => {
          const myGeo = { lat, lng };
          dispatch(getEveryRoutes_TA({ route_sheet_guid: guid, myGeo }));
          setMyCoords(myGeo);
          setCenter(myGeo);
        });
      //// для получения актульных точек на сегодня
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Autocomplete isLoaded={isLoaded} onPlaceSelect={setCenter} />
      {isLoaded ? (
        <GoogleMapsRoute
          center={center}
          markers={everyRoutes_TA}
          directions={directions}
          myCoords={myCoords}
          setCenter={setCenter}
          zoom={zoom}
          setZoom={setZoom}
        />
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default RenderGoogleMaps;
