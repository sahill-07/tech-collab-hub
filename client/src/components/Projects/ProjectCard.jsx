import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import UserIconAnimatedTooltip from '../basicComponents/UserIconAnimatedTooltip'


export const ProjectCard = ({data, setSelected}) => {

  return (
    <>
    <div className='inline-block w-full mb-4'>
      <motion.img 
        src={data.url}
        whileHover={{
          scale : 1.025,
          transition : {
            duration : 0.2
          }
        }}
        whileTap={{
          scale : 0.95
        }}
        onClick={()=>{
          setSelected(data)
        }}
        layoutId={`card-${data.id}`}
        className='w-full bg-base-100 shadow-xl image-full cursor-pointer'
      />
      <h1>{data.title}</h1>
      <h1 className='line-clamp-2'>{data.description}</h1>
      <div className="flex flex-wrap mt-2">
        {data.tags.map((tag)=>{
          return <div className='badge bg-base-300 border-none text-zinc-600 mr-1 mb-1' key={tag}>{tag}</div>
        })}
      </div>
      <UserIconAnimatedTooltip usernamearray={data.tags} key={`tooltip-key-${data.id}`} keya={`tooltip-key-${data.id}`}/>

    </div>
    </>
  )
}