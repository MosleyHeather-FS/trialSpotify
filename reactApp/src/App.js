import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Login from './pages/Login';


function App() {
  return (
  <Router>
    <Routes>
      
      <Route path="/" exact element={<Login />} />
    </Routes>
  </Router>
  )
}

export default App
