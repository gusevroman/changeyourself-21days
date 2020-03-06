import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";



// class Target extends React.Component {

//     render() {
//       const { parameters } = this.props;

//       // Получаем процент выполненных задач
//       // const days    = Math.ceil((Date.parse(parameters.endDate) - new Date()) / 1000 / 60 / 60 / 24);
//       let doneTasks = 0;
//       parameters.actions.forEach((elem) => {
//         elem.status &&  doneTasks++
//       })
//       const personts = (doneTasks * 100 / parameters.actions.length).toFixed(0);

//       // Узнаем закончилось ли задание 
//       let color = "progress-bar__";
//       switch (parameters.status){
//         case "active" :
//           color += "orange"
//           break;
//         case "fallen" :
//           color += "red"
//           break;
//         case "completed" :
//           color += "green"
//           break;
//       }

//       // Узнаем сколько времени осталось
      
//       let time = new Date() - Date.parse(parameters.endDate);
      
//       let text;
//       if (time > -1) {
//         const endDate = parameters.endDate.split(/[-T]{1}/)
//         text = `Цель закончилась ${endDate[2]}.${endDate[1]}.${endDate[0]}`;
//       } else {
//         time *= -1;
//         const seconds = time / 1000;
//         const days = Math.floor(seconds / 86400 );
//         const hours = Math.floor((time % 86400) / 3600 / 1000);
//         // const minuts = Math.floor(time / 86400 / 1000);
//         console.log(new Date().getTime() + (1000*3600*48));
//         text = `До конца цели осталось ${days}д ${hours}ч `;
//       }
      
//         return (
//             <>
//               <div className="target">
//                 <h2 className="target__title">{parameters.title}</h2>

//                 <div className="progress-bar">
//                   <span className={color} style={{flex: `0 0 ${personts}%`}}>{personts}%</span>
//                 </div>

//               <h3 className="progress-bar__last">{text}</h3>
//             </div>

//             </>
//         );
//     }
// }


class Target extends React.Component {

  state = {
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  }

  getCountdown(){
    const date = Date.parse(this.props.parameters.endDate);
    let days, hours, minutes, seconds;
    const target_date = date

    let current_date = new Date().getTime();
    let seconds_left = (target_date - current_date) / 1000;
  
    days = this.pad( parseInt(seconds_left / 86400) );
    seconds_left = seconds_left % 86400;
       
    hours = this.pad( parseInt(seconds_left / 3600) );
    seconds_left = seconds_left % 3600;
        
    minutes = this.pad( parseInt(seconds_left / 60) );
    seconds = this.pad( parseInt( seconds_left % 60 ) );
  
    this.setState({days, hours, minutes, seconds})  
  }
  
  pad(n) {
    return (n < 10 ? '0' : '') + n;
  }

    componentDidMount(){
      if ((new Date() - Date.parse(this.props.parameters.endDate)) < 0){
        this.getCountdown();
      }
    }
    componentDidUpdate(){
      if ((new Date() - Date.parse(this.props.parameters.endDate)) < 0){
        setTimeout(() => {
          this.getCountdown()
        },1000)
      }
    }

    render() {
      const { parameters } = this.props;

      // Получаем процент выполненных задач
      let doneTasks = 0;
      parameters.actions.forEach((elem) => {
        elem.status &&  doneTasks++
      })
      const personts = (doneTasks * 100 / parameters.actions.length).toFixed(0);

      // Узнаем закончилось ли задание 
      let color = "progress-bar__";
      switch (parameters.status){
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

      // Узнаем сколько времени осталось
      
          let time = new Date() - Date.parse(parameters.endDate);
          
          let text = false;
          if (time > -1) {
            const endDate = parameters.endDate.split(/[-T]{1}/)
            text = `Цель закончилась ${endDate[2]}.${endDate[1]}.${endDate[0]}`;
          } else {
            const {days,hours,minutes,seconds } = this.state;
            text = `Осталось ${days}д ${hours}ч ${minutes}м ${seconds}с`
          }
        return (
            <>
              <div className="target">
                <h2 className="target__title">{parameters.title}</h2>

                <div className="progress-bar">
                  <span className={color} style={{flex: `0 0 ${personts}%`}}>{personts}%</span>
                </div>

              <h3 className="progress-bar__last">{text}</h3>
            </div>

            </>
        );
    }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Target)
);





