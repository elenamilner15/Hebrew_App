//client\src\redux\reducers\verbsReducer.js
const initialState = {
    // verbs: [], // Array to store fetched verbs
    // shuffledVerbs: [], // Array to store shuffled verbs
    // loading: false,
    // error: null,
    progressData: null, // Add this line to store progress data
    totalInfinitive: null,
};

const verbsReducer = (state = initialState, action) => {
    switch (action.type) {
        // case 'FETCH_VERBS_REQUEST': // Fetch verbs request action
        //     return {
        //         ...state,
        //         loading: true,
        //         error: null
        //     };
        // case 'FETCH_VERBS_SUCCESS': // Fetch verbs success action
        //     return {
        //         ...state,
        //         loading: false,
        //         verbs: action.payload,
        //         error: null
        //     };
        // case 'FETCH_VERBS_FAILURE': // Fetch verbs failure action
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.payload
        //     };
        // case 'SHUFFLE_VERBS_SUCCESS': // Shuffle verbs success action
        //     return {
        //         ...state,
        //         shuffledVerbs: action.payload,
        //         error: null
        //     };
        // case 'SHUFFLE_VERBS_FAILURE': // Shuffle verbs failure action
        //     return {
        //         ...state,
        //         error: action.payload
        //     };

        case 'FETCH_PROGRESS_SUCCESS': // Fetch progress success action
            return {
                ...state,
                progressData: action.payload,
                error: null
            };
        case 'FETCH_PROGRESS_FAILURE': // Fetch progress failure action
            return {
                ...state,
                progressData: null,
                error: action.payload
            };

        case 'FETCH_TOTAL_INF_SUCCESS':
            return {
                ...state,
                totalInfinitive: action.payload.total
            };
        case 'FETCH_TOTAL_INF_FAILURE':
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
};

export default verbsReducer;