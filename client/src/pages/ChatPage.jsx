import React, { useEffect, useState } from 'react'
import ChatList from '../components/chat/ChatList'
import ChatModal from '../components/chat/ChatModal'

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  useEffect(()=>{
    console.log(selectedChat);
  },[selectedChat])
  return (
    <div className='grid grid-cols-1 gap-1 md:grid-cols-3'>
      <span className=' h-[99vh]'><ChatList selectedChat={selectedChat} setSelectedChat={setSelectedChat} setSelectedTopic={setSelectedTopic}/></span>
       <span className='col-span-2 flex gap-2'>
       <div class="border-l border-gray-400 h-full w-1 py-2"></div>
        <ChatModal selectedChat={selectedChat} selectedTopic={selectedTopic}/>
        </span>
    </div>
  )
}

export default ChatPage
