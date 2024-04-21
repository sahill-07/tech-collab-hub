import { getProjectListForLoggedInUsers, getProjectListForLoggedOutUsers } from "../http";
import { store } from "../store";
import { setprojecListSlice } from "../store/ProjectSlice";

class ProjectUtils{
    fetchProjects(){
        // if(store.getState().ProjectSlice.projects.length === 0){
            if(store.getState().UserSlice.username === null || store.getState().UserSlice.username === undefined){
              getProjectListForLoggedOutUsers('all').then(res=>{
                if(res.status === 200){
                  store.dispatch(setprojecListSlice(res.data));
                }
              })
            }
            else{ //user is registered
                getProjectListForLoggedInUsers().then(res=>{
                  if(res.status === 200){
                    store.dispatch(setprojecListSlice(res.data));
                  }
                })
            }
        // }
    }
}

export default new ProjectUtils();