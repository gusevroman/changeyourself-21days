import React, { Component } from 'react'

export default class TargetHead extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const target = this.props.target
    const text = this.props.text
    
    return (
      <div className="target">
      <h2 className="target__title">{target.title}</h2>
      <p>Описание: {target.description}</p>
      <p>Цель поставлена: {target.startDate}</p>
      <p>Окончание цели: {target.endDate}</p>
      <p>{text}</p>
    </div>

    )
  }
}
