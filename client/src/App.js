import './App.css';
import { Books } from './pages/Books';
import { Homepage } from './pages/Homepage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Profile } from './pages/Profile';
import { Projects } from './pages/Projects';
import { AddBook } from './pages/AddBook';
import { BookDetail } from './pages/BookDetail';
import { AddProject } from './pages/AddProject';
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
            email : null,
            username : null,
            githublink : null,
            tags : [],
            semester : null,
          }))
          // navigate('/auth');
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
      <Route exact path='/addBook' element={<AddBook/>}/>
      <Route exact path='bookdetail/:id' element={<BookDetail/>}/>
      <Route exact path='/projects/projectdetail/:id' element={<ProjectDetail/>}/>
      <Route exact path='/addProject' element={<AddProject/>}/>
      </Routes> 
    </Router>
    </>
  );
}

export default App;
