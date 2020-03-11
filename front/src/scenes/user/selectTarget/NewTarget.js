import React from "react";
import { withRouter } from "react-router-dom";

import NewMethodForm from "./AddMethodForm";
import NewMethodButton from "./AddMethodButton";

import "./selectTarget.css";
import ShowSelectMetods from "./ShowSelectMetods";
import Loader from "../../../components/loader/loader";

class SelectTarget extends React.Component {
  state = {
    dataTarget: false,
    dataMethods: false,
    uniqArr: ["Спорт", "Образование", "Хобби", "Здоровье"],
    uniqMet: [],
    value: "",
    addClick: false,
    selectedTag: "",
  };

  // createMethod = () => {
  //
  // };

  addMethods = event => {
    this.setState({
      addClick: !this.state.addClick
    });
  };

  takeSelectValue = async value => {
    this.setState({
      value,
      uniqMet: [],
    });

    const response = await fetch("http://localhost:5000/getTags", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ value })
    });

    const dataMethods = await response.json();
    const newArr = [];

    dataMethods.map(elem => {
      if (!newArr.includes(elem.tag)) {
        newArr.push(elem.tag);
      }
    });

    this.setState({
      uniqMet: newArr
    });
  };

  tagSelected = async event => {    
    this.setState({
      selectedTag: event
    });
  };

  render() {
    console.log(this.state);
    return (
      <>
        <div className="mainFlex">
          <div className="childFlex">
            {this.state.uniqArr.length !== 0 ? (
              <div className="box">
                <form>
                  <span>
                    <select
                      onChange={elem => this.takeSelectValue(elem.target.value)}
                      id="select"
                    >
                      <option selected >Выберите категорию</option>
                      {this.state.uniqArr.map(elem => {
                        return <option value={elem}>{elem}</option>;
                      })}
                    </select>
                  </span>
                </form>
              </div>
            ) : null}
          </div>

          <div className="childFlex">
              <div className="box">
                <form>
                  <select
                    onChange={elem => this.tagSelected(elem.target.value)}
                    id="select"
                    >
                    <option selected >Выберите тэг</option>
                  {this.state.uniqMet.length !== 0 && (
                    this.state.uniqMet.map(elem => {
                      return (
                        <option
                          // {this.tagSelected.bind(elem)}
                          value={elem}
                        >
                          {elem}
                        </option>
                      );
                    })
                    )}
                  </select>
                </form>
              </div>
          </div>
          <div className="topMethods">
            <div className="topMethods__content">
              {this.state.selectedTag.length > 1 ? (
                <ShowSelectMetods tag={this.state.selectedTag} />
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(SelectTarget);
