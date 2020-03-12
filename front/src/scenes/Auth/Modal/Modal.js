import React from "react";
import { Link } from "react-router-dom";
import Login from "../Modal/Form/Login";
import Registration from "../Modal/Form/Registration";
import quit from './quit.png'


export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  state = {
    isOpen: this.props.isOpen,
    isLoginForm: true
  };


  render() {

    return (
      <>
        {!this.state.isOpen && (
          <Link
            className="link"
            onClick={() => this.setState({ isOpen: true })}>
            Вход
        </Link>)}

        {this.state.isOpen && (

          <div className="myModal">
            <div className="myModal-body">
            <div className="close">

            <img className='btn__close' onClick={() => this.setState({ isOpen: false })} src={quit}/>
            </div>

              {this.state.isLoginForm
                ?
                <>
                  <Login login={this.state.isLoginForm} />
                  <div className='btn auth-btn' onClick={() => this.setState({ isLoginForm: false })}>
                    Регистрация
                  </div>
                </>
                :
                <>
                  <Registration />
                  <div className='btn auth-btn' onClick={() => this.setState({ isLoginForm: true })}>
                    Вход
                  </div>
                </>
              }
            </div>
          </div>

)}
      </>
    );
  }
}
