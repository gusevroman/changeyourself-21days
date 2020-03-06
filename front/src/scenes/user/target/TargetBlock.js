import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Target from "./Target";
import { showTargets } from "../../../redux/actions";



class TargetBlock extends React.Component {


  async componentDidMount() {
    const {targets} = await ( await fetch(`http://localhost:5000/user/${this.props.isLoggined}`,{method:"POST"})).json();    
    this.props.showTargets(targets);
  }

    render() {
        return (
            <>
              { !this.props.targets 
                  ? <div>Загрузка 0</div>
                  : this.props.targets.map((elem) => {
                      return <Target parameters={elem}/>
                    })

              }
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