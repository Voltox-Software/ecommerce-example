import React from "react";
import { getMyCart } from "../../sagas/components/me/me-saga";
import { connect } from "react-redux";

class FetchMyCart extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.getMyCart()
    }
    render(){
        let { loading, error, my_cart } = this.props;
        return this.props.children({ loading, error, my_cart });
    }
}

const mapStateToProps = state => ({
    loading: state.me.myCart.loading,
    error: state.me.myCart.error,
    my_cart: state.me.myCart.cachedCart,
})

export default connect(mapStateToProps, { getMyCart })(FetchMyCart);