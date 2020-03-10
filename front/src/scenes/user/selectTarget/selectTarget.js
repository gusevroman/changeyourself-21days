import React from "react";
import {withRouter} from 'react-router-dom';

import NewMethodForm from './AddMethodForm'
import NewMethodButton from "./AddMethodButton";

import './selectTarget.css'
import ShowSelectMetods from "./ShowSelectMetods";
import Loader from '../../../components/loader/loader'

class SelectTarget extends React.Component {
    state = {
        dataTarget: false,
        dataMethods: false,
        uniqArr: ['Спорт', 'Образование', 'Хобби', 'Здоровье'],
        uniqMet: [],
        value: '',
        addClick: false,
        selectedTag: ''
  };

    // createMethod = () => {
    //
    // };

    addMethods = (event) => {
        this.setState({
            addClick: !this.state.addClick
        })
    };

    async componentDidMount() {
        // const response = await fetch('http://localhost:5000/newTarget');
        // const json = await response.json();
        // this.setState(({obj}) => {
        //     return {dataTarget: json}
        // });
        // const arr = [];
        // const newArr = [];
        // this.state.dataTarget.forEach((elem) => arr.push(elem.category));
        // for (let str of arr.flat()) {
        //     if (!newArr.includes(str)) {
        //         newArr.push(str);
        //     }
        // }
        // this.setState({
        //     uniqArr: newArr
        // })

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
      body: JSON.stringify({ value })
    });

        const dataMethods = await response.json();
        const newArr = [];

        dataMethods.map((elem) => {
            if (!newArr.includes(elem.tag)) {
                newArr.push(elem.tag)
            }
        });

        this.setState({
            uniqMet: newArr
        })
    };

    tagSelected(event){
      this.setState({
        selectedTag: event
      })
    }

    render() {
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
                                    <select onChange={(elem) => this.tagSelected(elem.target.value)} id="select">
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
                    {this.state.selectedTag.length > 1 ?
                    <ShowSelectMetods tag={this.state.selectedTag} />
                    : null
                    }
                    <NewMethodButton addMethodsFunc={this.addMethods}/>

                    <div className='childFlex'>
                        {(this.state.addClick) ?
                            <NewMethodForm/>
                            : null}
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(SelectTarget)
