import React from "react";
import './icono.min.css'
import AddNewDay from "./AddNewDay";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { Link, animateScroll as scroll } from "react-scroll";


class NewMethodForm extends React.Component {
    constructor(props) {
        super(props)
        this.sendForm = this.sendForm.bind(this);
        this.myRef = React.createRef();
    }

    state = {
        title: '',
        description: '',
        category: '',
        tag: '',
        author: this.props.isLoggined,
        days: [
            {
                title: 1,
                description: '',
                task: '',
            }
        ],


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
            description: '',
            task: ''
        });
        this.setState({
            days: newArr
        })
        this.scrollToBottom();
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
        const {newMethod} = await (await fetch('http://localhost:5000/newMethod', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })).json();
        const url = `method/${newMethod._id}`;

        this.props.history.push(url);
    };


    scrollToBottom = () => {
        scroll.scrollToBottom();
    };


    deleteDay = (event) => {
        event.preventDefault();
        let newDays = [...this.state.days];
        newDays.pop();
        this.setState({
            days: newDays
        })
    };

    render() {
        let uniqArr = ['Спорт', 'Образование', 'Хобби', 'Здоровье', 'Музыка', 'Технологии'];
        return (
            <div className="box">
                <form id="form" className="topBefore" onSubmit={this.sendForm}>


                    <input onChange={this.firstInputValue} placeholder="НАЗВАНИЕ МЕТОДА"
                           value={this.state.title}
                           name='title'
                           type="text"
                           required
                    />


                    <textarea onChange={this.firstInputValue} placeholder='ОПИСАНИЕ'
                              value={this.state.description}
                              name="description"
                              type="text"
                              required/>


                    <input className="inputClass" placeholder="УКАЖИТЕ ТЭГИ" onChange={this.firstInputValue}
                           value={this.state.tag}
                           name="tag" type="text"/>


                    <div className="selectContainer"><select className="addSelect"
                                                             onChange={(elem) => this.selectValue(elem.target.value)}>
                        <option>Выберите категорию</option>
                        {uniqArr.map(elem => {
                            return <option value={elem}>{elem}</option>
                        })}
                    </select>
                    </div>


                    {this.state.days.length > 1 ?
                        <>
                            <div>{this.state.days.map((elem) => {
                                return <AddNewDay day={elem} inputValueDays={this.inputValue}/>
                            })
                            }
                            </div>

                            <div className='logoTrash'>
                                <i ref={this.myRef} onClick={this.deleteDay} className="icono-trash"></i>
                            </div>

                            {/*<button onClick={this.deleteDay}>удалить день</button>*/}
                        </>
                        : <div>{this.state.days.map((elem) => {
                            return <AddNewDay day={elem} inputValueDays={this.inputValue}/>
                        })
                        }
                        </div>}


                    <div className="buttonContainer">
                        <button className="outline orange oneButton" onClick={this.scrollToBottom} onClick={this.plusDay}>Добавить день</button>
                        <button className="outline orange oneButton" type="submit">Добавить</button>
                    </div>
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
