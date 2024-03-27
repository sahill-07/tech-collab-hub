import React, { useEffect, useState } from 'react'
import { MdLibraryAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import { ProjectList } from '../components/Projects/ProjectList';
import { Filters } from '../components/Projects/Filters';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

export const Projects = () => {
  const { email } = useSelector((state)=>state.UserSlice);
  // const { recommendUserData } = useSelector((state)=>state.ProjectSlice);
  const dispatch = useDispatch();
  useEffect(()=>{

  },[email])
  return (
    <>
    <div className='flex gap-3 flex-col mx-3'>
      
      {/* <Filters/> */}
      <ProjectList/>
    </div>
    </>
  )
}
