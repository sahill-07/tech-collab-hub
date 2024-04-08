import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isloggedIn : null,
    isAlreadyAUser : null,
    email : null,
    username : null,
    githublink : null,
    tags : [],
    semester : null,
    collegeName : null
}


export const userSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
      setUserSlice: (state, action) => {
        console.log(action.payload);
        if(action.payload !== null){
          Object.keys(action.payload).forEach(key=>{
            if(state.hasOwnProperty(key))
              state[key] = action.payload[key];
          })
        }
      }
    }
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
  });
  
  // Action creators are generated for each case reducer function
  export const { setUserSlice } = userSlice.actions;
  
  export default userSlice.reducer;