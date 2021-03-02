import React from "react"
import { connect } from "react-redux";
import ValidationErrors from "../../components/ValidationErrors";
import { postUsers } from "../../sagas/components/users/users-saga";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import VoltoxLoginButton from "../../components/VoltoxLoginButton";

const formSchema = yup.object().shape({
    email: yup.string().email().required(),
    first_name: yup.string().required().min(5),
    last_name: yup.string().required().min(5),
    password: yup.string().min(8).required(),
    confirm_password: yup.string().equalTo(yup.ref('password'))
})

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
            clientValidationErrors: []
        }
    }
    onChange = key => ({ target }) => this.setState({ [key]: target.value })
    onSubmit = async e => {
        e.preventDefault();
        console.log(this.props.loading)
        if (this.props.loading) return;
        try {
            await formSchema.validate(this.state, { abortEarly: false })
        } catch(err) { 
            console.log(err.errors)
            this.setState({ clientValidationErrors: err.errors })
            return;
        }
        let { first_name, last_name, email, password } = this.state;
        console.log(this.state)
        this.props.postUsers({ first_name, last_name, email, password });
    }
    getErrors = () => {
        if (this.state.clientValidationErrors.length) return this.state.clientValidationErrors;
        return this.props.validationErrors
    }
    handleKeyPress = e => {
        if(e.key === 'Enter'){
          this.onSubmit(e)
        }
      }
    render(){
        return (
            <div className="text-center" >
                <form className="form-signin">
                    <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width={72} height={72} />
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <ValidationErrors errors={this.getErrors()}>
                                { error => <div className="alert alert-danger">{error}<br/></div>}
                    </ValidationErrors>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="inputFirstName" className="sr-only">Fist Name</label>
                            <input
                                onKeyPress={this.handleKeyPress} 
                                value={this.state.first_name} 
                                onChange={this.onChange("first_name")} 
                                type="text"
                                id="inputFirstName"
                                className="form-control"
                                placeholder="First Name" 
                                required autoFocus 
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="inputLastName" className="sr-only">Last Name</label>
                            <input
                                onKeyPress={this.handleKeyPress} 
                                value={this.state.last_name} 
                                onChange={this.onChange("last_name")} 
                                type="text"
                                id="inputLastName"
                                className="form-control"
                                placeholder="Last Name" 
                                required 
                            />
                        </div>
                    </div>

                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input
                        style={{marginTop: 5}}
                        onKeyPress={this.handleKeyPress} 
                        value={this.state.email} 
                        onChange={this.onChange("email")} 
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address" 
                        required 
                    />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input
                        style={{marginTop: 5}}
                        onKeyPress={this.handleKeyPress} 
                        value={this.state.password} 
                        onChange={this.onChange("password")} 
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        required 
                    />
                    <label htmlFor="inputConfirmPassword" className="sr-only">Confirm Password</label>
                    <input
                        style={{marginTop: 5}}
                        onKeyPress={this.handleKeyPress} 
                        value={this.state.confirm_password} 
                        onChange={this.onChange("confirm_password")} 
                        type="confirm_password"
                        id="inputConfirmPassword"
                        className="form-control"
                        placeholder="ConfirmPassword"
                        required 
                    />
                    
                    <button style={{marginTop: 5}} type="submit" onClick={this.onSubmit} className="btn btn-sm btn-primary btn-block">{ this.props.loading ? "Signing up..." : "Sign Up" }</button>
                    <Link style={{ color:"white", textDecoration: "none" }} to="/login">
                        <button style={{ marginTop: 5 }} type="buttons" className="btn btn-sm btn-primary btn-block">
                            Sign In
                        </button>
                    </Link>
                    <VoltoxLoginButton style="margin-top: 10px;" className="btn btn-block"/>
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
              <h1>Register</h1>
              <ValidationErrors errors={this.getErrors()}>
                    { error => <React.Fragment>{error}<br/></React.Fragment>}
              </ValidationErrors>

              <div className="full-page__label">
                <input onKeyPress={this.handleKeyPress} value={this.state.first_name} onChange={this.onChange("first_name")} type="text" placeholder="First Name" />
                <input onKeyPress={this.handleKeyPress} value={this.state.last_name} onChange={this.onChange("last_name")} type="text" placeholder="Last Name" />
                <input onKeyPress={this.handleKeyPress} value={this.state.email} onChange={this.onChange("email")} type="email" placeholder="Email" />
                <input onKeyPress={this.handleKeyPress} value={this.state.password} onChange={this.onChange("password")} type="password" placeholder="Password" />
                <input onKeyPress={this.handleKeyPress} value={this.state.confirm_password} onChange={this.onChange("confirm_password")} type="password" placeholder="Confirm Password" />
                <a href="#">Forgot your password?</a>
              </div>
              <div>
                <button onClick={this.onSubmit} className="secondary-button">Sign Up</button>
                <p>Already have an account?<Link to="/login">Sign In</Link></p>
              </div>
            </div>
          </div>
    
        )
    }
}

export default connect(state => ({
    loading: state.users.postUsers.loading,
    validationErrors: state.validationErrors["postUsers"]
}), { postUsers })(Register)