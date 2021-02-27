

const defaultState = {
    byIds: {
        ["ID"]: {
            loading: false,
            error: false,
            user: undefined,
            validationErrors: undefined,
        }

    },
    allIds: [],
    postUsers: {}
}

const authReducer = (state = defaultState, action) => {
    let { allIds, byIds } = state;
    switch(action.type) {
        case "POST_AUTH_SUCCESS":
            let user = action.payload.data.user;
            if (state.allIds.indexOf(user.id) === -1) state.allIds.push(user.id);
            state.byIds[user.id] = { ...user, _currentUser: true };
            return { ...state, byIds: { ...byIds }, allIds: [ ...allIds ] }
        case "POST_USERS_REQUEST": 
            return { ...state, postUsers: { loading: true } }
        case "POST_USERS_SUCCESS":
            alert(action.payload.data.token)
            localStorage.setItem("voltox_ecommerce_example:token",action.payload.data.token)
            if (allIds.indexOf(action.payload.data.user.id) === -1)
                allIds.push(action.payload.data.user.id)
            byIds[action.payload.data.user.id] = action.payload.data.user
            return { ...state, postUsers: { loading: false, data: action.payload } }
        case "POST_USERS_FAILED":
            return { ...state, postUsers: { loading: false, error: action.error } }

        default:
            return state;
    }
}

export default authReducer;