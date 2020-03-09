import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { logout } from "../../../redux/actions";

import { showProfile } from '../../../redux/actions';


class Profile extends Component {
  constructor() {
    super()
    this.logout = this.logout.bind(this);
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

  editProfile(event) {
    event.preventDefault()
  }

  async getProfile() {
    const profile = await (await fetch(`http://localhost:5000/user/profile/${this.props.isLoggined}`, { method: "POST" })).json();
    this.props.showProfile(profile)
    this.setState(profile)
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

        <form method="POST">

          <div className="row">
            <aside className="item">
              <label for="name">
                Имя
              </label>
            </aside>
            <div className="value">
              <input
                id="name"
                type="text"
                value={name}
              />
            </div>
          </div>

          <div className="row">
            <aside className="item">
              <label for="about">
                Обо мне
              </label>
            </aside>
            <div className="value">
              <input
                id="about"
                type="text"
                placeholder={about}
              />
            </div>
          </div>

          <div className="row">
            <aside className="item">
              <label for="tel">
                Телефон
              </label>
            </aside>
            <div className="value">
              <input
                id="tel"
                type="text"
                value={tel}
              />
            </div>
          </div>

          <div className="row">
            <aside className="item">
              <label for="instagram">
                Инстаграм
              </label>
            </aside>
            <div className="value">
              <input
                id="instagram"
                type="text"
                value={instagram}
              />
            </div>
          </div>

          <div className="row">
            <button
              onClick={this.editProfile}
            >
              Сохранить изменения
          </button>

          </div>

        </form>
      </div>
    )
  }

  render() {
    const linkEdit = `/user/profile/edit/${this.props.isLoggined}`
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


