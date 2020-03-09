import React from "react";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import Target from "./Target";
import { showTargets } from "../../../redux/actions";
import Loader from "../../../components/loader/loader";




class TargetBlock extends React.Component {

  state = {
    search: ''
  }

  async componentDidMount() {
    const { targets } = await ( await fetch(`http://localhost:5000/user/${this.props.isLoggined}`,{method:"POST"})).json();    
    this.props.showTargets(targets);
  }

  searchByTargets(event) {
    this.setState({search:event.target.value})
  }
  

    render() {
      let empty = false;
      if ( this.props.targets && this.props.targets.length === 0 ){
        empty = true;
      }
      const { targets } = this.props;
      // if (targets){
      //   const regExp = `/{this.state.search}/` + 
      //   const searchTargets = targets.map((target) => {
      //     if ( regExp.test(target) ){
      //       console.log(target);
      //     }
      //   })
      // }

        return (
          <>
          <h3 className="target__search search">
            Поиск: 
            <input type="text" className="search__input" onChange={this.searchByTargets} value={this.state.search}/>
          </h3>
          <div className="addNewTarget">
            <Link to="/newTarget" className="bt more-bt">
                <span className="fl"></span>
                <span className="sfl"></span>
                <span className="cross"></span>
                <i></i>
                <p>Добавить цель</p>
            </Link>
          </div>
            <div className="target__block">
              {   
                // empty || <h3>У вас еще нет целей, вы можете добавить ее <Link to='/newTarget'>тут</Link></h3>
              }
              { targets 
                  ? targets.map((elem) => {
                      return <Target parameters={elem} key={elem.id}/>
                    })

                  : <Loader/>
              }
            </div>
          </>
        );
    }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  targets: state.targets
});

const mapDispatchToProps = dispatch => ({
  showTargets: (targets) => dispatch(showTargets(targets))
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(TargetBlock)
);
