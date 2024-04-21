import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "uid" : null,
    "email": null,
    "username": null,
    "githublink": null,
    "is_currently_a_student": null,
    "curr_semester": null,
    "college_name": null,
    "area_of_interest": null,
    "experience": null,
    "preferred_learning_resource": null,
    "tech_stack_interest": null,
    "generated_tags": null,
    "knn": null,
    "projectList": null,
    "token" : null,
    "total_commits" : null,
    total_pull_request : null,    
    star_earned : null,
    "saved_repo" : []
}


export const userSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
      setUserSlice: (state, action) => {
      
      if(action.payload !== undefined && action.payload !== null){
        Object.keys(initialState).forEach(key=>{
          if(action.payload.action === 'makenull') state[key] = null
          else if(action.payload.hasOwnProperty(key))
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