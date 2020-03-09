import React from "react";
import { connect } from "react-redux";
import { logIn } from "../../../../redux/actions";
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

  constructor(...args) {
  
    super(...args);
    this.validate = this.validate.bind(this);
  }
  state = {
    error: false
  }

  validate = async event => {
    event.preventDefault();

    const response = await fetch(event.target.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        login:event.target.login.value, 
        password:event.target.password.value 
      })
    });
    const result = await response.json();

    if (result.res) {      
      this.props.logIn(result.res);
      this.props.history.push('/user');
    } else {
      this.setState({error: true})
    }
  };

  render() {
    const loginForm = this.props.isLoginForm
    console.log(loginForm);
    
    return (
      <>

        <h1>Вход</h1>
        { !this.state.error || <h2 className="error">Неверный логин или пароль</h2> }
        <form
          action="http://localhost:5000/login"
          onSubmit={this.validate}
        >
          <div >
            <label>Логин:</label>
            <input type="Login" name="login" required />
          </div>

          <div>
            <label>Пароль:</label>
            <input type="password" name="password" required />
          </div>
          <div>
          <button className='btn' type="submit">Войти</button>
          </div>
        </form>
      </>
      
    );
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  login: state.login
});

const mapDispatchToProps = dispatch => ({
  logIn: (login) => dispatch(logIn(login))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
