import ReactDOM from "react-dom/client"
import App from "./App"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import bloglistReducer from "./reducers/bloglistReducer"
import userlistReducer from "./reducers/userlistReducer"
import notificationReducer from "./reducers/notificationReducer"
import userReducer from "./reducers/userReducer"
import { BrowserRouter as Router } from "react-router-dom"

const store = configureStore({
  reducer: {
    bloglist: bloglistReducer,
    userlist: userlistReducer,
    notification: notificationReducer,
    user: userReducer,
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
)
