import React, { useEffect, useState } from "react";
import { Profile1 } from '../components/Profile_Page_Components/Profile1';
import { UserDetails } from '../components/Profile_Page_Components/UserDetails';
import { getAuth, signOut } from 'firebase/auth'
import { Link } from "react-router-dom";
import Lottie from 'lottie-react';
import loading_animation from '../assets/loading.json';
import { useDispatch, useSelector } from "react-redux";
import { setUserSlice } from "../store/UserSlice";
import Profile3 from "../components/Profile_Page_Components/Profile3";
import '../styles/ScrollbarHide.css'
import Profile2 from "../components/Profile_Page_Components/Profile2";


export const Profile = () => {
  const usersliceData = useSelector((state)=> state.UserSlice);
  const [isLogged, setIsLogged] = useState(true);
  const auth = getAuth();
  const [isSignOutButtonClicked, setIsSignOutButtonClicke] = useState(false);
  const dispatch = useDispatch();

  const signOutF = ()=>{
    setIsSignOutButtonClicke(true);
    dispatch(setUserSlice({action: 'makenull'}))
  }

  useEffect(()=>{
    if(usersliceData.username === null && isSignOutButtonClicked){
      signOut(auth);
    }
  }, [usersliceData]);


  return (
    <>
      {isLogged && <section className="bg-gray-100">
        <section id="top-heading" className="p-4">
          <div className="pt-4 pb-4 px-8 bg-white rounded-xl items-center shadow-sm flex justify-between">
            <div>
              <span className="text-blue-600">
                <Link to="/">Home /</Link>{" "}
              </span>{" "}
              User Profile
            </div>
            <div>
              <button onClick={signOutF} className="bg-red-400 text-white p-2 rounded-lg hover:shadow-lg">Sign Out</button>
            </div>
          </div>
        </section>

        {
          usersliceData.username === null && <Lottie animationData={loading_animation} className="h-52 w-52"/>
        }

        {usersliceData.username !== null && <section
          id="information-section"
          className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 p-4"
        >
          <div id="profile" className="flex bg-white rounded-lg p-3 shadow-lg">
            <Profile1 data={usersliceData} />
          </div>
          <div
            id="user-details"
            className="bg-white rounded-lg p-3 md:col-span-2 "
          >
            <UserDetails data={usersliceData} />
          </div>
          <div
            id="user-activity"
            className="bg-white rounded-lg p-3 overflow-scroll scrollbar-hide"
          >
            <Profile2 data={usersliceData}/>
          </div>
          <div
            id="user-activity"
            className="bg-white rounded-lg p-3 md:col-span-2 overflow-scroll scrollbar-hide"
          >
            <Profile3 data={usersliceData}/>
          </div>
        </section>}

        <br />
        <br />
      </section>}
    </>
  );
};
