import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../../sagas/components/products/products-saga";

class FetchProducts extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.getProducts();
    }
    render(){
        let { loading, error, products } = this.props; 
        return this.props.children({ loading, error, products });
    }
}

const mapStateToProps = state => ({
    loading: state.products.loading,
    error: state.products.error,
    products: state.products.allIds.map(id => state.products.byIds[id])
})

export default connect(mapStateToProps, { getProducts })(FetchProducts);