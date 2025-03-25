import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handlingAxiosError from "@/utils/handlingAxiosError";
import type { RejectValue } from "@/types";
import { FullUser } from "@/types/user";
import userService from "@/services/userService";
import limits from "@/data/limits.json";
import { store } from "..";
import { resetAuth } from "./authSlice";

export const getCurrentUser = createAsyncThunk<FullUser, void, RejectValue>(
  "user/getCurrentUser",
  async (_, thunkApi) => {
    try {
      const data = await userService.getCurrent();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(handlingAxiosError(error));
    }
  }
);

const initialState = {
  user: null as FullUser | null,
  users: [] as FullUser[],
  limit: limits[0],
  total: 0,
  skip: 0,
  page: 1,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => initialState,
    setUser: (state, { payload }: PayloadAction<FullUser>) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(getCurrentUser.rejected, () => {
      store.dispatch(resetAuth());
    });
  },
});

export const { resetUser, setUser } = userSlice.actions;

export default userSlice.reducer;
