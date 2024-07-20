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

interface Week {
  income: number
  outcome: number
  profit: number
}

interface IOP extends Week {
  week: number
}

export const fetchIssues = createAsyncThunk(
  "issues/fetchIssues",
  async () => {
    try {
      const res = await axios.get("https://sandbox.creos.me/api/v1/issue/?status=Done")
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
export const selectDoneIssues = (state: RootState) => state.issues.issues.filter((issue) => issue.status === "Done")
export const selectIOPForNWeeks = (state: RootState, n: number) => {
  const weeks: {
    [key: number]: Week[]
  } = {};
  const doneIssues = selectDoneIssues(state);
  const dateIssues = doneIssues.map((issue) => { return {...issue, date_finished: new Date(issue.date_finished)}})
  dateIssues.sort((a, b) => {
    const firstDate = a.date_finished;
    const secondDate = b.date_finished;
    if (firstDate > secondDate) return 1;
    if (firstDate < secondDate) return -1;
    return 0
  })
  let weekN = 0; 
  let lastWeek = -1; 
  const lastIOP = [];
  for (const issue of dateIssues.reverse()) {
    const thisWeek = Math.floor(issue.date_finished.getDate() / 7 + 1)
    if (lastWeek === -1 || lastWeek !== thisWeek) {
      if (lastWeek !== -1) {
        const currentIOP: IOP = {
          week: lastIOP.length + 1,
          income: 0,
          outcome: 0,
          profit: 0,
        };
        weeks[weekN].forEach((iop) => {
          currentIOP.income += iop.income;
          currentIOP.outcome += iop.outcome;
          currentIOP.profit += iop.profit;
        });
        lastIOP.push(currentIOP)
      }
      lastWeek = thisWeek;
      weekN += 1;
      if (weekN > n) break; 
      weeks[weekN] = [];
    }
    weeks[weekN].push({
      income: issue.received_from_client,
      outcome: issue.send_to_project_manager + issue.send_to_account_manager + issue.send_to_designer,
      profit: issue.received_from_client - issue.send_to_project_manager - issue.send_to_account_manager - issue.send_to_designer
    })
  }
  return lastIOP;
}
export const selectIssuesLoadingStatus = (state: RootState) => {
  return state.issues.loadingStatus === "loaded" ? false : true 
}
export const selectIssuesError = (state: RootState) => state.issues.error;

export default issuesSlice.reducer
