import React from 'react';
import { connect } from 'react-redux';
import {fetchPoll, setStep, toggleAutoSwitch} from './actions';
import {createPollLink} from './poll.service';
import ChangeStep from './changeStep.component';
import classNames from 'classnames';

const ManagePoll = React.createClass({
    onLoad (arg) {
       console.info($(arg.currentTarget).contents().height);
    },
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
                    <iframe ref="iframe" className="ui-border--none" src={this.props.initialAddress}></iframe>
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
        initialAddress = null;
        this.props.fetchPoll();
        this.refs.iframe.addEventListener('load', this.onLoad);
    }
});

var initialAddress = null;
function getInitialAddress(state) {
    if(initialAddress) {
        return initialAddress;
    }

    if(state.polls.poll.parent) {
        let step = state.step.selectedStep ? '&step=' + state.step.selectedStep : '';

        return initialAddress = state.config.projectorUrl + '/#/' + state.polls.poll.parent + '/' +  state.polls.poll.name + '?stay=true' + step;
    }
}

const mapStateToProps = state => {
    return {
        pollLink: createPollLink(state.polls.poll),
        pollName: state.polls.poll.name,
        selectedStep: state.step.selectedStep,
        poll: state.polls.poll.data || {stepTemplates: []},
        initialAddress: getInitialAddress(state)
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