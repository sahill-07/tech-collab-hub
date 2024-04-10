import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecommendation } from '../http';
import { setRecommendedUserSlice } from '../store/RecommendedUserSlice';
import RecommendedUserCard from '../components/RecommendeUser/RecommendedUserCard';


const RecommendedUser = () => {
    const { email } = useSelector((state)=>state.UserSlice);
    const { recommendUserData } = useSelector((state)=>state.RecommendedUserSlice);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(email !== null && recommendUserData.length === 0){
            getUserRecommendation().then(res=>{
                if(res.status === 200){
                    dispatch(setRecommendedUserSlice(res.data));
                }
            })
        }
    },[email]);
  return (
    <>
    <div className='flex gap-2 flex-row mx-1 md:mx-3'>

    {
        recommendUserData.length > 0 && recommendUserData.map((ele, index)=>{
            return <RecommendedUserCard data={ele}/>
        }) 
    }
    </div>
    </>
  )
}

export default RecommendedUser
