import axios from 'axios';
import { connect } from 'react-redux';

const addHandler = (name, price) => {
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


    axios.patch(`http://localhost:3005/users/${this.props.user.id}/add`, data)
    .then(response => {
        console.log(response);
        this.props.onUpdateCart(updatedAcc);
    })
    .catch(err => {
        console.log(err);
    })
}

const removeHandler = (name, price) => {
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
    axios.patch(`http://localhost:3005/users/${this.props.user.id}/remove`, data)
    .then(response => {
        console.log(response);
        this.props.onUpdateCart(updatedAcc);
    })
    .catch(err => {
        console.log(err);
    })
    
}

/* const mapStateToProps = state => {
    return {
        user: state.activeUser,
        productsArr: state.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateCart: (account) => dispatch({type: actionTypes.UPDATE_CART, account})
    }
} */

export const remover = removeHandler;