import React, { useEffect, useRef, useState } from "react";
import ChatModalCard from "./ChatModalCard";
import IconButtonMui from "../basicComponents/Button/IconButtonMui";
import SendIcon from "@mui/icons-material/Send";
import FirebaseMessageUtils from "../../utils/FirebaseMessageUtils";
import { useSelector } from "react-redux";
import { getDatabase, ref, get, child, push, onValue, onChildAdded } from "firebase/database";


const ChatModal = () => {
  const [chatWith, setChatWith] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const { uid } = useSelector(state=>state.UserSlice);
  const [typedmessage, setTypedMessage] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const chatWithParam = params.get("with");
    if(chatWithParam !== '' && chatWithParam !== null)
        setChatWith(chatWithParam);
  }, []);

  useEffect(()=>{
    async function getmsg(){

      if(chatWith !== '' && chatWith !== null && uid !== null && uid !== '' && uid !== undefined){
        setMessageList(await FirebaseMessageUtils.getMessages(chatWith, uid));
        const path2 = `messages/${chatWith}/${uid}`;  //add observer
        const db = getDatabase();
        const messageref = ref(db, path2);
        onChildAdded(messageref, (snapshot) => {
            const msg = snapshot.val();
            console.log(msg);
            setMessageList(prevMessageList => {
              console.log(prevMessageList);
              return [
                  ...prevMessageList,
                  {
                    message: msg.message,
                      createdAt: new Date(msg.createdAt),
                      isMessageFromMe: false
                  }
              ];
            });
          });
        }
      }
      getmsg();
        
  },[chatWith, uid]);


  const handleSendMessage = () => {
    if(typedmessage !== ''){
        FirebaseMessageUtils.sendMessage(typedmessage, chatWith);
        setMessageList(prevMessageList=>{
          prevMessageList.push({
            message: typedmessage,
            createdAt: new Date().getTime(),
            isMessageFromMe: true
          })
          return prevMessageList;
        })
        setTypedMessage('');
    }
  };

  useEffect(()=>{
    console.log(messageList);
  },[messageList])


  return (
    <div className="h-[99vh] flex flex-col border border-red-500">
      <span className="">chat with : {chatWith}</span>
      <div
        id="messages"
        className="flex flex-1 px-1 flex-col-reverse justify-self-end flex-wrap-reverse"
      >
        <div className="flex w-full mt-2">
          <input
            type="text"
            value={typedmessage}
            onChange={(e)=>setTypedMessage(e.target.value)}
            placeholder="Type Something..."
            className="flex-1 px-1 border border-black"
          />
          <IconButtonMui
            text={"Send"}
            icon={<SendIcon />}
            onClick={handleSendMessage}
          />
        </div>
        <div id="chatcard" className="overflow-y-scroll border border-blue-600 flex-1 " style={{ maxHeight: "calc(99vh - 100px)" }}>
          {
            messageList.map((msg, ind)=>{
              return <span id={ind}><ChatModalCard isMessageFromMe={msg.isMessageFromMe} message={msg.message} key={ind}/></span>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
