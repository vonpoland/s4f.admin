import React from 'react';
import { connect } from 'react-redux';
import {login} from './actions';
import {hasAnyErrorsSet} from '../errors/service';
import classNames from 'classnames';

const Login = React.createClass({
    getInitialState() {
        return {password: '', user: ''};
    },
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    },
    handleLoginChange(event) {
        this.setState({user: event.target.value});
    },
    render() {
        var onLogin = this.props.onLogin;
        var logging = this.props.data.logging;
        var hasUserameError = hasAnyErrorsSet(this.props.data.validation.username) ? 'has-error' : '';
        var hasPasswordError = hasAnyErrorsSet(this.props.data.validation.password) ? 'has-error' : '';

        var usernameClass = classNames('form-group', { 'has-error' : hasAnyErrorsSet(this.props.data.validation.username) });
        var passwordClass = classNames('form-group', { 'has-error' : hasAnyErrorsSet(this.props.data.validation.password) });

        return <div className="container-row container--vertical-center container--center ui-height-page-max">
            <form role="form">
                <div className={usernameClass} class={hasUserameError}>
                    <label>
                        <span className="ui-text--white">Login</span>
                        <input className="form-control" disabled={logging} type="text" onChange={this.handleLoginChange}/>
                    </label>
                </div>
                <div className={passwordClass} class={hasPasswordError}>
                    <label>
                        <span className="ui-text--white">Password</span>
                        <input className="form-control" disabled={logging} onChange={this.handlePasswordChange} type="password"/>
                    </label>
                </div>
                <div>
                    <button type="button" className="btn btn-primary"
                            disabled={logging}
                            onClick={() => onLogin(this.state.user, this.state.password)}>Login
                    </button>
                </div>
            </form>
        </div>;
    }
});

export default connect(
    state => ({ data: state.authData }),
    dispatch => () => ({onLogin: (user, password) => dispatch(login(user, password))})
)(Login);