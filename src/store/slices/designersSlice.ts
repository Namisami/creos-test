import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Designer } from '../../types/Designer'


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
      const res = await axios.get("https://sandbox.creos.me/api/v1/designer/")
      console.log(res)
      return res.data.results;
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
        console.log(action)
        state.designers = action.payload
        state.loadingStatus = "loaded"
      })
      .addCase(fetchDesigners.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.error.message;
        console.log(action)
      })
  }
})

export const selectDesigners = (state: RootState) => state.designers.designers
export const selectDesignersLoadingStatus = (state: RootState) => {
  return state.designers.loadingStatus === "loaded" ? false : true 
}
export const selectDesignersError = (state: RootState) => state.designers.error;

export default designersSlice.reducer
