import React, { useEffect, useRef, useState } from "react";
import ChatModalCard from "./ChatModalCard";
import IconButtonMui from "../basicComponents/Button/IconButtonMui";
import FirebaseMessageUtils from "../../utils/FirebaseMessageUtils";
import { useSelector } from "react-redux";
import { getDatabase, ref, off, onChildAdded } from "firebase/database";
import avatarData from "../../data/Avatars.json";
import { addToChatListApi, addToGroupChatListApi } from "../../http";
import { IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


const ChatModal = ({selectedChat}) => {
  const [chatWith, setChatWith] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const { uid } = useSelector(state=>state.UserSlice);
  const [typedmessage, setTypedMessage] = useState('');
  const [listeners, setListeners] = useState([]);
  // const [path, setPath] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const chatWithParam = params.get("with");
    const topicParam = params.get("topic");
    if(chatWithParam !== '' && chatWithParam !== null && selectedChat === null){
      setChatWith({
        type : 'one-one_msg',
        uid : chatWithParam
      })
    }else if(topicParam !== '' && topicParam !== null){
      setChatWith({
        type : "groupmessage",
        topic : topicParam
      })
    }
  }, []);

  useEffect(()=>{
    if(selectedChat !== null){
      setChatWith(selectedChat);
    }
  },[selectedChat])


  useEffect(()=>{
    async function getmsg(){
      console.log(chatWith);
      if(chatWith !== '' && chatWith !== null && uid !== null && uid !== '' && uid !== undefined){
        // setMessageList(await FirebaseMessageUtils.getMessages(chatWith, uid));
        setMessageList([]);
        console.log(chatWith);
        let path2 = FirebaseMessageUtils.generatePath(chatWith);
        console.log(path2);
        const db = getDatabase();
        const messageref = ref(db, path2);
        for(const lis of listeners){
          off(ref(db, lis))
        }
        setListeners([]);
        setListeners(listeners=>{
          listeners.push(path2);
          return listeners;
        })
        onChildAdded(messageref, (snapshot) => {
            const msg = snapshot.val();
            console.log(msg);
            setMessageList(prevMessageList => {
              const currdata = {
                message: msg.message,
                createdAt: msg.createdAt,
                senderuid: msg.senderuid 
              }
              return FirebaseMessageUtils.addIfNotDuplicate(prevMessageList, currdata);
            });
          });
          
          if(messageList.length === 0){
            if(chatWith.type === 'groupmessage'){
              addToGroupChatListApi(chatWith.topic)
            }else{ //one to one chat
              addToChatListApi(chatWith.uid); // to add server route
            }
          }
        }

      }
      getmsg();
        
  },[chatWith, uid]);


  const handleSendMessage = () => {
    if(typedmessage !== ''){
        const timestamp = new Date().getTime();
        FirebaseMessageUtils.sendMessage(typedmessage, uid, timestamp, FirebaseMessageUtils.generatePath(chatWith));
        setMessageList(prevMessageList=>{
          const currdata = {
            message: typedmessage,
            createdAt: timestamp,
            senderuid: uid
          }
          return FirebaseMessageUtils.addIfNotDuplicate(prevMessageList, currdata);
        })
        setTypedMessage('');
    }
  };

  useEffect(()=>{
    return () => {
      for(const lis of listeners)
        off(ref(getDatabase(), lis))
    };
  },[])

  const getHeading = ()=>{
    if(chatWith === null){
      return ''
    }else if(chatWith.type === 'groupmessage')
      return chatWith.topic;
    else 
      return chatWith.username
  }

  const getSubtitle = ()=>{
    if(chatWith === null)
      return '';
    else if(chatWith.type === 'groupmessage')
      return 'Group Message';
    else 
      return 'Personal Chat'
  }

  const getIcon = ()=>{
    if(chatWith === null || chatWith.icon === undefined || chatWith.icon === null){
      return avatarData.group[0];
    }else {
      return chatWith.icon
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  if(chatWith === null || chatWith === undefined)
    return <></>
  return (
    <div className="h-[99vh] flex flex-col w-full shadow-md">
      <div className="shadow-lg gap-1 p-3 flex items-center text-xl">
        <div className="avatar">
          <div className="w-12 rounded-full border">
            <img src={getIcon()}/>
          </div>
        </div>
        <div>
          <p className="">{getHeading()}</p>
          <p className="text-sm -mt-1">{getSubtitle()}</p>
        </div>
      </div>
      <div
        id="messages"
        className="flex flex-1 px-1 flex-col-reverse justify-self-end flex-wrap-reverse"
      >
        <div className="flex w-full mt-2">
        <TextField
          required
          fullWidth
          placeholder="Type Something..."
          id="filled-required"
          value={typedmessage}
          onChange={(e)=>setTypedMessage(e.target.value)}
          label="Message"
          onKeyPress={handleKeyPress}
          defaultValue="Hello World"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            ),
          }}
        />

        </div>
        <div id="chatcard" className="overflow-y-scroll flex-1 " style={{ maxHeight: "calc(99vh - 201px)" }}>
          {
            messageList.map((msg, ind)=>{
              return <ChatModalCard isMessageFromMe={uid===msg.senderuid} message={msg.message} key={ind}/>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
