import React, { Component } from 'react'
import moment from 'moment';


export default class TargetDay extends Component {


  constructor(props) {
    super(props)
  }

  state = {
    date: false,
    display: 'none'
  }

  componentDidMount(){
    let { date, counter } = this.props
    date = date.setDate(date.getDate() + counter);
    const dayDate = new Date(date) + '';

    this.setState({date: moment(dayDate).format('DD MMMM YYYY')});
  }

  
   async handleStatus() {
      const  response  = await fetch(`http://localhost:5000/targetlist/status`, { 
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: this.props.id}, {day: this.props.day._id})
      });  

    }

  handleSpoiler() {
    if (this.state.display === 'none') {
      this.setState({ display: 'block' })
    } else {
      this.setState({ display: 'none' })
    }
  }

  render() {
    const { day } = this.props;
    const status = day.status;
    return (
      <>
        <div className="target_spoiler">
          <div className="task">
            <h2 className="target_spoiler_title" onClick={this.handleSpoiler.bind(this)}>{this.state.date}</h2>
            <input class="tgl tgl-flip" id={this.props.day._id} type="checkbox"/>
             {/* onClick={this.handleStatus.bind(this)} */}
            <label class="tgl-btn" data-tg-off="Nope" data-tg-on="Done!" for={this.props.day._id}></label>
          </div>
          <div className="spoiler" style={{ display: this.state.display }}>
            <h2 align="center">{day.description}</h2>
            <h3>Задание: {day.task}</h3>
          </div>
        </div>
      </>
    )
  }
}
