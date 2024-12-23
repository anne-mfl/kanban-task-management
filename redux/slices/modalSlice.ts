import type { BoardDetail } from "type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialModalState = {
  modalType: '',
  modalDetail: {},
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialModalState,
  reducers: {
    openModal: (state, action: PayloadAction<{modalType: string, modalDetail: any}>) => {
      return {
        modalType: action.payload.modalType,
        modalDetail: action.payload.modalDetail,
      }
    },
    closeModal: () => {
      return initialModalState
    }
  }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer