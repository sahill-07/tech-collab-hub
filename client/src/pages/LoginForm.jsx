import React, { useEffect, useState } from "react";
import "../styles/Homepage.css";
import Lottie from "lottie-react";
import coder_animation from "../assets/coder_animation.json";
import { SignUp } from "../components/auth/SignUp";
import AOS from "aos";
import "aos/dist/aos.css";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithRedirect } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import {
  useNavigate
} from "react-router-dom";
import { setBasicUtilsSlice } from "../store/BasicUtilsSlice";
import { store } from "../store";


const LoginForm = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersliceData = useSelector((state)=> state.UserSlice);
  AOS.init({
    duration: 800,
  });
  useEffect(()=>{
    if(usersliceData.username !== null){
      navigate('/home')
    }else if((store.getState().BasicUtilsSlice.progress_loading === undefined || store.getState().BasicUtilsSlice.progress_loading === null) && usersliceData.email === null){
      signInWithRedirect(getAuth(), provider)
        .catch((error) => {
          const errorMessage = error.message;
          console.error(errorMessage);
          dispatch(setBasicUtilsSlice({
            snackbar : {
              msg : errorMessage,
              severity : 'error'
            }
          }))
        });
    }
  },[usersliceData])
  return (
    <>
      <div className="bg1 w-screen h-screen" />

      <div className=" min-h-screen flex justify-center items-center ">
        <div
          data-aos="zoom-in"
          className="flex flex-col-reverse md:grid md:grid-cols-2 m-3 px-10 py-10 gap-4 md:gap-10  box-shadow rounded-2xl bg-white box-shadow"
        >
          <section className="flex flex-col gap-5">
              <div data-aos="flip-right">
                <SignUp />
              </div>
          </section>

          <section className="w-full justify-center flex">
            <Lottie
              animationData={coder_animation}
              className="w-40 md:w-72 h-auto"
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
