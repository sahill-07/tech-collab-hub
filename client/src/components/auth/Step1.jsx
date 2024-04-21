import React, { useEffect, useState } from 'react'
import MyTextField from '../basicComponents/TextBox/MyTextField'
import { FaGithubSquare } from 'react-icons/fa'
import { CgUser } from "react-icons/cg";
import Button from '@mui/material/Button';
import AOS from "aos";
import "aos/dist/aos.css";



const Step1 = ({setStepperActiveIndex, userData, setUserData}) => {
  const [githubLink, setGithubLink] = useState(userData['githublink']);
  const [userName, setUserName] = useState('');
  const [isErrorInGithubLink, setIsErrorInGithubLink] = useState(false);
  const messageForWrongGithubLink = "Please enter a valid GitHub repository URL";

  AOS.init({
    duration: 800,
  });

  useEffect(()=>{
    const urlRegex = /^https?:\/\/(?:www\.)?github\.com\/.*[^\/]$/;;
    if(urlRegex.test(githubLink) || githubLink === ''){
      setIsErrorInGithubLink(false);
    }else {
      setIsErrorInGithubLink(true);
      setUserName('');
    }
  },[githubLink])

  const formsubmit = (e)=>{
    e.preventDefault();
    userData['githublink'] = githubLink;
    userData['username'] = userName;
    setStepperActiveIndex(1);
  }

  return (
    <div data-aos="fade-left">
      <form onSubmit={formsubmit} id="step-1" className="flex flex-col gap-3">
        <MyTextField endIcon={<FaGithubSquare/>} label='GithubLink' setVariable={setGithubLink} variable={githubLink} iserror={isErrorInGithubLink} errormsg={messageForWrongGithubLink} />
        <MyTextField endIcon={<CgUser/>} label='User Name' setVariable={setUserName} variable={userName}/>
        <Button type='submit' color='success' variant='contained'>Next</Button>
    </form>
    </div>
  )
}

export default Step1
