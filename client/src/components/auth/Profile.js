// client\src\components\auth\Profile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../api';
import '../../styles/Basic.css';
import '../../styles/Profile.css';
import BasicLayout from '../../layouts/BasicLayout.js';
import MenuBar from '../MenuBar';


const Profile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);



    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await fetchUserProfile('/profile', username);
                // Update the 'profile' state with the fetched data
                setProfile(profileData);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();

        // Specify 'username' as a dependency for the useEffect hook
        // This means that the effect will be re-run whenever 'username' changes
    }, [username]);


    return (
        <BasicLayout>
            <div className="page">

                <MenuBar />
                <div className="profile">
                    <p>Hello!</p>


                    <h1>{username}'s Profile</h1>


                </div>

            </div>

            {/* Overlay effect */}
            {/* <Overlay showOverlay={showLogin} onClose={closeLogin} /> */}
        </BasicLayout >




        // <BasicLayout>
        //     <div>

        //         <p>Hello!</p>

        //         {profile && (
        //             <div>
        //                 <h1>{username}'s Profile</h1>

        //             </div>
        //         )}

        //     </div>
        // </BasicLayout>
    );
};

export default Profile;