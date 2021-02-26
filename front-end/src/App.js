import React from "react";
import Routes from "./routes";
import { connect } from "react-redux";
import { getAuth } from "./sagas/components/auth/auth-saga";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentDidMount(){
    this.props.getAuth()
  }
  render(){
    return (
      <React.Fragment>
        <Routes/>
      </React.Fragment>
    )
  }
}

export default connect(null, { getAuth })(App);
