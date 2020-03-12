import React from "react";
import { connect } from "react-redux";
import {withRouter, Link} from "react-router-dom";
import "./modal.css";
import Modal from "../scenes/Auth/Modal/Modal"

class Main extends React.Component {

  state ={
    isOpen: false
  }
  render() {
    return (
      <>
        { !this.state.isOpen ? 
          <>
          <div className="global-modal">

          <div className="welcome-page">
            <div className="corner"></div>
            <div className="corner"></div>
            <div className="corner"></div>
            <div className="corner"></div>
            <div className="content">
              <p data-shadow="WELCOME">
                <span>2</span>
                <span>1</span>
                <span>D</span>
                <span>A</span>
                <span>Y</span>
                <span>S</span>
              </p>
            </div>
            <div className="right-vert-line"></div>
            <div className="left-vert-line"></div>
            {/* <div className="continue">Sneaky Button</div> */}
          </div>
        </div>
        <div className="buttons">
          <div className="global-container">
            <div className="icons">
              <div className="icon fb">
                <a href="#2" target="_blank" onClick={(e)=>{
                  e.preventDefault();
                  this.setState({isOpen: true})
                }}>
                  REG
                </a>
              </div>
              <div className="icon git">
                <a href="#2" target="_blank" onClick={(e)=>{
                  e.preventDefault();
                  this.setState({isOpen: true})
                }}>
                  LOG
                </a>
              </div>
            </div>
          </div>


          <div className="welcome">
          <div className="content">
            <div className="content__container">
              <p className="content__container__text">Стань</p>

              <ul className="content__container__list">
                <li className="content__container__list__item">сильнее &nbsp;!</li>
                <li className="content__container__list__item">лучше &nbsp;!</li>
                <li className="content__container__list__item">быстрее &nbsp;!</li>
                <li className="content__container__list__item">умнее &nbsp;!</li>
              </ul>
            </div>
          </div>
          </div>

          
        </div>
        </>
        :
        <Modal isOpen={true}/>
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined
});

export default withRouter(connect(mapStateToProps)(Main));
