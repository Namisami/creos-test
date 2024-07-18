import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Issue } from '../../types/Issue'


export interface IssuesState {
  issues: Issue[]
  loadingStatus: "loading" | "loaded" | "failed"
  error: string | null | undefined
}

const initialState: IssuesState = {
  issues: [],
  loadingStatus: "loaded",
  error: null
}

export const fetchIssues = createAsyncThunk(
  "issues/fetchIssues",
  async () => {
    try {
      const res = await axios.get("https://sandbox.creos.me/api/v1/issue/")
      return res.data;
    } catch (err) {
      return Promise.reject(err)
    }
  }
)

export const issuesSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loadingStatus = "loading"
        state.error = null
      })
      .addCase(fetchIssues.fulfilled, (state, action: PayloadAction<Issue[]>) => {
        state.issues = action.payload
        state.loadingStatus = "loaded"
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.error.message;
      })
  }
})

export const selectIssues = (state: RootState) => state.issues.issues
export const selectIssuesLoadingStatus = (state: RootState) => {
  return state.issues.loadingStatus === "loaded" ? false : true 
}
export const selectIssuesError = (state: RootState) => state.issues.error;

export default issuesSlice.reducer
