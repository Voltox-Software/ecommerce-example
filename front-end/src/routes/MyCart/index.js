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
            <FetchMyCart>
            { ({ loading, error, my_cart }) => {
                if (loading) return null;
                if (error) return error.message;
                let { CartItems } = my_cart;
                let products = CartItems.map(cart_item => cart_item.Product);
                let total_price = 0;
                products.map(product => total_price += product.price)
                if (!products.length) return (
                    <div className="container"><br/><br/>   
                        <p>No items in cart</p>
                        <Link to="/">Go to products</Link>
                    </div>
                )
                return (
                    <main>
                    <div className="container">
                      {/*Section: Block Content*/}
                      <section className="mt-5 mb-4">
                        {/*Grid row*/}
                        <div className="row">
                          {/*Grid column*/}
                          <div className="col-lg-8">
                            {/* Card */}
                            <div className="card wish-list mb-4">
                              <div className="card-body">
                                <h5 className="mb-4">Cart (<span>{products.length}</span> items)</h5>
                                  {
                                      products.length ? "" : "No items in cart"
                                  }
                                  {
                                      products.map(product => {
                                          return (
                                              <React.Fragment>
                                            <div className="row mb-4">
                                            <div className="col-md-5 col-lg-3 col-xl-3">
                                              <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                                <img className="img-fluid w-100" src={product.picture_url} alt="Sample" />
                                                <a href="#!">
                                                  <div className="mask waves-effect waves-light">
                                                    <img className="img-fluid w-100" src={product.picture_url} />
                                                    <div className="mask rgba-black-slight waves-effect waves-light" />
                                                  </div>
                                                </a>
                                              </div>
                                            </div>
          
                                            <div className="col-md-7 col-lg-9 col-xl-9">
                                            <div>
                                              <div className="d-flex justify-content-between">
                                                <div>
                                                  <h5>{product.name}</h5>
                                                  <p className="mb-3 text-muted text-uppercase small">{product.description}</p>
                                                </div>
                                              </div>
                                              <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                  {/* <a href="#!" type="button" className="card-link-secondary small text-uppercase mr-3"><i className="fas fa-trash-alt mr-1" /> Remove item </a> */}
                                                </div>
                                                <p className="mb-0"><span><strong>${product.price / 100}</strong></span></p>
                                              </div>
                                            </div>
                                          </div>
        
                                            </div>
                                                <hr className="mb-4" />
                                            </React.Fragment>
                                          )
                                      })
                                  }
                                  {
                                      false ? "" :
                                        <p className="text-primary mb-0"><i className="fas fa-info-circle mr-1" /> Do not delay the purchase, adding
                                        items to your cart does not mean booking them.</p>
                                  }
                              </div>
                            </div>
                            <div className="card mb-4">
                              <div className="card-body">
                                <h5 className="mb-4">Expected shipping delivery</h5>
                                <p className="mb-0"> Thu., 12.03. - Mon., 16.03.</p>
                              </div>
                            </div>
                            <div className="card mb-4">
                              <div className="card-body">
                                <h5 className="mb-4">We accept</h5>
                                <img style={{ display: "inline"}} className="mr-2" width="80px" src="http://18.191.33.76:8080/logo.svg" alt="Visa" />
                              </div>
                            </div>
                            {/* Card */}
                          </div>
                          {/*Grid column*/}
                          {/*Grid column*/}
                          <div className="col-lg-4">
                            {/* Card */}
                            <div className="card mb-4">
                              <div className="card-body">
                                <h5 className="mb-3">The total amount of</h5>
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Temporary amount
                                    <span>${total_price / 100}</span>
                                  </li>
                                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Shipping
                                    <span>Gratis</span>
                                  </li>
                                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                      <strong>The total amount of</strong>
                                      <strong>
                                        <p className="mb-0">(including VAT)</p>
                                      </strong>
                                    </div>
                                    <span><strong>${total_price / 100}</strong></span>
                                  </li>
                                </ul>
                                <VoltoxBuyButton 
                                    amount={total_price}
                                    onSuccess={this.onSuccessPurchase}
                                />
                              </div>
                            </div>
                            {/* Card */}
                            {/* Card */}
                            <div className="card mb-4">
                              <div className="card-body">
                                <a className="dark-grey-text d-flex justify-content-between" data-toggle="collapse" href="#collapseExample" aria-expanded="true" aria-controls="collapseExample">
                                  Add a discount code (optional)
                                  <span><i className="fas fa-chevron-down pt-1" /></span>
                                </a>
                                <div className="collapse show" id="collapseExample" style={{}}>
                                  <div className="mt-3">
                                    <div className="md-form md-outline mb-0">
                                      <input type="text" id="discount-code" className="form-control font-weight-light" placeholder="Enter discount code" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Card */}
                          </div>
                          {/*Grid column*/}
                        </div>
                        {/*Grid row*/}
                      </section>
                      {/*Section: Block Content*/}
                    </div>
                  </main>
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
        )
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