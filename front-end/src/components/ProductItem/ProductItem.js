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
            <div className="col-lg-3 col-md-6 mb-4">
            {/*Card*/}
            <div className="card">
              {/*Card image*/}
              <div className="view overlay">
                <img src={product.picture_url} className="card-img-top" alt="" />
                <a>
                  <div className="rgba-white-slight waves-effect waves-light" />
                </a>
              </div>
              {/*Card image*/}
              {/*Card content*/}
              <div className="card-body text-center">
                {/*Category & Title*/}
                <a href className="grey-text">
                  <h5>{product.name}</h5>
                </a>
                <h5>
                  <strong>
                    <a href className="dark-grey-text">{product.description}
                      <span className="badge badge-pill danger-color">NEW</span>
                    </a>
                  </strong>
                </h5>
                <h4 className="font-weight-bold blue-text">
                  <strong>{product.price / 100}$</strong><br/><br/>
                  <BuyProductButton getCartItemsCount={this.props.getCartItemsCount} id={product.id}/>
                </h4>
              </div>
              {/*Card content*/}
            </div>
            {/*Card*/}
          </div>
        )
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