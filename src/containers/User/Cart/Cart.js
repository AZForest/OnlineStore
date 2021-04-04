import React from 'react';
import classes from './Cart.module.css';
import { connect } from 'react-redux';
import CartItem from '../../../components/UI/CartItem/CartItem';
import Modal from '../../../components/UI/Modal/Modal';
import axios from 'axios';
import * as actionTypes from '../../../store/actions/actionTypes';

class Cart extends React.Component {

    state = {
        modalVisible: false,
        totalPrice: 0,
        user: 0
    }

    componentDidMount() {
        if (localStorage.getItem('user') !== null) {
            axios.get('http://onlinestoreserver.herokuapp.com/users')
            .then(response => {
              for (let i = 0; i < response.data.length; i++) {
                //console.log(localStorage.getItem('user'));
                if (response.data[i].userName === localStorage.getItem('user')) {
                  /* this.props.onAuth(response.data[i].userName, response.data[i].password, response.data[i].orders, response.data[i].cart, response.data[i]._id); */
                }
              }
            })
        }
    }

    addHandler(name, price) {
        let data = {
            prevCart: this.props.user.cart,
            product: {
                name: name,
                price: price,
                count: 1
            },
            updateCount: true
        }
        
        //Determines if item exists in cart and count needs to be updated
        for (let i = 0; i < data.prevCart.length; i++) {
            if (data.prevCart[i].name === data.product.name) {
                data.updateCount = true;
            }
        }

        let updatedAcc;
        if (!data.updateCount) {
            updatedAcc = {
                ...this.props.user,
                cart: this.props.user.cart.concat(data.product)
            }
        } else {
            let element;
            for (let i = 0; i < this.props.user.cart.length; i++) {
                if (this.props.user.cart[i].name === data.product.name) {
                    element = i;
                }
            }
            let newAcc = this.props.user.cart;
            newAcc[element].count += 1;
            updatedAcc = {
                ...this.props.user,
                cart: newAcc
            }
        }


        axios.patch(`http://onlinestoreserver.herokuapp.com/users/${this.props.user.id}/addProduct`, data)
        .then(response => {
            console.log(response);
            this.props.onUpdateCart(updatedAcc);
        })
        .catch(err => {
            console.log(err);
        })
    }

    removeHandler = (name, price) => {
        let data = {
            prevCart: this.props.user.cart,
            product: {
                name: name,
                price: price,
                count: 1
            },
            updateCount: false
        }
        let cartArray = this.props.user.cart;

        let index2 = -1;
        for (let i = 0; i < cartArray.length; i++) {
            if (cartArray[i].name === data.product.name) {
                index2 = i;
                if (cartArray[i].count > 1) {
                    data.updateCount = true
                }
            }
        }
        if (!data.updateCount) {
            if (index2 >= 0) {
                cartArray.splice(index2, 1);
            }
        } else {
            cartArray[index2].count -= 1
        }

        let updatedAcc = {
            ...this.props.user,
            cart: cartArray
        }
       
        //PATCH remove
        axios.patch(`http://onlinestoreserver.herokuapp.com/users/${this.props.user.id}/removeProduct`, data)
        .then(response => {
            console.log(response);
            this.props.onUpdateCart(updatedAcc);
        })
        .catch(err => {
            console.log(err);
        })
        
    }

    finalizeOrder(total) {
        let data = {
            prevOrders: this.props.user.orders,
            newOrder: { 
                items: this.props.user.cart,
                totalPrice: total,
                date: new Date(),
                id: Math.random()
            }
        }
        let newOrders = this.props.user.orders;
        newOrders.push(data.newOrder);

        let updatedAcc = {
            ...this.props.user,
            orders: newOrders,
            cart: []
        }

        axios.patch(`http://onlinestoreserver.herokuapp.com/users/${this.props.user.id}/addOrder`, data)
        .then(response => {
            console.log(response);
            this.setModalVisible();
            axios.patch(`http://onlinestoreserver.herokuapp.com/users/${this.props.user.id}/resetCart`)
            .then(response => {
                console.log(response);
                this.props.onUpdateCart(updatedAcc);
            })
            .catch(err => console.log(err))
            /* this.props.onResetCart({
                ...this.props.user,
                cart: []
            }); */
            window.alert('Your order has been placed. Check your account page to view completed orders.');
            this.props.history.push('/OnlineStore');

        })
        .catch(err => {
            console.log(err);
        })
        
    }

    setModalVisible() {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    render() {
        let totalItems = 0;
        let price = 0;
        if (this.props.user !== null) {
            for (let i = 0; i < this.props.user.cart.length; i++) {
                totalItems += this.props.user.cart[i].count;
                price += this.props.user.cart[i].price * this.props.user.cart[i].count
            }
        }

        let modal = "";
        let message = `Place order for $${price.toFixed(2)}?`
        if (this.state.modalVisible) {
            modal = <Modal message={message} xClick={() => this.setModalVisible()} order={() => this.finalizeOrder(price.toFixed(2))}/>;
        }

        return (
            <React.Fragment>
                {modal}
                <div className={classes.Cart}>
                    <h2 >Your Cart</h2>
                    {this.props.user.cart.map(item => {
                        return <CartItem 
                        key={Math.random()} 
                        name={item.name} 
                        price={item.price}
                        count={item.count} 
                        add={() => this.addHandler(item.name, item.price)}
                        remove={() => this.removeHandler(item.name, item.price)}/>
                    })}
                    <hr />
                    <div>
                        <h4>Total Items: {totalItems}</h4>
                        <h4>Price: ${price.toFixed(2)} </h4>
                        <button className={classes.button} onClick={() => this.setModalVisible()} style={this.props.user.cart.length === 0 ? {marginBottom: "170px"} : {marginBottom: "10px"}} disabled={this.props.user.cart.length > 0 ? false : true}>Place Order</button>
                    </div>
                </div>
            </React.Fragment>
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
        onUpdateCart: (account) => dispatch({type: actionTypes.UPDATE_CART, account}),
        onResetCart: (cart) => dispatch({type: actionTypes.RESET_CART, cart}),
        onAuth: (name, password, orders, cart, id) => dispatch({type: actionTypes.ACTIVATE_USER, userData: { userName: name, password: password, orders: orders, cart: cart, id: id } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

/* export const Cart = connect(mapStateToProps, mapDispatchToProps)(Cart);
export const removeHandler = () => this.removeHandler(); */