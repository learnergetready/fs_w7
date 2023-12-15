import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", color: "" },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state) {
      return { message: "", color: "" }
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, duration, color) => {
  return (dispatch) => {
    dispatch(setNotification({ message, color }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
