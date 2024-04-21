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

function App() {
  
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
      <Route exact path='/chat' element={<ChatPage/>}/>
      <Route exact path='/auth' element={<LoginForm/>}/>
      <Route exact path='/projects/projectdetail/:id' element={<ProjectDetail/>}/>
      </Routes> 
    </Router>
    </>
  );
}

export default App;
