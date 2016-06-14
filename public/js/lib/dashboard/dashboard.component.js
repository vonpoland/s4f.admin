import React from 'react';
import { connect } from 'react-redux';
import LivePolls from '../poll/livePolls.component';
import { Link  } from 'react-router';

const Dashboard = React.createClass({
    render () {
        return <div className="row">
            <div className="col-lg-3 col-md-6">
                <LivePolls></LivePolls>
            </div>
            <div className="col-lg-3 col-md-6">
                <div className="panel panel-red">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-3">
                                <i className="fa fa-support fa-5x"></i>
                            </div>
                            <div className="col-xs-9 text-right">
                                <div className="huge">1</div>
                                <div>Demo interaction</div>
                            </div>
                        </div>
                    </div>
                    {this.props.polls.map(poll =>
                        <div className="panel-footer" key={poll.id}>
                            <span className="pull-left"><Link to={'/admin/poll/' + poll.id + '/manage'}>Manage</Link></span>
                            <div className="pull-right"><Link to={'/admin/poll/' + poll.id + '/manage'}><i className="fa fa-arrow-circle-right"></i></Link></div>
                            <div className="clearfix"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>;
    }
});

export default connect(
    state => ({polls: state.dashboard.polls})
)(Dashboard);