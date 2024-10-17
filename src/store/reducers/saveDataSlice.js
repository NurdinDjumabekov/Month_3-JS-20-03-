import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataSave: {
    guid: "",
    fio: "",
    user_type: "",
    token: { accessToken: "", refreshToken: "" },
    phone: "",
  },
};

const saveDataSlice = createSlice({
  name: "saveDataSlice",
  initialState,
  reducers: {
    setDataSave: (state, action) => {
      state.dataSave = action.payload;
    },

    clearDataSave: (state, action) => {
      state.dataSave = {
        guid: "",
        fio: "",
        user_type: "",
        token: { accessToken: "", refreshToken: "" },
        phone: "",
      };
    },
  },
});
export const { setDataSave, clearDataSave } = saveDataSlice.actions;

export default saveDataSlice.reducer;
// guid, fio, user_type, token: token?.accessToken
