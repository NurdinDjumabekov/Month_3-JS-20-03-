import { createSlice } from "@reduxjs/toolkit";
import { transformActionDate } from "../../helpers/transformDate";

const initialState = {
  activeWorkShop: {},
  activeCategs: {},
  activeTA: {},
  activeDate: transformActionDate(new Date()),
};

const selectsSlice = createSlice({
  name: "selectsSlice",
  initialState,
  reducers: {
    setActiveWorkShop: (state, action) => {
      state.activeWorkShop = action.payload;
    },
    setActiveCategs: (state, action) => {
      state.activeCategs = action.payload;
    },
    setActiveTA: (state, action) => {
      state.activeTA = action.payload;
    },

    setActiveDate: (state, action) => {
      state.activeDate = action.payload;
    },
    clearSelects: (state, action) => {
      state.activeWorkShop = {};
      state.activeCategs = {};
      state.activeTA = {};
    },
  },
});
export const {
  setActiveWorkShop,
  setActiveCategs,
  setActiveTA,
  setActiveDate,
  clearSelects,
} = selectsSlice.actions;

export default selectsSlice.reducer;
