import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { transformActionDate } from "../../helpers/transformDate";
import { getEveryRoutes_TA, setStateLoad } from "./mapSlice";
import axiosInstance from "../../axiosInstance";

const { REACT_APP_API_URL } = process.env;

const initialState = {
  activeTTForPhoto: {},
  listPhotos: [],
  activeRouteList: {}, /// активный маршрутный лист
};

////// sendPhotos - отправка фото торговой точки
export const sendPhotos = createAsyncThunk(
  "sendPhotos",
  async function ({ data }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/add_file`;
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListPhotos - get список фотографий
export const getListPhotos = createAsyncThunk(
  "getListPhotos",
  async function (props, { dispatch, rejectWithValue }) {
    const { guid, guid_point, route_guid } = props;

    const date = transformActionDate(new Date());
    const url = `${REACT_APP_API_URL}/ta/get_file?date=${date}&agent_guid=${guid}&point_guid=${guid_point}&route_guid=${route_guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getActiveRouteList - get активного маршрутного листа, который выдается каждому агенту
export const getActiveRouteList = createAsyncThunk(
  "getActiveRouteList",
  async function (agent_guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/agent_route_sheet?agent_guid=${agent_guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.[0];
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// activeRouteListCRUD - изменение активного маршрутного листа, который выдается каждому агенту
export const activeRouteListCRUD = createAsyncThunk(
  "activeRouteListCRUD",
  async function ({ data, guid, user_type }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/set_route_sheet`;
    try {
      const response = await axiosInstance.put(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getActiveRouteList(guid)); // get активного маршрутного листа, который выдается каждому агенту
        const obj = { route_sheet_guid: data?.route_sheet_guid, user_type };
        dispatch(getEveryRoutes_TA(obj)); //  get данных координат точек определенного агента
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const photoSlice = createSlice({
  name: "photoSlice",
  initialState,
  reducers: {
    setActiveTTForPhoto: (state, action) => {
      state.activeTTForPhoto = action?.payload;
    },

    setActiveRouteList: (state, action) => {
      state.activeRouteList = action?.payload;
    },

    setListPhotos: (state, action) => {
      state.listPhotos = [];
    },
  },

  extraReducers: (builder) => {
    ////////////// getListPhotos
    builder.addCase(getListPhotos.fulfilled, (state, action) => {
      state.preloader = false;
      state.listPhotos = action.payload;
    });
    builder.addCase(getListPhotos.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListPhotos.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// getActiveRouteList
    builder.addCase(getActiveRouteList.fulfilled, (state, action) => {
      state.preloader = false;
      state.activeRouteList = action.payload;
    });
    builder.addCase(getActiveRouteList.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getActiveRouteList.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const { setActiveTTForPhoto, setActiveRouteList, setListPhotos } =
  photoSlice.actions;

export default photoSlice.reducer;
