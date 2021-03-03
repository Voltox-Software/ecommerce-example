import React from "react";
import axios from "../../axios";

class BuyProductButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            already_bought: undefined,
        }
    }
    setAlreadyBought = async () => {
        let data = await axios("/me/cart/has/item/products/" + this.props.id)
        console.log({data})
        this.setState({ already_bought: data.data.data.value })
    }
    componentDidMount(){
        this.setAlreadyBought()
    }
    addToCart = async () => {
        console.log({ method: "POST", headers: {
            "Authorization": "Bearer " + localStorage.getItem("voltox_ecommerce_example:token")
        } })
        let data = await axios("/me/cart/add/item/products/" + this.props.id, { method: "POST", headers: {
            "Authorization": "Bearer " + localStorage.getItem("voltox_ecommerce_example:token")
        } })
        this.setAlreadyBought();
        this.props.getCartItemsCount();
    }
    render(){
        let { already_bought } = this.state;
        let backgroundColor;
        let text;
        if (already_bought === undefined) {
            text = "Add to cart"
        }
        else if (already_bought) {
            backgroundColor = "gray"
            text = "Added to cart"
        }
        else {
            text = "Add to cart"
        }
        let onClick = already_bought ? undefined : this.addToCart
        return (
            <button style={{cursor:"pointer"}} disabled={Boolean(backgroundColor)} onClick={onClick} className="btn btn-light text-primary btn-sm">
                {text}
            </button>
        )
    }
}

export default BuyProductButton;