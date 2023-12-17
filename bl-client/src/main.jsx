import ReactDOM from "react-dom/client"
import App from "./App"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import bloglistReducer from "./reducers/bloglistReducer"
import userlistReducer from "./reducers/userlistReducer"
import notificationReducer from "./reducers/notificationReducer"
import userReducer from "./reducers/userReducer"
import { BrowserRouter } from "react-router-dom"
import {
  Provider as SpectrumProvider,
  Flex,
  defaultTheme,
} from "@adobe/react-spectrum"

const store = configureStore({
  reducer: {
    bloglist: bloglistReducer,
    userlist: userlistReducer,
    notification: notificationReducer,
    user: userReducer,
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <SpectrumProvider theme={defaultTheme}>
    <BrowserRouter>
      <Flex direction="column" gap="size-400">
        <Provider store={store}>
          <App />
        </Provider>
      </Flex>
    </BrowserRouter>
  </SpectrumProvider>,
)
