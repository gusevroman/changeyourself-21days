import React, { Component } from 'react'

export default class TargetDay extends Component {

  constructor() {
    super();

    this.state = {
      display: 'none'
    }
  }

  handleSpoiler() {
    if (this.state.display === 'none') {
      this.setState({ display: 'block' })
    } else {
      this.setState({ display: 'none' })
    }
  }

  render() {

    let list = this.props.list
    console.log('TARGET!!', list);

    return (
      <>
        <div className="target_spoiler" onClick={this.handleSpoiler.bind(this)}>
          <h2 className="target_spoiler_title">{list.title}</h2>
          <div className="spoiler" style={{ display: this.state.display }}>
            <h2 align="center">Spoiler:</h2>
          </div>
          {/* {list.actions.map( (e) =>{
         return <p>{e.title}</p>
        })} */}
        </div>
      </>
    )
  }
}
