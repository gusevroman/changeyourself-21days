import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";


import CarouselAccount from "./Carousel/CarouselAccount";
import TargetBlock from "./target/TargetBlock";


class HomeAuth extends React.Component {

  render() {

    return (
      <>{ this.props.isLoggined 
        ? <>
            <TargetBlock />
            < CarouselAccount />
          </>
        :   <Redirect to="/"/>
        }
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
