import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const userlistSlice = createSlice({
  name: "userlist",
  initialState: [],
  reducers: {
    setUserlist(state, action) {
      return action.payload
    },
    appendUserlistBlog(state, action) {
      const newBlog = action.payload
      const { user: _, ...newBlogWithoutUser } = newBlog
      return state.map((user) =>
        user.id !== newBlog.user.id
          ? user
          : { ...user, blogs: user.blogs.concat(newBlogWithoutUser) },
      )
    },
    removeUserlistBlog(state, action) {
      return state.map((user) => {
        return {
          ...user,
          blogs: user.blogs.filter((blog) => blog.id !== action.payload),
        }
      })
    },
  },
})

export const refreshUserlist = () => {
  return async (dispatch) => {
    const newUserlist = await userService.getAll()
    dispatch(setUserlist(newUserlist))
  }
}

export const { setUserlist, appendUserlistBlog, removeUserlistBlog } =
  userlistSlice.actions

export default userlistSlice.reducer
