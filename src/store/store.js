import { configureStore } from '@reduxjs/toolkit'
import { categorySlice } from './slices/categories';
import { noteSlice } from './slices/notes';
import { userSlice } from './slices/user/userSlice';

export const store = configureStore({
  reducer: {
    note: noteSlice.reducer,
    category: categorySlice.reducer,
    user: userSlice.reducer,
  },
})