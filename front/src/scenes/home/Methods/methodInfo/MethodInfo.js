import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Row from "./table/Row";
import AddMethodToTarget from "./ AddMethodToTarget";
import Loader from "../../../../components/loader/loader";


class Method extends React.Component {
  constructor(){
    super()
    this.deleteMethod = this.deleteMethod.bind(this)
  }
  state = {
    method: false,
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

  render() {
   const { method } = this.state;
   let counter = 1;
   const {userId} = this.props;
   const access = userId === method.author;   
   
    return (  
      <>
      { this.state.method 
        ? <div className="method">
            <h2 className="method__title">{method.title}</h2>
            <h3 className="method__subtitle">Эту методику оценили {method.followers.length}ч</h3>
            <p className="method__text">{method.description}</p>
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
