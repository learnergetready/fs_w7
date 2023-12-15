import { createSlice } from "@reduxjs/toolkit"
import { showNotification } from "./notificationReducer"
import blogService from "../services/blogs"

const bloglistSlice = createSlice({
  name: "bloglist",
  initialState: [],
  reducers: {
    setBloglist(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    putBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload,
      )
    },
    nixBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const updateBlog = (newVersion) => {
  return async (dispatch) => {
    await blogService.update(newVersion)
    dispatch(putBlog(newVersion))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(
      showNotification(
        `removed blog ${blog.title} by ${blog.author}`,
        10,
        "green",
      ),
    )
    dispatch(nixBlog(blog.id))
  }
}

export const { setBloglist, appendBlog, putBlog, nixBlog } =
  bloglistSlice.actions

export default bloglistSlice.reducer
