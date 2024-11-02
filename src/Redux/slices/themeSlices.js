import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  sidenavType: "white",
  sidenavColor: "dark",
  theme: {
    white: {
      text: "text-[#000]",
      bg: "bg-white",
      textBlue: "text-blueTifany",
      hover: "hover:bg-blueLight hover:text-blueTifany",
      active: "bg-blueLight text-blueTifany",
      icon: "text-lightIcon",
      tableBorder: "border-grayThird",
      tableHover: "bg-white hover:bg-[#f0f0f0]",
      moreBtn: " hover:bg-grayFour",
      moreBtnActive: "bg-grayFour",
      tableButton: "bg-lightestBlack",
      taskBorder: "border-graySeven",
      taskTitle: "text-[#656565]",
      input: "bg-white",
      inputBorder: "border-formRgba",
      inputText: "text-formRgba",
      selectBorder: "border-black",
      moreModalHover:"hover:bg-whiteThird active:bg-whiteThird",
    },
    dark: {
      text: "text-white",
      bg: "bg-darkBg",
      textBlue: "text-white",
      hover: "hover:bg-electroMagnetic hover:text-blueTifany",
      active: "bg-electroMagnetic text-blueTifany",
      icon: "text-white",
      tableBorder: "border-lightIcon",
      tableHover: "bg-darkBg hover:bg-[#FFFFFF1A]",
      moreBtn: "hover:bg-lightIcon",
      moreBtnActive: "bg-lightIcon",
      tableButton: "bg-[#0000001A]",
      taskBorder: "border-transparent",
      taskTitle: "text-white",
      input: "bg-[#FFFFFF1A]",
      inputBorder: "border-white",
      inputText: "text-white",
      selectBorder: "border-white",
      moreModalHover:"hover:bg-[#F5F5F51A] active:bg-[#F5F5F51A]",
    },
    transparent: {
      text: "text-black",
      bg: "bg-transparent",
    },
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      state.sidenavType = state.darkMode ? "dark" : "white";
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = { ...state.theme, ...action.payload };
    },
    setSidenavType: (state, action) => {
      state.sidenavType = action.payload;
    },
    setSidenavColor: (state, action) => {
      state.sidenavColor = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  setTheme,
  setSidenavType,
  setSidenavColor,
} = themeSlice.actions;

export default themeSlice.reducer;
