import React from "react";

export default class infoButton extends React.Component {
    state = {
        dataChallenge: [
            {
                title: 'Бросить курить',
                description: 'Эта методика позволяет бросить курить',
                days: [
                    {
                        1: 'Берешь сигарету',
                        2: 'и бросаешь ее'
                    }
                ]
            },
            {
                title: 'Отжаться 100 раз',
                description: 'Эта методика позволяет отжаться 100 раз',
                days: [
                    {
                        1: 'Ложишься на пол',
                        2: 'и отжимаешься'
                    }
                ]
            },
        ]
    };

    render() {
        console.log(this.state);
        return (
            <div>
                {/*{ this.state.dataChallenge.map( elem => {*/}
                {/*    return <div>*/}
                {/*        <div>{elem.title}</div>*/}
                {/*        <div>{elem.description}</div>*/}
                {/*        <div>{elem.days}</div>*/}
                {/*    </div>*/}
                {/*})}*/}
                <button>Подробная информация</button>
            </div>
        )
    }
}
