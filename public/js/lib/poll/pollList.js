import React from 'react';
import { connect } from 'react-redux';
import { setStep } from '../actions/pollList';
import { Link  } from 'react-router';
import {fetchPollsIfNeeded} from './actions';

const PollList = React.createClass({
    render() {
        var polls = this.props.polls.polls || [];
        this.editLink = pollName => '/admin/poll/' + pollName + '/edit';
        this.resultsLink = pollName => '/admin/poll/' + pollName + '/results';
        return <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Poll name</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                {polls.map(poll =>
                    <tr key={poll.name}>
                        <td>{poll.name}</td>
                        <td>
                            <Link to={this.editLink(poll.name)} className="margin-horizontal--small"><i className="fa fa-lg fa-pencil" aria-hidden="true"></i>&nbsp;Edit</Link>&nbsp;
                            <Link to={this.resultsLink(poll.name)} className="margin-horizontal--small"><i className="fa fa-lg fa-eye" aria-hidden="true"></i>&nbsp;Results</Link>
                            <Link to={this.resultsLink(poll.name)} className="margin-horizontal--small"><i className="fa fa-lg fa-gear" aria-hidden="true"></i>&nbsp;Manage</Link>
                        </td>
                    </tr>
                )}
                </tbody>
        </table>;
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