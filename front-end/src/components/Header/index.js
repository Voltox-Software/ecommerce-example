import React from "react";
import { Provider } from "react-redux";
import { Link } from "react-router-dom";
import injectUser from "../../HoC/injectUser";

class Header extends React.Component {
    state = {
        mobile_opened: false
    }
    mobileOpenedToggle = () => this.setState(prevState => {
        let mobile_opened = !prevState.mobile_opened;
        console.log(mobile_opened)
        return { mobile_opened }
    })
    render(){
        return (
            <div className="row relative">
                <header>
                    <Link to="/" className="logo"><img src="../assets/toolkit/images/logo.svg" alt="" /></Link>
                    <ul className="header__links">
                    <li className="active"><Link to="/home-learn">Home</Link></li>
                    <li><Link to="/floors">Browse</Link></li>
                    <li><Link to="/about-us">About</Link></li>
                    <li><Link to="/contact-us">Contact</Link></li>
                    <li><Link to="/learn">Learn</Link></li>
                    </ul>
                    <div className="header__registration">
                    <ul className="mb0">
                        {
                            this.props.current_user && !this.props.current_user.isGuest
                            ? <React.Fragment>
                                <li><Link to="/my_cart" className="yellow-text">Cart</Link></li>
                                <li><Link to="/logout" className="yellow-text">Logout</Link></li>
                            </React.Fragment>
                            : <React.Fragment>
                                <li><Link to="/my_cart" className="yellow-text">Cart</Link></li>
                                <li><Link to="/login" className="yellow-text">Login</Link></li>
                                <li><Link to="/register" className="yellow-text">Register</Link></li>
                            </React.Fragment> 
                        }
                    </ul>
                    <div className="header__mobile-menu">
                        <div onClick={this.mobileOpenedToggle} className={`menu-btn ${this.state.mobile_opened && "open"}`}>
                        <div className="menu-btn__burger" />
                        </div>
                    </div>
                    </div>
                </header>
                <div className={`header__mobile-toggle ${this.state.mobile_opened && "toggle"}`}>
                    <ul className="header__links">
                    <li className="active"><Link to="/home-learn">Home</Link></li>
                    <li><Link to="/floors">Browse</Link></li>
                    <li><Link to="/about-us">About</Link></li>
                    <li><Link to="/contact-us">Contact</Link></li>
                    <li><Link to="/learn">Learn</Link></li>
                    {
                            this.props.current_user 
                            ? <li><Link to="/logout" className="yellow-text">Logout</Link></li>
                            : <React.Fragment>
                                <li><Link to="/login" className="yellow-text">Login</Link></li>
                                <li><Link to="/register" className="yellow-text">Register</Link></li>
                            </React.Fragment> 
                        }                
                    </ul>
                </div>
            </div>
        )
        return (
            <header>
            <a href="home1.html" className="logo"><img src="../assets/toolkit/images/logo.svg" alt="" /></a>
            <ul className="header__links">
              <li className="active"><a href="home1.html">Home</a></li>
              <li><a href="browse.html">Browse</a></li>
              <li><a href="about-us.html">About</a></li>
              <li><a href="home1.html">Contact</a></li>
              <li><a href="home1.html">Learn</a></li>
            </ul>
            <div className="header__registration">
              <ul className="mb0">
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
              </ul>
              <div className="header__mobile-menu">
                <div className="menu-btn">
                  <div className="menu-btn__burger" />
                </div>
              </div>
            </div>
          </header>
        )
    }
}

export default injectUser(Header);