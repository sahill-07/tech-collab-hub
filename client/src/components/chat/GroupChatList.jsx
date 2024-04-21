import React, { useEffect } from 'react'
import avatarData from "../../data/Avatars.json";
import Typography from "@mui/material/Typography";

const GroupChatList = ({data, setSelectedChat, index}) => {
    const handleClick = ()=>{
        setSelectedChat({
          topic : data,
          type : 'groupmessage',
          icon : avatarData.group[index%avatarData.group.length]
        });
    }
    useEffect(()=>{
        console.log(data);
    })
  return (
     <div onClick={handleClick} className='flex gap-1 items-center border hover:bg-gray-200 p-1 rounded-xl'>
     <div className="avatar">
       <div className="w-12 rounded-full">
         <img src={avatarData.group[index%avatarData.group.length]}/>
       </div>
     </div>
     <div>
      <div className='flex flex-col gap-0'>
        <h5 className='text-lg'>{data}</h5>
        <p className='text-gray-500 -mt-1'>Group Chat</p>
      </div>
     </div>
   </div>
  )
}

export default GroupChatList
