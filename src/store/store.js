import { configureStore } from '@reduxjs/toolkit'
import { noteSlice } from './slices/notes';

export const store = configureStore({
  reducer: {
    note: noteSlice.reducer
  },
})