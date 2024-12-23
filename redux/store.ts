import { configureStore } from "@reduxjs/toolkit";
import dataSlice from './slices/dataSlice'
import modalSlice from "./slices/modalSlice"
import themeReducer from './slices/themeSlice'

const store = configureStore({
  reducer: {
    data: dataSlice,
    modal: modalSlice,
    theme: themeReducer
  }
})


export type RootState = ReturnType<typeof store.getState>

export default store

