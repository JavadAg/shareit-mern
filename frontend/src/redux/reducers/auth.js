import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  userprofile: [],
  isLoading: false
}

export const Signup = createAsyncThunk("users/Signup", async (users) => {
  const response = await axios.post("http://localhost:3002/users/signup", users)
  return response.data
})

export const Signin = createAsyncThunk("users/Signin", async (users) => {
  const response = await axios.post("http://localhost:3002/users/signin", users)

  return response.data
})

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    Logout: (state, action) => {
      localStorage.clear()
    },
    Login: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }))
    }
  },
  extraReducers: {
    [Signup.pending]: (state = initialState, action) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [Signup.fulfilled]: (state = initialState, action) => {
      localStorage.setItem("profile", JSON.stringify(action.payload))

      return {
        ...state,
        isLoading: false
      }
    },
    [Signin.pending]: (state = initialState, action) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [Signin.fulfilled]: (state = initialState, action) => {
      // localStorage.setItem("profile", JSON.stringify(action.payload))
      return {
        ...state,
        isLoading: false
      }
    }
  }
})
export const { Logout: LogoutAction, Login: LoginAction } = authSlice.actions
export default authSlice.reducer
