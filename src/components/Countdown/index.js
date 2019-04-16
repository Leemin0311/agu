import React from 'react';

const HOUR = 60 * 60 * 1000;
const MIN = 60 * 1000;

export default class countdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeCount: props.timeCount,
        };
    }

    componentDidMount() {
        this.timer = setInterval(this.countdown, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    countdown = () => {
        const { timeCount } = this.state;
        this.setState({
            timeCount: timeCount - 1000,
        });
    };

    render() {
        const { timeCount } = this.state;
        const hour = parseInt(timeCount / HOUR);
        const min = parseInt((timeCount % HOUR) / MIN);
        const second = parseInt((timeCount % HOUR) % MIN / 1000);

        return `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${
            second < 10 ? `0${second}` : second
        }`;
    }
}
