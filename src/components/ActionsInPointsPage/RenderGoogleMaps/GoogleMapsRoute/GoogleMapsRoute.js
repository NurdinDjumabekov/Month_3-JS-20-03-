////// hooks
import { useRef } from "react";
import { useCallback } from "react";

///// componets
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import CustomMarker from "../CustomMarker/CustomMarker";
import { defaultTheme } from "../../../../pages/ActionsInPointsPage/RenderGoogleMaps/Theme";
import MyGeoMarker from "../MyGeoMarker/MyGeoMarker ";

////// helpers
import { getMyLocation } from "../../../../helpers/GetMyGeo";

/////// style
import "./style.scss";

////// img
import findIcon from "../../../../assets/icons/findMe.svg";
import NavMenu from "../../../../common/NavMenu/NavMenu";

const containerStyle = { width: "100%", height: "100%" };

export const GoogleMapsRoute = (props) => {
  const { center, markers, directions, myCoords } = props;
  const { zoom, setZoom, setCenter } = props;
  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const defaultOptions = {
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clickableIcons: false,
    keyboardShortcuts: false,
    scrollWheel: false,
    disableDoubleClickZoom: false,
    fullscreenControl: true,
    gestureHandling: "greedy",
    mapTypeId: "roadmap",
    stylel: defaultTheme,
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_CENTER, // Позиция кнопок зума
    },
  };

  const findGeoMe = () => {
    getMyLocation()
      .then(({ lat, lng }) => {
        const myGeo = { lat, lng };
        setCenter(myGeo);
        setZoom(20);
      })
      .catch(({ lat, lng }) => {
        const myGeo = { lat, lng };
        setCenter(myGeo);
        setZoom(20);
      });
    setZoom(20);
  };

  return (
    <div className="mapContainer">
      <NavMenu navText={"Торговые точки на сегодня"} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        <MyGeoMarker position={myCoords} />
        {markers?.map((pos, index) => (
          <CustomMarker
            key={index}
            position={pos}
            index={index}
            setCenter={setCenter}
            setZoom={setZoom}
          />
        ))}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{ suppressMarkers: true }}
          />
        )}
      </GoogleMap>
      <button onClick={findGeoMe} className="findGeoMe">
        <img src={findIcon} alt=">" />
      </button>
    </div>
  );
};

export default GoogleMapsRoute;
