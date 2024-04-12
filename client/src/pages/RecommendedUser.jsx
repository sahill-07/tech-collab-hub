import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecommendation, getUserRecommendationForLoggedOutUser } from '../http';
import { setRecommendedUserSlice } from '../store/RecommendedUserSlice';
import RecommendedUserCard from '../components/RecommendeUser/RecommendedUserCard';
import AOS from "aos";
import "aos/dist/aos.css";
import RecommendedUserMode from '../components/RecommendeUser/RecommendedUserMode';
import ProjectCardSkeleton from '../components/Projects/ProjectCardSkeleton';


const RecommendedUser = () => {
    const { email } = useSelector((state)=>state.UserSlice);
    const { recommendUserData } = useSelector((state)=>state.RecommendedUserSlice);
    const [selected, setSelected] = useState(null);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(email !== null && recommendUserData.length === 0){
            getUserRecommendation().then(res=>{
                if(res.status === 200){
                    dispatch(setRecommendedUserSlice(res.data));
                }
            })
        }else {
            getUserRecommendationForLoggedOutUser().then(res=>{
                if(res.status === 200){
                    dispatch(setRecommendedUserSlice(res.data));
                }
            })
        }
    },[email]);
    AOS.init({
        duration: 800,
      });
  return (
    <>
    <div>

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-4 gap-3'>

    {
        recommendUserData !== null && recommendUserData !== undefined && recommendUserData.length > 0 && recommendUserData.map((ele, index)=>{
            return <RecommendedUserCard key={ele._id.toString()} data={ele} index={index} setSelected={setSelected}/>
        }) 
    }
    </div>
    {
        (recommendUserData === null || recommendUserData === undefined || recommendUserData.length === 0) && 
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-4 gap-3'>
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
            <ProjectCardSkeleton/>
            <ProjectCardSkeleton/>
            <ProjectCardSkeleton/>
            <ProjectCardSkeleton/>
            <ProjectCardSkeleton/>
        </div>
    }
    <RecommendedUserMode selected={selected} setSelected={setSelected}/>
    <br/><br/>
    </div>
    </>
  )
}

export default RecommendedUser
