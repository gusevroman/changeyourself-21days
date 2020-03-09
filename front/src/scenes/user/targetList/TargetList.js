import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TargetHead from "./TargetHead";
import TargetDay from "./TargetDay";
import './targetlist.css'

class TargetList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      target: 0,
      days: '',
      hours: '',
      minutes: '',
      seconds: '',

    }
  }

  getCountdown() {
    const date = Date.parse(this.state.target.endDate);
    let days, hours, minutes, seconds;
    const target_date = date

    let current_date = new Date().getTime();
    let seconds_left = (target_date - current_date) / 1000;

    days = this.pad(parseInt(seconds_left / 86400));
    seconds_left = seconds_left % 86400;

    hours = this.pad(parseInt(seconds_left / 3600));
    seconds_left = seconds_left % 3600;

    minutes = this.pad(parseInt(seconds_left / 60));
    seconds = this.pad(parseInt(seconds_left % 60));

    this.setState({ days, hours, minutes, seconds })
  }

  pad(n) {
    return (n < 10 ? '0' : '') + n;
  }


  async componentWillMount() {
    const { target } = await (await fetch(`http://localhost:5000/user/target/${this.props.match.params.id}`, { method: "GET" })).json();
    this.setState({ target: target })

  }

  componentDidMount() {
    if ((new Date() - Date.parse(this.state.target.endDate)) < 0) {
      this.getCountdown();

    }

  }

  componentDidUpdate() {
    if ((new Date() - Date.parse(this.state.target.endDate)) < 0) {
      setTimeout(() => {
        this.getCountdown()
      }, 1000)
    }
  }



  render() {
    const target = this.state.target
    let text = false;
    let time = new Date() - Date.parse(target.endDate);

    if (time <= 0) {
      const { days, hours, minutes, seconds } = this.state;
      text = `Осталось ${days}д ${hours}ч ${minutes}м ${seconds}с`
    }

    return (
      <>
        <div>
          ID фрагмента:{target._id}
        </div>
        <TargetHead target={target} text={text} />


        <div className="target">
          <h2 className="target__title">actions</h2>

          <TargetDay list={target} />
        </div>

      </>
    )
  }
}
const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  targets: state.targets
});
export default withRouter(
  connect(mapStateToProps)(TargetList)
)
