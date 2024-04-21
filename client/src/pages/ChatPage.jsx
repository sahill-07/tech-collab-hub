import React from 'react'
import ChatList from '../components/chat/ChatList'
import ChatModal from '../components/chat/ChatModal'

const ChatPage = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
      <span className='border border-black h-[99vh]'><ChatList/></span>
      <span className='border border-red-600 col-span-2'><ChatModal/></span>
    </div>
  )
}

export default ChatPage
