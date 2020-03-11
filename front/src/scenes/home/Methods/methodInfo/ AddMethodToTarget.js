import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

class AddMethodToTarget extends Component {

  async addTarget(){
    const method = this.props.method
    const userId = this.props.userId  
    console.log('method', method);
      
    this.props.history.push('/user');
    await fetch('http://localhost:5000/newTarget/add', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({method, userId})
    })
  }

  render() {
    return (
      <>
        {this.props.isLoggined && <span onClick={this.addTarget.bind(this)} className="use">Воспользоваться</span>}

      </>
    )
  }
}
const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  userId: state.userId,
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddMethodToTarget));

