import React from 'react';
import classes from './CartItem.module.css';

const cartItem = (props) => {
    return (
        <div className={classes.CartItem}>
            <p>{props.name}</p>
            <p>${props.price.toFixed(2)}</p>
            <p>x{props.count}</p>
            <div className={classes.btnContainer}>
                <button className={classes.addBtn} onClick={props.add}>+</button>
                <button className={classes.subtractBtn} onClick={props.remove}>-</button>
            </div>
        </div>
    )
}

export default cartItem;