import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { setActiveCategs, setActiveWorkShop } from "./selectsSlice";

const { REACT_APP_API_URL } = process.env;

const initialState = {
  listWorkshopSI: [],
  listCategsSI: [],
  listProdsSI: [],
};

////// getListWorkShop - get список цехов
export const getListWorkShop = createAsyncThunk(
  "getListWorkShop",
  async function ({ agent_guid }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_agent_leftover_workshop?agent_guid=${agent_guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        const obj = response?.data?.[0];
        dispatch(getListCategs({ guid: obj?.workshop_guid, agent_guid })); /// для получение категорий
        const objSort = {
          value: obj?.workshop_guid,
          label: obj?.workshop_name,
        };
        dispatch(setActiveWorkShop({ ...obj, ...objSort }));
        ///// подставляю активныый селект в state
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListCategs - get список категорий
export const getListCategs = createAsyncThunk(
  "getListCategs",
  async function ({ guid, agent_guid }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_agent_leftover_category?workshop_guid=${guid}&agent_guid=${agent_guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        const obj = response?.data?.[0];
        const data = { guid, guidCateg: obj?.category_guid, agent_guid };
        dispatch(getListProds(data));
        /// для получение товаров

        const objSort = {
          value: obj?.category_guid,
          label: obj?.category_name,
        };
        dispatch(setActiveCategs({ ...obj, ...objSort }));
        ///// подставляю активный селект в state
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListProds - get список товаров
export const getListProds = createAsyncThunk(
  "getListProds",
  async function (props, { dispatch, rejectWithValue }) {
    const { guid, guidCateg, agent_guid } = props;
    const url = `${REACT_APP_API_URL}/ta/get_agent_leftover?agent_guid=${agent_guid}&workshop_guid=${guid}&category_guid=${guidCateg}`;
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

const leftoversSlice = createSlice({
  name: "leftoversSlice",
  initialState,
  reducers: {
    setViewApp: (state, action) => {
      state.viewApp = action.payload;
    },
  },

  extraReducers: (builder) => {
    ////////////// getListWorkShop
    builder.addCase(getListWorkShop.fulfilled, (state, action) => {
      state.preloader = false;
      state.listWorkshopSI = action.payload;
    });
    builder.addCase(getListWorkShop.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListWorkShop.pending, (state, action) => {
      state.preloader = true;
    });

    //////////////  getListCategs
    builder.addCase(getListCategs.fulfilled, (state, action) => {
      state.preloader = false;
      state.listCategsSI = action.payload;
    });
    builder.addCase(getListCategs.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListCategs.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// getListProds
    builder.addCase(getListProds.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProdsSI = action.payload?.map((i) => ({
        ...i,
        count: "",
        is_checked: false,
      }));
    });
    builder.addCase(getListProds.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListProds.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const { setViewApp } = leftoversSlice.actions;

export default leftoversSlice.reducer;
