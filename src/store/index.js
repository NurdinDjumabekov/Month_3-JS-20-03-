import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

//// slice
import stateSlice from "./reducers/stateSlice";
import saveDataSlice from "./reducers/saveDataSlice";
import mainSlice from "./reducers/mainSlice";
import selectsSlice from "./reducers/selectsSlice";
import wareHouseSlice from "./reducers/wareHouseSlice";
import productionSlice from "./reducers/productionSlice";
import mapSlice from "./reducers/mapSlice";
import photoSlice from "./reducers/photoSlice";
import invoiceSlice from "./reducers/invoiceSlice";
import paySlice from "./reducers/paySlice";
import pointsSlice from "./reducers/pointsSlice";
import standartSlice from "./reducers/standartSlice";

const reducer = combineReducers({
  mainSlice,
  stateSlice,
  saveDataSlice,
  selectsSlice,
  wareHouseSlice,
  productionSlice,
  mapSlice,
  photoSlice,
  invoiceSlice,
  paySlice,
  pointsSlice,
  standartSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["saveDataSlice"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export { store };
