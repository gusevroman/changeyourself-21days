import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



export default class CarouselAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                'https://s11.stc.all.kpcdn.net/share/i/12/6194028/inx960x640.jpg',
                'https://traingain.org/multimedia/files_asset/2/5/8/8/b2f31fa51dbf7a0bfabecdc3c819a60c_760_500_1.jpg',
                'https://neurohive.io/wp-content/uploads/2019/01/mooc-e1548164087669.jpg',
                'https://i.vaikra.com/post/thumb-jkeuk8.png',
            ],
            current: 0,
            isNext: true
        };

        this.handlerPrev = this.handlerPrev.bind(this);
        this.handlerNext = this.handlerNext.bind(this);
        this.goToHistoryClick = this.goToHistoryClick.bind(this);
    }

    // componentDidMount() {
    //     this.timer = setInterval(this.handlerNext.bind(this), 10000);
    // }

    handlerPrev() {
        let index = this.state.current,
            length = this.state.items.length;

        if( index < 1 ) {
            index = length;
        }

        index = index - 1;

        this.setState({
            current: index,
            isNext: false
        });
    }

    handlerNext() {
        let index = this.state.current,
            length = this.state.items.length - 1;

        if( index == length ) {
            index = -1;
        }

        index = index + 1;

        this.setState({
            current: index,
            isNext: true
        });
    }

    goToHistoryClick( curIndex, index ) {
        let next = (curIndex < index);
        this.setState({
            current: index,
            isNext: next
        });
    }

    render(){
        let index = this.state.current,
            isnext = this.state.isNext,
            src = this.state.items[index];

        return (
            <div className="appCar">
                <div className="carousel">
                    <ReactCSSTransitionGroup
                        transitionName={{
                            enter: isnext ? 'enter-next' : 'enter-prev',
                            enterActive: 'enter-active',
                            leave: 'leave',
                            leaveActive: isnext ? 'leave-active-next' : 'leave-active-prev'
                        }}
                    >
                        <div className="carousel_slide" key={index}>
                            <img src={src}/>
                        </div>
                    </ReactCSSTransitionGroup>
                    <button className="carousel_control carousel_control__prev" onClick={this.handlerPrev}><span></span></button>
                    <button className="carousel_control carousel_control__next" onClick={this.handlerNext}><span></span></button>
                    <div className="carousel_history">
                        <History
                            current={this.state.current}
                            items={this.state.items}
                            changeSilde={this.goToHistoryClick}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

class History extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let current = this.props.current;
        let items = this.props.items.map( (el, index) => {
            let name = (index === current) ? 'active' : '';
            return (
                <li key={index}>
                    <button
                        className={name}
                        onClick={ () => this.props.changeSilde(current, index) }
                    ></button>
                </li>
            )
        });

        return (
            <ul>{items}</ul>
        )
    }
}
