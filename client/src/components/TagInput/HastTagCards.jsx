import React, { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export const HastTagCards = ({hashTag, hashTags, setHashTags, forDisplay, keys}) => {
  const removeTag = (e) => {
    e.preventDefault();
    let newArray = hashTags;
    newArray.splice(keys, 1);
    setHashTags([...newArray]);
  };

  

  return (
    <>
       <div className="flex flex-row gap-1 bg-blue-500 text-white max-w-fit px-2 rounded-lg">
        <h1 className="break-all text-base"> {hashTag} </h1>
        <button onClick={removeTag} className={`${forDisplay ? 'hidden':'block'}`}>
          <div className={`flex flex-col content-center justify-center`}>
            <AiFillCloseCircle />
          </div>
        </button>
      </div>
    </>
  );
};

HastTagCards.defaultProps = {
  forDisplay: false
}

export default HastTagCards;