import React, { useEffect, useState } from "react";
import { getFreindList } from "../../http";
import ChatListCard from "./ChatListCard";
import { useSelector } from "react-redux";
import GroupChatList from "./GroupChatList";
import Typography from "@mui/material/Typography";

const ChatList = ({ setSelectedChat, selectedChat }) => {
  const [freindList, setFreindList] = useState([]);
  const [groupChatList, setGroupChatList] = useState([]);
  const userdetails = useSelector((state) => state.UserSlice);
  useEffect(() => {
    if (userdetails.token !== null && userdetails.token !== "") {
      getFreindList().then((res) => {
        console.log(res);
        if (res.status === 200) {
          setFreindList(res.data.freinds);
          setGroupChatList(res.data.groupchat);
        }
      });
    }
  }, [userdetails]);
  return (
    <>
      <div className="flex gap-1 flex-col w-full">
        <Typography className="mt-1 text-center" variant="h6" gutterBottom>
          Chat List
        </Typography>
        {freindList.map((freind, index) => {
          return (
            <ChatListCard
              data={freind}
              key={freind.uid}
              setSelectedChat={setSelectedChat}
              selectedChat={selectedChat}
              index={index}
            />
          );
        })}
        {groupChatList.map((data, index) => {
          return (
            <GroupChatList
              data={data}
              key={index}
              index={index}
              setSelectedChat={setSelectedChat}
            />
          );
        })}
      </div>
    </>
  );
};

export default ChatList;
