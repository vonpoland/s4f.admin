import React from 'react';
import { Link } from 'react-router';
import Navigation from './navigation/navigation.component';
import Heading from './navigation/heading.component';

const App = React.createClass({
    render() {
        return <div id="wrapper">
            <Navigation />
            <div id="page-wrapper">
                <div className="container-fluid">
                    <Heading />
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
});

export default App