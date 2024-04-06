import React, { useEffect, useState } from "react";
import { postNewUser } from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { setUserSlice } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";
import MyStepper from "../basicComponents/MyStepper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export const SignUp = () => {
  const userslicedata = useSelector((state)=>state.UserSlice);

  const [stepperActiveIndex, setStepperActiveIndex] = useState(0);

  const [userdata, setUserData] = useState({
    email : null,
    username : '',
    githublink : '',
    is_currently_a_student : '',
    curr_semester : '',
    college_name : '',
    area_of_interest : [],
    experience : '',
    preferred_learning_resource : [],
    tech_stack_interest : []

  })


  
  const submitForm = (e)=>{
    // e.preventDefault();
    // if(userName === '' || userName === null){
    //   setErrorMsg('Please Fill the valid Github Link');
    //   setIsError(true);
    //   return ;
    // }
    // if(hashTags.length === 0){
    //   setErrorMsg('Please Add Atleast one Techstack');
    //   setIsError(true);
    //   return ;
    // }
    // let json = {
    //   username : userName,
    //   githublink : githubLink,
    //   tags: hashTags,  
    //   // email : isGoogleSignInDone  
    // };
    // if(isUserAClgStudent === 'true') json = {...json, semester};
    // if(isUserAClgStudent === 'true') json = {...json, collegeName};
    // postNewUser(json).then(res=>{
    //   console.log(res.status);
    //   if(res.status === 200){
    //     dispatch(setUserSlice({isAlreadyAUser : true}));
    //   }
    // })
  }

  
  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-4xl font-semibold">SignUp</h1>
          <p>After SignUp you can see projects</p>
        </div>
        <div className="flex flex-col gap-2">
          <MyStepper allSteps={allSteps} activeIndex={stepperActiveIndex}/>
          {stepperActiveIndex === 0 && <Step1 setStepperActiveIndex={setStepperActiveIndex} userData={userdata} setUserData={setUserData}/>}
          {stepperActiveIndex === 1 && <Step2 setStepperActiveIndex={setStepperActiveIndex} userData={userdata} setUserData={setUserData}/>}
          {stepperActiveIndex === 2 && <Step3 setStepperActiveIndex={setStepperActiveIndex} userData={userdata} setUserData={setUserData}/>}
        </div>
      </div>
    </>
  );
};



const allSteps = [
  'Basic Details',
  'Academic Details',
  'Tech Preference'
]