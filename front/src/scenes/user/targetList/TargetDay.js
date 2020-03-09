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
    moment.lang('ru', {
      months : {
        format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
        standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
      }
    });
    this.setState({date: moment(date).format('DD MMMM YYYY')});
  }

  async handleStatus() {
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
    const status = day.status;
    return (
      <>
        <div className="target_spoiler">
          <div className="task">
            <h2 className="target_spoiler_title" onClick={this.handleSpoiler.bind(this)}>{this.state.date}</h2>
            <input class="tgl tgl-flip" id={this.props.day._id} type="checkbox"
              onClick={this.handleStatus.bind(this)}
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
