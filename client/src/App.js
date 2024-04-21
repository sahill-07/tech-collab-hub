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
import LoginForm from './pages/LoginForm';
import RecommendedUser from './pages/RecommendedUser';
import BasicUtils from './components/BasicUtils/BasicUtils';
import ChatPage from './pages/ChatPage';
import LandingPage from './pages/LandingPage/LandingPage';
import DiscussionsHome from './components/Discussions/DiscussionHome'
import DiscussioinsDetails from './components/Discussions/DiscussionsDetails'
import AddDiscussionsDetail from './components/Discussions/AddDiscussionsDetail'
function App() {
  
  return (
    <>
    <BasicUtils/>
    <Router>
      <Routes>
      <Route exact path="/" element={<LandingPage/>}/>
      <Route exact path="/home" element={<Homepage/>}>
        <Route exact path='/home/collab' element={<RecommendedUser/>}/>
        <Route exact path='/home' element={<Projects/>}/>
        <Route exact path='/home/profile' element={<Profile/>}/>
      </Route>
      <Route exact path="/discussion" element={<DiscussionsHome/>} />
      <Route exact path="/discussion/addDiscussionDetail" element={<AddDiscussionsDetail/>} />x        
      <Route exact path='post/:postId' element={<DiscussioinsDetails/>}/>
    
      <Route exact path='/chat' element={<ChatPage/>}/>
      <Route exact path='/auth' element={<LoginForm/>}/>
      <Route exact path='/projects/projectdetail/:id' element={<ProjectDetail/>}/>
      </Routes> 
    </Router>
    </>
  );
}

export default App;
