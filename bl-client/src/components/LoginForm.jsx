import blogService from "../services/blogs"
import loginService from "../services/login"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { showNotification } from "../reducers/notificationReducer"

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLoggingIn = await loginService.login({ username, password })
      window.localStorage.setItem(
        "loggedBloglistUser",
        JSON.stringify(userLoggingIn),
      )
      dispatch(setUser(userLoggingIn))
      blogService.setToken(userLoggingIn.token)
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch(showNotification("Wrong credentials", 10, "red"))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-cy="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-cy="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" data-cy="login">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
