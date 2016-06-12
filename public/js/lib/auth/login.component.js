import React from 'react';
import { connect } from 'react-redux';
import {login} from './actions';
import {hasAnyErrorsSet} from '../errors/service';
import classNames from 'classnames';

const ENTER_KEY_CODE = 13;
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
    onKeyPress(event) {
        if (event.charCode === ENTER_KEY_CODE) {
            this.props.onLogin(this.state.user, this.state.password);
        }
    },
    validationFailed() {
        return this.props.data.loggingFailed ?
            <div id="loginFailedTxt" className="alert alert-danger"><strong>Login failed</strong> Please check if login and password are correct.</div> : <div></div>;
    },
    render() {
        var onLogin = this.props.onLogin;
        var logging = this.props.data.logging;
        var usernameClass = classNames('form-group', {'has-error': hasAnyErrorsSet(this.props.data.validation.username)});
        var passwordClass = classNames('form-group', {'has-error': hasAnyErrorsSet(this.props.data.validation.password)});

        return <div className="flex-row flex--vertical-center flex--center ui-height-page-max">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Sign in</h3>
                </div>
                <div className="panel-body">
                    <form role="form" onKeyPress={this.onKeyPress}>
                        {this.validationFailed()}
                        <div className={usernameClass}>
                            <label className="ui-width--max">
                                <span>Login</span>
                                <input id="txtLogin" className="form-control" disabled={logging} type="text"
                                       onChange={this.handleLoginChange}/>
                            </label>
                        </div>
                        <div className={passwordClass}>
                            <label className="ui-width--max">
                                <span>Password</span>
                                <input id="txtPassword" className="form-control" disabled={logging} onChange={this.handlePasswordChange}
                                       type="password"/>
                            </label>
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary"
                                    disabled={logging}
                                    onClick={() => onLogin(this.state.user, this.state.password)}>Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>;
    }
});

export default connect(
    state => ({data: state.authData}),
    dispatch => () => ({onLogin: (user, password) => dispatch(login(user, password))})
)(Login);