import React from "react";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import HomeAuth from "../user/HomeAuth";

class Home extends React.Component {


    state = {}

    render() {
        const {isLoggined} = this.props
        console.log('name',  isLoggined)
        return (
            <>
                <h1 style={{textAlign: "center", margin: "30px 0px"}}>Главная</h1>

                {isLoggined &&
                <div>
                    <Link to="/newTarget">Добавить цель</Link>
                    <HomeAuth/>
                </div>
                }
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
