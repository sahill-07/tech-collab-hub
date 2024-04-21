import { getDatabase, ref, get, child, push, onValue } from "firebase/database";
import { store } from '../store/index'
import { addToChatListApi } from "../http";

class FirebaseMessageUtils {
    static listener = []
    sendMessage(message, myuid, timestamp, path){
        const data = {
            message,
            createdAt: timestamp,
            senderuid : myuid
        };

        push(ref(getDatabase(), path), data).then(() => {
            console.log("Message sent successfully!");
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
    }

    chatId(freinduid){
        const myuid = store.getState().UserSlice.uid;
        // const freinduid = freinduid;
        if(myuid < freinduid)
            return `messages/${myuid}_${freinduid}`;
        else
            return `messages/${freinduid}_${myuid}`
    }

    generatePath(chatWith){
        if(chatWith.type === 'groupmessage')
            return `groupmessage/${chatWith.topic}`;
        else
            return this.chatId(chatWith.uid);
    }


    addIfNotDuplicate(arr, currval){
        console.log('give array is', arr);
        currval = JSON.stringify(currval);
        for(const ele of arr){
            const key = JSON.stringify(ele);
            if(key === currval)
                return arr;
        }
        return [...arr, JSON.parse(currval)];
    }

}

export default new FirebaseMessageUtils();