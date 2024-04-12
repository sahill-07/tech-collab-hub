import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProjectCard } from '../components/Projects/ProjectCard';
import AOS from "aos";
import "aos/dist/aos.css";
import '../components/Projects/ProjectCardSkeleton.css'
import ProjectCardSkeleton from '../components/Projects/ProjectCardSkeleton';
import ProjectModal from '../components/Projects/ProjectModal';
import { getProjectList } from '../http';
import { setprojecListSlice } from '../store/ProjectSlice';
import basicUtils from '../utils/basicUtils';
import MultipleInputAutocomplete from '../components/basicComponents/TextBox/MultipleInputAutocomplete';
import { store } from '../store';
import ProjectUtils from '../utils/ProjectUtils';

export const Projects = () => {
  const dispatch = useDispatch();
  const projectlist = useSelector((state)=>state.ProjectSlice);
  const [localProjectList, setLocalProjectList] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const userSlicedata = useSelector((state)=>state.UserSlice)

  const [selected, setSelected] = useState(null);
  const [columns, setColumns] = useState(4);
  useEffect(()=>{
    ProjectUtils.fetchProjects();
  },[userSlicedata]) 

  useEffect(()=>{
    setLocalProjectList(projectlist.projects);
    // getFilterOptions
    setFilterOptions(basicUtils.getFilters(projectlist.projects))

  }, [projectlist])

  useEffect(() => {
    const handleResize = () => {
      setColumns(basicUtils.getNumberOfColumns(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run only once on component mount

  useEffect(()=>{
    setLocalProjectList(basicUtils.filterProjectList(projectlist.projects, selectedOptions))
  },[selectedOptions])

  AOS.init({
    offset: 20
  })
  return (
    <>
    <div className={`${localProjectList === 0 ? 'cursor-progress':''}`}>
      <div className='flex justify-center mb-4'>
        <MultipleInputAutocomplete options={filterOptions} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} label={'Filters'} placeholder={'E.g. Javscript'}/>
      </div>
      {
        localProjectList.length > 0 && <div data-aos="zoom-in" className=' gap-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:mx-2 lg:mx-3 xl:mx-4 mx-1'>
            {
              Array.from({length : columns}, (_, currcol)=>{
                return (<div className={` flex flex-col gap-4  ${currcol%2 === 0 ? 'evenColumnsofproject':'oddColumnsofproject'}`}>
                  {
                    basicUtils.getCurrentColElement(localProjectList, currcol, columns).map((proj, ind)=>{
                      return <ProjectCard data={proj} key={proj._id} setSelected={setSelected}/>
                    })
                  }
                </div>)
              })
            }
          </div>
        </div>
      }
      {projectlist.projects.length === 0 && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:mx-2 lg:mx-3 xl:mx-4 mx-1'>
        
        <ProjectCardSkeleton/>
        <ProjectCardSkeleton/>
        <ProjectCardSkeleton/>
        <ProjectCardSkeleton/>
        <ProjectCardSkeleton/>
        <ProjectCardSkeleton/>
        <ProjectCardSkeleton/>
        <ProjectCardSkeleton/>
        <ProjectCardSkeleton/>
        <ProjectCardSkeleton/>
        <ProjectCardSkeleton/>
        <ProjectCardSkeleton/>
        <ProjectCardSkeleton/>
      </div>}
      <br/>
      <ProjectModal selected={selected} setSelected={setSelected}/>
    </div>
    </>
  )
}
