import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

 class TargetInfo extends Component {
  render() {
    console.log(this.props);
    
    return (
      <div>
        {this.props}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TargetInfo)
);
