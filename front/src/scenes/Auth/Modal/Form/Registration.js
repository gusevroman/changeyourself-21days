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
    const login = event.target.login.value;
    const password = event.target.password.value;
    const email = event.target.email.value;
    const response = await fetch(event.target.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password, email })
    });
    const result = await response.json();

    if (result.error) {
      this.setState({ error: true })
    } else {
      this.props.logIn(result.login, result.id);
      this.props.history.push('/user')
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
            <label>Почта:</label>
            <input type="email" name="email" required />
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
  logIn: (login, id) => dispatch(logIn(login, id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration));
