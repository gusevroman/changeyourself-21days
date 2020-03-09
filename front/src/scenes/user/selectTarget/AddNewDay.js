import React from "react";
import {logIn} from "../../../redux/actions";


export default class AddNewDay extends React.Component {
    state = {
        days: [
            {
                title: 0,
                description: 'hgjh',
                task: 'hgjhg'
            }
        ]
    };

    inputValueDays = (event) => {
        event.preventDefault()
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            days: [
                {
                    [name]: value
                }
            ]
        });
        // console.log('Наши стейты', this.state.days.description, this.state.days.task)
        console.log('ffff', this.state.days[0].description)
    };



    render() {
        return (
            <div>
                <div>День: 1</div>
                <div>Описание: <textarea onChange={this.inputValueDays}
                                         value={this.state.days.description}
                                         name='description'
                                         style={{width: 350, height: 75, fontSize: 16}}
                                         type="text"/>
                </div>
                <div>Задание: <textarea onChange={this.inputValueDays}
                                        value={this.state.days.task}
                                        name='task'
                                        style={{width: 350, height: 75, fontSize: 16}}
                                        type="text"/>
                </div>
            </div>
        )
    }
}
