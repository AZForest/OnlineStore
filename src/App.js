
import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from './hoc/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Fruit from './containers/Products/Fruit/Fruit';
import Frozen from './containers/Products/Frozen/Frozen';
import Vegetables from './containers/Products/Vegetables/Vegetables';
import Bakery from './containers/Products/Bakery/Bakery';
import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import Cart from './containers/User/Cart/Cart';
import Account from './containers/User/Account/Account';
import * as actionTypes from './store/actions/actionTypes';
import { connect } from 'react-redux';


class App extends React.Component {

  /* useEffect(() => {
      axios.get('http://localhost:3005/products')
      .then(response => {
          console.log(response);
          props.onInitProducts(response);
      })
      .catch(err => console.log(err))
  }, []) */
  componentDidMount() {
    axios.get('https://onlinestoreserver.herokuapp.com/products')
      .then(response => {
          console.log(response.data);
          this.props.onInitProducts(response.data);
          localStorage.setItem('products', JSON.stringify(response.data));
      })
      .catch(err => console.log(err))

      if (localStorage.getItem('user') !== null) {
          axios.get('https://onlinestoreserver.herokuapp.com/users')
          .then(response => {
            for (let i = 0; i < response.data.length; i++) {
              //console.log(localStorage.getItem('user'));
              if (response.data[i].userName === localStorage.getItem('user')) {
                this.props.onAuth(response.data[i].userName, response.data[i].password, response.data[i].orders, response.data[i].cart, response.data[i]._id);
              }
            }
          })
      }
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/OnlineStore" exact component={Home}/>
            <Route path="/OnlineStore/Fruit" component={Fruit}/>
            <Route path="/OnlineStore/Frozen" component={Frozen}/>
            <Route path="/OnlineStore/Vegetables" component={Vegetables}/>
            <Route path="/OnlineStore/Bakery" component={Bakery}/>
            <Route path="/OnlineStore/Auth" component={Auth}/>
            <Route path="/OnlineStore/Cart" component={Cart}/>
            <Route path="/OnlineStore/Account" component={Account}/>
          </Switch>
        </Layout>
      </div>
    );
  }

  
}

const mapStateToProps = dispatch => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitProducts: (productsArr) => dispatch({type: actionTypes.INIT_PRODUCTS, productsArr}),
      onAuth: (name, password, orders, cart, id) => dispatch({type: actionTypes.ACTIVATE_USER, userData: { userName: name, password: password, orders: orders, cart: cart, id: id } })
    }
}

export default connect(null, mapDispatchToProps)(App);


