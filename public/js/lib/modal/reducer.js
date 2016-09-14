import {MODAL} from './actions';

function modalReducer(state = {}, action = {}) {
	switch (action.type) {
		case MODAL.OPEN_MODAL: {
			return {
				opening: true,
				opened: false,
				title: action.value.title,
				content: action.value.content,
				onAccept: action.value.onAccept
			}
		}
		case MODAL.CLOSE_MODAL: {
			return {
				...state,
				closing: true,
				opening: false,
				opened: false,
			}
		}
		case MODAL.OPENED_MODAL: {
			return {
				...state,
				opening: false,
				opened: true,
				closing: false
			}
		}
		case MODAL.CLOSED_MODAL: {
			return {
				...state,
				opening: false,
				opened: false,
				closing: false
			}
		}
		default : {
			return state;
		}
	}
}

export default modalReducer;