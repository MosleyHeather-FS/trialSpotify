import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/callback" exact element={<Profile />} />
      <Route path="/login" exact element={<Login />} />
    </Routes>
  </Router>
  )
}

export default App
