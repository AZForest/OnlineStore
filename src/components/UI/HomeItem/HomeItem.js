import React from 'react';
import classes from './HomeItem.module.css';

const homeItem = (props) => {
    return (
        <div className={classes.HomeItem}>
            <h4>{props.type}</h4>
            <img src={props.img} alt=""/>
            <p>{props.message}</p>
            <button onClick={props.click}>Browse</button>
        </div>
    )
}

export default homeItem;