import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  userprofile: [],
  error: [],
  isLoading: false
}

axios.interceptors.request.use(function (req) {
  if (localStorage.getItem("profile"))
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`
  return req
})

export const Signup = createAsyncThunk("users/Signup", async (users) => {
  const response = await axios.post(
    "https://shareit-mern.herokuapp.com/users/signup",
    users
  )
  return response.data
})

export const Signin = createAsyncThunk("users/Signin", async (users) => {
  const response = await axios.post(
    "https://shareit-mern.herokuapp.com/users/signin",
    users
  )

  return response.data
})

export const Follow = createAsyncThunk("users/ّFollow", async (data) => {
  const response = await axios.put(
    `https://shareit-mern.herokuapp.com/users/follow`,
    {
      data
    }
  )

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
    [Signin.rejected]: (state = initialState, action) => {
      console.log(action.error.name, action.error.message)
      return {
        ...state,
        error: action.error.message,
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
      localStorage.setItem("profile", JSON.stringify(action.payload))
      return {
        ...state,

        isLoading: false
      }
    },
    [Follow.pending]: (state = initialState, action) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [Follow.fulfilled]: (state = initialState, action) => {
      localStorage.setItem("profile", JSON.stringify(action.payload))
      return {
        ...state,
        isLoading: false
      }
    }
  }
})
export const { Logout: LogoutAction, Login: LoginAction } = authSlice.actions
export default authSlice.reducer
