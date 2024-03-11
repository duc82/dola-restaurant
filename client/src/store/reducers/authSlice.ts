import cookies from "@/utils/cookies";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  isLoggedIn: Boolean(cookies.get("isLoggedIn")),
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
    loginSuccess: (state) => {
      state.isLoggedIn = Boolean(cookies.get("isLoggedIn"));
    },

    resetAuth: () => initialState,
  },
});

export const { authStart, resetAuth, loginSuccess, authSuccess } =
  authSlice.actions;

export default authSlice.reducer;
