import React from "react";
import FetchMyCart from "../../components/FetchMyCart";
import VoltoxBuyButton from "../../components/VoltoxBuyButton";

class MyCart extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <React.Fragment>
                dsadas`
                <FetchMyCart>
                    { ({ loading, error, my_cart }) => {
                        if (loading) return null;
                        if (error) return error.message;
                        let { CartItems } = my_cart;
                        let products = CartItems.map(cart_item => cart_item.Product);
                        let total_price = 0;
                        products.map(product => total_price += product.price)
                        return (
                            <div>
                                <hr/>
                                {products.map(product => {
                                    return (
                                        <div>
                                            <img src={product.picture_url} width={100} height={50}/>
                                            {product.name} - ${product.price / 100}
                                        </div>
                                    )
                                })}
                                <hr/>
                                Total price: ${total_price / 100}<br/>
                                <VoltoxBuyButton amount={total_price}/>
                            </div>
                        )
                    }}
                </FetchMyCart>
            </React.Fragment>
        )
    }
}

export default MyCart;