import React from "react";
import BuyProductButton from "../BuyProductButton";

class ProductItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        let { product } = this.props;
        return (
            <div style={{ borderColor: "black"}}>
                {product.name} - ${product.price / 100} - <BuyProductButton id={product.id}/>
            </div>
        )
    }
}

export default ProductItem;