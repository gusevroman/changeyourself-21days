import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


import CarouselAccount from "./Carousel/CarouselAccount";
import TargetBlock from "./target/TargetBlock";


class HomeAuth extends React.Component {

  render() {

    const { isLoggined } = this.props;
    return (
      <>
         <h2  style={{ textAlign: "center", margin: "30px 0px" }}>Welcome {isLoggined}</h2>
        <TargetBlock />
        < CarouselAccount />
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeAuth)
);
