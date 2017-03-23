import React from 'react';
import { connect } from 'react-redux';
import LoginStatus from './loginStatus.component';
import {getLoggedUser} from '../auth/actions';
import { browserHistory  } from 'react-router';
import classNames from 'classnames';
import { Link  } from 'react-router';

const Navigation = React.createClass({
    componentDidMount() {
        this.props.fetchData();
    },
    render() {
        var user = this.props.data.user || {};
        var displayLoginStatus = !!this.props.data.user;
        var partial = '';
        var pageInfo = this.props.data.pageInfo || {};
        var dashboardActive = classNames({ active : pageInfo.active === 'dashboard', hidden : !displayLoginStatus });
        var interactionActive = classNames({active: pageInfo.active === 'interaction', hidden : !displayLoginStatus});
        if(displayLoginStatus) {
            partial = <li className="dropdown">
                <a id="loginStatusUser" href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user"></i> {user.firstName} {user.lastName} <b className="caret"></b></a>
                <LoginStatus />
            </li>;
        }

        return <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand padding--zero flex-row flex--vertical-center" href="/">
                        <img src="/img/theme/s4f-poziom.png" />
                        <span className="margin-horizontal--medium">Admin</span>
                </a>
            </div>
            <ul className="nav navbar-right top-nav">
                {partial}
            </ul>
            <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav side-nav">
                    <li className={dashboardActive}>
                        <Link to="/dashboard"><i className="fa fa-fw fa-dashboard"></i> Dashboard</Link>
                    </li>
                    <li className="hidden">
                        <a href="charts.html"><i className="fa fa-fw fa-bar-chart-o"></i> Charts</a>
                    </li>
                    <li className="hidden">
                        <a href="tables.html"><i className="fa fa-fw fa-table"></i> Tables</a>
                    </li>
                    <li className={interactionActive}>
                        <Link to="/interaction"><i className="fa fa-fw fa-edit"></i> Interactions</Link>
                    </li>
                    <li className="hidden">
                        <a href="bootstrap-elements.html"><i className="fa fa-fw fa-desktop"></i> Bootstrap Elements</a>
                    </li>
                    <li className="hidden">
                        <a href="bootstrap-grid.html"><i className="fa fa-fw fa-wrench"></i> Bootstrap Grid</a>
                    </li>
                    <li className="hidden">
                        <a href="javascript:;" data-toggle="collapse" data-target="#demo"><i className="fa fa-fw fa-arrows-v"></i> Dropdown <i className="fa fa-fw fa-caret-down"></i></a>
                        <ul id="demo" className="collapse">
                            <li>
                                <a href="#">Dropdown Item</a>
                            </li>
                            <li>
                                <a href="#">Dropdown Item</a>
                            </li>
                        </ul>
                    </li>
                    <li className="hidden">
                        <a href="blank-page.html"><i className="fa fa-fw fa-file"></i> Blank Page</a>
                    </li>
                    <li className="hidden">
                        <a href="index-rtl.html"><i className="fa fa-fw fa-dashboard"></i> RTL Dashboard</a>
                    </li>
                </ul>
            </div>
        </nav>;
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(getLoggedUser())
    };
};

export default connect(
    state => ({ data: state.navigation }),
    mapDispatchToProps
)(Navigation);