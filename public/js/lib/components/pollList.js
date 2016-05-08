import React from 'react';
import { connect } from 'react-redux';
import { setStep } from '../actions/pollList';
import { Link  } from 'react-router';
import {fetchPollsIfNeeded} from '../actions/actions';

const PollList = React.createClass({
    render() {
        var polls = this.props.polls.polls || [];
        var onClick = this.props.onClick;
        var parent = this.props.polls.parent;
        this.editLink = pollName => parent + '/' + pollName + '/edit';
        this.resultsLink = pollName => parent + '/' + pollName + '/results';
        return <ul>
            {polls.map(poll =>
                <li key={poll.name} className="margin-vertical--big">
                    <div className="margin-vertical--small">{poll.name}
                        &nbsp;<Link to={this.editLink(poll.name)}>edycja</Link>&nbsp;
                        <Link to={this.resultsLink(poll.name)}>wyniki</Link>
                    </div>
                    <ul>
                        {Object.keys(poll.data.stepTemplates).map(templateKey =>
                            <li key={templateKey}>
                                <label>
                                    <input type="radio" name="app" value={templateKey}  onClick={() => onClick(poll.name, templateKey)}/>
                                    {templateKey}
                                </label>
                            </li>
                        )}
                    </ul>
                </li>
            )}
        </ul>;
    },
    componentDidMount() {
        this.props.fetchPolls();
    }
});

const mapStateToProps = state => ({
    polls: state.polls || {}
});

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (pollName, step) => {
            dispatch(setStep(pollName, step));
        },
        fetchPolls: () => {
            dispatch(fetchPollsIfNeeded());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PollList);