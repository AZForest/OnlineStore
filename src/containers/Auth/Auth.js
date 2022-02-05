import React from 'react';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
/* import * as actions from '../../store/actions/index'; */
import * as actionTypes from '../../store/actions/actionTypes';
import axios from 'axios';


class Auth extends React.Component {
    state = {
        controls: {
            userName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    min_length: 6
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: false,
        noMatch: false,
        invalidSignUp: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        const userData = {
            "userName": `${this.state.controls.userName.value}`,
            "password": `${this.state.controls.password.value
            }`
        }
        
        if (this.state.isSignUp) {
            if (this.state.controls.userName.value.length >= 3 &&
                this.state.controls.password.value.length >= 6) {
                    axios.post('https://onlinestoreserver.herokuapp.com/users/add', userData)
                    .then(response => {
                        console.log(response);
                        axios.get('https://onlinestoreserver.herokuapp.com/users')
                        .then(res => {
                            let acc = res.data.find(account => account.userName === this.state.controls.userName.value);
                            this.props.onAuth(acc.userName, acc.password, acc.orders, acc.cart, acc._id);
                            localStorage.setItem('user', this.state.controls.userName.value);
                            this.props.history.push('/OnlineStore');
                        })
                        .catch(err => console.log(err));
                        //this.props.onAuth(this.state.controls.userName.value, this.state.controls.password.value, [], [], null);
                        
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                this.setState({invalidSignUp: true})
            } 
        } else {
            axios.get('https://onlinestoreserver.herokuapp.com/users')
            .then(response => {
                let valid = false;
                let iterator;

                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].userName === this.state.controls.userName.value) {
                        if (response.data[i].password === this.state.controls.password.value) {
                            valid = true;
                            iterator = i;
                        }
                    }
                }
                if (valid) {
                    this.props.onAuth(this.state.controls.userName.value, this.state.controls.password.value, response.data[iterator].orders, response.data[iterator].cart, response.data[iterator]._id);
                    localStorage.setItem('user', this.state.controls.userName.value);
                    this.props.history.push('/OnlineStore')
                } else {
                    this.setState({noMatch: true});
                }
                //dispatch
            })
            .catch(err => console.log(err))
        }
    }

    switchAuthMode() {
        this.setState({isSignUp: !this.state.isSignUp, noMatch: false, invalidSignUp: false})
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let thing = ["Username", "Password"];

        const form = formElementsArray.map((formElement, i) => (
            <Input 
                label={thing[i]}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )}/>
        ))

        let message = "";
        if (this.state.controls.password.value.length > 0) {
            if (this.state.controls.password.value.length < this.state.controls.password.validation.minLength) {
                message = <p style={{color: "red", fontSize: "10px"}}>Password too short, must be 6 characters</p>
            } else {
                message = <p style={{color: "#13b955", fontSize: "10px"}}>Password valid ✓</p>
            }
        } 

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {!this.state.isSignUp ? <h3>Log In</h3> : <h3>Sign Up</h3>}
                    {form}
                    {/*this.state.controls.password.value.length < this.state.controls.password.validation.minLength ? <p style={{color: "red", fontSize: "10px"}}>Password too short, must be 6 characters</p> : <p style={{color: "#13b955", fontSize: "10px"}}>Password valid ✓</p>*/}
                    {message}
                    {this.state.noMatch ? <p className={classes.noMatch}>Username/Password combination does not match any in our records</p> : ""}
                    {this.state.invalidSignUp ? <p className={classes.noMatch}>Invalid Signup Name/Password</p> : ""}
                    <button>Submit</button>
                    <hr />
                </form>
                <button onClick={() => this.switchAuthMode()}>{!this.state.isSignUp ? "Switch to Sign Up" : "Switch to Log In"}</button>
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (name, password, orders, cart, id) => dispatch({type: actionTypes.ACTIVATE_USER, userData: { userName: name, password: password, orders: orders, cart: cart, id: id } })
    };
};

export default connect(null, mapDispatchToProps)(Auth);