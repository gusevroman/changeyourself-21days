import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


class TargetList extends React.Component {
async componentDidMount(){
  console.log(this.props.match.params)
  const data = await ( await fetch(`http://localhost:5000/user/target/${this.props.match.params.id}`,{method:"GET"})).json();    
console.log('fetch>>>', data);
}
  render() {
    console.log('propsi', this.props);
    const { id } = this.props.match.params;
    // this.props.targets.map((elem) => {
    //   if (elem._id === id) {
    //     return elem
    //   }
    //   console.log(elem);
    // }
    // )
    return (
      <>
        <div>
          ID фрагмента:{id}
        </div>
      </>
    )
  }
}
const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  targets: state.targets
});
export default withRouter(
  connect(mapStateToProps)(TargetList)
)
