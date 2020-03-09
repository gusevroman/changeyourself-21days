import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import CarouselAccount from "../user/Carousel/CarouselAccount";
import Methods from "./Methods/Methods";



class Home extends React.Component {


    state = {}

    render() {
        return (
            <>
              <CarouselAccount />
              <Methods />
            </>
        );
    }
}

const mapStateToProps = state => ({
    isLoggined: state.isLoggined,
    login: state.login,
    allPoints: state.allPoints
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Home)
);
