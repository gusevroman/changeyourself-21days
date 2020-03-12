import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loader from "../loader/loader";
import Method from "../../scenes/home/Methods/Method";


class Methods extends React.Component {
  constructor() {
    super();
    this.search = this.search.bind(this);
  }

  state = {
    methods: false,
    search: ""
  };

  async componentDidMount() {
    const methods = await (await fetch("http://localhost:5000/method",{method:"POST"})).json();
    this.setState({methods})
  }

  search(event) {
    const search = event.target.value;
    this.setState({ search });
  }

  render() {
    let { methods, search } = this.state;
    const regExp = new RegExp(search, "i");
    let searchMethod = methods;
    if (methods) {
      searchMethod = [];
      methods.map(target => {
        if (regExp.test(target.title)) {
          searchMethod.push(target);
        }
      });
    }
    return (
      <>
        <div className="allMethods">
          <h3 className="allMethods__search">
            <input className="allMethods__input" onChange={this.search}
            value={this.state.search} placeholder="Поиск" />
          </h3>

          {this.state.methods ? (
            <div className="allMethods__content">
              {searchMethod.map(method => {
                return <Method method={method} />;
              })}
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </>
    );
  }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Methods)
);
