import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    "projectList": null
}


export const userSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
      setUserSlice: (state, action) => {
        console.log(action.payload);
        const initstate = {
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
          "projectList": null
      }
      console.log(action.payload);
          Object.keys(initstate).forEach(key=>{
            if(action.payload !== null && action.payload !== undefined && action.payload.hasOwnProperty(key))
              state[key] = action.payload[key];
            else state[key] = null
          })
      }
    }
        //   localStorage.setItem('BRANCH', action.payload.BRANCH);
  });
  
  // Action creators are generated for each case reducer function
  export const { setUserSlice } = userSlice.actions;
  
  export default userSlice.reducer;