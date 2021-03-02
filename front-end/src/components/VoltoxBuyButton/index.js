import React from "react";

function popupWindow(url, windowName, win, w, h) {
    const y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2);
    return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
}

class VPayButton {
    constructor({id,style,ServiceId,className, onError, onSuccess, amount}){
        this.onError = onError
        this.onSuccess = onSuccess
        this.ServiceId = ServiceId
        this.amount = amount
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
        console.log(e.data,e.data.success)
        if (e.data && !Object.keys(e.data)) return;
        if (e.data.success === undefined) return;
        console.log({e_data:e.data},this.onError,this.onSuccess)
        if (!e.data.success) {
            if (this.onError) await this.onError();
            this.button.disabled = false;
        }
        else {
            if (this.onSuccess) await this.onSuccess(e.data)
            this.button.disabled = true;
        }
        return this.popup && this.popup.close ? this.popup.close(): this.popup
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
            `http://server-37.herokuapp.com/api/v1/services/${this.ServiceId}/form/charge/${this.amount}/cents`,
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
        button.innerHTML = "Pay with Voltox"
        this.button = button;
        return document.getElementById(this.id).appendChild(button)
    }
}

class VoltoxBuyButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    initButton = () => {
        let result = document.getElementById('result')
        let v_pay_button = new VPayButton({
            id: "voltox_pay_button",
            ServiceId: 1, 
            style: "width: 100%;", 
            amount: this.props.amount,
            className: "v_btn",
            onError: () => document.getElementById('result').innerHTML = "Result: Not paid",
            onSuccess: () => {
                document.getElementById('result').innerHTML = "Result: Paid"
                if (this.props.onSuccess) {
                    this.props.onSuccess()
                }
            }
        })
    }
    componentDidMount(){
        this.initButton();
    }
    componentDidUpdate(){
        this.initButton();
    }
    render(){
        return (
            <div>
                <div id="result"></div>
                <div id="voltox_pay_button"></div>
            </div>
        )
    }
}

export default VoltoxBuyButton;