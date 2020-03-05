import React from "react";
import "./Modal.css";
import Login from "../Modal/Form/Login";
import Registration from "../Modal/Form/Registration";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  state = {
    isOpen: false,
    isLoginForm: true
  };




  render() {
    console.log(this.state.login);

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
              {this.state.isLoginForm
                ?
                <Login login={this.state.isLoginForm} />
                :
                <Registration />
              }
              <br></br>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <button onClick={() => this.setState({ isLoginForm: true })}>
                  isLoginForm
              </button>
                <button onClick={() => this.setState({ isLoginForm: false })}>
                  registration
              </button>
              </div>
            </div>
          </div>

        )}
      </React.Fragment>
    );
  }
}
