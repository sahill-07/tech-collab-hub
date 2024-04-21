// import React, { useState, useEffect, useRef } from 'react';
// import Card from './Card';
// import { Link } from 'react-router-dom';
// import useFetch from '../Hooks/useFetch';
// import { Typography, useMediaQuery } from '@mui/material';
// import LoadingBar from '../Discussions/LoadingBar/LoadingBar'
// import '../../App.css'
// import './CSS/Button.css'
// import 'react-toastify/dist/ReactToastify.css';
// import { Navbar } from '../Navbar';
// import Lottie from 'lottie-web';
// import animation from '../../assets/Animation - 1713714193932.json'
// const DiscussionsHome = () => {
//     const { data, loading } = useFetch("posts");
//     console.log(data);
//     const [search ,setSearch] = useState("")

//     const searchData = data && data?.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))

//     useEffect(() =>{
//         console.log(searchData)
//     },[search])

//     const container = useRef(null)

//     useEffect(()=>{
//         Lottie.loadAnimation({
//             container: container.current ,
//             renderer:'svg',
//             loop: true,
//             autoplay: true,
//             animationData: animation,
//         })
//     } , [])

//     // Use MUI's useMediaQuery hook to check for screen size
//     const isSmallScreen = useMediaQuery('(max-width:600px)');
//     const isMediumScreen = useMediaQuery('(max-width:960px)');

//     // Define font sizes for different screen sizes
//     const titleFontSize = isSmallScreen ? '40px' : isMediumScreen ? '50px' : '70px';
//     const descriptionFontSize = isSmallScreen ? '10px' : isMediumScreen ? '15px' : '20px';

//     return (
//         <>
//             <Navbar/>
//             <div className='m-2 gap-60 flex flex-row text-white bg-blue-400 rounded-sm p-3 font-poppins'>

//                 <div className="m-5 text-white bg-blue-400 rounded-sm p-3 font-poppins">
//                     <h1 className="font-semibold text-4xl md:text-2xl lg:text-3xl xl:text-4xl">Discussions Forum</h1>
//                     <p className="text-lg md:text-sm lg:text-base xl:text-lg mt-2">Discuss topics with other persons having the same interests</p>
//                 </div>
//                 <div ref={container} className='container'>

//                 </div>
//             </div>

//             <div className='flex flex-col lg:flex lg:flex-row gap-2 mb-5
//              items-center justify-center mx-auto w-full'>
//                 <div className="w-80 lg:w-[450px]">
//                     <form>   
//                         <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
//                         <div className="relative">
//                             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                                 <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                                 </svg>
//                             </div>
//                             <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ..." required />
//                             <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
//                         </div>
//                     </form>
//                 </div>
//                 <Link to= "/discussion/addDiscussionDetail">
//                     <div className=''>
//                         <button className="button">Start a Discussion</button>
//                     </div>
//                 </Link>
//             </div>


//             {loading ? <div className='flex mt-24 justify-center items-center'><LoadingBar/></div>: <div className=''>
//                 {data
//                 .filter((card) => {
//                     return search.toLowerCase() === '' 
//                     ? card 
//                     : card.title.toLowerCase().includes(search)
//                 })
//                 .map((card, i) => <Card card={card} key={i} />)} </div>}
//         </>
//     );
// }

// export default DiscussionsHome



import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import { Typography, useMediaQuery } from '@mui/material';
import LoadingBar from '../Discussions/LoadingBar/LoadingBar'
import '../../App.css'
import './CSS/Button.css'
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../Navbar';
import Lottie from "lottie-react";
import animation from '../../assets/Animation - 1713714193932.json'
import "../../styles/Homepage.css";
const DiscussionsHome = () => {
    const { data, loading } = useFetch("posts");
    console.log(data);
    const [search ,setSearch] = useState("")
    const [animationLoaded, setAnimationLoaded] = useState(false); // State variable to track if animation is loaded

    const searchData = data && data?.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))

    useEffect(() =>{
        console.log(searchData)
    },[search])

    const container = useRef(null)

 

    // Use MUI's useMediaQuery hook to check for screen size
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(max-width:960px)');

    // Define font sizes for different screen sizes
    const titleFontSize = isSmallScreen ? '40px' : isMediumScreen ? '50px' : '70px';
    const descriptionFontSize = isSmallScreen ? '10px' : isMediumScreen ? '15px' : '20px';

    return (
        <>
            <Navbar/>
            <div className="background-gradient rounded-b-3xl flex flex-col-reverse md:grid md:grid-cols-2 z-0 shadow-lg pb-20 md:pb-5 mb-4">
  <div className="flex gap-3 justify-center  p-4 flex-col">
    <h1 className="text-white text-4xl md:text-7xl font-bold pl-5 ">Discussions Forum</h1>
    <div className="flex flex-col text-white pl-6 mt-4">
      <h5 className="text-lg md:text-2xl">Explore, Engage, Evolve: Discover Boundless Conversations Await!</h5>
      <h5 className="text-lg md:text-2xl">Unveil Your Voice: Share Your Thoughts, Ignite Conversations!</h5>
    </div>
  </div>
  <div className="flex justify-center">
    <Lottie
      className="h-auto md:w-[425px] w-80"
      animationData={animation}
    />
  </div>
</div>

            <div className='flex flex-col lg:flex lg:flex-row gap-2 mb-5
             items-center justify-center mx-auto w-full'>
                <div className="w-80 lg:w-[450px]">
                    <form>   
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ..." required />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>
                <Link to= "/discussion/addDiscussionDetail">
                    <div className=''>
                        <button className="button">Start a Discussion</button>
                    </div>
                </Link>
            </div>


            {loading ? <div className='flex mt-24 justify-center items-center'><LoadingBar/></div>: <div className=''>
                {data
                .filter((card) => {
                    return search.toLowerCase() === '' 
                    ? card 
                    : card.title.toLowerCase().includes(search)
                })
                .map((card, i) => <Card card={card} key={i} />)} </div>}
        </>
    );
}

export default DiscussionsHome
