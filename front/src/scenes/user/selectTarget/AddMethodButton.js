import React from "react";
import './addMethodButton.css'

export default class NewMethodButton extends React.Component {
    render() {
        return (
            <a className="bt more-bt" onClick={this.props.addMethodsFunc}>
                <span className="fl"></span>
                <span className="sfl"></span>
                <span className="cross"></span>
                <i></i>
                <p>add methods</p>
            </a>
        )
    }
}
