import { createSlice } from '@reduxjs/toolkit';

interface IModal {
  id: string;
  visible: boolean;
}

interface ModalState {
  modals: IModal[];
}

const initialState: ModalState = {
  modals: [
    {id: "login", visible: false},
    {id: "signup", visible: false},
  ],
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      const modal = state.modals.find((element) => element.id === action.payload);

      if (modal) {
        modal.visible = !modal.visible;
      }
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;