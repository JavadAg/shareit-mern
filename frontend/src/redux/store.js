import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/user"
import postReducer from "./reducers/post"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer
  }
})
