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
      this.props.history.push('/user')
    } else {
      this.setState({ error: true })
    }
  };

  render() {
    return (
      <>
        <h1>Регистрация</h1>
        {!this.state.error || <h2 className="error">Этот логин уже существует</h2>}
        <form
          action="http://localhost:5000/registration"
          onSubmit={this.registration}
          className="form-auth"
        >
          <div >
            <label>Логин:</label>
            <input type="Login" name="login" required />
          </div>

          <div >
            <label>Пароль:</label>
            <input type="password" name="password" required />
          </div>
          <div>
            <button className='btn' type="submit">Создать</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration));
