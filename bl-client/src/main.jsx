import ReactDOM from "react-dom/client"
import App from "./App"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import bloglistReducer from "./reducers/bloglistReducer"
import notificationReducer from "./reducers/notificationReducer"
import userReducer from "./reducers/userReducer"

const store = configureStore({
  reducer: {
    bloglist: bloglistReducer,
    notification: notificationReducer,
    user: userReducer,
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
