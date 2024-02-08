//client\src\routes\authRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import RestorePassword from '../components/auth/RestorePassword';
import NewPassword from '../components/auth/NewPassword';
// import Logout from '../components/Logout';
// import Users from '../components/Users';

const authRoutes = (
    <>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password" element={<RestorePassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        {/* <Route path="/logout" element={<Logout />} />
        <Route path="/users" element={<Users />} /> */}
    </>
);

export default authRoutes;
