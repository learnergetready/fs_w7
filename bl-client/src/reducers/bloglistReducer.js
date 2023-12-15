import { createSlice } from "@reduxjs/toolkit"
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
  },
})

export const { setBloglist, appendBlog } = bloglistSlice.actions

export default bloglistSlice.reducer
