import * as actionTypes from './actions/actionTypes';

const initialState = {
    products: null,
    activeUser: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_PRODUCTS:
            return {
                ...state,
                products: action.productsArr
            }
        case actionTypes.ACTIVATE_USER:
            return {
                ...state,
                activeUser: action.userData
            }
        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                activeUser: null
            }
        case actionTypes.UPDATE_CART:
            return {
                ...state,
                activeUser: action.account
            }
        case actionTypes.RESET_CART:
            console.log("reset");
            return {
                ...state,
                activeUser: action.account
            };
        default:
            console.log('default');
    }
        

    return state;
}

export default reducer;