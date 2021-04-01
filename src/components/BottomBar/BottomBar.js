import React from 'react';
import classes from './BottomBar.module.css';

const bottomBar = (props) => {
    return (<div className={classes.BottomBar}>
        <p className={classes.first}>eProduce Copyright 2020</p>
        <p>Contact Us:</p>
        <p>eproduce@gmail.com</p>
        <p>(562) 888-8080</p>
        <br />
    </div>
    )
}

export default bottomBar;