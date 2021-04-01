import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';


const navigationItem = (props) => (
    <div className={classes.NavigationItem}>
        <p><NavLink to={props.link} exact={props.exact} activeClassName={classes.active} onClick={props.click}>{props.children}</NavLink></p>
    </div>
)

export default navigationItem;