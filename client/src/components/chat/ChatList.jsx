import React, { useEffect, useState } from 'react'
import { getFreindList } from '../../http'
import ChatListCard from './ChatListCard';
import { useSelector } from 'react-redux';

const ChatList = ({setSelectedChat}) => {
  const [freindList, setFreindList] = useState([]);
  const userdetails = useSelector(state=>state.UserSlice);
  useEffect(()=>{
    if(userdetails.token !== null && userdetails.token !== ''){
      getFreindList().then(res=>{
        console.log(res);
        if(res.status === 200){
          setFreindList(res.data);
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
    </div>
  )
}

export default ChatList
