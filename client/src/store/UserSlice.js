import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isloggedIn : false,
    isAlreadyAUser : false,
    email : null,
    username : null,
    githublink : null,
    tags : [],
    semester : null,
}


export const userSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
      setUserSlice: (state, action) => {
        if(action.payload.isloggedIn && action.payload.hasOwnProperty('isloggedIn') && action.payload.isloggedIn !== null){
          state.isloggedIn = action.payload.isloggedIn;
        //   localStorage.setItem('COLLEGE_NAME', action.payload.COLLEGE_NAME);
        }
        if(action.payload.isAlreadyAUser && action.payload.hasOwnProperty('isAlreadyAUser') &&  action.payload.isAlreadyAUser !== null){
          state.isAlreadyAUser = action.payload.isAlreadyAUser;
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
        }
        if(action.payload.email && action.payload.hasOwnProperty('email') &&  action.payload.email !== null){
          state.email = action.payload.email;
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
        }
        if(action.payload.username && action.payload.hasOwnProperty('username') &&  action.payload.username !== null){
          state.username = action.payload.username;
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
        }
        if(action.payload.githublink && action.payload.hasOwnProperty('githublink') &&  action.payload.githublink !== null){
          state.githublink = action.payload.githublink;
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
        }
        if(action.payload.semester && action.payload.hasOwnProperty('semester') &&  action.payload.semester !== null){
          state.semester = action.payload.semester;
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
        }
        if(action.payload.tags && action.payload.hasOwnProperty('tags') &&  action.payload.tags !== null){
          state.tags = action.payload.tags;
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
        }
      }
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { setUserSlice } = userSlice.actions;
  
  export default userSlice.reducer;