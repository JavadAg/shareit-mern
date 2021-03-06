import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  posts: [],
  post: [],
  isLoading: false
}

const url = `${process.env.REACT_APP_URL}/post`
console.log(url)
axios.interceptors.request.use(function (req) {
  if (localStorage.getItem("profile"))
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`
  return req
})

export const Create = createAsyncThunk("post/Create", async (formdata) => {
  try {
    const response = await axios.post(`${url}`, formdata)
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const Get = createAsyncThunk("post/Get", async () => {
  try {
    const response = await axios.get(`${url}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const GetPostbyId = createAsyncThunk(
  "post/GetPostbyId",
  async (data) => {
    try {
      const response = await axios.post(`${url}/filter`, data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const Update = createAsyncThunk("post/Update", async (data) => {
  try {
    const { form } = data
    const id = data.postId
    const response = await axios.patch(`${url}/${id}`, form)
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const Like = createAsyncThunk("post/Like", async (id) => {
  try {
    const response = await axios.patch(`${url}/${id}/like`)
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const Comment = createAsyncThunk("post/Comment", async (data) => {
  try {
    const usercomment = data
    const id = data.postId
    const response = await axios.post(`${url}/${id}/comment`, { usercomment })
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const Delete = createAsyncThunk("post/Delete", async (id) => {
  try {
    const response = await axios.delete(`${url}/${id}/delete`)
    return response.data
  } catch (error) {
    console.log(error)
  }
})

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [Create.pending]: (state = initialState, action) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [Create.fulfilled]: (state = initialState, action) => {
      const currentPosts = JSON.parse(JSON.stringify(state.posts))
      return {
        ...state,
        posts: [...currentPosts, action.payload.post],
        isLoading: false
      }
    },
    [Get.pending]: (state = initialState, action) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [Get.fulfilled]: (state = initialState, action) => {
      return {
        ...state,
        posts: action.payload.posts,
        isLoading: false
      }
    },
    [GetPostbyId.pending]: (state = initialState, action) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [GetPostbyId.fulfilled]: (state = initialState, action) => {
      return {
        ...state,
        posts: action.payload.posts,
        isLoading: false
      }
    },
    [Delete.pending]: (state = initialState, action) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [Delete.fulfilled]: (state = initialState, action) => {
      const currentPosts = JSON.parse(JSON.stringify(state.posts))

      return {
        ...state,
        posts: currentPosts.filter((post) => {
          return post._id !== action.payload.deletedpost._id
        }),
        isLoading: false
      }
    },
    [Update.pending]: (state = initialState, action) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [Update.fulfilled]: (state = initialState, action) => {
      const currentPosts = JSON.parse(JSON.stringify(state.posts))
      currentPosts.map((post) => {
        if (post._id === action.payload.post._id) {
          post.title = action.payload.post.title
          post.text = action.payload.post.text
          post.image = action.payload.post.image
        }
      })
      return {
        ...state,
        posts: currentPosts,
        isLoading: false
      }
    },
    [Like.pending]: (state = initialState, action) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [Like.fulfilled]: (state = initialState, action) => {
      const currentPosts = JSON.parse(JSON.stringify(state.posts))

      currentPosts.map((post) => {
        if (post._id === action.payload.Likedpost._id) {
          post.like = action.payload.Likedpost.like
        }
      })
      return {
        ...state,
        posts: currentPosts,
        isLoading: false
      }
    },
    [Comment.pending]: (state, action) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [Comment.fulfilled]: (state = initialState, action) => {
      const currentPosts = JSON.parse(JSON.stringify(state.posts))
      currentPosts.map((post) => {
        if (post._id === action.payload.CommentedPost._id) {
          post.comment = action.payload.CommentedPost.comment
        }
      })

      return {
        ...state,
        posts: currentPosts,
        isLoading: false
      }
    }
  }
})

export default postSlice.reducer
