import React from 'react';
import { connect } from 'react-redux';
import {fetchPollsIfNeeded} from './actions';
import {livePollCount} from './poll.service';
import { Link } from 'react-router';

const LivePolls = React.createClass({
    render() {
        return <div className="panel panel-green">
            <div className="panel-heading">
                <div className="row">
                    <div className="col-xs-3">
                        <i className="fa fa-tasks fa-5x"></i>
                    </div>
                    <div className="col-xs-9 text-right">
                        <div className="huge">{this.props.livePollCount}</div>
                        <div>My Live Interactions</div>
                    </div>
                </div>
            </div>
            <div className="panel-footer">
                <div className="pull-left"><Link to="/admin/interaction">View Details</Link></div>
                <div className="pull-right">
                    <Link to="/admin/interaction"><i className="fa fa-arrow-circle-right"></i></Link>
                </div>
                <div className="clearfix"></div>
            </div>
        </div>;
    },
    componentDidMount() {
        this.props.fetchPolls();
    }
});

const mapStateToProps = state => ({
    livePollCount: livePollCount(state.polls.polls)
});

const mapDispatchToProps = dispatch => ({fetchPolls: () => dispatch(fetchPollsIfNeeded())});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LivePolls);