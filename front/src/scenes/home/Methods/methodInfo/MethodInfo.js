import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Row from "./table/Row";


class Method extends React.Component {
  constructor(){
    super()
    this.deleteMethod = this.deleteMethod.bind(this)
  }
  state = {
    method: false
  }

  async componentWillMount(){
    const { id } = this.props.match.params;
    const url = 'http://localhost:5000/method/' + id;
    const { method } = await (await fetch(url, {method:"POST"})).json()
    this.setState({method})    
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
            { access && <span className="delete" onClick={this.deleteMethod}>Удалить методику</span>}
          </div>
        : 
        <div class="loader loader--style3" title="2">
          <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="40px" height="40px" viewBox="0 0 50 50" style={{enableBackground:"new 0 0 50 50"}} >
          <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
            <animateTransform attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
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
