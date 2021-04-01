import classes from './Home.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import homeImg from '../../assets/HomeImages/produceImg.jpeg';
import HomeItem from '../../components/UI/HomeItem/HomeItem';
import fruitImg from '../../assets/HomeImages/fruitImg.jpeg';
import vegImg from '../../assets/HomeImages/vegImg.jpg';
import bakeryImg from '../../assets/HomeImages/breadImg.jpg';
import frozenImg from '../../assets/HomeImages/frozenImg.jpeg';
import eLogo2 from '../../assets/HomeImages/logo.png';
import BottomBar from '../../components/BottomBar/BottomBar';

class Home extends React.Component {

    /* useEffect(() => {
        axios.get('http://localhost:3005/products')
        .then(response => {
            console.log(response);
        })
        .catch(err => console.log(err))
    }, []) */
    render() {
        let fruitMsg = "Fresh Fruit from our local farms";
        let vegMsg = "Locally-grown vegetables";
        let bakeryMsg = "Baked goods including bread and deserts";
        let frozenMsg = "Frozen fruit, vegetables, and more";
        return (
            <React.Fragment>
                <div className={classes.Home}>
                    <div className={classes.backDrop}>
                        <div className={classes.circle1}></div>
                        <div className={classes.circle2}></div>
                        <div className={classes.circle3}></div>
                        <div className={classes.circle4}></div>
                        <div className={classes.circle5}></div>
                        <h2><span>e</span>Pr<span>o</span>d<span>u</span>ce</h2>
                        <img style={{filter: "grayscale(100%)"}}src={eLogo2} height={100} width={110}/>
                        <p className={classes.tag}>Get your produce, bakery, and frozen needs shipped directly to your house in just days.</p>
                    </div>
                    <p className={classes.desc}>Check out our Fresh Produce, Bakery Goods, and Frozen Goods below.</p>
                    {/* <p>Get Started Below</p> */}
                    <div className={classes.HomeItemContainer}>
                        <HomeItem type="Fruit" img={fruitImg} click={() => this.props.history.push('/Fruit')} message={fruitMsg}/>
                        <HomeItem type="Vegetables" img={vegImg} click={() => this.props.history.push('/Vegetables')} message={vegMsg}/>
                        <HomeItem type="Bakery" img={bakeryImg} click={() => this.props.history.push('/Bakery')} message={bakeryMsg}/>
                        <HomeItem type="Frozen" img={frozenImg} click={() => this.props.history.push('/Frozen')} message={frozenMsg}/>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    
}

const mapStateToProps = state => {
    return {
        productsCol: state.products
    }
}

/* const mapDispatchToProps = dispatch => {

} */

export default connect(mapStateToProps)(Home);