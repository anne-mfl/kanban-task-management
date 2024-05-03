import { configureStore } from "@reduxjs/toolkit";
import dataSlice from './slices/dataSlice'
// import currentBoardSlice from "./slices/currentBoardSlice";
import modalSlice from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    data: dataSlice,
    // currentBoard: currentBoardSlice,
    modal: modalSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store

