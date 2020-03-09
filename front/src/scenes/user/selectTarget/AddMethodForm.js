import React from "react";
import './addMethodForm.css'
import AddNewDay from "./AddNewDay";


export default class NewMethodForm extends React.Component {

    state = {
        title: 'ytuyty',
        description: 'hgjhgh'
    };

    // createDay = (description, task) => {
    //     return {
    //         title: 1,
    //         description: '',
    //         task: ''
    //     }
    // };

    plusDay = (event) => {
        event.preventDefault();

    };

    inputValue = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    };


    render() {
        return (
            <div className="box">
                <form>
                    <div>Название метода: <input onChange={this.inputValue}
                                                 value={this.state.title}
                                                 name='title'
                                                 style={{width: 250, height: 45, fontSize: 30}}
                                                 type="text"/>
                    </div>

                    <div>Описание: <textarea onChange={this.inputValue}
                                             value={this.state.description}
                                             name="description"
                                             style={{width: 350, height: 75, fontSize: 16}}
                                             type="text"/>
                    </div>
                    <AddNewDay createDay={this.plusDay}/>
                    <button onClick={this.plusDay}>Добавить день</button>
                </form>
            </div>


        )
    }
}
