import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Bloglist from "./components/Bloglist"
import Blog from "./components/Blog"
import Users from "./components/Users"
import User from "./components/User"
import { refreshBloglist } from "./reducers/bloglistReducer"
import { refreshUserlist } from "./reducers/userlistReducer"
import { setUser } from "./reducers/userReducer"
import { Route, Routes, useNavigate } from "react-router-dom"
import { setToken as setBlogserviceToken } from "./services/blogs"
import {
  Provider as SpectrumRouterProvider,
  Footer,
  View,
} from "@adobe/react-spectrum"
import Navbar from "./components/Navbar"

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(refreshBloglist())
    dispatch(refreshUserlist())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      setBlogserviceToken(loggedUser.token)
    }
  }, [])

  const user = useSelector(({ user }) => user)

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <SpectrumRouterProvider router={{ navigate }}>
        <View>
          <Navbar />
          <Notification />
        </View>
        <Routes>
          <Route
            path="/"
            element={
              <View>
                <BlogForm />
                <Bloglist />
              </View>
            }
          />
          <Route path="/blogs/:blogID" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userID" element={<User />} />
        </Routes>
        <Footer marginY="size-200">
          Made for the Helsinki University Full Stack Course, &copy; 2023
        </Footer>
      </SpectrumRouterProvider>
    </div>
  )
}
export default App
