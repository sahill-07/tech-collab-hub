import React, { useState } from 'react'
import { motion } from 'framer-motion';

const UserIconAnimatedTooltip = ({usernamearray, key}) => {
  const [selected, setSelected] = useState(null);

    if(usernamearray === null || !Array.isArray(usernamearray) || usernamearray.length === 0)
        return <></>
  return (
    <div className='relative'>
    <div className='flex -space-x-4 rtl:space-x-reverse cursor-pointer'>
        {
            usernamearray.map((name, index)=>{
                return <SingleUser uname={name} key={`${key}-${index}`} selected={selected} setSelected={setSelected}/>
            })
        }  
    </div>
    </div>
  )
}

const SingleUser = ({uname, key, selected, setSelected}) => {

    
    const handleHover = ()=>{
      setSelected(uname);
    }
    const handleLeave = ()=>{
      if(selected === uname) setSelected(null);
    }
    return (
        <>
        <div className='relative'>

    {selected !== null && selected === uname && <ToolTip selected={selected} uname={uname} key={key}/>}
        <motion.div
        whileHover={{
            scale : 1.025,
            transition : {
              duration : 0.2
            },
            z : 20
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          layoutId={`usertooltip-${key}`}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        className="z-10 w-10 h-10 border-2 border-white bg-slate-300 flex justify-center items-center rounded-full dark:border-gray-800" >{uname[0]}</motion.div>
        </div>

        </>

    )
}

const ToolTip = ({selected, uname, key}) =>{
    return (
        <motion.div 
        className="bg-white cursor-pointer flex max-w-fit max-h-fit absolute -top-5"
        initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        // layoutId={`${selected}`}
        layoutId={`usertooltip-${key}`}

        >
            {selected}
        </motion.div>
    )
}

export default UserIconAnimatedTooltip
