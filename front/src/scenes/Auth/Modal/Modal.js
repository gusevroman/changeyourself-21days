import React from "react";
import "./Modal.css";
import Login from "../Modal/Form/Login";
import Registration from "../Modal/Form/Registration";
import { Link } from "react-router-dom";
import quit from './quit.png'

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
          <Link 
          className="link"
          onClick={() => this.setState({ isOpen: true })}>
            Вход
        </Link>)}

        {this.state.isOpen && (

          <div className="myModal">
            <div className="myModal-body">
            <div className="myModal__btns">
            <img className='btn' onClick={() => this.setState({ isOpen: false })} src={quit}/>
            {this.state.isLoginForm
                ? <div className='btn auth-btn' onClick={() => this.setState({ isLoginForm: false })}>
                    Регистрация
                  </div>
                : <div className='btn auth-btn' onClick={() => this.setState({ isLoginForm: true })}>
                    Вход
                  </div>
            }

            </div>
              {this.state.isLoginForm
                ?
                <Login login={this.state.isLoginForm} />
                :
                <Registration />
              }
              <br></br>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              </div>
            </div>
          </div>

        )}
      </React.Fragment>
    );
  }
}
