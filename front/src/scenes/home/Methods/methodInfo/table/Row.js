import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


class Method extends React.Component {
  render() {
   const { day, counter } = this.props
   console.log(counter);
    return (  
      <>
        <tr>
          <td>{counter}</td>
          <td title={day.task}>{day.task}</td>
          <td title={day.description}>{day.description}</td>
        </tr>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Method));
