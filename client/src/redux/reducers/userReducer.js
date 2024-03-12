// client\src\redux\reducers\userReducer.js
const initialState = {
    id: null,       // Initial state for the user ID
    username: '',   // Initial state for the username
    email: '',      // Initial state for the email
    password: '',   // Initial state for the email

    profile: {
        score: null,
        progress: null,
        level: null,
        achievements: [],
        // Add other profile-related state properties as needed
    },
    token: '', // Added token to the initial state
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return { ...state, ...action.payload };

        case 'UPDATE_PROFILE':
            return { ...state, profile: { ...state.profile, ...action.payload } };

        case 'UPDATE_ACHIEVEMENTS':
            return { ...state, profile: { ...state.profile, achievements: action.payload } };

        case 'OPEN_LOGIN_FROM_MENU_BAR':
            return { ...state, isLoginOpen: true };

        case 'CLOSE_LOGIN_FROM_MENU_BAR':
            return { ...state, isLoginOpen: false };


        case 'UPDATE_TOKEN':
            return {
                ...state,
                token: action.payload,
            };

        case 'USER_LOGGED_OUT':
            return initialState;

        case 'RESET_TOKEN':
            return { ...state, resetToken: action.payload };


        case 'NEW_PASSWORD':
            return { ...state, newPassword: action.payload };

        case 'CLEAR_RESET_TOKEN':
            return { ...state, resetToken: null };


        // case 'SET_PASSWORD_CHANGED':
        //     return { ...state, passwordChanged: action.payload };


        default:
            return state;

    }
};




export default userReducer;