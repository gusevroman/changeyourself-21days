import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import Chart from "./chart";
import {logout, changeColor} from "../../../redux/actions";
import {showProfile} from "../../../redux/actions";


class ShowProfile extends Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    state = {
        name: "",
        email: "",
        tel: "",
        instagram: "",
        about: "",
        profileImg: false,
        deleteAccount: false,
        close: true,

        chartData: {
            labels: [], //name
            datasets: [{
                label: "Все категории",
                backgroundColor: ["rgba(200,0,0,0.2)", "rgba(8, 60, 194, 0.2)", "rgb(7%, 82%, 82%, 0.2)", "rgba(5, 82, 7, 0.2)", "rgba(122, 15, 171, 1)"],
                data: [] //number
            }]
        },

        chartDataTwo: {
            labels: ['Активны', 'Неактивны'], //name
            datasets: [{
                label: "Незаконченные",
                backgroundColor: ["rgba(200,0,0,0.2)", "rgba(8, 60, 194, 0.2)", "rgb(7%, 82%, 82%, 0.2)"],
                data: [] //number
            }]
        }
    };

    logout() {
        this.props.logout();
        this.props.history.push("/");
    }

    async componentDidMount() {
        await this.getProfile();

        let id = this.props.userId;
        const response = await fetch('http://localhost:5000/chart', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id})
        });

        let newResponse = await response.json();
        let newArrCategory = [];
        let newArrActive = [];
        newResponse.forEach(elem => newArrCategory.push(elem.category));
        newResponse.forEach(elem => newArrActive.push(elem.status));

        let notDone = [];
        let done = [];

        newArrActive.forEach(elem => {
            if (elem === 'active') {
                notDone.push(elem)
            } else {
                done.push(elem)
            }
        });

        let a = newArrCategory.flat();

      let newChartData = {...this.state.chartData};
      let newChartDataTwo = {...this.state.chartDataTwo};

        let result = a.reduce(function (acc, el) {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
        }, {});
        let arrArr = Object.entries(result);
        let arrLabels = [];
        arrArr.forEach(elem => arrLabels.push(elem[0]));
        arrArr.forEach(elem => newChartData.datasets[0].data.push(elem[1]));





        newChartDataTwo.datasets[0].data.push(notDone.length);
        newChartDataTwo.datasets[0].data.push(done.length);

        newChartData.labels = arrLabels;


        this.setState({
            chartData: newChartData,
            newChartDataTwo: newChartDataTwo
        });

    }

    async getProfile() {
        const profile = await (
            await fetch(
                `http://localhost:5000/user/profile/${this.props.isLoggined}`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    }
                }
            )
        ).json();
        this.props.showProfile(profile);
        this.setState(profile);
    }

    renderProfile() {
        const {name, profileImg, about, email, tel, instagram} = this.state;
        let profileImgAvatar;
        if (profileImg) {
            profileImgAvatar = `http://localhost:5000/${profileImg}`;
        } else {
            profileImgAvatar =
                "http://localhost:5000/user-default.jpg";
        }
        return (
            <div className="profile">
                <div className="profile__content">
                    <div className="profile__main">
                        <div className="user-logo">
                            <img src={profileImgAvatar} alt={name}/>
                        </div>
                    </div>

                    <h3 className="profile__show">
                        <span className="profile__title">Имя</span>
                        <span className="profile__discr">{name}</span>
                    </h3>

                    <h3 className="profile__show">
                        <span className="profile__title">Email</span>
                        <span className="profile__discr">{email}</span>
                    </h3>

                    <h3 className="profile__show">
                        <span className="profile__title">Обо мне</span>
                        <span className="profile__discr">{about}</span>
                    </h3>

                    <h3 className="profile__show">
                        <span className="profile__title">Телефон</span>
                        <span className="profile__discr">{tel}</span>
                    </h3>

                    <h3 className="profile__show">
                        <span className="profile__title">Инстаграм</span>
                        <span className="profile__discr">{instagram}</span>
                    </h3>

                    <div className="row">
                        <Link to="/user/profile/edit" className="edit">
                            Изменить данные
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return <div className="prof">
          <form class="form">
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="stars"
                                value="Dark"
                                onChange={e => {
                                    this.props.changeColor(e.target.value);
                                }}
                            />
                            <span class="">Темная</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="stars"
                                value="Light"
                                onChange={e => {
                                    this.props.changeColor(e.target.value);
                                }}
                            />
                            <span class="">Светлая</span>
                        </label>
                    </div>
                </form> 
        {this.renderProfile()}
            {this.state.chartData.labels.length !== 0 ?
                <div className="graf">
                    <div >
                        <Chart chartData={this.state.chartData} displayTitle="false"/>
                    </div>
                    <div >
                        <Chart chartData={this.state.chartDataTwo} displayTitle="false"/>
                    </div>
                </div> : null}
                <div className="row">
                        <Link to="/" onClick={this.logout} className="edit">
                            Выйти
                        </Link>
                    </div>
        </div>;
            }
}

const mapStateToProps = state => ({
    isLoggined: state.isLoggined,
    userId: state.userId,
    profile: state.profile
});

const mapDispatchToProps = dispatch => ({
    showProfile: profile => dispatch(showProfile(profile)),
    logout: () => dispatch(logout()),
    changeColor: color => dispatch(changeColor(color))
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ShowProfile)
);
