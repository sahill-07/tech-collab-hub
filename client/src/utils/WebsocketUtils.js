import { setBasicUtilsSlice } from "../store/BasicUtilsSlice";
import { store } from '../store/index'

class WebSocketUtils {
    processMessage(data){
        try{
            data = JSON.parse(data);
            if(data !== null && data.hasOwnProperty('type')){
                if(data.type === 'progress')
                    this.processProgress(data)
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
}

export default new WebSocketUtils();