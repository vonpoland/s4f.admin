import {STEP_SET} from '../actions/pollList';
import {RECEIVE_POLLS, CHANGE_STEP_START, CHANGE_STEP_FAILED, CHANGE_STEP_FINISHED} from '../actions/actions';

function step(state = { canUpdate: false }, action) {
    switch (action.type) {
    case CHANGE_STEP_START:
        {
            return {
                ...state,
                canUpdate: false
            };
        }
    case STEP_SET:
        {
            return {
                ...state,
                selectedStep: action.step,
                selectedPoll: action.pollName
            };
        }
    case CHANGE_STEP_FINISHED:
    case CHANGE_STEP_FAILED:
    case RECEIVE_POLLS:
        {
            return {
                ...state,
                canUpdate: true
            };
        }
    default:
        {
            return state;
        }
    }
}

export default step;