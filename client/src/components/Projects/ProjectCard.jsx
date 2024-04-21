import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import UserIconAnimatedTooltip from '../basicComponents/UserIconAnimatedTooltip'
import basicUtils from '../../utils/basicUtils'
import { Typography } from '@mui/material'


export const ProjectCard = ({data, setSelected}) => {

  return (
    <>
    <motion.div
      whileHover={{
        scale: 1.025,
        transition : {
          duration : 0.2
        }
      }}
      onClick={()=>{
          setSelected(data)
      }}
     className=''>
      <motion.img 
        src={data.project_icon}
        whileHover={{
          scale : 1.025,
          transition : {
            duration : 0.2
          }
        }}
        whileTap={{
          scale : 0.95
        }}
        
        layoutId={`card-${data._id}`}
        className='w-full h-[60%] bg-base-100 shadow-xl image-full cursor-pointer mb-1'
      />
      <Typography variant='h5'>{basicUtils.formatGithubRepoName(data.repo_name)}</Typography>
      <h1 className='line-clamp-2'>{data.description}</h1>
      <div className="flex flex-wrap mt-2">
        {data.languages.map((tag)=>{
          return <div className='badge bg-base-300 border-none text-zinc-600 mr-1 mb-1' key={tag}>{tag}</div>
        })}
      </div>
      <UserIconAnimatedTooltip contributorsarray={data.contributors} key={`tooltip-key-${data.id}`}/>

    </motion.div>
    </>
  )
}