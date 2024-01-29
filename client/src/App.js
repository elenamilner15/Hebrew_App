//client\src\App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import verbRoutes from './routes/verbRoutes';
import mainRoutes from './routes/mainRoutes';

function App() {
  return (

    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {authRoutes}
        {profileRoutes}
        {verbRoutes}
        {mainRoutes}
      </Routes>
    </div>

  );
}

export default App;
