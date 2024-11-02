import { createSlice } from "@reduxjs/toolkit";
import { TOKEN } from "@/constants/api";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: !!localStorage.getItem(TOKEN), 
  },
  reducers: {
    setAuth: (state) => {
      state.isAuth = true;
    },

    logoutUser: (state) => {
      localStorage.removeItem(TOKEN);
      state.isAuth = false;
    },
  },
});

export const { setAuth, logoutUser } = authSlice.actions;

export default authSlice.reducer;
