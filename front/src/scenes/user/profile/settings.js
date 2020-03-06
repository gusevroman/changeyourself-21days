import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Settings extends Component {


  state = {
    name: 'John',
    avatar: "https://www.windstream.com/getmedia/b2e4e38a-7cb6-4ca9-9544-54dfeaca6304/icon_user-circle.png?width=1920&height=1280&ext=.png",
    email: 'john-web@gmail.com',
    tel: '+7(909)123-45-67',
    instagram: '@john-web',
    about: 'I\'m web-developer',
    targets: [
      { target: 'Run a marathon in 3 mounths' },
      { target: 'Start smoking in 21 days' },
      { target: 'Learn React in 30 days' }
    ]
  }

  render() {
    const { name, avatar, about, email, tel, instagram, targets } = this.state
    return (
      <div className="settings">
        Profile settings
        <div>
          My name: {name}
          <span className="user-logo"><img src={avatar} alt="avatar" /></span>
        </div>
        <div>
          About me: {about}
        </div>
        <div>
          My contacts: <br />
          {email}, <br />
          {tel},<br />
          {instagram}<br />
        </div>
        <div>
          My targets: {targets.map(target => <div>{target.target} </div>)}
        </div>

      </div>
    )
  }
}


Settings.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  email: PropTypes.string,
  tel: PropTypes.string,
  instagram: PropTypes.string,
  about: PropTypes.string,
  targets: PropTypes.array,
}

Settings.defaultProps = {
  name: '',
  avatar: '',
  email: '',
  tel: '',
  instagram: '',
  about: '',
  targets: [],
}



