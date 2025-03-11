import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
   name: 'ui',
   initialState: {
      isDateModalOpen: false,
      isDateModalClose: true
   },
   reducers: {
      onOpenDateModal: (state) => {
         state.isDateModalOpen = true;
         state.isDateModalClose = false;
      },
      onCloseDateModal: (state) => {
         state.isDateModalOpen = false;
         state.isDateModalClose = true;
      },
   }
});


// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;