import React, {Component} from "react";
import {Polar} from "react-chartjs-2";
import {changeColor, logout, showProfile} from "../../../redux/actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


class Chart extends Component {

    static defaultProps = {
        displayLegend: true,
    };


    render() {
        return (
            <div className="chart">
                <Polar data={this.props.chartData} options={{
                    legend: {
                        display: this.props.displayLegend,
                        position: 'right'
                    }
                }}/>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    userId: state.userId,
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Chart)
);
