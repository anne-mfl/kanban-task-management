import { createSlice } from '@reduxjs/toolkit';

type ThemeState = string

const initialState: ThemeState = 'light'

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => (state === 'light' ? 'dark' : 'light'),
  },
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer