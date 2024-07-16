import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Comment } from '../../types/Comments'


export interface CommentsState {
  comments: Comment[]
  loadingStatus: "loading" | "loaded" | "failed"
  error: string | null | undefined
}

const initialState: CommentsState = {
  comments: [],
  loadingStatus: "loaded",
  error: null
}

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    try {
      const res = await axios.get("https://sandbox.creos.me/api/v1/comment/")
      return res.data;
    } catch (err) {
      return Promise.reject(err)
    }
  }
)

export const commentsSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loadingStatus = "loading"
        state.error = null
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        console.log(action)
        state.comments = action.payload
        state.loadingStatus = "loaded"
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.error.message;
        console.log(action)
      })
  }
})

export const selectComments = (state: RootState) => state.comments.comments
export const selectCommentsLoadingStatus = (state: RootState) => {
  return state.comments.loadingStatus === "loaded" ? false : true 
}
export const selectCommentsError = (state: RootState) => state.comments.error;

// export const { } = commentSlice.actions
// export const { increment, decrement, incrementByAmount } = commentSlice.actions

export default commentsSlice.reducer
