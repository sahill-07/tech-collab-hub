// import React, { useEffect, useRef, useState } from "react";
// import "../styles/Navbar.css";
// import { Link, useNavigate } from "react-router-dom";
// import logo from '../assets/logo.png'
// import { ImBooks } from "react-icons/im";
// import { MdGroups3 } from "react-icons/md";
// import { ImProfile } from "react-icons/im";
// import { useLocation } from "react-router-dom";
// import { IoLogInSharp } from 'react-icons/io5'
// import { useSelector} from "react-redux";

// export const Navbar = (props) => {

//   const [selectedItem, setSelectedItem] = useState(0);
//   const stickyRef = useRef(null);
//   const [isSticky, setIsSticky] = useState(false);
//   const path = useLocation();
//   const usersliceData = useSelector((state)=>state.UserSlice);

//   useEffect(()=>{
//     const pathName = path.pathname;
//     if(pathName === '/') setSelectedItem(0);
//     else if(pathName === '/collab') setSelectedItem(1);
//     else if(pathName === '/profile') setSelectedItem(2);
//     else if(pathName === '/discussion') setSelectedItem(3);
//   },[path])

//   useEffect(() => {

//     const handleScroll = () => {
//       const stickyElement = stickyRef.current;
//       const rect = stickyElement.getBoundingClientRect();
//       const isAtTop = rect.top === 0;
//       setIsSticky(isAtTop);    
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const navigate = useNavigate();
//   const login = ()=>{
//     navigate('/auth')
//   }
  

//   return (
//     <>
//       <div ref={stickyRef} className="w-full flex justify-center -mt-8 z-10 top-0 sticky">
//         <div  className={`flex flex-row scrollbar-hide overflow-scroll gap-3 md:gap-9  bg-white transition-all ease-in-out justify-center py-4 px-3 md:px-10 rounded-lg shadow-xl items-center md:text-xl text-gray-600 flex-wrap ${isSticky ? 'w-screen justify-between':'max-w-fit'}`}>
//           {isSticky && <img src={logo} alt="" className={`w-32 h-auto ${isSticky ? '':'hidden'}`} /> }
//           <div className="flex gap-3 md:gap-9 px-1">
          
//           <Link to='/' className={`${selectedItem === 0 ? 'text-purple-700':''} flex gap-1 min-w-fit items-center hover:text-purple-500 cursor-pointer`}>
//             <ImBooks className="w-6 h-6"/>
//             <p>Projects</p>
//           </Link>

//           <span
//             className="h-[70%] background-gradient"
//             style={{ width: "1px" }}
//             ></span>

//           <Link to="/collab" className={`${selectedItem === 1 ? 'text-purple-700':''} flex gap-1 min-w-fit items-center hover:text-purple-500 cursor-pointer`}>
//             <MdGroups3 className="w-7 h-7"/>
//             <p>Collab</p>
//           </Link>

//           <Link to="/discussion" className={`${selectedItem === 3 ? 'text-purple-700':''} flex gap-1 min-w-fit items-center hover:text-purple-500 cursor-pointer`}>
//             <MdGroups3 className="w-7 h-7"/>
//             <p>Discussions</p>
//           </Link>

//           <span
//             className="h-[70%] background-gradient"
//             style={{ width: "1px" }}
//             ></span>
//           {usersliceData.username !== null && usersliceData !== undefined && <Link to="profile" className={`${selectedItem === 2 ? 'text-purple-700':''} flex gap-1 min-w-fit items-center hover:text-purple-500 cursor-pointer`}>
//             <ImProfile className="w-6 h-6"/>
//             <p>My Profile</p>
//           </Link>}
//           {
//             usersliceData.username === null && usersliceData !== undefined &&
//             <div className="flex items-center bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl text-white py-1.5 px-3 rounded-lg" onClick={login}>
//               <IoLogInSharp className="w-6 h-6"/>
//               <button>Login</button>
//             </div>
//           }
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


import React, { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link , NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoLogInSharp } from 'react-icons/io5'
import { MdGroups3 } from "react-icons/md";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
    else if(pathName === '/discussion') setSelectedItem(3);
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


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div ref={stickyRef}  className="z-0 m-2 sticky">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 50 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                fill="black"
              />
            </svg>
          </span>
          <span className="font-bold">TechColab Hub</span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-14">
              <li >
                <NavLink to="/home"
                  href=""
                  className="text-lg font-semibold text-gray-600 hover:text-blue-400"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/home/collab" className={`${selectedItem === 1 ? 'text-purple-700':''} flex gap-1 min-w-fit items-center hover:text-purple-500 cursor-pointer`}>
              <MdGroups3 className="w-7 h-7"/>
              <p>Collab</p>
            </NavLink>
              </li>
              <li >
                <NavLink to="/discussion"
                  className="text-lg font-semibold  text-gray-600 hover:text-blue-400"
                >
                  Discussions Forum
                </NavLink>
              </li>
              <li >
                <NavLink to = "/chat"
                  className="text-lg font-semibold  text-gray-600 hover:text-blue-400"
                >
                  Chat
                </NavLink>
              </li>
          </ul>
        </div>
        <div className="hidden lg:block">
          <Link to="/home/profile">
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
          </Link>
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 50 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                    <span className="font-bold">TechColab Hub</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                      <NavLink to = "/home"
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          Home
                        </span>
                      </NavLink>
                      <span>
                          <NavLink to="/home/collab" className={`${selectedItem === 1 ? 'text-purple-700':''} flex gap-1 min-w-fit items-center hover:text-purple-500 cursor-pointer`}>
                        <MdGroups3 className="w-7 h-7"/>
                        <p>Collab</p>
                      </NavLink>
                      </span>
                      <NavLink to= "/discussion"
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          Discussions Forum
                        </span>
                      </NavLink>
                      <NavLink
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          Chat
                        </span>
                      </NavLink>
                  </nav>
                </div>
                <Link to= "/home/profile">
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
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
