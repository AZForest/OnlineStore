
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
import { connect } from 'react-redux';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import * as actionTypes from '../../../store/actions/actionTypes';
import { withRouter } from 'react-router-dom';

class Navbar extends React.Component {

    logOut() {
        localStorage.removeItem('user');
        console.log(this.props.history);
        this.props.history.push('/');
        this.props.onLogOut();
    }

    render() {
        let totalItems = 0;
        if (this.props.activeAcc !== null) {
            for (let i = 0; i < this.props.activeAcc.cart.length; i++) {
                totalItems += this.props.activeAcc.cart[i].count;     
            }
        }
        

        return (
            <div className={classes.Navbar}>
                <div className={classes.right}>
                    <h2><NavLink to="/">eProduce</NavLink></h2>
                    <NavigationItem link="/Fruit">Fruit</NavigationItem>
                    <NavigationItem link="/Vegetables">Vegetables</NavigationItem>
                    <NavigationItem link="/Bakery">Bakery</NavigationItem>
                    <NavigationItem link="/Frozen">Frozen</NavigationItem>
                </div>
                <div className={classes.left}>
                    {this.props.activeAcc === null ? <NavigationItem link="/Auth">Log in / Sign Up</NavigationItem> : <NavigationItem link="/Account">{this.props.activeAcc.userName}</NavigationItem>}
                    {this.props.activeAcc === null ? "" : <NavigationItem link="/Cart">My Cart ({this.props.activeAcc.cart.length !== null ? totalItems : ""})</NavigationItem>}
                    {this.props.activeAcc !== null ? <p className={classes.logout} style={{fontSize: "14px", fontWeight: "700", margin: "1px 5px", padding: "16px 12px 20px 12px"}} onClick={() => this.logOut()}>Log Off</p> : "" }
                </div>
                
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        activeAcc: state.activeUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch({type: actionTypes.LOGOUT_USER })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));