import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = { ...state.value, ...action.payload }
    },
    logoutUser: (state) => {
      state.value = {} // Menghapus nilai pengguna saat logout
    },
  },
})

export const { setValue, logoutUser } = user.actions
export default user.reducer
