import { getDatabase, ref, get, child, push, onValue } from "firebase/database";
import { store } from '../store/index'
import { addToChatListApi } from "../http";

class FirebaseMessageUtils {
    static listener = []
    sendMessage(message, freinduid, myuid, timestamp){
        const data = {
            message,
            createdAt: timestamp,
            senderuid : myuid
        };
        const path = `${this.chatId(freinduid)}`;

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

    // async getMessages(freinduid, myuid){
    //     const messageList = []; //{message, createdAt, isMessageFromMe}
    //     const path1 = `messages/${myuid}/${freinduid}`;  //get data once
    //     let snapshot = await get(ref(getDatabase(), path1))
    //         if (snapshot.exists()) {
    //             for(const msg of Object.values(snapshot.val())){
    //                 messageList.push({
    //                     message : msg.message,
    //                     createdAt : msg.createdAt,
    //                     isMessageFromMe : true
    //                 })

    //             }
    //         } else {
    //           console.log("No data available");
    //         }

    //     return messageList;
        

    // }

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