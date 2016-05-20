import {FETCH_POLL_SUCCESS, CHANGE_STEP_START, CHANGE_STEP_FAILED, CHANGE_STEP_FINISHED, STEP_SET, TOGGLE_AUTO_SWITCH} from '../poll/actions';

function step(state = { canUpdate: false }, action) {
    switch (action.type) {
    case TOGGLE_AUTO_SWITCH:
        {
            return {
                ...state,
                canUpdate : !action.value
            };
        }
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
        {
            return {
                ...state,
                canUpdate: true
            };
        }
    case FETCH_POLL_SUCCESS:
        {
            return {
                ...state,
                canUpdate: true,
                selectedStep: action.poll.last
            };
        }
    default:
        {
            return state;
        }
    }
}

export default step;