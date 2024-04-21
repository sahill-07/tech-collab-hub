import React, { useEffect, useRef } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { RxAvatar } from "react-icons/rx";

const ChatModalCard = ({ avatar, message, isMessageFromMe }) => {
  const ref = useRef();
  useEffect(()=>{
    if(ref.current){
      console.log(ref.current);
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  },[])
  return (
    <div ref={ref} className={`chat ${isMessageFromMe ? "chat-end" : "chat-start"} max-h-fit`}>
      {!isMessageFromMe && (
        <div>
          {avatar === null ? (
            <AccountCircleIcon sx={{ height: 40, width: 40 }} />
          ) : (
            <div className="avatar online">
              <div className="w-24 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          )}
        </div>
      )}
      <div className="chat-bubble">{message}</div>
    </div>
  );
};

ChatModalCard.defaultProps = {
  avatar: null,
};

export default ChatModalCard;
