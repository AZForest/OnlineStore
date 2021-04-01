import React from 'react';
import classes from './Modal.module.css';

const modal = (props) => {
    return (
        <div className={classes.Modal}>
            <div className={classes.ModalContent}>
                <div className={classes.X} onClick={props.xClick}>X</div>
                <div className={classes.message}>{props.message}</div>
                <button style={{backgroundColor: "#13b955"}} onClick={props.order}>Place Order</button>
                <button style={{backgroundColor: "#efa31d"}} onClick={props.xClick}>Modify Order</button>
            </div>
        </div>
    )
}

export default modal;