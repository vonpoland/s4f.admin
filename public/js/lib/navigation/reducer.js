import {AUTH} from '../auth/actions';
import {CHANGE_LOCATION} from '../actions/actions';
import {getPageInfo} from '../routing/routing';

export default function navigationReducer(state = { user: null }, action) {
    switch(action.type) {
    case AUTH.FETCHING_LOGGED_USER: {
        return {
            ...state,
            fetching: true
        };
    }
    case CHANGE_LOCATION: {
        return {
            ...state,
            pageInfo: getPageInfo(action.payload)
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
    default: {
            return state;
        }
    }
}