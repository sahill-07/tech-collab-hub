import React, { useEffect } from 'react'

const GroupChatList = ({data, setSelectedChat}) => {
    const handleClick = ()=>{
        setSelectedChat({
          topic : data,
          type : 'groupmessage'
        });
    }
    useEffect(()=>{
        console.log(data);
    })
  return (
    <div onClick={handleClick}>
      <button className='hover:text-white hover:bg-blue-700 border border-black p-2 w-full'>{data}</button>
    </div>
  )
}

export default GroupChatList
