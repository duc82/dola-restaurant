import { Cart } from "@/types/cart";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartState {
  carts: Cart[];
  count: number;
  subTotal: number;
}

const initialState: CartState = {
  carts: [],
  count: 0,
  subTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseQuantity: (state, { payload }: PayloadAction<Cart>) => {
      const indexCart = state.carts.findIndex(
        (cart) => cart._id === payload._id
      );

      if (indexCart !== -1) {
        const cart = state.carts[indexCart];

        cart.quantity += payload.quantity;

        if (cart.quantity > cart.stock) {
          return;
        }

        state.carts[indexCart].quantity = cart.quantity;
      } else {
        state.carts.push(payload);
      }

      state.subTotal += payload.discountedPrice * payload.quantity;
      state.count += payload.quantity;
    },
    decreaseQuantity: (state, { payload }: PayloadAction<Cart>) => {
      const indexCart = state.carts.findIndex(
        (cart) => cart._id === payload._id
      );

      if (indexCart !== -1) {
        const cart = state.carts[indexCart];

        state.subTotal -= payload.discountedPrice * payload.quantity;
        state.count -= payload.quantity;

        cart.quantity -= payload.quantity;

        if (cart.quantity < 1) {
          state.carts = [];
        } else {
          state.carts[indexCart].quantity = cart.quantity;
        }
      }
    },

    changeQuantity: (state, { payload }: PayloadAction<Cart>) => {
      const indexCart = state.carts.findIndex(
        (cart) => cart._id === payload._id
      );

      if (indexCart !== -1) {
        const oldQuantity = state.carts[indexCart].quantity;
        state.subTotal -= state.carts[indexCart].price * oldQuantity;

        state.carts[indexCart].quantity = payload.quantity;
      } else {
        state.carts.push(payload);
      }

      state.subTotal += payload.discountedPrice * payload.quantity;
    },

    removeCart: (state, { payload }: PayloadAction<string>) => {
      const indexCart = state.carts.findIndex((cart) => cart._id === payload);
      if (indexCart !== -1) {
        const cart = state.carts[indexCart];

        state.subTotal -= cart.discountedPrice * cart.quantity;
        state.count -= cart.quantity;
        state.carts.splice(indexCart, 1);
      }
    },

    resetCart: () => initialState,
  },
});

export const {
  increaseQuantity,
  decreaseQuantity,
  changeQuantity,
  removeCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
