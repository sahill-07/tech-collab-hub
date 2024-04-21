import React from 'react'
import avatarData from "../../data/Avatars.json";


const ChatListCard = ({data, setSelectedChat, index, selectedChat}) => {
    const handleClick = ()=>{
        console.log(data.uid);
        setSelectedChat({
          uid : data.uid,
          type : 'one-one_msg',
          username : data.username,
          icon : avatarData.male[index%avatarData.male.length]
        });
    }
    const isCurrentSelected = ()=>{
      if(selectedChat === null || selectedChat === undefined) return false;
      if(selectedChat.type === 'one-one_msg' && selectedChat.uid === data.uid)
        return true;
      return false;
    }
  return (
    <div onClick={handleClick} className={`flex gap-1 items-center border ${isCurrentSelected() ? 'bg-black text-white hover:bg-gray-500':''} hover:bg-gray-200 p-1 rounded-xl`}>
      <div className="avatar">
        <div className="w-12 rounded-full">
          <img src={avatarData.male[index%avatarData.male.length]}/>
        </div>
      </div>
      <div>
      <div className='flex flex-col gap-0'>
        <h5 className='text-lg'>{data.username}</h5>
        <p className={`${isCurrentSelected() ? 'text-white hover:text-gray-300':'text-gray-500'} -mt-1`}>Personal Chat</p>
      </div>
      </div>
    </div>
  )
}

export default ChatListCard
