import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import injectUser from "../../HoC/injectUser";

class Home extends React.Component {
    render(){
        return (
            <div>
              {JSON.stringify(this.props.current_user)}
            </div>    
        )
    }
}

export default injectUser(Home);    