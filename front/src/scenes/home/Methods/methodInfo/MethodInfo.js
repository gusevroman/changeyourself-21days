import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Row from "./table/Row";

import AddMethodToTarget from "./ AddMethodToTarget";
import Loader from "../../../../components/loader/loader";
import Stars from "../../../../components/stars/Stars";



class Method extends React.Component {
  constructor(){
    super()
    this.deleteMethod = this.deleteMethod.bind(this);
    this.getScore = this.getScore.bind(this);
    this.reload = this.reload.bind(this);
  }
  state = {
    method: false,
    followLeng: 0,
    voted: false,
    score: 0,
    data: false
  }

  async componentWillMount(){
    const { id } = this.props.match.params;
    const url = 'http://localhost:5000/method/' + id;
    const  data  = await (await fetch(url, {method:"POST"})).json()
    const method = data.method
    this.setState({method})    
    this.setState({data})    
  }

  async deleteMethod(){
    const { id } = this.props.match.params;
    const url = 'http://localhost:5000/method/' + id;
    const res = prompt("Введите 'да', что бы удалить методику")
    if (res === 'да'){
      this.props.history.push('/');
      await fetch(url, { method:"DELETE" })
    } 
  }

  getScore(followers){
    const sum = followers.reduce(function(sum, current) {
      return sum + current.score;
    }, 0);
    if (sum === 0){
      return 0;
    }
    const score = (sum / followers.length).toFixed(1);

    if (this.state.followLeng !== followers.length){
      this.setState({ followLeng: followers.length, score })
    }
  }

  checkVoted(id, followers){
    for (let i = 0; i < followers.length; i++){
      if ( followers[i].author === id ) {
        return true;
      } 
    }
    return false;
  }

  async reload(method){
    this.setState({method, voted: true});  
    this.getScore(this.state.method.followers);
  }

  render() {
   const { method } = this.state;
   let counter = 1;
   const {userId} = this.props;
   const access = userId === method.author;
   let score = this.state.score;
   let voted = true;
   if (method){
     this.getScore(method.followers);
     voted = this.checkVoted(this.props.userId, method.followers);
   }
   console.log(this.state.method.followers);
   
   
    return (  
      <>
      { this.state.method 
        ? <div className="method">
            <h2 className="method__title">{method.title}</h2>
            <div className="method__likes">
              <div>Всего оценок: {this.state.followLeng}</div>
                <div>Рейтинг: <span className="star"> {score} ★</span></div>
            </div>
            <p className="method__text">{method.description}</p>
            { this.state.voted ?
              <h2>Спасибо за вашу оценку</h2>
              :
                 voted || <Stars id={method._id} reload={this.reload}/> 
              }
            <h5>Методика расчитана на {method.method.length}д</h5>
            <table className="method__table" cellpadding="0" cellspacing="0" border="0">
              <thead>
                <tr>
                  <td>День</td>
                  <td>Задание</td>
                  <td>Описание</td>
                </tr>
              </thead>
              <tbody>
                {
                  method.method.map((day) => {
                    return <Row day={day} counter={counter++}/>
                  })
                }
              </tbody>
            </table>
            <div className="method__buttons">
            { access && <span className="delete" onClick={this.deleteMethod}>Удалить методику</span>}
            <AddMethodToTarget method={this.state.data} />
            </div>
          </div>
        : 
        <Loader />
      }
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  userId: state.userId,
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Method));
