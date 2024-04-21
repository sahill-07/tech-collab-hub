import React, { useState, useRef } from 'react'
import { HastTagCards } from '../TagInput/HastTagCards';
import { AnimatePresence, motion } from 'framer-motion';
import './ProjectCardSkeleton.css';
import Skeleton from '@mui/material/Skeleton';

const ProjectCardSkeleton = () => {
  
    return (
      <>
    <div
     className=''>
      <Skeleton variant="rectangular" height={200}/>
      <Skeleton />
      <Skeleton />
      <div className="flex flex-wrap gap-2 mt-2">
        {Array.from({length : 4}, (_, currcol)=>{
          return <Skeleton width={35}/>
        })}
      </div>
      {/* <UserIconAnimatedTooltip contributorsarray={data.contributors} key={`tooltip-key-${data.id}`}/> */}

    </div>
    </>
    )
}

export default ProjectCardSkeleton
