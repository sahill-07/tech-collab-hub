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

        Object.keys(initialState).forEach(key=>{
          console.log(key);
          if(action.payload.action === 'makenull')
            state[key] = null;
          else
            state[key] = action.payload[key];
        })
      }
    },
  });
  
  export const { setBasicUtilsSlice } = basicUtilsSlice.actions;
  
  export default basicUtilsSlice.reducer;