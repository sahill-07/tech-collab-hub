import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects : []
}


export const projectListSlice = createSlice({
    name: "projectSlice",
    initialState,
    reducers: {
      setprojecListSlice: (state, action) => {
        if(action.payload !== undefined && Array.isArray(action.payload)){
            state.projects = action.payload;
        }
      }
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { setprojecListSlice } = projectListSlice.actions;
  
  export default projectListSlice.reducer;