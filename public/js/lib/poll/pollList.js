import React from 'react';
import { connect } from 'react-redux';
import { Link  } from 'react-router';
import {fetchPollsIfNeeded} from './actions';

const PollList = React.createClass({
    link(pollId, action) {
        return '/admin/poll/' + pollId + '/' + action;
    },
    projectorLink(poll) {
        return this.props.projectorUrl + '/' + poll.parent + '/' + poll.name;
    },
    mobileLink(poll) {
        return this.props.mobileUrl + '/' + poll.name;
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
                        <th>Telebim Link</th>
                        <th>Mobile Link</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                {polls.map(poll =>
                    <tr key={poll.id}>
                        <td>{poll.name}</td>
                        <td>{this.liveIcon(poll.isLive)}</td>
                        <td><a href={this.projectorLink(poll)} target="_blank" className="btn btn-link">Telebim</a></td>
                        <td><a href={this.mobileLink(poll)} target="_blank" className="btn btn-link">Mobile</a></td>
                        <td>
                            <Link to={this.link(poll.id, 'edit')} className="margin-horizontal--small"><i className="fa fa-lg fa-pencil" aria-hidden="true"></i>&nbsp;Edit</Link>&nbsp;
                            <Link to={this.link(poll.id, 'results')} className="margin-horizontal--small"><i className="fa fa-lg fa-eye" aria-hidden="true"></i>&nbsp;Results</Link>
                            <Link to={this.link(poll.id, 'manage')} className="margin-horizontal--small"><i className="fa fa-lg fa-gear" aria-hidden="true"></i>&nbsp;Manage</Link>
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
    projectorUrl : state.config.projectorUrl,
    mobileUrl : state.config.mobileUrl,
    polls: state.polls || {}
});

const mapDispatchToProps = dispatch => ({fetchPolls: () => dispatch(fetchPollsIfNeeded())});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PollList);