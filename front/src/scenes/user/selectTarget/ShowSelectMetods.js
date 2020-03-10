import React, { Component } from 'react'
import Method from '../../home/Methods/Method'

export default class ShowSelectMetods extends Component {


  state = {
    methods: null
  }


  async componentDidMount() {
    const tag = this.props.tag
    const response = await fetch('http://localhost:5000/method/getmethods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tag })
    })
    const data = await response.json()
    console.log(data)
    this.setState({ methods: data })

  }

  render() {
    return (
      <>
        <div>
          <h2>Methods:</h2>
        </div>
        <div className="topMethods__content">
          {this.state.methods && this.state.methods.methods.map(method => {
            return <Method method={method} />
          })}
        </div>
      </>
    )
  }
}

