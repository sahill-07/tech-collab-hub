import React, { useEffect, useRef, useState } from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { ImBooks } from "react-icons/im";
import { MdGroups3 } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { useLocation } from "react-router-dom";
import { IoLogInSharp } from 'react-icons/io5'
import { useSelector} from "react-redux";

export const Navbar = (props) => {

  const [selectedItem, setSelectedItem] = useState(0);
  const stickyRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const path = useLocation();
  const usersliceData = useSelector((state)=>state.UserSlice);

  useEffect(()=>{
    const pathName = path.pathname;
    if(pathName === '/') setSelectedItem(0);
    else if(pathName === '/collab') setSelectedItem(1);
    else if(pathName === '/profile') setSelectedItem(2);
  },[path])

  useEffect(() => {

    const handleScroll = () => {
      const stickyElement = stickyRef.current;
      const rect = stickyElement.getBoundingClientRect();
      const isAtTop = rect.top === 0;
      setIsSticky(isAtTop);    
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();
  const login = ()=>{
    navigate('/auth')
  }
  

  return (
    <>
      <div ref={stickyRef} className="w-full flex justify-center -mt-8 z-10 top-0 sticky">
        <div  className={`flex flex-row scrollbar-hide overflow-scroll gap-3 md:gap-9  bg-white transition-all ease-in-out justify-center py-4 px-3 md:px-10 rounded-lg shadow-xl items-center md:text-xl text-gray-600 flex-wrap ${isSticky ? 'w-screen justify-between':'max-w-fit'}`}>
          {isSticky && <img src={logo} alt="" className={`w-32 h-auto ${isSticky ? '':'hidden'}`} /> }
          <div className="flex gap-3 md:gap-9 px-1">
          
          <Link to='/' className={`${selectedItem === 0 ? 'text-purple-700':''} flex gap-1 min-w-fit items-center hover:text-purple-500 cursor-pointer`}>
            <ImBooks className="w-6 h-6"/>
            <p>Projects</p>
          </Link>

          <span
            className="h-[70%] background-gradient"
            style={{ width: "1px" }}
            ></span>

          <Link to="/collab" className={`${selectedItem === 1 ? 'text-purple-700':''} flex gap-1 min-w-fit items-center hover:text-purple-500 cursor-pointer`}>
            <MdGroups3 className="w-7 h-7"/>
            <p>Collab</p>
          </Link>

          <span
            className="h-[70%] background-gradient"
            style={{ width: "1px" }}
            ></span>
          {usersliceData.username !== null && usersliceData !== undefined && <Link to="profile" className={`${selectedItem === 2 ? 'text-purple-700':''} flex gap-1 min-w-fit items-center hover:text-purple-500 cursor-pointer`}>
            <ImProfile className="w-6 h-6"/>
            <p>My Profile</p>
          </Link>}
          {
            usersliceData.username === null && usersliceData !== undefined &&
            <div className="flex items-center bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl text-white py-1.5 px-3 rounded-lg" onClick={login}>
              <IoLogInSharp className="w-6 h-6"/>
              <button>Login</button>
            </div>
          }
          </div>
        </div>
      </div>
    </>
  );
};
