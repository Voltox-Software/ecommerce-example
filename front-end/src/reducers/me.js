import store from "../store"

const defaultState = {
    myCart: {
        loading: true,
        error: undefined,
        cart: undefined,
        cachedCart: undefined
    },
    loading: false,
    error: undefined
} 

const meReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "GET_MY_CART_REQUEST": 
            return { 
                ...state,
                myCart: {
                    loading: true,
                    cachedCart: state.myCart.cachedCart
                }
            }
        case "GET_MY_CART_SUCCESS":
            let { cart: myCart } = action.payload.data
            return { 
                ...state,
                myCart: {
                    cart: myCart,
                    cachedCart: myCart
                } 
            }
        case "GET_MY_CART_FAILED":
            return { 
                ...state,
                myCart: {
                    error: action.error,
                }
            }
        default:
            return state;
    }
}

export default meReducer;