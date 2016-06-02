import React from 'react';
import { connect } from 'react-redux';
import {fetchPoll, setStep, toggleAutoSwitch} from './actions';
import {createPollLink} from './poll.service';
import ChangeStep from './changeStep.component';
import classNames from 'classnames';

const ManagePoll = React.createClass({
    linkActive(templateKey) {
        return classNames('list-group-item', {active : this.props.selectedStep === templateKey});
    },
    toggleAutoSwitch(event) {
        this.props.toggleAutoSwitch(event.target.value === 'true');
    },
    render() {
        return <div>
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Live view</h3>
                </div>
                <div className="panel-body">
                    <iframe className="ui-border--none" src={this.props.tvPreviewUrl}></iframe>
                </div>
            </div>
            <div className="form-group">
                <label>Auto switch (without accept button)</label>
                <select className="form-control" defaultValue={false} onChange={this.toggleAutoSwitch}>
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>
             </div>
            <div className="list-group">
                <label>Steps</label>
                {Object.keys(this.props.poll.stepTemplates).map(templateKey =>
                    <button key={templateKey} className={this.linkActive(templateKey)}  onClick={() => this.props.setStep(this.props.pollName, templateKey)}>
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
        poll: state.polls.poll.data || {stepTemplates: []},
        tvPreviewUrl: state.polls.poll.parent ? window.bigscreenConfig.frontendConfig.projectorUrl + '/' + state.polls.poll.parent + '/' +  state.polls.poll.name + '/' + state.step.selectedStep + '?stay=true' : null
    };
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        fetchPoll: () => dispatch(fetchPoll(state.routeParams.id)),
        setStep: (pollName, step) => dispatch(setStep(pollName, step)),
        toggleAutoSwitch : value => dispatch(toggleAutoSwitch(value))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagePoll);