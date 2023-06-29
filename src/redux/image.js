import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

const image = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setValue } = image.actions
export default image.reducer
