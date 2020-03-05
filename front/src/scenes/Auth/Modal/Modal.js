import React from "react";
import "./Modal.css";
import Login from "../Modal/Form/Login";


export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  state = {
    isOpen: false,
  };
  



  render() {
    return (
      <React.Fragment>
        {!this.state.isOpen && (
          <button onClick={() => this.setState({ isOpen: true })}>
          Логин
        </button>)}

        {this.state.isOpen && (

          <div className="myModal">
            <div className="myModal-body">
              <button onClick={() => this.setState({ isOpen: false })}>
                Close modal
              </button>
              <Login />
              <br></br>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
