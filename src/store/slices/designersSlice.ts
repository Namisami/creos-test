import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Designer } from '../../types/Designer'
import getMedianTimeSpentOnTasks from '../../utils/getMedianTimeSpentOnTasks'


export interface DesignersState {
  designers: Designer[]
  loadingStatus: "loading" | "loaded" | "failed"
  error: string | null | undefined
}

const initialState: DesignersState = {
  designers: [],
  loadingStatus: "loaded",
  error: null
}

export const fetchDesigners = createAsyncThunk(
  "designers/fetchDesigners",
  async () => {
    try {
      const result = []
      let pageCount = 1;

      const res = await axios.get(`https://sandbox.creos.me/api/v1/designer/?page=1&limit=128`)
      let count = res.data.results.length;
      result.push(...res.data.results)
      while (count < res.data.count) {
        pageCount += 1;
        const res = await axios.get(`https://sandbox.creos.me/api/v1/designer/?page=${pageCount}&limit=128`)
        count += res.data.results.length;
        result.push(...res.data.results);
      }
      return result;
    } catch (err) {
      return Promise.reject(err)
    }
  }
)

export const designersSlice = createSlice({
  name: 'designer',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesigners.pending, (state) => {
        state.loadingStatus = "loading"
        state.error = null
      })
      .addCase(fetchDesigners.fulfilled, (state, action: PayloadAction<Designer[]>) => {
        state.designers = action.payload
        state.loadingStatus = "loaded"
      })
      .addCase(fetchDesigners.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.error.message;
      })
  }
})

export const selectDesigners = (state: RootState) => state.designers.designers
export const selectTopDesigners = (state: RootState, count: number) => {
  const topDesigners = [...state.designers.designers];
  topDesigners.sort((a, b) =>{
    return b.issues.length / getMedianTimeSpentOnTasks(b.issues)
      - a.issues.length / getMedianTimeSpentOnTasks(a.issues);
  });
  return topDesigners.slice(0, count);
}
export const selectDesignersLoadingStatus = (state: RootState) => {
  return state.designers.loadingStatus === "loaded" ? false : true 
}
export const selectDesignersError = (state: RootState) => state.designers.error;

export default designersSlice.reducer
