import { createSlice } from "@reduxjs/toolkit";
/**
 * 1. Snackbar args =  msg severity
 */
const initialState = {
    snackbar : null,

}


export const basicUtilsSlice = createSlice({
    name: "basicUtilsSlice",
    initialState,
    reducers: {
      setBasicUtilsSlice: (state, action) => {

        const defaultstate = {
            snackbar : {
              msg : null,
              severity : null
            },
        }


        if(action.payload.snackbar !== undefined && action.payload.snackbar !== null){
          state.snackbar = action.payload.snackbar;
        }else 
          state.snackbar = defaultstate.snackbar;
        console.log(state);
      }
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { setBasicUtilsSlice } = basicUtilsSlice.actions;
  
  export default basicUtilsSlice.reducer;