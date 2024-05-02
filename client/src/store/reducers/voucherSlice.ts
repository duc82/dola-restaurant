import voucherService from "@/services/voucherService";
import { RejectValue } from "@/types";
import { FullVoucher, Voucher, VoucherResponse } from "@/types/voucher";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface VoucherState {
  vouchers: FullVoucher[];
  voucher: FullVoucher | null;
}

export const updateVoucher = createAsyncThunk<
  VoucherResponse,
  { id: string; data: Voucher },
  RejectValue
>("voucher/update", async ({ id, data }, thunkApi) => {
  try {
    const result = await voucherService.update(id, data);
    return result;
  } catch (error) {
    return thunkApi.rejectWithValue(handlingAxiosError(error));
  }
});

const initialState: VoucherState = {
  vouchers: [],
  voucher: null,
};

const voucherSlice = createSlice({
  initialState,
  name: "voucher",
  reducers: {
    setVouchers(state, action: PayloadAction<FullVoucher[]>) {
      state.vouchers = action.payload;
    },
    addVoucher(state, action) {
      state.vouchers.push(action.payload);
    },

    setVoucher(state, action) {
      state.voucher = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      updateVoucher.fulfilled,
      (state, action: PayloadAction<VoucherResponse>) => {
        const index = state.vouchers.findIndex(
          (voucher) => voucher._id === action.payload.voucher._id
        );
        if (index !== -1) {
          state.vouchers[index] = action.payload.voucher;
        }
      }
    );
  },
});

export const { setVouchers, addVoucher, setVoucher } = voucherSlice.actions;

export default voucherSlice.reducer;
