import React from 'react';
import classes from './Account.module.css';
import Order from '../../../components/UI/Order/Order';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionTypes from '../../../store/actions/actionTypes';

class Account extends React.Component {

    deleteOrder(order) {
        console.log(order);
        console.log(this.props.user.orders);
        let data = {
            orders: this.props.user.orders,
            delOrder: order
        }

        let orderArray = this.props.user.orders;

        let index = -1;
        for (let i = 0; i < orderArray.length; i++) {
            if (orderArray[i].id === data.delOrder.id) {
                index = i;
            }
        }
        if (index >= 0) {
            orderArray.splice(index, 1);
        }

        let updatedAcc = {
            ...this.props.user,
            orders: orderArray
        }
        console.log(orderArray);

        axios.patch(`http://onlinestoreserver.herokuapp.com/users/${this.props.user.id}/deleteOrder`, data)
        .then(response => {
            console.log(response);
            this.props.onUpdateCart(updatedAcc);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        let orders = <p style={{height: "300px"}}>You have not completed any orders</p>;
        if (this.props.user !== null) {
            if (this.props.user.orders.length > 0) {
                orders = this.props.user.orders.map(order => {
                    console.log(order);
                    return <Order key={Math.random()} orderInfo={order} delete={() => this.deleteOrder(order)}/>
                })
            }
            
        }
        return (
            <div className={classes.Account}>
                <h2>Your orders</h2>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.activeUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateCart: (account) => dispatch({type: actionTypes.UPDATE_CART, account})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);