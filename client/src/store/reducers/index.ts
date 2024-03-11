import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import blogReducer from "./blogSlice";
import orderReducer from "./orderSlice";
import voucherReducer from "./voucherSlice";
import addressReducer from "./addressSlice";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  user: userReducer,
  cart: cartReducer,
  blog: blogReducer,
  order: orderReducer,
  voucher: voucherReducer,
  address: addressReducer,
});

export default rootReducer;
