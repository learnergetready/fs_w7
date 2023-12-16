import { createSlice } from "@reduxjs/toolkit"
import { showNotification } from "./notificationReducer"
import blogService from "../services/blogs"
import { appendUserlistBlog, removeUserlistBlog } from "./userlistReducer"

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
    appendComment(state, action) {
      const { blogID, newComment } = action.payload
      return state.map((blog) =>
        blog.id !== blogID
          ? blog
          : { ...blog, comments: blog.comments.concat(newComment) },
      )
    },
  },
})

export const refreshBloglist = () => {
  return async (dispatch) => {
    const newBloglist = await blogService.getAll()
    dispatch(setBloglist(newBloglist))
  }
}

export const addBlog = (blog, user) => {
  return async (dispatch) => {
    const newBlogWithoutUsername = await blogService.create(blog)
    const newBlog = {
      ...newBlogWithoutUsername,
      user: {
        username: user.username,
        name: user.name,
        id: newBlogWithoutUsername.user,
      },
    }
    dispatch(appendBlog(newBlog))
    dispatch(appendUserlistBlog(newBlog))
    dispatch(
      showNotification(
        `a new blog ${blog.title} by author ${blog.author} was added`,
        10,
        "green",
      ),
    )
  }
}

export const updateBlog = (newVersion) => {
  return async (dispatch) => {
    await blogService.update(newVersion)
    dispatch(putBlog(newVersion))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(removeUserlistBlog(blog.id))
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

export const addComment = (blogID, newComment) => {
  return async (dispatch) => {
    await blogService.comment(blogID, newComment)
    dispatch(appendComment({ blogID, newComment }))
  }
}

export const { setBloglist, appendBlog, putBlog, nixBlog, appendComment } =
  bloglistSlice.actions

export default bloglistSlice.reducer
