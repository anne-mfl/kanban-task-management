import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialModalState = {
  modalType: '',
  modalDetail: {},
  // modalType: 'ViewTask',
  // modalDetail:  {
  //   "title": "QA and test all major user journeys",
  //   "description": "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
  //   "status": "Todo",
  //   "subtasks": [
  //     {
  //       "title": "Internal testing",
  //       "isCompleted": true
  //     },
  //     {
  //       "title": "External testing",
  //       "isCompleted": false
  //     }
  //   ]
  // },
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialModalState,
  reducers: {
    openModal: (state, action: PayloadAction<any>) => {
      return {
        modalType: action.payload.modalType,
        modalDetail: action.payload.modalDetail,
      }
    },
    closeModal: ()=> {
      return initialModalState
    }
  }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer