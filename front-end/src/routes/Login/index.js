import React from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ValidationErrors from "../../components/ValidationErrors";
import VoltoxLoginButton from "../../components/VoltoxLoginButton";
import { postAuth } from "../../sagas/components/auth/auth-saga";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.errors = {
            "requestBody.email is a required field": "Email is a required field",
            "requestBody.password must be at least 8 characters": "Password must be at least 8 characters long.",
            "requestBody.password is a required field": "Password is a required field"
        }
    }
    onChange = key => ({ target }) => this.setState({ [key]: target.value })
    onSubmit = e => {
        e.preventDefault();
        let { email, password } = this.state;
        this.props.postAuth({ email, password });
    }
    handleKeyPress = e => {
        if(e.key === 'Enter'){
          this.onSubmit(e)
        }
      }
    getError = err => {
        return this.errors[err] || err
    }
    render(){
        return (
            <div className="text-center" >
                <form className="form-signin">
                    <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width={72} height={72} />
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <ValidationErrors errors={this.props.validationErrors}>
                                { error => <div className="alert alert-danger">{this.getError(error)}<br/></div>}
                        </ValidationErrors>

                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input
                        onKeyPress={this.handleKeyPress} 
                        value={this.state.email} 
                        onChange={this.onChange("email")} 
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address" 
                        required autoFocus 
                    />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input
                        onKeyPress={this.handleKeyPress} 
                        value={this.state.password} 
                        onChange={this.onChange("password")} 
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        required 
                    />
                    <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" defaultValue="remember-me" /> Remember me
                    </label>
                    </div>
                    <button type="submit" onClick={this.onSubmit} className="btn btn-sm btn-primary btn-block">{ this.props.loading ? "Signing in..." : "Sign In" }</button>
                    <Link style={{ color:"white", textDecoration: "none" }} to="/register">
                        <button style={{ marginTop: 5 }} type="buttons" className="btn btn-sm btn-primary btn-block">
                                Sign Up
                        </button>
                    </Link>
                    <VoltoxLoginButton style="margin-top: 10px;" className="btn-block"/>
                    <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
                </form>
            </div>
        )
        return (
            <div className="full-page login">
                <div className="full-page__left">
                <h1>You’re just a few clicks away from logging in to your account</h1>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero</p>
                </div>
                    <div className="full-page__right">
                        <h1>Login</h1>
                        <ValidationErrors errors={this.props.validationErrors}>
                                { error => <React.Fragment>{error}<br/></React.Fragment>}
                        </ValidationErrors>
                            <div className="full-page__label">
                                <input 
                                    onKeyPress={this.handleKeyPress} 
                                    value={this.state.email} 
                                    onChange={this.onChange("email")} 
                                    type="email" 
                                    placeholder="Email" 
                                />
                                <input 
                                    onKeyPress={this.handleKeyPress} 
                                    value={this.state.password} 
                                    onChange={this.onChange("password")} 
                                    type="password" 
                                    placeholder="Password" 
                                />
                                <a href="#">Forgot your password?</a>
                            </div>
                        <div> 
                            <button onClick={this.onSubmit} className="secondary-button">{ this.props.loading ? "Signing in..." : "Sign In" }</button>
                            <VoltoxLoginButton/>
                            <p>Don’t have an account?<Link to="/register">Sign Up</Link></p>
                        </div>
                    </div>
            </div>    
        )
        return (
            <React.Fragment>
                <ValidationErrors errors={this.props.validationErrors}>
                    { error => <h5>{error}</h5>}
                </ValidationErrors>
                <form onSubmit={this.onSubmit}>
                    Email: <input value={this.state.email} onChange={this.onChange("email")}/><br/>
                    Password: <input value={this.state.password} onChange={this.onChange("password")}/><br/>
                    <button type="submit">{ this.props.loading ? "Loading..." : "Submit" }</button>
                </form>
            </React.Fragment>
        )
    }
}

export default connect(state => ({ 
    ...state.auth.postAuth, 
    validationErrors: state.validationErrors["postAuth"]
}), { postAuth })(Login)