import {REQUEST_POLLS, RECEIVE_POLLS, CHANGE_LOCATION, RECEIVE_POLL, RECEIVE_ANSWERS} from '../actions/actions';
import {getPath} from '../routing/routing';
import {calculateVotes} from '../services/polls';

function polls(state = {}, action) {
    switch (action.type) {
    case CHANGE_LOCATION:
        {
            return {
                ...state,
                ...getPath(action.payload)
            };
        }
    case RECEIVE_POLL:
        {
            return {
                ...state,
                votes: calculateVotes(action.poll)
            };
        }
    case RECEIVE_ANSWERS:
        {
            return {
                ...state,
                answers: action.answers
            };
        }
    case REQUEST_POLLS:
        {
            return {
                ...state,
                isFetching: true
            };
        }
    case RECEIVE_POLLS:
        {
            return {
                ...state,
                isFetching: false,
                polls: action.polls
            };
        }
    default:
        {
            return state;
        }
    }
}

export default polls;