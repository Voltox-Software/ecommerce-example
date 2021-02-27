
import { combineReducers } from 'redux';
import authReducer from "./auth";
import productsReducer from "./products";
import meReducer from "./me";
import usersReducer from "./users";
import getValidationErrorsReducer from "./validationErrors";


const validationErrorsReducer = getValidationErrorsReducer(
    {
        phase1: { "USER": "users", "AUTH": "auth", "COUNTR": "countries" },
    }
)

export default combineReducers({
    auth: authReducer,
    me: meReducer,
    users: usersReducer,
    products: productsReducer,
    validationErrors: validationErrorsReducer
});