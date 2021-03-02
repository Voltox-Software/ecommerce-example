import React from "react";
import { connect } from "react-redux";
import { getAuth } from "../../sagas/components/auth/auth-saga";
import axios from "../../axios";

function popupWindow(url, windowName, win, w, h) {
    const y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2);
    return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
}

class VLoginButton {
    constructor({id,style,ServiceId,className, onError, onSuccess}){
        this.onError = onError
        this.onSuccess = onSuccess
        this.ServiceId = ServiceId
        // this.popup = null;
        this.iframe = null;
        this.button = null;
        this.id = id;
        this.style = style;
        this.className = className
        this.render();
        this.componentDidMount()
    }
    onMessage = async e => {
        if (e.data == "AuthFailed" || typeof(e.data) !== "string") {
            await this.onError();
            this.button.disabled = false;
        }
        else {
            await this.onSuccess(e.data)
            this.button.disabled = true;
        }
        if (!this.popup) return;
        return this.popup.close()
    }
    componentDidMount = () => {
        window.addEventListener("message", this.onMessage)
    }
    openWindow = () => {
        this.button.disabled = true;
        console.log("DSAASDASDADDS")
        var left = (window.screen.width/2)-(406/2);
        var top = (window.screen.height/2)-(631/3);
        this.popup = popupWindow(
            `http://server-37.herokuapp.com/api/v1/services/${this.ServiceId}/auth`,
            "mywindow",
            window,
            406,
            631,
        )
    }
    render = () => {
        let button = document.createElement("button");
        button.onclick = this.openWindow
        button.style = this.style;
        button.className = this.className;
        button.innerHTML = "Login with Voltox"
        this.button = button;
        return document.getElementById(this.id).appendChild(button)
    }
}

class VoltoxLoginButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    initButton = () => {
        // let token_status_p = document.getElementById("token_status")
        let v_login_button = new VLoginButton({
            id: "voltox_login_button",
            ServiceId: 3, 
            style: this.props.style, 
            className: `v_btn ${this.props.className || ""}`,
            onError: () => console.log("Voltox Login failed"),
            onSuccess: async token => {
                console.log(1)
                let data = await axios("/auth/voltox?access_token=" + token);
                console.log({data})
                localStorage.setItem("voltox_ecommerce_example:token", data.data.data.token)
                this.props.getAuth();
            }
        })
    }
    componentDidMount(){
        this.initButton()
    }
    componentDidUpdate(){
        this.initButton()
    }
    render(){
        return (
            <div id="voltox_login_button"></div>
        )
    }
}

export default connect(null, { getAuth })(VoltoxLoginButton);