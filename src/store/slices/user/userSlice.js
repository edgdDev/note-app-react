import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: 'admin',
    password: 'envolvers123',
    logged: false
  },
  reducers: {
    loginValidation: (state, action) => {
      state.logged = action.payload
    },
  },
})


export const { loginValidation } = userSlice.actions
