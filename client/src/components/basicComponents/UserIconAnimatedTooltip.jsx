import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

const UserIconAnimatedTooltip = ({usernamearray, keya}) => {
  const [selected, setSelected] = useState(null);
  useEffect(()=>{
    console.log(keya);
  },[])

    if(usernamearray === null || !Array.isArray(usernamearray) || usernamearray.length === 0)
        return <></>
  return (
    <div className='relative'>
    <div className='flex -space-x-4 rtl:space-x-reverse cursor-pointer max-w-fit'  onMouseLeave={()=>setSelected(null)}>
        {
            usernamearray.map((name, index)=>{
                return <SingleUser uname={name} key={`${keya}-${index}`} keya={`${keya}-${index}`} selected={selected} setSelected={setSelected}/>
            })
        }  
    </div>
    </div>
  )
}

const SingleUser = ({uname, keya, selected, setSelected}) => {

    
    const handleHover = ()=>{
      setSelected(uname);
    }
    return (
        <>
        <div className='relative'>

    {selected !== null && selected === uname && <ToolTip selected={selected} uname={uname} key={keya} keya={keya}/>}
        <motion.div
        layoutId={`usertooltip-${keya}`}
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
          onMouseEnter={handleHover}
        className="z-10 w-10 h-10 border-2 border-white bg-slate-300 flex justify-center items-center rounded-full dark:border-gray-800" >{uname[0]}
        </motion.div>
        </div>

        </>

    )
}

const ToolTip = ({selected, uname, keya}) =>{
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
        layoutId={`usertooltip-${keya}`}

        >
            {selected}
        </motion.div>
    )
}

export default UserIconAnimatedTooltip
