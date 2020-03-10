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
                <div className="nameBar">DAY: {this.state.title}</div>
                <textarea onChange={this.inputValueLocal}
                          placeholder="ОПИСАНИЕ"
                          value={this.state.description}
                          name='description'
                          className="textareaClass"
                          type="text"
                          required
                />
                <textarea placeholder="ЗАДАНИЕ" onChange={this.inputValueLocal}
                          value={this.state.task}
                          name='task'
                          className="textareaClass"
                          type="text"
                          required
                />
            </div>
        )
    }
}
