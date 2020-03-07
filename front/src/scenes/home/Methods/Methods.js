import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Method from "./Method";

class Methods extends React.Component {
  state = {
    methods: false
  };

  async componentDidMount() {
    const methods = await (await fetch("http://localhost:5000/method",{method:"POST"})).json();
    this.setState({methods})
  }
  render() {
    return (
      <>
        {this.state.methods ? (
          <div className="topMethods">
            <h3 className="topMethods__title">
              10 самый популярный методологий
            </h3>
            <div className="topMethods__content">
              {this.state.methods.map(method => {
                return <Method method={method} />;
              })}
            </div>
          </div>
        ) : (
          <div>Загрузка</div>
        )}
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
  connect(mapStateToProps, mapDispatchToProps)(Methods)
);
