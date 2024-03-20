import { Cart } from "@/types/cart";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartState {
  carts: Cart[];
  subTotal: number;
  count: number;
}

const initialState: CartState = {
  carts: [],
  subTotal: 0,
  count: 0,
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
        state.count -= oldQuantity;

        state.carts[indexCart].quantity = payload.quantity;
      } else {
        state.carts.push(payload);
      }

      state.subTotal += payload.discountedPrice * payload.quantity;
      state.count += payload.quantity;
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

    resetCart: (state) => ({ ...state }),
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
