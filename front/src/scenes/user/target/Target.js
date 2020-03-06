import React from "react";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
// const { id } = this.props.match.params;

class HomeAuth extends React.Component {

  state = {
    targets: false,
  }

  async componentDidMount() {
    const {targets} = await ( await fetch(`http://localhost:5000/user/${this.props.isLoggined}`,{method:"POST"})).json();    
    this.setState({targets});
  }

    render() {
      console.log(this.state.targets);
        return (
            <>
              { 
                !this.state.targets 
                  ?  <div>asdasdasdasd</div>
                  :  this.state.targets.map((elem) => {
                    
                      const allTime = (Date.parse(elem.startDate) - Date.parse(elem.endDate)) * -1;
                      const days    = Math.ceil((Date.parse(elem.endDate) - new Date()) / 1000 / 60 / 60 / 24);
                      const persont = ((Date.parse(elem.endDate) - new Date()) * 100 / allTime).toFixed(0);

                      let color = "progress-bar__";
                      switch (elem.status){
                        case "active" :
                          color += "orange"
                          break;
                        case "fallen" :
                          color += "red"
                          break;
                        case "completed" :
                          color += "green"
                          break;
                      }
                      return (
                        <div className="target">
                          <h2 className="target__title">{elem.title}</h2>
                          <div className="progress-bar">
                            { persont < 0 
                              ? <span className={color} style={{flex: `0 0 100%`}}>100%</span>
                              : <span className={color} style={{flex: `0 0 ${persont}%`}}>{persont}%</span>
                            }
                          </div>
                          { persont < 0 
                              ? <h3 className="progress-bar__last">Закончено {days * -1} дней назад</h3>
                              : <h3 className="progress-bar__last">Осталось {days} дней</h3>
                          }
                          
                          {/* <Link to={url}>Узнать подробнее</Link> */}
                        </div>)
                  })
              }


                {/* {this.props.methods.map(w => {
                    const url = `/methods/${w.id}`;
                    return <div className="target">
                        <h2 className="target__title">{w.title}, {w.id}</h2>
                        <div className="progress-bar orange">
                            <span className="progress-bar__orange" style={{flex: "0 0 90%"}}>90%</span>
                        </div>
                        <h3 className="progress-bar__last">Осталось 2 дня</h3>
                        <Link to={url}>Узнать подробнее</Link>
                    </div>
                })} */}
            </>
        );
    }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HomeAuth)
);
