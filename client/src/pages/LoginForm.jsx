import React, { useState } from "react";
import "../styles/Homepage.css";
import Lottie from "lottie-react";
import coder_animation from "../assets/coder_animation.json";
import { SignUp } from "../components/auth/SignUp";
import AOS from "aos";
import "aos/dist/aos.css";

const LoginForm = () => {
  AOS.init({
    duration: 800,
  });
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
