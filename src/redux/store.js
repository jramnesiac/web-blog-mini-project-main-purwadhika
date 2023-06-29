import { configureStore } from '@reduxjs/toolkit'
import user from './user'
import image from './image'

export const store = configureStore({
  reducer: {
    user: user,
    image: image,
  },
})
