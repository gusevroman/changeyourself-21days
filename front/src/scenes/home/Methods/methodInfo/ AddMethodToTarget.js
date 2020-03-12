import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class AddMethodToTarget extends Component {

  async addTarget(){
    const method = this.props.method
    const userId = this.props.userId  
    fetch('http://localhost:5000/newTarget/add', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({method, userId})
    }).then(()=>{
      console.log('DOSHEL');
      this.props.history.push('/user');
    })
  }

  render() {
    return (
      <>
        {this.props.isLoggined && 
          <i onClick={this.addTarget.bind(this)} className="use">
            Воспользоваться
          </i>
        }
      </>
    )
  }
}
const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  userId: state.userId
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddMethodToTarget));

