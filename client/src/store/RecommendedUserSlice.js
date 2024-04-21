import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recommendUserData : []
}


export const recommendedUserSlice = createSlice({
    name: "RecommendedUserSlice",
    initialState,
    reducers: {
      setRecommendedUserSlice: (state, action) => {
        if(action.payload !== null && Array.isArray(action.payload) && action.payload[0].hasOwnProperty('email')){
            state.recommendUserData = action.payload;
        }
      }
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { setRecommendedUserSlice } = recommendedUserSlice.actions;
  
  export default recommendedUserSlice.reducer;