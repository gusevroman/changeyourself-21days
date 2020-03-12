import React, { Component } from 'react'

export default class TargetHead extends Component {
  constructor(props) {
    super(props)
  }

  normalDate(date){
    const newDate = (date + '').split(/[-T]{1}/);
    return `${newDate[2]}.${newDate[1]}.${newDate[0]}`
  }

  render() {
    const target = this.props.target
    const text = this.props.text

    const startDate = this.normalDate(target.startDate);
    const endDate = this.normalDate(target.endDate);
    
    return (
      <div className="target">
      <h2 className="target__title">{target.title}</h2>
      <p>Описание: {target.description}</p>
      <p>Цель поставлена: {startDate}</p>
      <p>Окончание цели: {endDate}</p>
      <p>{text}</p>
      </div>

    )
  }
}
