//client\src\routes\profileRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import Profile from '../components/auth/Profile';
// import Logout from '../components/Logout';
// import Users from '../components/Users';

const profileRoutes = (<>
    <Route path="/profile/:username" element={<Profile />} />
</>
);

export default profileRoutes;
