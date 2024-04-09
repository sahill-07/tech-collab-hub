import React, { useEffect, useState } from "react";
import { Profile1 } from '../components/Profile_Page_Components/Profile1';
import { Activities } from '../components/Profile_Page_Components/Activities';
import { LinksSection } from '../components/Profile_Page_Components/LinksSection';
import { UserDetails } from '../components/Profile_Page_Components/UserDetails';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserDetails, getUserDetailsUsingid, postNewUser } from "../http";
import Lottie from 'lottie-react';
import loading_animation from '../assets/loading.json';
import { useDispatch, useSelector } from "react-redux";
import { setUserSlice } from "../store/UserSlice";


export const Profile = () => {
  const location = useLocation();
  const usersliceData = useSelector((state)=> state.UserSlice);
  const [isLogged, setIsLogged] = useState(true);
  const auth = getAuth();
  const [isSignOutButtonClicked, setIsSignOutButtonClicke] = useState(false);
  const dispatch = useDispatch();
  const navigate =useNavigate();

  const signOutF = ()=>{
    setIsSignOutButtonClicke(true);
    dispatch(setUserSlice())
  }

  useEffect(()=>{
    if(usersliceData.username === null && isSignOutButtonClicked){
      setIsSignOutButtonClicke(false);
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
            <Profile1 username={usersliceData.username} />
          </div>
          <div
            id="user-details"
            className="bg-white rounded-lg p-3 md:col-span-2 "
          >
            <UserDetails email={usersliceData.email} githublink={usersliceData.githublink} username={usersliceData.username} collegeName={usersliceData.collegeName} semester={usersliceData.semester} tags={usersliceData.tags} />
          </div>
          {/* <div id="user-link" className="bg-white rounded-lg p-3 ">
            <LinksSection data={profiledata} />
          </div> */}
          <div
            id="user-activity"
            className="bg-white rounded-lg p-3 md:col-span-3"
          >
            {/* <Activities data={usersliceData} /> */}
          </div>
        </section>}

        <br />
        <br />
      </section>}
    </>
  );
};
