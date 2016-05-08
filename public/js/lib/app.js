import React from 'react';
import { Link } from 'react-router';
import Navigation from './navigation/navigation.component';

const App = React.createClass({
    render() {
        return <div>
            <Navigation />
            {this.props.children}
        </div>;
    }
});

export default App