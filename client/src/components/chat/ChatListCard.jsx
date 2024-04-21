import React from 'react'

const ChatListCard = ({data, setSelectedChat, index}) => {
    const handleClick = ()=>{
        console.log(data.uid);
        setSelectedChat({
          uid : data.uid,
          type : 'one-one_msg'
        });
    }
  return (
    <div onClick={handleClick}>
      <button className='hover:text-white hover:bg-blue-700 border border-black p-2 w-full'>{data.username}</button>
    </div>
  )
}

export default ChatListCard
