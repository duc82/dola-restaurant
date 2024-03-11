import { FullAddress } from "@/types/address";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [] as FullAddress[],
  },
  reducers: {
    setAddress: (state, action: PayloadAction<FullAddress[]>) => {
      state.addresses = action.payload;
    },

    addAddress: (state, action: PayloadAction<FullAddress>) => {
      const address = action.payload;

      if (address.isDefault) {
        const index = state.addresses.findIndex((a) => a.isDefault);
        if (index !== -1) {
          state.addresses[index].isDefault = false;
        }
      }

      state.addresses.unshift(address);
    },

    updateAddress: (state, action: PayloadAction<FullAddress>) => {
      const address = action.payload;

      if (address.isDefault) {
        const index = state.addresses.findIndex((a) => a.isDefault);
        if (index !== -1) {
          state.addresses[index].isDefault = false;
        }
      }

      const index = state.addresses.findIndex((a) => a._id === address._id);
      state.addresses[index] = address;
    },

    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(
        (address) => address._id !== action.payload
      );
    },
  },
});

export const { setAddress, addAddress, updateAddress, removeAddress } =
  addressSlice.actions;

export default addressSlice.reducer;
