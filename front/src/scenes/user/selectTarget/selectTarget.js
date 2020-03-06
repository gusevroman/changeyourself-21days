import React from "react";
import {withRouter} from 'react-router-dom';
import './selectTarget.css'
import {logIn} from "../../../redux/actions";


class SelectTarget extends React.Component {
    state = {
        dataTarget: false,
        dataMethods: false,
        uniqArr: [],
        uniqMet: [],
        value: ''

    };

    async getData(url, options) {
        const response = await fetch(url, options);
        const json = await response.json();
        return json
    }

    async componentDidMount() {
        const json = await this.getData('http://localhost:5000/newTarget');
        this.setState(({obj}) => {
            return {dataTarget: json}
        });
        const arr = [];
        this.state.dataTarget.forEach((elem) => arr.push(elem.category));
        const newArr = [];
        for (let str of arr.flat()) {
            if (!newArr.includes(str)) {
                newArr.push(str);
            }
        }
        this.setState({
            uniqArr: newArr
        })
    }

    takeSelectValue = async (value) => {
        this.setState({
            value
        })

        const response = await fetch('http://localhost:5000/getTags', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({value})
        });

        const dataMethods = await response.json();
        console.log(dataMethods);
        const newArr = [];

        // dataMethods.map((elem) => {
        //     console.log(elem.tag)
        // })
        dataMethods.map((elem) => {
            if (!newArr.includes(elem.tag)) {
                newArr.push(elem.tag)
            }
        });

        this.setState({
            uniqMet: newArr
        })


    };

    render() {
        console.log('llllll', this.state.uniqMet);
        return (
            <>
                <div className="mainFlex">
                    <div className='childFlex'>
                        {this.state.uniqArr.length !== 0 ?
                            <div className="box">
                                <form>
                                    <select onChange={(elem) => this.takeSelectValue(elem.target.value)} id="select">
                                        <option>Выберите категорию</option>
                                        {this.state.uniqArr.map((elem) => {
                                            return (
                                                <option value={elem}>{elem}</option>
                                            )
                                        })}
                                    </select>
                                </form>
                            </div>
                            : null}
                    </div>

                    <div className='childFlex'>
                        {this.state.uniqMet.length !== 0 ?
                            <div className="box">
                                <form>
                                    <select id="select">
                                        <option>Выберите тэг</option>
                                        {this.state.uniqMet.map((elem) => {
                                            return (
                                                <option value={elem}>{elem}</option>
                                            )
                                        })}
                                    </select>
                                </form>
                            </div>
                            : null}
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(SelectTarget)
