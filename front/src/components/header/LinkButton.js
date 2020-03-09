import React from "react";
import { logout } from "../../redux/actions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

class LinkButton extends React.Component {

  render() {
    const active = this.props.history.location.pathname === this.props.href;
    const { name } = this.props
    return (
      <>
        { active ? 
      <Link to={this.props.href} className="link active" >
        {name}
      </Link>
          :
      <Link to={this.props.href} className="link" >
        {name}
      </Link>
        }
      </>
      );
    }
  }

const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LinkButton));
