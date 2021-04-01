import classes from './ProductModel.module.css';
import React from 'react';


const productModel = (props) => {
    return (
        <div className={classes.ProductModel}>
            <p className={classes.itemName}>{props.name}</p>
            <img src={props.img} height={100} width={100}/>
            <p>${props.price}</p>
            <div className={classes.BottomBar} style={props.count > 0 ? {backgroundColor: "#efa31d"} : {backgroundColor: ""}}>
                {props.count > 0 ? <button onClick={props.remove} style={{backgroundColor: "#efa31d"}}>-</button> : <button disabled={true} className={classes.disabledBtn} onClick={props.remove}>-</button>}
                { props.count === 0 ? <p>ADD TO CART</p> : <p style={{fontWeight: "Bold", fontSize: "12px"}}>{props.count} ADDED</p>}
                {props.count > 0 ? <button className={classes.addBtn} onClick={props.add} style={{backgroundColor: "#efa31d"}}>+</button> : <button className={classes.addBtn} onClick={props.add}>+</button>}
            </div>
        </div>
    )
}

export default productModel;