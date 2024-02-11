//client\src\redux\reducers\verbsReducer.js
const initialState = {
    verbs: [], // Array to store fetched verbs
    shuffledVerbs: [], // Array to store shuffled verbs
    loading: false,
    error: null,
};

const verbsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_VERBS_REQUEST': // Fetch verbs request action
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_VERBS_SUCCESS': // Fetch verbs success action
            return {
                ...state,
                loading: false,
                verbs: action.payload,
                error: null
            };
        case 'FETCH_VERBS_FAILURE': // Fetch verbs failure action
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'SHUFFLE_VERBS_SUCCESS': // Shuffle verbs success action
            return {
                ...state,
                shuffledVerbs: action.payload,
                error: null
            };
        case 'SHUFFLE_VERBS_FAILURE': // Shuffle verbs failure action
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default verbsReducer;