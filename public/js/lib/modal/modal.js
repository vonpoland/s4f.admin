import React from 'react';
import {connect} from 'react-redux';
import { createSelector } from 'reselect'
import {MODAL} from './actions';
const getModal = state => state.modal;
const getState = createSelector(
	[getModal],
	modal => modal
);

const Modal = React.createClass({
	propTypes: {
		id: React.PropTypes.string
	},
	componentDidMount() {
		$(this._modal).on('hide.bs.modal', () => this.props.modalClosed());
	},
	componentWillUnmount() {
		$(this._modal).off('hide.bs.modal')
	},
	render () {
		if(this._modal) {
			if(this.props.opening) {
				setTimeout(() => {
					$(this._modal).modal('show');
					this.props.modalOpened();
				})
			} else if(this.props.closing) {
			 setTimeout(() => {
				 $(this._modal).modal('hide');
			 })
			}
		}

		return <div className="modal fade" id={this.props.id} tabindex="-1" role="dialog" aria-labelledby="deleteResultModal" ref={m => this._modal = m}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
					</div>
					<div className="modal-body">
						{this.props.content}
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
						<button type="button" className="btn btn-primary" onClick={() => this.props.onAccept()}>Delete</button>
					</div>
				</div>
			</div>
		</div>
	}
});

const mapStateToProps = state => {
	return getState(state);
};

const mapDispatchToProps = dispatch => ({
	modalClosed: () => dispatch(MODAL.closed()),
	modalOpened : () => dispatch(MODAL.opened())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Modal);