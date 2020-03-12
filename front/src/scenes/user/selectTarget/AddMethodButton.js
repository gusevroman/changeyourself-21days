import React from "react";

export default class NewMethodButton extends React.Component {
    render() {
        return (
            <a className="bt more-bt" onClick={this.props.addMethodsFunc}>
                <span className="fl"></span>
                <span className="sfl"></span>
                <span className="cross"></span>
                <i></i>
                <p>{this.props.value}</p>
            </a>
        )
    }
}
