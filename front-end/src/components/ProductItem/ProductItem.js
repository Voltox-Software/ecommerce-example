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
            <div className="col-md-3">
                <figure className="itemside mb-4">
                <div className="aside"><img style={{ width: "100%", height: "100%" }} src={product.picture_url} className="border img-sm" /></div>
                <figcaption className="info align-self-center">
                    <p href="#" className="title">{product.name}</p><br/>
                    <BuyProductButton id={product.id}/>
                </figcaption>
                </figure>
            </div>
        )
        return (
            <div style={{ borderColor: "black"}}>
                {product.name} - ${product.price / 100} - <BuyProductButton id={product.id}/>
            </div>
        )
    }
}

export default ProductItem;