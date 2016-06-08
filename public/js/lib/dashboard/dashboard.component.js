import React from 'react';
import { connect } from 'react-redux';
import LivePolls from '../poll/livePolls.component';
const Dashboard = React.createClass({
    render () {
        return <div className="row">
            <div className="col-lg-3 col-md-6">
                <LivePolls></LivePolls>
            </div>
        </div>;
    }
});

export default connect(
    state => ({data: state.dashboard})
)(Dashboard);