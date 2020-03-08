import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

class Method extends React.Component {
  render() {
    console.log(this.props.method);

    const link = "/method/" + this.props.method._id
    return (
      <div className="content__column">
        <h3 className="content__title">{this.props.method.title}</h3>
        <div className="content__text">{this.props.method.description}</div>
        <h3>Метод расчитан на {this.props.method.method.length}д</h3>
      <div className="content__likes">
        <div>Уже оценили: {this.props.method.followers.length }</div>
        <div>Не понравилась: {this.props.method.dislike || 0}</div>
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
