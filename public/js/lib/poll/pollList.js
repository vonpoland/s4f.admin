import React from 'react';
import { connect } from 'react-redux';
import { Link  } from 'react-router';
import {fetchPollsIfNeeded} from './actions';

const PollList = React.createClass({
    link(pollName, action) {
        return '/admin/poll/' + pollName + '/' + action;
    },
    liveIcon(isLive) {
        if(isLive === true) {
            return <i className="fa fa-circle icon--live" title="Poll online" aria-hidden="true"></i>;
        } else if(isLive === false) {
            return <i className="fa fa-circle icon--not-live" title="Poll offline" aria-hidden="true"></i>;
        }
        return <i className="fa fa-circle icon--not-sure" title="Finish or Start date not set" aria-hidden="true"></i>;
    },
    render() {
        var polls = this.props.polls.polls || [];
        return <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Poll name</th>
                        <th>Status</th>
                        <th>Link</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                {polls.map(poll =>
                    <tr key={poll.name}>
                        <td>{poll.name}</td>
                        <td>{this.liveIcon(poll.isLive)}</td>
                        <td><button type="button" className="btn btn-link">Link</button></td>
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