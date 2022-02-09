import classes from '../Fruit/Fruit.module.css';
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductModel from '../../../components/UI/ProductModel/ProductModel';
import * as actionTypes from '../../../store/actions/actionTypes';
//Images
import broccoli from '../../../assets/Vegetables/Broccoli.jpg';
import celery from '../../../assets/Vegetables/Celery.jpg';
import cucumber from '../../../assets/Vegetables/Cucumber.jpg';
import greenPepper from '../../../assets/Vegetables/GreenBellPepper.jpg';
import redPepper from '../../../assets/Vegetables/RedBellPepper.jpg';
import romaTomato from '../../../assets/Vegetables/RomaTomato.jpg';
import yellowOnion from '../../../assets/Vegetables/YellowOnion.jpg';
import zucchini from '../../../assets/Vegetables/Zucchini.jpg';

class Vegetables extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {
        let fruit = [];
        let products = JSON.parse(localStorage.getItem('products'));
        for (let i = 0; i < products.length; i++) {
            if (products[i].type === "Vegetable") {
                fruit.push(products[i]);
            }
        }
        this.setState({products: fruit})
    }

    addHandler(name, price) {
        if (this.props.user === null) {
            window.alert('Please log in');
        } else {
            let data = {
                prevCart: this.props.user.cart,
                product: {
                    name: name,
                    price: price,
                    count: 1
                },
                updateCount: false
            }
            
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
            

            axios.patch(`https://onlinestoreserver.herokuapp.com/users/${this.props.user.id}/addProduct`, data)
            .then(response => {
                this.props.onUpdateCart(updatedAcc);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    removeHandler(name, price) {
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
        axios.patch(`https://onlinestoreserver.herokuapp.com/users/${this.props.user.id}/removeProduct`, data)
        .then(response => {
            console.log(response);
            this.props.onUpdateCart(updatedAcc);
        })
        .catch(err => {
            console.log(err);
        })
        
    }

    imageHandler(item) {

        let imgLibrary = [
            { name: "Broccoli", img: broccoli },
            { name: "Celery", img: celery },
            { name: "Cucumber", img: cucumber },
            { name: "Green Bell Pepper", img: greenPepper },
            { name: "Red Bell Pepper", img: redPepper },
            { name: "Roma Tomato", img: romaTomato },
            { name: "Yellow Onion", img: yellowOnion },
            { name: "Zucchini", img: zucchini }

        ]

        let result = imgLibrary.filter(obj => {
            return obj.name === item
        })

        return result[0].img;
    }

    countHandler(item) {
        if (this.props.user && this.props.user.cart) {
            let userCart = this.props.user.cart;
            let result = -1;
            for (let i = 0; i < userCart.length; i++) {
                if (userCart[i].name === item) {
                    result = userCart[i].count;
                }
            }
            if (result === -1) {
                return 0;
            } else {
                return result;
            }
        } else {
            return 0;
        }
    }

    render() {
        let vegetableItems = this.state.products;

        return (
            
            <div className={classes.Fruit}>
                <h3>Vegetables</h3>
                <div className={classes.FruitContainer}>
                    {vegetableItems.map((item, index) => {
                        return <ProductModel name={item.name}
                        type={item.type}
                        price={item.price}
                        key={item._id}
                        add={() => this.addHandler(item.name, item.price)}
                        remove={() => this.removeHandler(item.name, item.price)}
                        count={this.countHandler(item.name)}
                        img={this.imageHandler(item.name)}
                        />;
                    })}
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        user: state.activeUser,
        productsArr: state.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateCart: (account) => dispatch({type: actionTypes.UPDATE_CART, account})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vegetables);