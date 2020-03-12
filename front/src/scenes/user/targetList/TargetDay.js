import React, { Component } from 'react'
import moment from 'moment';
export default class TargetDay extends Component {
    

  constructor(props) {
    super(props)
  }

  state = {
    date: false,
    display: 'none',
    status: false
  }

  componentDidMount(){
    moment.lang('ru', {
      months : {
        format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
        standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
      }
    });
    let { day, date, counter } = this.props;


    this.setState({date: moment(date + counter).format('DD MMMM YYYY'), status:day.status});
  }

  async handleStatus() {
    this.setState({status:!this.state.status})
    await fetch(`http://localhost:5000/targetlist/status`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: this.props.id, day: this.props.day._id })
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
    
    return (
      <>
        <div className="target_spoiler">
          <div className="task">
            <h2 className="target_spoiler_title" onClick={this.handleSpoiler.bind(this)}>{this.state.date}</h2>
            <input class="tgl tgl-flip" id={this.props.day._id} type="checkbox"
              onClick={this.handleStatus.bind(this)}
              checked={this.state.status}
            />
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
