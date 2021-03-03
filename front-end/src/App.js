import React from "react";
import Routes from "./routes";
import { connect } from "react-redux";
import { getAuth } from "./sagas/components/auth/auth-saga";
import { Link } from "react-router-dom";
import LoggedInOnly from "./components/LoggedInOnly";
import axios from "./axios";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cart_items_count: 0
    }
  }
  getCartItemsCount = async () => {
    let res = await axios("/me/cart");
    this.setState({
      cart_items_count: res.data.data.cart.CartItems.length
    })
  }
  componentDidMount(){
    this.props.getAuth()
    this.getCartItemsCount();
  }
  render(){
    return (
      <div className="container">
        <main>
          <LoggedInOnly>
          <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
            <div className="container">
              {/* Brand */}
              <a className="navbar-brand waves-effect" href="https://mdbootstrap.com/docs/jquery/" target="_blank">
                <strong className="blue-text">Ecommerce Example</strong>
              </a>
              {/* Collapse */}
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              {/* Links */}
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {/* Left */}
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/" className="nav-link waves-effect">Home
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                </ul>
                {/* Right */}
                <ul className="navbar-nav nav-flex-icons">
                  <li className="nav-item">
                    <a className="nav-link waves-effect">
                      <span style={{color:"black"}} className="badge red z-depth-1 mr-1"> {this.state.cart_items_count} </span>
                      <i className="fas fa-shopping-cart" />
                      <Link style={{textDecoration: "none", color: "black"}} to="/my_cart">
                        <span className="clearfix d-none d-sm-inline-block"> Cart </span>
                      </Link>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="https://www.facebook.com/mdbootstrap" className="nav-link waves-effect" target="_blank">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="https://twitter.com/MDBootstrap" className="nav-link waves-effect" target="_blank">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to="/logout" className="nav-link border border-light rounded waves-effect">
                      <i className="fab fa-github mr-2" />Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          </LoggedInOnly>
          <Routes getCartItemsCount={this.getCartItemsCount}/>
        </main>
      </div>
    )
  }
}

export default connect(null, { getAuth })(App);
