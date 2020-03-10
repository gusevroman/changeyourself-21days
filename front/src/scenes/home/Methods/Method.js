import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

class Method extends React.Component {

  getScore(followers){
    let sum = 0;
    sum = followers.reduce(function(sum, current) {
      return sum + current.score;
    }, 0);
    if(sum === 0){
      return sum;
    }
    return (sum / followers.length).toFixed(1)
  }

  render() {
    const link = "/method/" + this.props.method._id;
    let score = 0;
    if (this.props.method){
      score = this.getScore(this.props.method.followers);
    }
    return (
      <div className="content__column">
        <h3 className="content__title">{this.props.method.title}</h3>
        <div className="content__text">{this.props.method.description}</div>
        <h3>Метод расчитан на {this.props.method.method.length}д</h3>
      <div className="content__likes">
        <div>Уже оценили: {this.props.method.followers.length }</div>
        <div>Рейтинг: <span className="star"> {score} ★</span></div>
      </div>
      <Link to={link} className="content__info">Узнать больше</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Method));
