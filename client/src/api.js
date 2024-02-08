// client/src/api.js

const serverUrl = process.env.REACT_APP_SERV_API_URL;

// Function to fetch Verbs
export const fetchData = async (path, part_of_speech) => {
    const apiUrl = `${serverUrl}${path}/${part_of_speech}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// client/src/api.js
// Function to fetch Infinitive
export const fetchInfinitive = async (path) => {
    const apiUrl = `${serverUrl}${path}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Infinitive:', error);
        throw error;
    }
};


// Function to register a new user
export const register = async (formData) => {
    const apiUrl = `${serverUrl}/auth/register`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return true; // Registration successful
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};



// // Function to login a user
// export const login = async (passwordInput, resetToken) => {
//     const apiUrl = `${serverUrl}/auth/login`;
//     console.log(apiUrl)///check!!!!!!!!!!!!!!!!!!!!!!!!!!!

//     try {
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ passwordInput, resetToken }),
//         });

//         console.log('Login response:', response); // Log the response details
//         console.log(passwordInput);
//         console.log(resetToken);

//         if (!response.ok) {
//             console.error('Login failed due to HTTP error:', response.status);
//             return false; // Login failed
//         }

//         return true; // Login successful
//     } catch (error) {
//         console.error('Error during login:', error);
//         throw error;
//     }
// };

// Function to login a user
export const login = async (formData) => {
    const apiUrl = `${serverUrl}/auth/login`;
    console.log(apiUrl)///check!!!!!!!!!!!!!!!!!!!!!!!!!!!

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        console.log('Login response:', response); // Log the response details
        // console.log(passwordInput);
        // console.log(resetToken);
        console.log(formData);


        if (!response.ok) {
            console.error('Login failed due to HTTP error:', response.status);
            return false; // Login failed
        }

        return true; // Login successful
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};



// client/src/api.js
//_____________________________________________
// Fetch user profile
export const fetchUserProfile = async (path, param = '') => {
    const apiUrl = `${serverUrl}${path}/${param}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            if (response.status === 404) {
                console.error('User profile not found');
                return null; // or any default data you want to return
            }

            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


// Restore password
export const restorePassword = async (formData) => {
    const apiUrl = `${serverUrl}/auth/password`;

    try {
        console.log('Starting password restoration...');
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            console.error('Password restoration failed due to HTTP error:', response.status);
            throw new Error('Password restoration failed');
        }

        console.log('Password restoration successful!');

        return true;

    } catch (error) {
        console.error('Error during password restoration:', error);
        throw error;
    }
};

// Logout
export const logout = async () => {
    const apiUrl = `${serverUrl}/auth/logout`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};
//client\src\api.js
//setNewPassword
export const newPassword = async (passwordInput, resetToken) => {
    console.log('API.JS');
    const apiUrl = `${serverUrl}/auth/new-password`;
    console.log(apiUrl);
    console.log('newPassword called', passwordInput);
    console.log('resetToken called', resetToken);

    try {
        console.log('newPassword called', passwordInput);
        console.log('resetToken called', resetToken);
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ passwordInput, resetToken }),
        });

        if (!response.ok) {
            console.log('!response.ok')
            console.error('Password change failed:', response.status);
            // return false; // Login failed
            return { success: false, error: response.status }; // Return error information
        }

        // console.log('OK!');
        const userData = await response.json(); // Assuming your API returns user data upon success

        console.log('OK!', userData);

        // return true;
        return { success: true, data: userData }; // Return success and user data


    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
};


