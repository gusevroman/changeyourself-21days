import React from "react";
import {withRouter} from 'react-router-dom';

import NewMethodForm from './AddMethodForm'
import NewMethodButton from "./AddMethodButton";

import ShowSelectMetods from "./ShowSelectMetods";
import Loader from '../../../components/loader/loader'

class SelectTarget extends React.Component {
    state = {
        dataTarget: false,
        dataMethods: false,
        uniqArr: ['Спорт', 'Образование', 'Хобби', 'Здоровье', 'Музыка', 'Технологии'],
        uniqMet: [],
        value: '',
        addClick: false,
        selectedTag: ''
  };


    addMethods = (event) => {
        this.setState({
            addClick: !this.state.addClick
        })
    };


    takeSelectValue = async (value) => {
        this.setState({
            value
        });

        const response = await fetch('http://localhost:5000/getTags', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({value})
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

                    {this.state.selectedTag.length > 1 ?
                    <ShowSelectMetods tag={this.state.selectedTag} />
                    : null
                    }
                            <NewMethodForm/>
                </div>
            </>
        )
    }
}

export default withRouter(SelectTarget)
