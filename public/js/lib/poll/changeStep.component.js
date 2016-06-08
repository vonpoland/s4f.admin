import React from 'react';
import { connect } from 'react-redux';
import {changeStep} from './actions';

const ChangeStep = React.createClass({
    render() {
        var handleClick = this.props.onClick;
        var disabled = !this.props.canUpdate || !this.props.selectedPoll;
        return <div>
            <button className="btn btn-primary" disabled={disabled} onClick={() => handleClick(this.props.selectedPoll, this.props.selectedStep, false, this.props.parent)}>Change step</button>
            <button className="btn btn-primary margin-horizontal--small" disabled={disabled} onClick={() => handleClick(this.props.selectedPoll, this.props.selectedStep, true, this.props.parent)}>Change step and stay</button>
        </div>;
    }
});

const mapStateToProps = state => {
    return {
        canUpdate: state.step.canUpdate,
        selectedPoll : state.step.selectedPoll,
        selectedStep: state.step.selectedStep,
        parent: state.polls.poll.parent
    };
};

export default connect(
    mapStateToProps,
    dispatch => () => ({ onClick: (selectedPoll, selectedStep, stay, parent) => dispatch(changeStep(selectedPoll, selectedStep, stay, parent)) })
)(ChangeStep);