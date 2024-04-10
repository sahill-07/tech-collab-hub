import React, { useEffect } from "react";
import avatarData from "../../data/Avatars.json";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";

const RecommendedUserCard = ({ data, index, setSelected }) => {
  const handleDivClick = ()=>{
    setSelected({
      ...data,
      img : avatarData.male[index%avatarData.male.length]
    });
    console.log(data);
  }
  return (
    <motion.div
      whileHover={{
        scale: 1.028,
        transition: {
          duration: 0.1,
        },
      }}
      onClick={handleDivClick}
      data-aos="flip-right"
      className="justify-center flex flex-col items-center relative rounded-xl"
    >
      <motion.div
          layoutId={`recommended-user-card-${data._id.toString()}`}
          className="relative overflow-hidden min-w-full flex justify-center">
        <motion.img
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          src={avatarData.male[index%avatarData.male.length]}
          alt=""
          className="w-52 h-52 rounded-xl z-10 shadow-xl"
        />
        <div className="absolute top-1/2 min-w-full text-slate-100 bg-slate-100 rounded-t-xl">
          <div className="w-[1000px] h-[2000px] rounded-t-xl"></div>
        </div>
      </motion.div>
      <div className="bg-slate-100 min-w-full flex justify-center flex-col items-center text-center p-2 rounded-b-xl">
        <Typography variant="h6" gutterBottom sx={{ margin: 0, padding: 0 }}>
          {data.username}
        </Typography>
        <p>
          {data.college_name}
          <br />
          {data.area_of_interest.join(", ")}
        </p>
        {/* <p>Interested in {data.area_of_interest.join(', ')}</p> */}
      </div>
    </motion.div>
  );
};

export default RecommendedUserCard;
