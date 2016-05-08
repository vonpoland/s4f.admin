import React from 'react';
import { connect } from 'react-redux';

const Dashboard = React.createClass({
    render () {
        return <div>
            I'm dashboard yeeee
        </div>;
    }
});

export default connect(
    state => ({data: state.dashboard})
)(Dashboard);