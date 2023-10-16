import React from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import './App.css';

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
