import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { setActiveTTForPhoto } from "./photoSlice";
import { clearRoute } from "../../helpers/clear";
import { pastGeoData } from "../../helpers/LocalData";

const { REACT_APP_API_URL, REACT_APP_MAP_KEY } = process.env;

/// actionType - 1 создание, 2 - редактирование, 3 - удаление

const initialState = {
  mapGeo: { latitude: "", longitude: "" },
  key: REACT_APP_MAP_KEY,

  //////////////////////////////////////// для админа
  listPointsEveryTA: [], /// сипсок точек каждого агента
  listRoadRouteEveryTA: [], /// список маршрутов для обьезда каждого ТА
  roadRouteEveryTA: [], /// маршрут c точками для обьезда каждого ТА
  activeRoute: { guid: "" },
  everyRoutes_TA: [], /// каждый маршрут для ТА (от первой точки до последней)
  listTA_RouteNoPlan: [], //// список коориднат по которым ехал Та(типо сам, не по плану)
};

////// sendGeoUser - отправка геолокации пользователя(агента)
export const sendGeoUser = createAsyncThunk(
  "sendGeoUser",
  async function (props, { dispatch, rejectWithValue }) {
    const { guid, latitude, longitude } = props;
    const data = { agent_guid: guid, lat: latitude, lon: longitude };
    const url = `${REACT_APP_API_URL}/ta/add_gps`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////////////////////////// account admin

////// getPointsRouteAgent - get данных координат точек для каждого ТА
export const getPointsRouteAgent = createAsyncThunk(
  "getPointsRouteAgent",
  async function ({ guid, first }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_points?agent_guid=${guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        if (first) {
          const obj = {
            guid: response.data?.[0]?.guid,
            label: response.data?.[0]?.text,
            text: response.data?.[0]?.text,
            value: response.data?.[0]?.guid,
          };
          dispatch(setActiveTTForPhoto(obj));
        }
        return response.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListRoute - get данных координат для обьезда у каждого ТА
export const getListRoute = createAsyncThunk(
  "getListRoute",
  async function ({ agent_guid, first }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_route_sheets?agent_guid=${agent_guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getEveryRouteWithTT(response.data?.[0]?.guid));
        dispatch(setActiveRoute({ guid: response.data?.[0]?.guid })); /// активный маршрут для отображения
        return response.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getEveryRouteWithTT - get данных координат для обьезда у каждого ТА c точками
export const getEveryRouteWithTT = createAsyncThunk(
  "getEveryRouteWithTT",
  async function (invoice_guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_route?route_sheet_guid=${invoice_guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//// check

////// getListRoutes_TA - get данных координат точек определенного агента
export const getListRoutes_TA = createAsyncThunk(
  "getListRoutes_TA",
  async function (agent_guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/agent_route_sheet?agent_guid=${agent_guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response.data?.[0]?.guid;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getEveryRoutes_TA - get данных каждой координаты точек для определенного ТА
export const getEveryRoutes_TA = createAsyncThunk(
  "getEveryRoutes_TA",
  async function (props, { dispatch, rejectWithValue }) {
    const { route_sheet_guid } = props;
    const url = `${REACT_APP_API_URL}/ta/agent_routes?route_sheet_guid=${route_sheet_guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return { list: response.data };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const mapSlice = createSlice({
  name: "mapSlice",
  initialState,
  reducers: {
    setMapGeo: (state, action) => {
      state.mapGeo = action?.payload;
    },

    setListPointsEveryTA: (state, action) => {
      state.listPointsEveryTA = action?.payload;
    },

    setActiveRoute: (state, action) => {
      state.activeRoute = action?.payload;
    },
  },

  extraReducers: (builder) => {
    ////////////// getPointsRouteAgent
    builder.addCase(getPointsRouteAgent.fulfilled, (state, action) => {
      state.preloader = false;
      state.listPointsEveryTA = action.payload?.map((i) => ({
        ...i,
        coordinates: [i?.coordinates[1], i?.coordinates[0]],
      }));
    });
    builder.addCase(getPointsRouteAgent.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getPointsRouteAgent.pending, (state, action) => {
      state.preloader = true;
    });

    /////////////// getListRoute
    builder.addCase(getListRoute.fulfilled, (state, action) => {
      state.preloader = false;
      state.listRoadRouteEveryTA = action.payload;
    });
    builder.addCase(getListRoute.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListRoute.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// getEveryRouteWithTT
    builder.addCase(getEveryRouteWithTT.fulfilled, (state, action) => {
      state.preloader = false;
      state.roadRouteEveryTA = action.payload;
    });
    builder.addCase(getEveryRouteWithTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.roadRouteEveryTA = [];
    });
    builder.addCase(getEveryRouteWithTT.pending, (state, action) => {
      state.preloader = true;
    });

    //////////////// getListRoutes_TA
    builder.addCase(getListRoutes_TA.fulfilled, (state, action) => {
      state.preloader = false;
      state.listTA_RouteNoPlan = action.payload;
    });
    builder.addCase(getListRoutes_TA.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listTA_RouteNoPlan = [];
    });
    builder.addCase(getListRoutes_TA.pending, (state, action) => {
      state.preloader = true;
    });

    //////////////// getEveryRoutes_TA
    builder.addCase(getEveryRoutes_TA.fulfilled, (state, action) => {
      const list = action.payload?.list;
      const lat = state.mapGeo?.latitude; /// geo TA
      const lon = state.mapGeo?.longitude; /// geo TA
      const firstObj = action.payload?.list?.[0];

      const myData = { ...firstObj, lat, lon, ...pastGeoData };
      const sortList = list?.slice(1); /// заменяю первый элемент массива на координату откуда должен начать путь ТА

      const checkSides = list?.some((item) => item?.sides == true);
      /// если уже есть стартовая точка

      if (checkSides) {
        state.everyRoutes_TA = list?.map((i) => ({
          ...i,
          lng: +i?.lat,
          lat: +i?.lon,
        }));
      } else {
        // state.everyRoutes_TA = [...list]?.map((i) => ({
        state.everyRoutes_TA = [myData, ...list]?.map((i) => ({
          ...i,
          lng: +i?.lon,
          lat: +i?.lat,
        }));
        /// lat: 42.857, lng: 74.628
      }
      state.preloader = false;
    });
    builder.addCase(getEveryRoutes_TA.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.everyRoutes_TA = [];
    });
    builder.addCase(getEveryRoutes_TA.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const { setMapGeo, setListPointsEveryTA, setActiveRoute } =
  mapSlice.actions;

export default mapSlice.reducer;
