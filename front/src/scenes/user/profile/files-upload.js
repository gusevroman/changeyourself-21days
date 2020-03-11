import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';

import { showProfile } from "../../../redux/actions";


class FilesUpload extends Component {

  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      profileImg: '123'
    }
  }

  onFileChange(e) {
    this.setState({ profileImg: e.target.files[0] })
  };

  onSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('profileImg', this.state.profileImg)
    axios.post(`http://localhost:5000/user/profile/edit/img/${this.props.userId}`, formData, {
      login: this.props.isLoggined
    }).then(res => {
      console.log(res)
    })
  }


  render() {

    return (
      <form onSubmit={this.onSubmit}>
        <input className="profile-image" type="file" onChange={this.onFileChange} />
        <button className="edit" type="submit">Загрузить фото</button>
      </form>
    )
  }
}


const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  userId: state.userId,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  showProfile: profile => dispatch(showProfile(profile)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FilesUpload)
);
