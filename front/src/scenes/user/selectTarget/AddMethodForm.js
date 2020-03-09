import React from "react";


export default class NewMethodForm extends React.Component {
    render() {
        return (
            <div className="box">
                <form name='addMethod'>
                    <p>Название метода: <input style={{width: 250, height: 45, fontSize: 30}}type="text"/></p>
                    <p>Описание: <textarea style={{width: 350, height: 75, fontSize: 16}}  type="text"/></p>
                    <p>День 1: <textarea style={{width: 350, height: 75, fontSize: 16}}  type="text"/></p>
                    <button>Добавить день</button>
                </form>
            </div>
        )
    }
}
