import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Comment } from '../../types/Comments'


export interface CommentsState {
  comments: Comment[]
  loadingStatus: "loading" | "loaded" | "failed"
  error: SerializedError | null 
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
      console.error(err)
    }
  }
)

export const commentsSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loadingStatus = "loading"
        state.error = null
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload
        state.loadingStatus = "loaded"
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loadingStatus = "failed"
        state.error = action.error
      })
  }
})

export const selectComments = (state: RootState) => state.comments.comments
export const selectCommentsLoadingStatus = (state: RootState) => {
  return state.comments.loadingStatus === "loaded" ? false : true 
}

// export const { } = commentSlice.actions
// export const { increment, decrement, incrementByAmount } = commentSlice.actions

export default commentsSlice.reducer
