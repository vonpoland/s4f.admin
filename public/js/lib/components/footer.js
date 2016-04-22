import React from 'react';
import FilterLink from '../containers/FilterLink';
import { Link  } from 'react-router';

const Footer = () => (
    <p>
        <Link to="/tychy">tychy</Link>
        Show:
        {" "}
        <FilterLink filter="SHOW_ALL">
            All
        </FilterLink>
        {", "}
        <FilterLink filter="SHOW_ACTIVE">
            Active
        </FilterLink>
        {", "}
        <FilterLink filter="SHOW_COMPLETED">
            Completed
        </FilterLink>
    </p>
)

export default Footer
