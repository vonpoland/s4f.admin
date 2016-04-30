import React from 'react';
import { Link } from 'react-router';

const App = React.createClass({
    render() {
        return <div className="ui-text--white">
            <span >I', aaaaaaaaaaaaapp</span>
            <li><Link to="/admin/tychy">About</Link></li>
            {this.props.children}
        </div>;
    }
});

export default App