import {AUTH} from '../auth/actions';

export default function dashboardReducer(state = { polls : []}, action) {
    switch(action.type) {
    case AUTH.LOGGED_USER_FETCHED: {
        return {
            ...state,
            polls: action.user.configuration.dashboard.polls
        };
    }
    default:
        {
            return state;
        }
    }
}