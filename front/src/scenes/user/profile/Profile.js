import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { logout } from "../../../redux/actions";

import { showProfile } from '../../../redux/actions';


class Profile extends Component {
  constructor() {
    super()
    this.logout = this.logout.bind(this);
    this.inputHandler = this.inputHandler.bind(this)
  }

  state = {
    name: '',
    avatar: "https://www.windstream.com/getmedia/b2e4e38a-7cb6-4ca9-9544-54dfeaca6304/icon_user-circle.png?width=1920&height=1280&ext=.png",
    email: '',
    tel: '',
    instagram: '',
    about: '',
  }

  logout() {
    this.props.logout();
    this.props.history.push("/");
  }

  componentDidMount() {
    this.getProfile()
  }

  componentWillUnmount() {

  }

  changeAvatar(event) {
    event.preventDefault()

  }

  async getProfile() {
    const profile = await (
      await fetch(`http://localhost:5000/user/profile/${this.props.isLoggined}`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
      })).json();
    this.props.showProfile(profile)
    this.setState(profile)
  }

  saveProfile(event) {
    event.preventDefault()
    const { name, about, email, tel, instagram } = event.target;
    this.sendProfile(name.value, about.value, email.value, tel.value, instagram.value)
  }

  async sendProfile(name, about, email, tel, instagram) {
    const login = this.props.isLoggined
    const send = await (
      await fetch(`http://localhost:5000/user/profile/edit/`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ login, name, about, email, tel, instagram })
      })).json();
  }

  inputHandler(event) {
    const { value, name } = event.target
    console.log('inputHandler', event.target.value, event.target.name);
    this.setState({ [name]: value })
  }

  renderProfile() {
    const { name, avatar, about, email, tel, instagram } = this.state;
    const isLoggined = this.props.isLoggined
    return (

      <div className="settings">

        <div className="row">
          <div>
            <span className="user-logo">
              <img src={avatar} alt="avatar" />
            </span>
          </div>
          <div>
            <h1 title="rvgusev">{isLoggined}</h1>
            <button
              onClick={this.changeAvatar}>
              Изменить фото профиля
            </button>
          </div>
        </div>

        <form method="POST" action="/user/profile/edit" onSubmit={this.saveProfile.bind(this)}>
          <div className="row">
            <div className="item">
              <label for="name">
                Имя
              </label>
            </div>
            <div className="value">
              <input
                name="name"
                id="name"
                type="text"
                value={name}
                onChange={this.inputHandler}
              />
            </div>
          </div>

          <div className="row">
            <div className="item">
              <label for="email">
                Email
              </label>
            </div>
            <div className="value">
              <input
                name="email"
                id="email"
                type="text"
                value={email}
                onChange={this.inputHandler}
              />
            </div>
          </div>
          <div className="row">
            <div className="item">
              <label for="about">
                Обо мне
              </label>
            </div>
            <div className="value">
              <input
                name="about"
                id="about"
                type="text"
                value={about}
                onChange={this.inputHandler}
              />
            </div>
          </div>

          <div className="row">
            <div className="item">
              <label for="tel">
                Телефон
              </label>
            </div>
            <div className="value">
              <input
                name="tel"
                id="tel"
                type="text"
                value={tel}
                onChange={this.inputHandler}
              />
            </div>
          </div>

          <div className="row">
            <div className="item">
              <label for="instagram">
                Инстаграм
              </label>
            </div>
            <div className="value">
              <input
                name="instagram"
                id="instagram"
                type="text"
                value={instagram}
                onChange={this.inputHandler}
              />
            </div>
          </div>

          <div className="row">
            <button type="submit"
            >
              Сохранить изменения
          </button>

          </div>

        </form>
      </div>
    )
  }

  render() {
    // const linkEdit = `/user/profile/edit/${this.props.isLoggined}`
    // console.log('<<<<< this.state', this.state);

    return (
      <>
        {this.renderProfile()}
        <Link to="/" onClick={this.logout} className="link" >Выйти</Link>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  showProfile: (profile) => dispatch(showProfile(profile)),
  logout: () => dispatch(logout()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);


