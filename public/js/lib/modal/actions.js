import {action} from '../poll/actions';

export const MODAL = {
	OPEN_MODAL: 'MODAL_OPEN_MODAL',
	OPENED_MODAL: 'MODAL_HAS_BEEN_OPENED',
	CLOSED_MODAL: 'MODAL_HAS_BEEN_CLOSED',
	CLOSE_MODAL: 'MODAL_CLOSE',
	close: () => action(MODAL.CLOSE_MODAL),
	closed: () => action(MODAL.CLOSED_MODAL),
	open: (options) => action(MODAL.OPEN_MODAL, options),
	opened: () => action(MODAL.OPENED_MODAL)
};

