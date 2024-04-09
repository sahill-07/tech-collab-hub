import { setBasicUtilsSlice } from "../store/BasicUtilsSlice";
import { setUserSlice } from '../store/UserSlice';
import { store } from '../store/index'

class WebSocketUtils {
    error = 'error';
    progress = 'progress';
    userdata = 'userdata';
    processMessage(data){
        try{
            data = JSON.parse(data);
            if(data !== null && data.hasOwnProperty('type')){
                if(data.type === 'progress')
                    this.processProgress(data)
                else if(data.type === this.userdata)
                    this.processUserdata(data);
                else if(data.type === this.error)
                    this.processError(data);
            }
        }catch(err){
            console.log(err);
        }
    }
    processProgress(data){
        store.dispatch(setBasicUtilsSlice({
            progress_loading : {
                percent : data.percent,
                maxpercent : data.maxpercent,
                message : data.message
            }
        }))
    }

    processUserdata(data){
        store.dispatch(setUserSlice(data.data))
    }

    processError(data){
        store.dispatch(setBasicUtilsSlice({
            snackbar : {
                msg : data.msg,
                severity : data.severity
            }
        }))
    }
}

export default new WebSocketUtils();