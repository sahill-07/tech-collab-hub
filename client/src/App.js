import './App.css';
import { Homepage } from './pages/Homepage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Profile } from './pages/Profile';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { useEffect, useState } from 'react';
import LoginForm from './pages/LoginForm';
import RecommendedUser from './pages/RecommendedUser';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUserSlice } from './store/UserSlice';
import { getUserDetails } from './http';
import BasicUtils from './components/BasicUtils/BasicUtils';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const usersliceData = useSelector((state)=> state.UserSlice);
  const utilsliceData = useSelector((state)=> state.BasicUtilsSlice);
  useEffect(()=>{
    console.log(utilsliceData);
  },[utilsliceData])


  
  useEffect(() => {
      onAuthStateChanged(getAuth(), async(user)=>{
        if(user !== null){
          dispatch(setUserSlice({isloggedIn : true}));
          if(usersliceData.username === null){
            getUserDetails().then(res=>{
              if(res.data === null){
                // navigate('/auth');
              }else
              // setProfiledata(res.data);
              console.log(res.data);
              dispatch(setUserSlice(res.data));
              dispatch(setUserSlice({isAlreadyAUser : true}));
            })
          }
        }
        else if(user === null) {
          dispatch(setUserSlice({
            isloggedIn : null,
            isAlreadyAUser : null,
            email : 'svijay4145@gmail.com',  //should be changed
            username : null,
            githublink : null,
            tags : [],
            semester : null,
          }))
        }
      })

  }, [])
  
  return (
    <>
    <BasicUtils/>
    <Router>
      <Routes>
      <Route exact path="/" element={<Homepage/>}>
        <Route exact path='/collab' element={<RecommendedUser/>}/>
        <Route exact path='/' element={<Projects/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
      </Route>
      <Route exact path='/auth' element={<LoginForm/>}/>
      <Route exact path='/projects/projectdetail/:id' element={<ProjectDetail/>}/>
      </Routes> 
    </Router>
    </>
  );
}

export default App;
