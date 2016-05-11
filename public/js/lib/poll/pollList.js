import React from 'react';
import { connect } from 'react-redux';
import { Link  } from 'react-router';
import {fetchPollsIfNeeded} from './actions';

const PollList = React.createClass({
    link(pollName, action) {
        return '/admin/poll/' + pollName + '/' + action;
    },
    render() {
        var polls = this.props.polls.polls || [];
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
                            <Link to={this.link(poll.name, 'edit')} className="margin-horizontal--small"><i className="fa fa-lg fa-pencil" aria-hidden="true"></i>&nbsp;Edit</Link>&nbsp;
                            <Link to={this.link(poll.name, 'results')} className="margin-horizontal--small"><i className="fa fa-lg fa-eye" aria-hidden="true"></i>&nbsp;Results</Link>
                            <Link to={this.link(poll.name, 'manage')} className="margin-horizontal--small"><i className="fa fa-lg fa-gear" aria-hidden="true"></i>&nbsp;Manage</Link>
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
        fetchPolls: () => dispatch(fetchPollsIfNeeded())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PollList);