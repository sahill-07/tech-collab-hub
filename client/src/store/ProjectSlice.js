import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects : []
}


export const projectSlice = createSlice({
    name: "projectSlice",
    initialState,
    reducers: {
      setprojectSlice: (state, action) => {
        if(action.payload !== undefined && Array.isArray(action.payload) && action.payload[0].hasOwnProperty('email')){
            state.projects = action.payload;
        }
      }
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { setprojectSlice } = projectSlice.actions;
  
  export default projectSlice.reducer;