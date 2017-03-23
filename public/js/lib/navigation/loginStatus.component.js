import React from 'react';
import { connect } from 'react-redux';
import {logout} from '../auth/actions';

const LoginStatus = React.createClass({
    render() {
        var logout = this.props.logout;

        return <ul className="dropdown-menu">
            <li>
                <a href="#" id="btnLogout" onClick={logout}><i className="fa fa-fw fa-power-off"></i> Log Out</a>
            </li>
        </ul>;
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    };
};

export default connect(
    state => ({data: state.authData}),
    mapDispatchToProps
)(LoginStatus);