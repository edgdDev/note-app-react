import { createSlice } from '@reduxjs/toolkit'

export const noteSlice = createSlice({
  name: 'note',
  initialState: [],
  reducers: {
    saveNote: (state, action) => {
      state.push(action.payload)
    },
    removeNote: (state, action) => {
      return state.filter(item => item.title !== action.payload.title)
    },
    updateNote: (_, action) => {
      return action.payload      
    },
    archiveNote: (_, action) => {
      return action.payload
    }
  },
})


export const { saveNote, removeNote, updateNote, archiveNote } = noteSlice.actions
