import React, { useEffect, useState } from "react";
import { CgUser } from "react-icons/cg";
import { FaGithubSquare } from 'react-icons/fa'
import { MySnackbar } from "../MySnackbar";
import MyTextField from "../basicComponents/TextBox/MyTextField";
import HalfIconHalfButton from "../basicComponents/Button/HalfIconHalfButton";
import { IoMdLogIn } from "react-icons/io";
import MyRadioGroup from '../basicComponents/MyRadioGroup'
import MySelectBox from "../basicComponents/TextBox/MySelectBox";
import SignInWithGoogle from "../basicComponents/Button/SignInWithGoogle";
import { Typography } from "@mui/material";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { getUserDetails, postNewUser } from "../../http";
import AddTagInput from '../TagInput/AddTagInput'
import HastTagCards from "../TagInput/HastTagCards";
import { FaUniversity } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUserSlice } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userslicedata = useSelector((state)=>state.UserSlice);

  const [isAlreadyAUser, setIsAlreadyAUser] = useState(true);
  const [isGoogleSignInDone, setIsGoogleSignInDone] = useState(false);

  const [collegeName, setCollegeName] = useState('');

  const [hashTags, setHashTags] = useState([]);

  const [githubLink, setGithubLink] = useState('');
  const [isErrorInGithubLink, setIsErrorInGithubLink] = useState(false);
  const messageForWrongGithubLink = "Please enter a valid GitHub repository URL";

  const radioGroupOptions = [
    {label : "Yes", value : true},
    {label : "No", value : false},
  ]
  const radioGroupTitle = "Are you a degree student ?";
  const [isUserAClgStudent, setIsUserAClgStudent] = useState(false);

  const semesterSelectOptions = [
    {label : "Semester 1", value : "computerEngineeringSemester1"},
    {label : "Semester 2", value : "computerEngineeringSemester2"},
    {label : "Semester 3", value : "computerEngineeringSemester3"},
    {label : "Semester 4", value : "computerEngineeringSemester4"},
    {label : "Semester 5", value : "computerEngineeringSemester5"},
    {label : "Semester 6", value : "computerEngineeringSemester6"},
    {label : "Semester 7", value : "computerEngineeringSemester7"},
    {label : "Semester 8", value : "computerEngineeringSemester8"}
  ]
  const selectSemesterLabel = 'College Semester'
  const [semester, setSemester] = useState('');

  const [userName, setUserName] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Something went wrong');

  useEffect(()=>{
    const urlRegex = /^https?:\/\/(?:www\.)?github\.com\/.*[^\/]$/;;
    if(urlRegex.test(githubLink) || githubLink === ''){
      setIsErrorInGithubLink(false);
      const username_ = githubLink.split('.com/')[1];
      setUserName(username_);
    }else {
      setIsErrorInGithubLink(true);
      setUserName('');
    }
  },[githubLink])

  useEffect(()=>{
    if(isGoogleSignInDone !== false){
      dispatch(setUserSlice({isloggedIn : true}));
      getUserDetails().then(res=>{
        if(res.status === 200){
          console.log(res.data);
          if(res.data !== null) {
            dispatch(setUserSlice({isAlreadyAUser : true}));
            dispatch(setUserSlice(res.data));
            setIsAlreadyAUser(true);
            // console.log('done');
            
          }
          else {
            setIsAlreadyAUser(false);
            dispatch(setUserSlice({isAlreadyAUser : false}))
          }
        }else {
          console.error(res)
        }
      })
    }else {
      dispatch(setUserSlice({isloggedIn : false}))
    }
  },[isGoogleSignInDone])

  const submitForm = (e)=>{
    e.preventDefault();
    if(userName === '' || userName === null){
      setErrorMsg('Please Fill the valid Github Link');
      setIsError(true);
      return ;
    }
    if(hashTags.length === 0){
      setErrorMsg('Please Add Atleast one Techstack');
      setIsError(true);
      return ;
    }
    let json = {
      username : userName,
      githublink : githubLink,
      tags: hashTags,  
      email : isGoogleSignInDone  
    };
    if(isUserAClgStudent === 'true') json = {...json, semester};
    if(isUserAClgStudent === 'true') json = {...json, collegeName};
    postNewUser(json).then(res=>{
      console.log(res.status);
      if(res.status === 200){
        setIsAlreadyAUser(true);
        dispatch(setUserSlice({isAlreadyAUser : true}));
      }
    })
  }
  useEffect(()=>{

    if(userslicedata.isAlreadyAUser === true)
      navigate('/');
  },[userslicedata])
  
  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-4xl font-semibold">SignUp</h1>
          <p>After SignUp you can see projects</p>
        </div>
        <form onSubmit={submitForm} className="flex flex-col gap-4">
          <span>
            <span className="flex gap-1 items-center flex-row flex-wrap">
              <IoCheckmarkDoneCircle className={`w-7 h-7 ${isGoogleSignInDone !== false ? 'text-green-600':'text-gray-500'}`}/>
              <Typography  variant="h6" gutterBottom color={`${isGoogleSignInDone !== false ? 'green':'GrayText'}`}> Step 1. Login With Google </Typography>
            </span>
            <SignInWithGoogle setIsGoogleSignInDone={setIsGoogleSignInDone} isGoogleSignInDone={isGoogleSignInDone}/>
          </span>
          <hr/>
          <span className={`flex flex-col gap-4 ${isGoogleSignInDone !== false && !isAlreadyAUser ? 'opacity-100':'opacity-40'}`}>
          <Typography variant="h6" gutterBottom color='GrayText'> Step 2. Please fill this details </Typography>
          <MyTextField endIcon={<FaGithubSquare/>} label='GithubLink' setVariable={setGithubLink} variable={githubLink} iserror={isErrorInGithubLink} errormsg={messageForWrongGithubLink} isDisabled={isAlreadyAUser || !isGoogleSignInDone} />
          <MyTextField endIcon={<CgUser/>} label='User Name' setVariable={setUserName} variable={userName} isDisabled={true}/>
          <AddTagInput hashTags={hashTags} setHashTags={setHashTags}/>
          <span className="flex flex-row flex-wrap gap-1 md:max-w-sm">
            {hashTags.length > 0 &&  hashTags.map((ele,key)=>{
              return <HastTagCards hashTags={hashTags} hashTag={ele} setHashTags={setHashTags} keys={key} forDisplay={false}/>
            })}
          </span>
          <MyRadioGroup radioOptions={radioGroupOptions} radioGroupTitle={radioGroupTitle} setValue={setIsUserAClgStudent} value={isUserAClgStudent} isDisabled={isAlreadyAUser || !isGoogleSignInDone}/>
          {isUserAClgStudent === 'true' && <MyTextField endIcon={<FaUniversity />} label={'Enter Your College Name'} variable={collegeName} setVariable={setCollegeName}/>}
          {isUserAClgStudent === 'true' && <MySelectBox semester={semester} setSemester={setSemester} options={semesterSelectOptions} label={selectSemesterLabel}/>}
          <HalfIconHalfButton buttonIcon={<IoMdLogIn/>} buttonName='Login' isDisabled={isAlreadyAUser || isGoogleSignInDone === false}/>
          </span>
        </form>
      </div>
      <MySnackbar isOpen={isError} setOpen={setIsError} msg={errorMsg} severity='error'/>
    </>
  );
};
