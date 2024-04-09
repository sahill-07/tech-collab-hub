import React, { useEffect, useState } from "react";
import { postNewUser } from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { setUserSlice } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";
import MyStepper from "../basicComponents/MyStepper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithRedirect } from 'firebase/auth';
import { setBasicUtilsSlice } from "../../store/BasicUtilsSlice";


export const SignUp = () => {
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const userslicedata = useSelector((state)=>state.UserSlice);
  const [token, setToken] = useState(null);

  const [stepperActiveIndex, setStepperActiveIndex] = useState(0);

  const [userdata, setUserData] = useState({
    email : null,
    username : '',
    githublink : '',
    is_currently_a_student : '',
    curr_semester : '',
    college_name : '',
    area_of_interest : [],
    experience : [],
    preferred_learning_resource : [],
    tech_stack_interest : [],
  })

  useEffect(()=>{
    dispatch(setBasicUtilsSlice({
      progress_loading : {
        percent : 20,
        maxpercent : 100,
        message : "Checking Google Sign-In Status..."
      }
    }))
    var auth =  getAuth();
    onAuthStateChanged(auth, async(user)=>{
      dispatch(setBasicUtilsSlice({}))
      if(user === null){
        signInWithRedirect(auth, provider)
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          dispatch(setBasicUtilsSlice({
            snackbar : {
              msg : errorMessage,
              severity : 'error'
            }
          }))
        });
      }else{
        console.log(user);
        setToken(user.accessToken);
      }
    })
  },[])


  
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
          {stepperActiveIndex === 2 && <Step3 setStepperActiveIndex={setStepperActiveIndex} userData={userdata} setUserData={setUserData} token={token}/>}
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