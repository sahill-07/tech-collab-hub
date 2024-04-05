import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

const UserIconAnimatedTooltip = ({ contributorsarray }) => {
  const [selected, setSelected] = useState(null);

  if (
    contributorsarray === null ||
    !Array.isArray(contributorsarray) ||
    contributorsarray.length === 0
  )
    return <></>;
  return (
    <div className="relative">
      <div
        className="flex -space-x-4 rtl:space-x-reverse cursor-pointer max-w-fit"
        onMouseLeave={() => setSelected(null)}
      >
        {contributorsarray.map((contributor, index) => {
          return (
            <SingleUser
              contributor={contributor}
              key={`tooltipabcd-${index}`}
              index={index}
              selected={selected}
              setSelected={setSelected}
            />
          );
        })}
      </div>
    </div>
  );
};

const SingleUser = ({ contributor, index, selected, setSelected }) => {
  const handleHover = () => {
    setSelected({
      index: index,
      contributor,
    });
  };

  const handleOnclick = () => {
    window.open(contributor, "_blank");
  };
  return (
    <>
      <div onClick={handleOnclick}>
        {selected !== null && selected.index === index && (
          <ToolTip selected={selected} key={`tooltipabce-${index}`} />
        )}
        <motion.div
          whileHover={{
            scale: 1.025,
            transition: {
              duration: 0.2,
            },
            z: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          onMouseEnter={handleHover}
          className="hover:underline z-10 w-10 h-10 border-2 border-white bg-slate-300 flex justify-center items-center rounded-full dark:border-gray-800"
        >
          <Typography variant="subtitle2">{contributor.split("github.com/")[1].toUpperCase()[0]}</Typography>

        </motion.div>
      </div>
    </>
  );
};

const ToolTip = ({ selected }) => {
  return (
    <motion.p
      className="bg-white cursor-pointer absolute -top-5 inline-block px-3 py-1 shadow-lg border rounded-md"
      initial={{
        opacity: 0,
        y: 20,
        rotateZ: -45,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateZ: 0,
        margin: -3,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <Typography variant="caption">
        {selected.contributor.split("github.com/")[1]}
      </Typography>
    </motion.p>
  );
};

export default UserIconAnimatedTooltip;
