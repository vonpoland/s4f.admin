import React from 'react';
import { connect } from 'react-redux';
import {fetchPoll, setStep} from './actions';
import {createPollLink} from './poll.service';
import ChangeStep from './changeStep.component';
import classNames from 'classnames';

const ManagePoll = React.createClass({
    linkActive(templateKey) {
        return classNames('list-group-item', {active : this.props.selectedStep === templateKey});
    },
    render() {
        return <div>
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Live view</h3>
                </div>
                <div className="panel-body">
                    <iframe className="ui-border--none" src='http://localhost:8888/projector/#/tychy/kto-wygra/voteResults?stay=true'></iframe>
                </div>
            </div>
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
        pollLink: createPollLink(state.polls.poll),
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