import React from 'react';
import { connect } from 'react-redux';
import {fetchPoll, savePoll, setStep} from './actions';
import ChangeStep from './changeStep.component';
import classNames from 'classnames';

const ManagePoll = React.createClass({
    linkActive(templateKey) {
        return classNames('list-group-item', {active : this.props.selectedStep === templateKey});
    },
    render() {
        return <div>
            <div className="list-group">
                {Object.keys(this.props.poll.stepTemplates).map(templateKey =>
                    <button key={templateKey} className={this.linkActive(templateKey)}  onClick={() => this.props.changeStep(this.props.pollName, templateKey)}>
                        {templateKey}
                    </button>
                )}
            </div>
            <ChangeStep />
        </div>;
    },
    componentDidMount() {
        this.props.fetchPoll();
    }
});

const mapStateToProps = state => {
    return {
        pollName: state.polls.poll.name,
        selectedStep: state.step.selectedStep,
        poll: state.polls.poll.data || {stepTemplates: []}
    };
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        fetchPoll: () => dispatch(fetchPoll(state.routeParams.id)),
        changeStep: (pollName, step) => dispatch(setStep(pollName, step))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagePoll);