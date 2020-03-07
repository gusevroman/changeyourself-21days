import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


class TargetList extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
       target: 0
    }}

  async componentDidMount() {
    const  {target}  = await (await fetch(`http://localhost:5000/user/target/${this.props.match.params.id}`, { method: "GET" })).json();
    this.setState({target: target})
  }
  render() {
    // console.log('propsi', this.props);
    // const { id } = this.props.match.params;
    // this.props.targets.map((elem) => {
      //   if (elem._id === id) {
        //     return elem
        //   }
        //   console.log(elem);
        // }
        // )
        
        console.log('target>>>>>', this.state.target);

    const target = this.state.target
    return (
      <>
        <div>
          ID фрагмента:{target._id}
        </div>
        <div className="target">
          <h2 className="target__title">{target.title}</h2>
        


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
