import React from 'react';
import { connect } from 'react-redux';
import {fetchPoll, setStep, toggleAutoSwitch} from './actions';
import {createPollLink} from './poll.service';
import ChangeStep from './changeStep.component';
import classNames from 'classnames';

const ManagePoll = React.createClass({
    onLoad (arg) {
        var height;
        var width;
        var iframe = $(arg.currentTarget);
        setTimeout(() => {
            try {
                var content = iframe.contents();

                height = content.height();
                width = content.width();
            } catch(e) {
                console.error(e);
                width = 1920;
                height = 1080;
            }

            iframe.width(width);
            iframe.height(height);
        }, 2000);
    },
    linkActive(templateKey) {
        return classNames('list-group-item', {active: this.props.selectedStep === templateKey});
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
                <div className="panel-body overflow--scroll ui-width--max">
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
                    <button key={templateKey} className={this.linkActive(templateKey)}
                            onClick={() => this.props.setStep(this.props.pollId, templateKey)}>
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
    if (initialAddress) {
        return initialAddress;
    }

    if (state.polls.poll.parent) {
        let step = state.step.selectedStep ? '&step=' + state.step.selectedStep : '';

        return initialAddress = state.config.projectorUrl + '/#/' + state.polls.poll.parent + '/' + state.polls.poll.name + '?stay=true' + step;
    }
}

const mapStateToProps = state => {
    return {
        pollLink: createPollLink(state.polls.poll),
        pollId: state.polls.poll.id,
        selectedStep: state.step.selectedStep,
        poll: state.polls.poll.data || {stepTemplates: []},
        initialAddress: getInitialAddress(state)
    };
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        fetchPoll: () => dispatch(fetchPoll(state.routeParams.id)),
        setStep: (pollId, step) => dispatch(setStep(pollId, step)),
        toggleAutoSwitch: value => dispatch(toggleAutoSwitch(value))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagePoll);