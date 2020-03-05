import React from "react";
import { connect } from "react-redux";
import { logIn } from "../../../../redux/actions";
import { withRouter } from 'react-router-dom';

class Registration extends React.Component {
  constructor(...args) {
    super(...args);
    this.registration = this.registration.bind(this);
  }
  state = {
    error: false
  }

  registration = async event => {
    event.preventDefault();

    const { logIn } = this.props;

    const login = event.target.login.value;
    const password = event.target.password.value;
    console.log(login, password);

    const response = await fetch(event.target.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password })
    });
    const result = await response.json();
    
    if (result.res) {
      logIn(result.res);
      this.props.history.push('/')
    } else {
      this.setState({error: true})
    }
  };

  render() {
    return (
      <>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>Регистрация</h1>
        { !this.state.error || <h2 style={{ textAlign: "center", marginTop: "20px", color: "red" }}>Этот логин уже существует</h2> }
        <form
          style={{ width: "600px", margin: "auto", textAlign: "center" }}
          action="http://localhost:5000/registration"
          onSubmit={this.registration}
        >
          <div >
            <label>Login:</label>
            <input type="Login" name="login" required />
          </div>

          <div >
            <label>Password:</label>
            <input type="password" name="password" required />
          </div>

          <button type="submit">
            Registration
          </button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration));
