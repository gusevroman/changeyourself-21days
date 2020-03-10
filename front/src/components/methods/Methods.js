import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

class Methods extends React.Component {
  render() {
    return (
      <>
      <div className="allMethods">
        <h3 className="allMethods__search">
          <span> Поиск: </span>
          <input className="allMethods__input"/>
        </h3>
      </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  targets: state.targets
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Methods));
