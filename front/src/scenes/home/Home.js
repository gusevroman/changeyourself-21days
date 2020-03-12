import React from "react";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import Methods from "./Methods/Methods";



class Home extends React.Component {

    render() {
        return (
            <>
              { this.props.isLoggined && 
              <div className='home-gb'>
                <Methods />
                <Link to="/methods"className="showAll">Смотреть все</Link>
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
