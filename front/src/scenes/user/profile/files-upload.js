import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';

import { showProfile } from "../../../redux/actions";


class FilesUpload extends Component {

  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      profileImg: this.props.img
    }
  }

  onFileChange(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('profileImg', e.target.files[0])
    axios.post(`http://localhost:5000/user/profile/edit/img/${this.props.userId}`, formData, {
      login: this.props.isLoggined
    }).then(res => {
      console.log(res);
      const img = `http://localhost:5000/${res.data.name}`;
      this.props.reload(res.data.name)
      this.setState({profileImg: img})
    })
  };

  // onSubmit(e) {
  //   e.preventDefault()
  //   const formData = new FormData()
  //   formData.append('profileImg', this.state.profileImg)
  //   axios.post(`http://localhost:5000/user/profile/edit/img/${this.props.userId}`, formData, {
  //     login: this.props.isLoggined
  //   }).then(res => {
  //     console.log(res);
      
  //     const img = `http://localhost:5000/${res.name}`
  //   })
  // }
  componentDidMount(){
    this.setState({profileImg: this.props.img})
  }


  render() {
    if (this.props.img !== this.state.profileImg){
      this.setState({profileImg: this.props.img})
    }
    return (
      <form onSubmit={this.onSubmit}>
        <label for="ava"><img className="profile-image" src={this.state.profileImg}/>
        </label>
        <input name="ava" id="ava" className="profile-image-file" type="file" onChange={this.onFileChange} />
        {/* <button className="edit" type="submit">Обновить фото</button> */}
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
