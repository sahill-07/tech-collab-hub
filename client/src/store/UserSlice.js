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
        if(action.payload.isloggedIn !== undefined && action.payload.hasOwnProperty('isloggedIn')){
          state.isloggedIn = action.payload.isloggedIn;
        //   localStorage.setItem('COLLEGE_NAME', action.payload.COLLEGE_NAME);
        }
        if(action.payload.isAlreadyAUser !== undefined && action.payload.hasOwnProperty('isAlreadyAUser')){
          state.isAlreadyAUser = action.payload.isAlreadyAUser;
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
        }
        if(action.payload.email !== undefined && action.payload.hasOwnProperty('email')){
          state.email = action.payload.email;
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
        }
        if(action.payload.username !== undefined && action.payload.hasOwnProperty('username')){
          state.username = action.payload.username;
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
        }
        if(action.payload.githublink !== undefined && action.payload.hasOwnProperty('githublink')){
          state.githublink = action.payload.githublink;
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
        }
        if(action.payload.semester !== undefined && action.payload.hasOwnProperty('semester')){
          state.semester = action.payload.semester;
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
        }
        if(action.payload.tags !== undefined && action.payload.hasOwnProperty('tags')){
          state.tags = action.payload.tags;
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
        }
        if(action.payload.collegeName !== undefined && action.payload.hasOwnProperty('collegeName')){
          state.collegeName = action.payload.collegeName;
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
        }
      }
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { setUserSlice } = userSlice.actions;
  
  export default userSlice.reducer;