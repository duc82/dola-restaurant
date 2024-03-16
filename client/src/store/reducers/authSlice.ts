import { createSlice } from "@reduxjs/toolkit";

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

    loginSuccess: (state, { payload }) => {
      state.accessToken = payload.accessToken;
    },

    resetAuth: () => initialState,
  },
});

export const { authStart, resetAuth, loginSuccess, authSuccess } =
  authSlice.actions;

export default authSlice.reducer;
