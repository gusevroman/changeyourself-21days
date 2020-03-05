import React from "react";
import { connect } from "react-redux";
import { logIn } from "../../../../redux/actions";
import { withRouter } from 'react-router-dom';
import "./style.css";

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
    const saveUser = event.target.saveUser.checked

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
      this.props.logIn(result.res, saveUser);
      this.props.history.push('/');
    } else {
      this.setState({error: true})
    }
  };

  render() {

    return (
      <>
        <h1 style={{ textAlign: "center", marginTop: "20px", color: 'white' }}>Логин</h1>
        { !this.state.error || <h2 style={{ textAlign: "center", marginTop: "20px", color: "red" }}>Неверный логин или пароль</h2> }
        <form
          style={{ width: "600px", margin: "auto", textAlign: "center" }}
          action="http://localhost:5000/login"
          onSubmit={this.validate}
        >
          <div controlId="divBasicLogin">
            <label>Логин:</label>
            <input type="Login" name="login" required />
          </div>

          <div controlId="formBasicPassword">
            <label>Пароль:</label>
            <input type="password" name="password" required />
          </div>
          <div controlId="formBasicCheckbox" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <input type="checkbox" label="Чужой компухтер" name="saveUser" />
          <button variant="dark" type="submit">Войти</button>
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
  logIn: (login, noSave) => dispatch(logIn(login, noSave))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
