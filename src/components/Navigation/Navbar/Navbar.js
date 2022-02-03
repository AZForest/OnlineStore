
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
        this.props.history.push('/OnlineStore');
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
                    <h2><NavLink to="/OnlineStore">eProduce</NavLink></h2>
                    <div className={classes.navItems}>
                        <NavigationItem link="/OnlineStore/Fruit">Fruit</NavigationItem>
                        <NavigationItem link="/OnlineStore/Vegetables">Vegetables</NavigationItem>
                        <NavigationItem link="/OnlineStore/Bakery">Bakery</NavigationItem>
                        <NavigationItem link="/OnlineStore/Frozen">Frozen</NavigationItem>
                    </div>
                </div>
                <div className={classes.left}>
                    {this.props.activeAcc === null ? <NavigationItem link="/OnlineStore/Auth">Log in / Sign Up</NavigationItem> : <NavigationItem link="/OnlineStore/Account">{this.props.activeAcc.userName}</NavigationItem>}
                    {this.props.activeAcc === null ? "" : <NavigationItem link="/OnlineStore/Cart">My Cart ({this.props.activeAcc.cart.length !== null ? totalItems : ""})</NavigationItem>}
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