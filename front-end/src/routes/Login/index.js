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
    render(){
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