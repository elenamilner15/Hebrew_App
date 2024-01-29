// client\src\components\auth\Profile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../api';

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
        <div>
            <p>Hello!</p>
            {/* Render the profile data in the component */}
            {profile && (
                <div>
                    <h1>{username}'s Profile</h1>
                    {/* Render other profile information as needed */}
                </div>
            )}
        </div>
    );
};

export default Profile;