import React, { useEffect, useState } from 'react'
import { getFreindList } from '../../http'
import ChatListCard from './ChatListCard';
import { useSelector } from 'react-redux';
import GroupChatList from './GroupChatList';

const ChatList = ({setSelectedChat}) => {
  const [freindList, setFreindList] = useState([]);
  const [groupChatList, setGroupChatList] = useState([]);
  const userdetails = useSelector(state=>state.UserSlice);
  useEffect(()=>{
    if(userdetails.token !== null && userdetails.token !== ''){
      getFreindList().then(res=>{
        console.log(res);
        if(res.status === 200){
          setFreindList(res.data.freinds);
          setGroupChatList(res.data.groupchat);
        }
      })


    }
  },[userdetails])
  return (
    <div className='flex gap-2 flex-col w-full'>
      {
        freindList.map((freind, index)=>{
          return <ChatListCard data={freind} key={freind.uid} setSelectedChat={setSelectedChat} index={index}/>
        })
      }
      <h5>Group Chat</h5>
      {
        groupChatList.map((data, index)=>{
          return <GroupChatList data={data} key={index} setSelectedChat={setSelectedChat}/>
        })
      }
    </div>
  )
}

export default ChatList
