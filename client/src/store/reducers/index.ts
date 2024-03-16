import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import authReducer, { AuthState } from "./authSlice";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import blogReducer from "./blogSlice";
import orderReducer from "./orderSlice";
import voucherReducer from "./voucherSlice";
import addressReducer from "./addressSlice";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig: PersistConfig<AuthState> = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["accessToken"],
};

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  user: userReducer,
  cart: cartReducer,
  blog: blogReducer,
  order: orderReducer,
  voucher: voucherReducer,
  address: addressReducer,
});

export default rootReducer;
