import { getDatabase, ref, get, child, push, onValue } from "firebase/database";
import { store } from '../store/index'
import { addToChatListApi } from "../http";

class FirebaseMessageUtils {
    static listener = []
    sendMessage(message, freinduid){
        this.freinduid = freinduid;
        const data = {
            message,
            createdAt: new Date().getTime()
        };
        const path = `messages/${this.chatId()}`;

        push(ref(getDatabase(), path), data).then(() => {
            console.log("Message sent successfully!");
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
    }

    chatId(){
        const myuid = store.getState().UserSlice.uid;
        const freinduid = this.freinduid;
        return `${myuid}/${freinduid}`;
    }

    async getMessages(freinduid, myuid){
        const messageList = []; //{message, createdAt, isMessageFromMe}
        const path1 = `messages/${myuid}/${freinduid}`;  //get data once
        let snapshot = await get(ref(getDatabase(), path1))
            if (snapshot.exists()) {
                for(const msg of Object.values(snapshot.val())){
                    messageList.push({
                        message : msg.message,
                        createdAt : msg.createdAt,
                        isMessageFromMe : true
                    })

                }
            } else {
              console.log("No data available");
            }

        return messageList;
        

    }

}

export default new FirebaseMessageUtils();