import addressService from "@/services/addressService";
import { RejectValue } from "@/types";
import { FullAddress } from "@/types/address";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCurrentAddresses = createAsyncThunk<
  FullAddress[],
  void,
  RejectValue
>("address/getCurrent", async (_, thunkApi) => {
  try {
    const addresses = await addressService.getCurrent();
    return addresses;
  } catch (error) {
    return thunkApi.rejectWithValue(handlingAxiosError(error));
  }
});

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [] as FullAddress[],
    isLoading: false,
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

  extraReducers: (builder) => {
    builder.addCase(getCurrentAddresses.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCurrentAddresses.fulfilled, (state, action) => {
      state.addresses = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getCurrentAddresses.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setAddress, addAddress, updateAddress, removeAddress } =
  addressSlice.actions;

export default addressSlice.reducer;
