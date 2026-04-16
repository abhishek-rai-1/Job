import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name : 'job',
    initialState : {
        allJobs : [],
        singleJob : null
    },
    reducers : {
        getAllJobs : (state, action) => {
            state.allJobs = action.payload;
        },
        getSingleJob : (state, action) => {
            state.singleJob = action.payload;
        }
    }
});

export const {getAllJobs, getSingleJob} = jobSlice.actions;
export default jobSlice.reducer;