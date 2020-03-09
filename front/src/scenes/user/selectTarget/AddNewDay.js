import React from "react";
import {logIn} from "../../../redux/actions";


export default class AddNewDay extends React.Component {

    state =
        {
            title: this.props.day.title,
            description: this.props.day.description,
            task: this.props.day.task

        };


    inputValueLocal = (event) => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        this.props.inputValueDays(this.state.title - 1, this.state)
    };


    render() {
        return (
            <div>
                <div>День {this.state.title}</div>
                <div>Описание: <textarea onChange={this.inputValueLocal}
                                         value={this.state.description}
                                         name='description'
                                         style={{width: 350, height: 75, fontSize: 16}}
                                         type="text"/>
                </div>
                <div>Задание: <textarea onChange={this.inputValueLocal}
                                        value={this.state.task}
                                        name='task'
                                        style={{width: 350, height: 75, fontSize: 16}}
                                        type="text"/>
                </div>
            </div>
        )
    }
}
