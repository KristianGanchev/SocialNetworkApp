import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isLoginOpen: false,
   isSignUpOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isLoginOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginOpen = false;
    },
    openSignUpModal: (state) => {
      state.isSignUpOpen = true;
    },
    closeSignUpModal: (state) => {
      state.isSignUpOpen = false;
    },
  },
});

export const { openLoginModal, closeLoginModal, openSignUpModal,  closeSignUpModal} = modalSlice.actions;

export default modalSlice.reducer;