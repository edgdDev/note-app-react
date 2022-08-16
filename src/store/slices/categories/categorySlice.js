import { createSlice } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
  name: 'category',
  initialState: [{
    label: 'None',
    value: 'None'
  }],
  reducers: {
    addNew: (state, action) => {
      state.push(action.payload)
    },
  },
})


export const { addNew } = categorySlice.actions
