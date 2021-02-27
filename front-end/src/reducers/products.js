import store from "../store"

const defaultState = {
    byIds: {},
    allIds: [],
    loading: false,
    error: undefined

} 

const productsReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "GET_PRODUCTS_REQUEST": 
            state = {
                byIds: {},
                allIds: [],
                loading: true,
                error: undefined
            }
            return { ...state }
        case "GET_PRODUCTS_SUCCESS":
            let { products } = action.payload.data   
            for (let product of products) {
                state.byIds[product.id] = product
                if (state.allIds.indexOf(product.id) === -1)
                    state.allIds.push(product.id);
            }
            state.loading = false;
            state.error = false;
            return { 
                ...state, allIds: [ ...state.allIds ], byIds: { ...state.byIds }
             }
        case "GET_PRODUCTS_FAILED":
            state.loading = false;
            state.error = action.error;
            return { 
                ...state
            }
        default:
            return state;
    }
}

export default productsReducer;