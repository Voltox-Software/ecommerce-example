import React from "react";
import { connect } from "react-redux";

export default WrappedComponent => {
    let _Comp = props => <WrappedComponent {...props} />
    let Comp = connect(
        state => ({ 
            current_user: state.auth.user
        })
    )(_Comp);
    return Comp;
}