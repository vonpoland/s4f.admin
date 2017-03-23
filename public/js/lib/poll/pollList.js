import React from 'react';
import { connect } from 'react-redux';
import { Link  } from 'react-router';
import {fetchPollsIfNeeded, notificationHasBeenDisplayed} from './actions';

const PollList = React.createClass({
    link(pollId, action) {
        return '/interaction/' + pollId + '/' + action;
    },
    projectorLink(poll) {
        return this.props.projectorUrl + '/' + poll.parent + '/' + poll.name;
    },
    mobileLink(poll) {
        return this.props.mobileUrl + '/' + poll.name;
    },
    liveIcon(isLive) {
        if (isLive === true) {
            return <i className="fa fa-circle icon--live" title="Poll online" aria-hidden="true"></i>;
        } else if (isLive === false) {
            return <i className="fa fa-circle icon--not-live" title="Poll offline" aria-hidden="true"></i>;
        }
        return <i className="fa fa-circle icon--not-sure" title="Finish or Start date not set" aria-hidden="true"></i>;
    },

    saveSuccessNotification() {
        return this.props.polls.successMessage ? <div className="alert alert-success">
            <strong>{this.props.polls.successMessage}</strong>
        </div> : '';
    },

    render() {
        var polls = this.props.polls.polls || [];
        return <div>{this.saveSuccessNotification()}
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th className="hidden-xs">Big Screen Preview</th>
                    <th className="hidden-xs">Mobile Preview</th>
                    <th className="hidden-xs">Manage Settings</th>
                    <th className="visible-xs-block">&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {polls.map(poll =>
                    <tr key={poll.id}>
                        <td>{poll.name}</td>
                        <td>{this.liveIcon(poll.isLive)}</td>
                        <td className="hidden-xs"><a href={this.projectorLink(poll)} target="_blank" className="btn btn-link">Telebim</a></td>
                        <td className="hidden-xs"><a href={this.mobileLink(poll)} target="_blank" className="btn btn-link">Mobile</a></td>
                        <td className="hidden-xs flex">
                            <div>
                                <Link to={this.link(poll.id, 'edit')} data-edit={poll.name} className="link--edit margin-horizontal--small">
                                    <i className="fa fa-lg fa-pencil" aria-hidden="true"></i>&nbsp;Edit</Link>
                            </div>
                            <div>
                                <Link to={this.link(poll.id, 'results')} data-view={poll.name} className="margin-horizontal--small">
                                    <i className="fa fa-lg fa-eye" aria-hidden="true"></i>&nbsp;Results</Link>
                            </div>
                            <div>
                                <Link to={this.link(poll.id, 'manage')} data-manage={poll.name} className="margin-horizontal--small">
                                    <i className="fa fa-lg fa-gear" aria-hidden="true"></i>&nbsp;Manage</Link>
                            </div>
                        </td>
                        <td className="visible-xs">
                            <div className="dropdown">
                                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <i className="fa fa-caret-down"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" style={{minWidth: '90px'}}>
                                    <div>
                                        <Link to={this.link(poll.id, 'edit')} data-edit={poll.name} className="link--edit margin-horizontal--small">
                                            <i className="fa fa-lg fa-pencil" aria-hidden="true"></i>&nbsp;Edit</Link>
                                    </div>
                                    <div>
                                        <Link to={this.link(poll.id, 'results')} data-view={poll.name} className="margin-horizontal--small">
                                            <i className="fa fa-lg fa-eye" aria-hidden="true"></i>&nbsp;Results</Link>
                                    </div>
                                    <div>
                                        <Link to={this.link(poll.id, 'manage')} data-manage={poll.name} className="margin-horizontal--small">
                                            <i className="fa fa-lg fa-gear" aria-hidden="true"></i>&nbsp;Manage</Link>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>;
    },
    componentDidMount() {
        this.props.fetchPolls();
        this.props.notificationDisplayed();
    }
});

const mapStateToProps = state => ({
    projectorUrl: state.config.projectorUrl,
    mobileUrl: state.config.mobileUrl,
    polls: state.polls || {}
});

const mapDispatchToProps = dispatch => ({
    fetchPolls: () => dispatch(fetchPollsIfNeeded()),
    notificationDisplayed: () => dispatch(notificationHasBeenDisplayed())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PollList);