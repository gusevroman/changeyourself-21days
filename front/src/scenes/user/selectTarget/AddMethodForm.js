import React from "react";
import './addMethodForm.css'
import AddNewDay from "./AddNewDay";
import {logIn} from "../../../redux/actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


class NewMethodForm extends React.Component {

    state = {
        title: 'yq',
        description: 'hw',
        category: '',
        tag: '',
        author: this.props.isLoggined,
        days: [
            {
                title: 1,
                description: '',
                task: ''
            }
        ]
    };

    selectValue = (value) => {
        this.setState({
            category: value
        })
    };


    plusDay = (event) => {
        event.preventDefault();
        let newArr = [...this.state.days];

        newArr.push({
            title: this.state.days.length + 1,
            description: 'qqqqqqq',
            task: ''
        });
        this.setState({
            days: newArr
        })
    };

    firstInputValue = (event) => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: [value]
        });
    };

    inputValue = (index, day) => {
        let days = [...this.state.days];
        days[index] = day;
        this.setState({
            days
        });

    };

    sendForm = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:5000/newMethod', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        });

        // const dataMethods = await response.json();
        // console.log(this.state.title);
        // console.log(this.state.description)
        // this.state.days.forEach(elem => console.log('!!!!!', elem))
    };

    render() {
        let uniqArr = ['Спорт', 'Образование', 'Хобби', 'Здоровье'];
        return (
            <div className="box">
                <form>
                    <div>Название метода: <input onChange={this.firstInputValue}
                                                 value={this.state.title}
                                                 name='title'
                                                 style={{width: 250, height: 45, fontSize: 30}}
                                                 type="text"/>
                    </div>

                    <select onChange={(elem) => this.selectValue(elem.target.value)} >
                        {uniqArr.map(elem => {
                            return <option value={elem}>{elem}</option>
                        })}
                    </select>

                    <div>Описание: <textarea onChange={this.firstInputValue}
                                             value={this.state.description}
                                             name="description"
                                             style={{width: 350, height: 75, fontSize: 16}}
                                             type="text"/>
                    </div>

                    <div>{this.state.days.map((elem) => {
                        return <AddNewDay day={elem} inputValueDays={this.inputValue}/>
                    })
                    }</div>

                    <div>Напишите тэги: <input onChange={this.firstInputValue}
                                               value={this.state.tag}
                                               name="tag" type="text"/></div>



                    <button onClick={this.plusDay}>Добавить день</button>
                    <button onClick={this.sendForm}>Отправить</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoggined: state.isLoggined,
    login: state.login,
    allPoints: state.allPoints
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(NewMethodForm)
);
