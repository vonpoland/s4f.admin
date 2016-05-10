import {REQUEST_POLLS,
    RECEIVE_POLLS,
    CHANGE_LOCATION,
    FETCH_POLL_SUCCESS,
    FETCH_ANSWER_SUCCESS,
    FETCH_POLL_START,
    CHANGE_POLL_PROPERTY,
    SAVE_POLL_START,
    SAVE_POLL_SUCCESS,
    SAVE_POLL_FAILED} from '../poll/actions';
import {getPath} from '../routing/routing';

function poll(state, action) {
    switch(action.type) {
    case FETCH_POLL_SUCCESS:
        {
            return {
                ...state,
                ...action.poll
            };
        }
    case SAVE_POLL_SUCCESS:
        {
            return {
                ...state,
                successMessage: true,
                isFormLocked : false
            };
        }
    case SAVE_POLL_FAILED:
        {
            return {
                ...state,
                isFormLocked : false
            };
        }
    case SAVE_POLL_START:
        {
            return {
                ...state,
                isFormLocked : true
            };
        }
    case CHANGE_POLL_PROPERTY:
        {
            let modification = {};

            modification[action.propertyName] = action.newValue;

            return {
                ...state,
                modifications : {
                    ...state.modifications,
                    ...modification
                }
            };
        }
    case FETCH_POLL_START:
        {
            return { displayPollStartDateField : false, modifications : {}};
        }
    default:
        {
            return state;
        }
    }
}

function polls(state = { poll : { displayPollStartDateField : false, modifications : {}}}, action) {
    switch (action.type) {
    case FETCH_POLL_SUCCESS:
    case FETCH_POLL_START:
    case SAVE_POLL_START:
    case SAVE_POLL_SUCCESS:
    case SAVE_POLL_FAILED:
    case CHANGE_POLL_PROPERTY: {
        return {
            ...state,
            poll : poll(state.poll, action)
        };
    }
    case CHANGE_LOCATION:
        {
            return {
                ...state,
                ...getPath(action.payload)
            };
        }
    case FETCH_ANSWER_SUCCESS:
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