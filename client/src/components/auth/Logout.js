// client\src\components\auth\Logout.js

// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logout } from '../../redux/actions/userActions.js';

// function Logout() {
//     console.log("Logout started")
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//         console.log('Logout function in Logout component');
//         const success = await dispatch(logout());

//         if (success) {
//             // navigate to home page
//             navigate('/');
//         } else {
//             console.log('Logout failed');
//         };

//         return (
//             <AccountDropdown onLogout={handleLogout} />
//         );
//     };
// }

// export default Logout;