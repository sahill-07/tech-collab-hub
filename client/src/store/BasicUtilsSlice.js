import { createSlice } from "@reduxjs/toolkit";
/**
 * 1. Snackbar args =  msg severity
 * 2. progress_loading : {percent, maxpercent, message}  //maxpercent is used to show that every second is progress is increasing so at max it should come to maxpercent
 */
const initialState = {
    snackbar : null,
    progress_loading : null
}


export const basicUtilsSlice = createSlice({
    name: "basicUtilsSlice",
    initialState,
    reducers: {
      setBasicUtilsSlice: (state, action) => {

        const defaultstate = {
            snackbar : null,
            progress_loading : null
        }


        if(action.payload.snackbar !== undefined && action.payload.snackbar !== null){
          state.snackbar = action.payload.snackbar;
        }else {
          state.snackbar = defaultstate.snackbar;
        }

        if(action.payload.progress_loading !== undefined && action.payload.progress_loading !== null){
          state.progress_loading = action.payload.progress_loading
        }else {
          state.progress_loading = defaultstate.progress_loading;
        }
      }
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { setBasicUtilsSlice } = basicUtilsSlice.actions;
  
  export default basicUtilsSlice.reducer;