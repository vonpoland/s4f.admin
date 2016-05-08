import {AUTH} from '../auth/actions';

export default function navigationReducer(state = { user: null }, action) {
    switch(action.type) {
    case AUTH.FETCHING_LOGGED_USER:
        {
            return {
                ...state,
                fetching: true
            };
        }
    case AUTH.LOGGED_USER_FETCHED: {
        return {
            ...state,
            fetching: false,
            user: action.user
        };
    }
    case AUTH.LOG_OUT_USER_SUCCESS: {
        return {
            ...state,
            user: null
        };
    }
    default:
        {
            return state;
        }
    }
}