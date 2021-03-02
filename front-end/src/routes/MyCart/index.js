import React from "react";
import FetchMyCart from "../../components/FetchMyCart";
import VoltoxBuyButton from "../../components/VoltoxBuyButton";
import axios from "../../axios";
import { Link } from "react-router-dom";

class MyCart extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    onSuccessPurchase = async () => {
        let res = await axios("/me/cart/purchase", {
            method: "POST",
            data: { v_charge_id: "not-implemented" },
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log({res})
        document.location.href="/";
    }
    render(){
        return (
            <React.Fragment>
                My Cart<hr/>
                <FetchMyCart>
                    { ({ loading, error, my_cart }) => {
                        if (loading) return null;
                        if (error) return error.message;
                        let { CartItems } = my_cart;
                        let products = CartItems.map(cart_item => cart_item.Product);
                        let total_price = 0;
                        products.map(product => total_price += product.price)
                        if (!products.length) return (
                            <React.Fragment>
                                <p>No items in cart</p>
                                <Link to="/">Go to products</Link>
                            </React.Fragment>
                        )
                        return (
                            <div>
                                {products.map(product => {
                                    return (
                                        <div>
                                            <img src={product.picture_url} width={100} height={50}/>
                                            {product.name} - ${product.price / 100}
                                        </div>
                                    )
                                })}
                                <hr/>
                                <div className="btn-block">
                                    Total price: ${total_price / 100}<br/>
                                    <VoltoxBuyButton 
                                        amount={total_price}
                                        onSuccess={this.onSuccessPurchase}
                                    />
                                </div>
                            </div>
                        )
                    }}
                </FetchMyCart>
            </React.Fragment>
        )
    }
}

export default MyCart;