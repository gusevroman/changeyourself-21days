import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class HomeAuth extends React.Component {

  render() {

    return (
      <>
      <div className="target">

        <h2 className="target__title">Начать курить</h2>
        
        <div className="progress-bar orange">
          <span className="progress-bar__orange" style={{flex: "0 0 90%"}}>90%</span>
        </div>
          <h3 className="progress-bar__last">Осталось 2 дня</h3>

      </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  login: state.login,
  allPoints: state.allPoints
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeAuth)
);
