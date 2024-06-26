import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import discussion_icon from "../assets/discussion.json";
import "../styles/Homepage.css";
import { SearchBox } from "../components/SearchBox";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import ChatIcon from '@mui/icons-material/Chat';
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

export const Homepage = () => {

  // const {COLLEGE_NAME} = useSelector((state)=>state.BookSearchSlice);
  const location = useLocation();
  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('hashTags');
  },[]);
  return (
    <>
        <section  className={`z-0 `}>
        <div className="background-gradient  rounded-b-3xl flex flex-col-reverse md:grid md:grid-cols-2 z-0 shadow-lg pb-20 md:pb-5">
          <div className="flex gap-3 justify-center p-4 flex-col">
            <h1 className="text-white text-5xl font-bold">Tech Collab Hub</h1>
            <div className="flex flex-col text-white">
              <h5>- Collab In Project With other</h5>
              <h5>- Get Best recommendation on project</h5>
              <h5>- Build Connection & grow more</h5>
            </div>
            {/* <SearchBox /> */}
            <Link to='/chat'>
              <Button startIcon={<ChatIcon/>} variant="outlined" className="bg-white" sx={{backgroundColor : 'white', width :144}}>
                Chat
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <Lottie
              className="h-auto md:w-96 w-80"
              animationData={discussion_icon}
            />
          </div>
        </div>
        <Navbar />
        <br />
        <Outlet />
      </section>
    </>
  );
};
