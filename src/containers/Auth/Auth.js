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
                    required: true
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
        isSignUp: false
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
        console.log("working");
        const userData = {
            "userName": `${this.state.controls.userName.value}`,
            "password": `${this.state.controls.password.value
            }`
        }
        if (this.state.isSignUp) {
            axios.post('http://onlinestoreserver.herokuapp.com/users/add', userData)
            .then(response => {
                console.log(response);
                this.props.onAuth(this.state.controls.userName.value, this.state.controls.password.value, null, null, null);
                localStorage.setItem('user', this.state.controls.userName.value);
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            console.log("logging in");
            axios.get('http://onlinestoreserver.herokuapp.com/users')
            .then(response => {
                let valid = false;
                let iterator;

                for (let i = 0; i < response.data.length; i++) {
/*                     console.log(response.data[i].userName, this.state.controls.userName.value);
                    console.log(response.data[i].password, this.state.controls.password.value); */
                    if (response.data[i].userName === this.state.controls.userName.value) {
                        if (response.data[i].password === this.state.controls.password.value) {
                            valid = true;
                            iterator = i;
                        }
                    }
                }
                console.log(valid);
                if (valid) {
                    this.props.onAuth(this.state.controls.userName.value, this.state.controls.password.value, response.data[iterator].orders, response.data[iterator].cart, response.data[iterator]._id);
                    localStorage.setItem('user', this.state.controls.userName.value);
                    this.props.history.push('/')
                }
                //dispatch
            })
            .catch(err => console.log(err))
        }
    }

    switchAuthMode() {
        this.setState({isSignUp: !this.state.isSignUp})
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

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {!this.state.isSignUp ? <h3>Log In</h3> : <h3>Sign Up</h3>}
                    {form}
                    <button>Submit</button>
                    <hr />
                </form>
                <button onClick={() => this.switchAuthMode()}>{!this.state.isSignUp ? "Switch to Sign Up" : "Switch to Log On"}</button>
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