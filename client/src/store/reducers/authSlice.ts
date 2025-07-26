import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "./userSlice";

export interface AuthState {
  isLoading: boolean;
  accessToken: string;
}

const initialState: AuthState = {
  isLoading: false,
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.isLoading = true;
    },
    authSuccess: (state) => {
      state.isLoading = false;
    },
    loginSuccess: (state, { payload }: PayloadAction<string>) => {
      state.accessToken = payload;
    },
    resetAuth: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.accessToken = initialState.accessToken;
      state.isLoading = initialState.isLoading;
    });
  },
});

export const { authStart, resetAuth, loginSuccess, authSuccess } =
  authSlice.actions;

export default authSlice.reducer;
