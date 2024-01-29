// client\src\routes\mainRoutes.js
import React from 'react';
import { Route, } from 'react-router-dom';
import MainContent from '../components/MainContent';


import Home from '../components/Home';
import Account from '../components/Account'; // Import the Account component

const mainRoutes = (
    <>

        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />

    </>
);
export default mainRoutes;