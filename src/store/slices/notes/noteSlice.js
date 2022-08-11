import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 10,
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    increment: (state) => {

      state.value += 1
    },
  },
})


export const { increment } = noteSlice.actions

