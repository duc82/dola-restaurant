import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handlingAxiosError from "@/utils/handlingAxiosError";
import type { Filter, RejectValue } from "@/types";
import { FullUser, User, UserResponse, UsersResponse } from "@/types/user";
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

export const createUser = createAsyncThunk<UserResponse, User, RejectValue>(
  "user/createUser",
  async (user, thunkApi) => {
    try {
      const data = await userService.create(user);
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
    builder.addCase(getAllUser.fulfilled, (state, { payload }) => {
      state.users = payload.users;
      state.limit = payload.limit;
      state.total = payload.total;
    });

    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.users.unshift(payload.user);
      state.total++;

      if (state.users.length > state.limit) {
        state.users.pop();
      }
    });
  },
});

export const { resetUser, setUser } = userSlice.actions;

export default userSlice.reducer;
