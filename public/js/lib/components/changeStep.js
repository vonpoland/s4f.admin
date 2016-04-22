import React from 'react';
import { connect } from 'react-redux';
import {changeStep} from '../actions/actions';

const UpdateStep = React.createClass({
    render() {
        var handleClick = this.props.onClick;
        var disabled = !this.props.canUpdate || !this.props.selectedPoll;
        return <div>
            <button disabled={disabled} onClick={() => handleClick(this.props.selectedPoll, this.props.selectedStep, false)}>Change step</button>
            <button disabled={disabled} onClick={() => handleClick(this.props.selectedPoll, this.props.selectedStep, true)}>Change step and stay</button>
        </div>;
    }
});

export default connect(
    state => state.step,
    dispatch => () => ({ onClick: (selectedPoll, selectedStep, stay) => dispatch(changeStep(selectedPoll, selectedStep, stay)) })
)(UpdateStep);