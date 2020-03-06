import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";



class Target extends React.Component {

  render() {
    const { parameters } = this.props;

    // Получаем процент выполненных задач
    // const days    = Math.ceil((Date.parse(parameters.endDate) - new Date()) / 1000 / 60 / 60 / 24);
    let doneTasks = 0;
    parameters.actions.forEach((elem) => {
      elem.status && doneTasks++
    })
    const personts = (doneTasks * 100 / parameters.actions.length).toFixed(0);

    // Узнаем закончилось ли задание 
    let color = "progress-bar__";
    switch (parameters.status) {
      case "active":
        color += "orange"
        break;
      case "fallen":
        color += "red"
        break;
      case "completed":
        color += "green"
        break;
    }

    // Узнаем сколько Времени осталось до конца времени
    console.log(this.props);
    let link=`/methods/${this.props.parameters._id}`
    return (
      <>
      <Link to={link}>
          <div className="target">
            <h2 className="target__title">{parameters.title}</h2>

            <div className="progress-bar">
              <span className={color} style={{ flex: `0 0 ${personts}%` }}>{personts}%</span>
            </div>

            <h3 className="progress-bar__last">Осталось 1 дней</h3>
          </div>
          </Link>
      </>
    );
  }
}


//         const allTime = (Date.parse(elem.startDate) - Date.parse(elem.endDate)) * -1;
//         const days    = Math.ceil((Date.parse(elem.endDate) - new Date()) / 1000 / 60 / 60 / 24);
//         const persont = ((Date.parse(elem.endDate) - new Date()) * 100 / allTime).toFixed(0);


//         return (
//           <div className="target">
//             <h2 className="target__title">{elem.title}</h2>
//             <div className="progress-bar">
//               { persont < 0 
//                 ? <span className={color} style={{flex: `0 0 100%`}}>100%</span>
//                 : <span className={color} style={{flex: `0 0 ${persont}%`}}>{persont}%</span>
//               }
//             </div>
//             { persont < 0 
//                 ? <h3 className="progress-bar__last">Закончено {days * -1} дней назад</h3>
//                 : <h3 className="progress-bar__last">Осталось {days} дней</h3>
//             }
//           </div>)
//     })
// }


//   {this.props.methods.map(w => {
//       const url = `/methods/${w.id}`;
//       return <div className="target">
//           <h2 className="target__title">{w.title}, {w.id}</h2>
//           <div className="progress-bar orange">
//               <span className="progress-bar__orange" style={{flex: "0 0 90%"}}>90%</span>
//           </div>
//           <h3 className="progress-bar__last">Осталось 2 дня</h3>
//           <Link to={url}>Узнать подробнее</Link>
//       </div>
//   })} */



const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  targets: state.targets
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Target)
);
