import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handlingAxiosError from "@/utils/handlingAxiosError";
import type { Filter, RejectValue } from "@/types";
import { FullUser, User, UserResponse, UsersResponse } from "@/types/user";
import userService from "@/services/userService";

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

export const updateUser = createAsyncThunk<
  UserResponse,
  { id: string; data: Partial<User> },
  RejectValue
>("user/updateUser", async ({ id, data }, thunkApi) => {
  try {
    const response = await userService.update(id, data);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(handlingAxiosError(error));
  }
});

export const deleteUser = createAsyncThunk<
  { message: string; id: string },
  string,
  RejectValue
>("user/deleteUser", async (id, thunkApi) => {
  try {
    const data = await userService.delete(id);
    return { message: data.message, id };
  } catch (error) {
    return thunkApi.rejectWithValue(handlingAxiosError(error));
  }
});

export const deleteManyUser = createAsyncThunk<
  { message: string; ids: string[] },
  string[],
  RejectValue
>("user/deleteManyUser", async (ids, thunkApi) => {
  try {
    const data = await userService.deleteMany(ids);
    return { message: data.message, ids };
  } catch (error) {
    return thunkApi.rejectWithValue(handlingAxiosError(error));
  }
});

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
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });

    builder.addCase(getAllUser.fulfilled, (state, { payload }) => {
      state.users = payload.users;
      state.limit = payload.limit;
      state.total = payload.total;
      state.skip = payload.skip;
    });

    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.users.unshift(payload.user);
      state.total++;

      if (state.users.length > state.limit) {
        state.users.pop();
      }
    });

    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      const index = state.users.findIndex(
        (user) => user._id === payload.user._id
      );

      if (index !== -1) {
        state.users[index] = payload.user;
      }
    });

    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      const index = state.users.findIndex((user) => user._id === payload.id);

      if (index !== -1) {
        state.users.splice(index, 1);
        state.total--;
      }
    });

    builder.addCase(deleteManyUser.fulfilled, (state, { payload }) => {
      state.users = state.users.filter(
        (user) => !payload.ids.includes(user._id)
      );
      state.total -= payload.ids.length;
    });
  },
});

export const { resetUser, setUser } = userSlice.actions;

export default userSlice.reducer;
