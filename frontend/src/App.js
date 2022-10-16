import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import './App.css';
import {useAtom} from 'jotai'
import {currUserAtom} from "./atoms.js"
import Login from './pages/Login/Login';
import Alarm from './pages/Alarm/Alarm';
import SignUp from './pages/SignUp/SignUp';
import FriendSearch from './components/FriendSearch/FriendSearch'
import FriendsDropdown from './components/FriendsDropdown/FriendsDropdown';
import Friends from './pages/Friends/Friends';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<Login/>}/>
        <Route path ="/signup" element={<SignUp/>}/>
        <Route path ="/alarm" element={<Alarm/>}/>
        <Route path ="/friends" element={<Friends/>}/>
      </Routes>
    </Router>
  )
}

export default App;
