import React from "react";
import { motion } from "framer-motion";
import avatarData from "../../data/Avatars.json";
import GitHubIcon from "@mui/icons-material/GitHub";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ChatIcon from "@mui/icons-material/Chat";
import IconButtonMui from "../basicComponents/Button/IconButtonMui";
import Typography from "@mui/material/Typography";
import ConstructionIcon from '@mui/icons-material/Construction';
import CodeIcon from '@mui/icons-material/Code';
import { useNavigate } from "react-router-dom";

const RecommendedUserMode = ({ selected, setSelected }) => {
  const navigate = useNavigate();
  const handleGithubClick = () => {
    window.open(selected.githublink);
  };
  const addToSavedList = () => {

  };

  const openChat = () => {
    // console.log(selected.uid);
    navigate(`/chat?with=${selected.uid}`)
  };
  if (selected === null) {
    return <></>;
  }
  return (
    <div
      onClick={() => setSelected(null)}
      className="fixed inset-0 bg-black/50 z-50 cursor-pointer overflow-y-scroll"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl mx-auto my-8 px-8 cursor-default"
      >
        <motion.div
          className="bg-white w-full flex justify-center"
          layoutId={`recommended-user-card-${selected._id.toString()}`}
        >
          <img
            src={selected.img}
            alt={selected.repo_name}
            className="h-auto w-full"
          />
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="bg-white p-4 flex flex-col"
        >
          <Typography variant="h3" gutterBottom sx={{ margin: 0, padding: 0 }}>
            {selected.username}
          </Typography>

            <Typography variant="h6" gutterBottom sx={{ margin: 0, padding: 0 }}>
                {selected.college_name}
            </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ margin: 0, padding: 0 }}>
            {selected.curr_semester}
          </Typography>

          <div className="flex gap-1 flex-wrap">
          {selected.area_of_interest.map((interest) => {
              return (
                  <div
                  className="badge bg-base-300 border-none text-zinc-600 mr-1 mb-1"
                  key={interest}
                  >
                {interest}
              </div>
            );
        })}
        </div>

          <div className="flex gap-1 flex-wrap">
          {selected.tech_stack_interest.map((tech) => {
              return (
                  <div
                  className="badge bg-base-300 border-none text-zinc-600 mr-1 mb-1 flex justify-center px-2 py-1 gap-1 items-center"
                  key={tech}
                  >
                    <span className="flex items-center"><CodeIcon/>{tech}</span>
              </div>
            );
        })}
        </div>
          <div className="flex gap-1 flex-wrap">
          {selected.experience.map((exp) => {
              return (
                  <div
                  className="badge bg-base-300 border-none text-zinc-600 mr-1 mb-1 flex justify-center px-2 py-1 items-center"
                  key={exp}
                  >
                    <span className="flex items-center"><ConstructionIcon/>{exp}</span>
                
              </div>
            );
        })}
        </div>

        <div className='mt-1 gap-2 flex flex-wrap flex-row'>
            <IconButtonMui icon={<GitHubIcon/>} text={'Github'} onClick={handleGithubClick}/>
            <IconButtonMui icon={<ChatIcon/>} text={'Chat'} onClick={openChat}/>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default RecommendedUserMode;
