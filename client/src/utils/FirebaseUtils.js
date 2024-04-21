import { getUserDetails } from '../http';
import { setBasicUtilsSlice } from '../store/BasicUtilsSlice';
import { setUserSlice } from '../store/UserSlice';
import { store } from '../store/index'

class FirebaseUtils {

    handleAuthChange(user){
        const userslice = store.getState().UserSlice;
        if(user !== null && userslice.username === null){
            store.dispatch(setBasicUtilsSlice({
                progress_loading : {
                    percent : 71,
                    maxpercent : 99,
                    message : "Fetching User Details..."
                }
            }));
            store.dispatch(setUserSlice({
                token : user.accessToken,
                email : user.email
            }))
            getUserDetails().then(res=>{
                if(res.status === 200 && res.data !== null){
                    store.dispatch(setUserSlice(res.data))
                }
                store.dispatch(setBasicUtilsSlice({
                    progress_loading : {
                        percent : 100,
                        maxpercent : 100,
                        message : "Completed..."
                    }
                }));
            })
            // get api
        }
        else {
            store.dispatch(setBasicUtilsSlice({
                'action' : 'makenull'
            }))
        }
    }
}

export default new FirebaseUtils();