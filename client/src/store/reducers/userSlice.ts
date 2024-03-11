import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handlingAxiosError from "@/utils/handlingAxiosError";
import type { Filter, RejectValue } from "@/types";
import { FullUser, UsersResponse } from "@/types/user";
import userService from "@/services/userService";

export const getAllUser = createAsyncThunk<UsersResponse, Filter, RejectValue>(
  "user/getAllUser",
  async (filter, thunkApi) => {
    try {
      const data = await userService.getAll(filter);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(handlingAxiosError(error));
    }
  }
);

const initialState = {
  user: null as FullUser | null,
  users: [] as FullUser[],
  limit: 0,
  total: 0,
  skip: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => initialState,

    setUser: (state, { payload }: PayloadAction<FullUser>) => {
      state.user = payload;
    },

    setUsers: (state, { payload }: PayloadAction<FullUser[]>) => {
      state.users = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUser.fulfilled, (state, { payload }) => {
      state.users = payload.users;
      state.limit = payload.limit;
      state.total = payload.total;
      state.skip = payload.skip;
    });
  },
});

export const { resetUser, setUser, setUsers } = userSlice.actions;

export default userSlice.reducer;
