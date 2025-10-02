import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './Redux/PasteSlice.js'

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
})