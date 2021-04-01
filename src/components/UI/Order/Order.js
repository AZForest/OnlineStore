import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    let newDate = String(props.orderInfo.date);
    //newDate.slice(10);
    return (
        <div className={classes.Order}>
            <p><span>Date Placed:</span> {newDate}</p>
            <hr />
            {props.orderInfo.items.map(item => {
                return <div className={classes.Item} key={item.name}>
                            <p>{item.name}</p>
                            <p>${item.price.toFixed(2)}</p>
                            <p>x{item.count}</p>
                        </div>
            })}
            <div>
                <hr />
                <p><span>Total:</span> ${props.orderInfo.totalPrice}</p>
            </div>
            <button onClick={props.delete} className={classes.deleteBtn}>X</button>

        </div>
        
    )
}

export default order;