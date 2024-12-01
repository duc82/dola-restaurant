import { FullOrder } from "@/types/order";
import { createSlice } from "@reduxjs/toolkit";

interface OrderState {
  orders: FullOrder[];
  order: FullOrder | null;
}

const initialState: OrderState = {
  orders: [],
  order: null,
};

const orderSlice = createSlice({
  initialState,
  name: "order",
  reducers: {
    getAllOrders: (state, { payload }) => {
      state.orders = payload.orders;
    },

    getOrder: (state, { payload }) => {
      state.order = payload.order;
    },
  },
});

export const { getAllOrders, getOrder } = orderSlice.actions;

export default orderSlice.reducer;
