import classes from '../Fruit/Fruit.module.css';
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductModel from '../../../components/UI/ProductModel/ProductModel';
import * as actionTypes from '../../../store/actions/actionTypes';
//Images
import berryMedley from '../../../assets/Frozen/FrozenBerryMedley.jpg';
import blackberries from '../../../assets/Frozen/FrozenBlackberries.jpg';
import blueberries from '../../../assets/Frozen/FrozenBlueberries.jpg';
import broccoli from '../../../assets/Frozen/FrozenBroccoliFlorets.jpg';
import corn from '../../../assets/Frozen/FrozenCorn.jpg';
import greenPeas from '../../../assets/Frozen/FrozenGreenPeas.jpg';
import mixedVegetables from '../../../assets/Frozen/FrozenMixedVegetables.jpg';
import strawberries from '../../../assets/Frozen/FrozenStrawberries.jpg';

class Frozen extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {
        let fruit = [];
        let products = JSON.parse(localStorage.getItem('products'));
        for (let i = 0; i < products.length; i++) {
            if (products[i].type === "Frozen") {
                fruit.push(products[i]);
            }
        }
        this.setState({products: fruit})
    }

    addHandler(name, price) {
        if (this.props.user === null) {
            //this.props.history.push('auth');
            window.alert('Please log in to add items to cart');
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
            { name: "Frozen Berry Medley", img: berryMedley },
            { name: "Frozen Blackberries", img: blackberries },
            { name: "Frozen Blueberries", img: blueberries },
            { name: "Frozen Broccoli Florets", img: broccoli },
            { name: "Frozen Corn", img: corn },
            { name: "Frozen Green Peas", img: greenPeas },
            { name: "Frozen Mixed Vegetables", img: mixedVegetables },
            { name: "Frozen Strawberries", img: strawberries }
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
        
        let frozenItems = this.state.products;

        return (
            <div className={classes.Fruit}>
                <h3>Frozen Fruit and Vegetables</h3>
                <div className={classes.FruitContainer}>
                    {frozenItems.map((item, index) => {
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
        onUpdateCart: (account) => dispatch({type: actionTypes.UPDATE_CART, account}),
        onInitProducts: (productsArr) => dispatch({type: actionTypes.INIT_PRODUCTS, productsArr})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Frozen);