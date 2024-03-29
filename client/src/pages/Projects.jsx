import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ProjectCard } from '../components/Projects/ProjectCard';
import AOS from "aos";
import "aos/dist/aos.css";
import ProjectCardSkeleton from '../components/Projects/ProjectCardSkeleton';

export const Projects = () => {
  const projectlist = useSelector((state)=>state.ProjectSlice);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{

  },[projectlist])

  AOS.init({
    offset: 20
  })
  return (
    <>
    <div className={`flex gap-3 flex-col mx-3 ${isLoading ? 'cursor-progress':''}`}>
      {
        !isLoading && <div data-aos="zoom-in" className='p-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-2  place-items-center'>
          {
            projectlist.length > 0 && projectlist.map((proj, ind)=>{
              return <ProjectCard data={proj} key={ind}/>
            })
          }
        </div>
      }
      {
        isLoading && <div className='flex gap-2 flex-wrap'>
          {/* <ProjectCardSkeleton/> */}
          {/* <ProjectCardSkeleton/> */}
          <ProjectCardSkeleton/>
        </div>
      }
      <br/>
    </div>
    </>
  )
}
