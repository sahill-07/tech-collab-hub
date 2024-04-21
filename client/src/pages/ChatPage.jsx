import React, { useEffect, useState } from 'react'
import ChatList from '../components/chat/ChatList'
import ChatModal from '../components/chat/ChatModal'

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  useEffect(()=>{
    console.log(selectedChat);
  },[selectedChat])
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
      <span className='border border-black h-[99vh]'><ChatList setSelectedChat={setSelectedChat}/></span>
       <span className='border border-red-600 col-span-2'><ChatModal selectedChat={selectedChat}/></span>
    </div>
  )
}

export default ChatPage
