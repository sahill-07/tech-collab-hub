import './App.css';
import { Books } from './pages/Books';
import { Homepage } from './pages/Homepage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Profile } from './pages/Profile';
import { Projects } from './pages/Projects';
import { AddBook } from './pages/AddBook';
import { BookDetail } from './pages/BookDetail';
import { AddProject } from './pages/AddProject';
import { ProjectDetail } from './pages/ProjectDetail';
import { useState } from 'react';
import LoginForm from './pages/LoginForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <Router>
      <Routes>
      <Route exact path="/" element={isLoggedIn ? <Homepage/>:<LoginForm/>}>
        <Route exact path='/' element={<Books/>}/>
        <Route exact path='/projects' element={<Projects/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
      </Route>
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
