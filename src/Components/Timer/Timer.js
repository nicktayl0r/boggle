import React from 'react';
import './Timer.css';


class Timer extends React.Component {


toMMSS = () => {
    var sec_num = parseInt(this.props.countdown, 10); // don't forget the second param
    var minutes = Math.floor(sec_num / 60);
    var seconds = sec_num - (minutes * 60);

    
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}

    componentDidMount() {
        this.timerId = setInterval(() => {
          if (this.props.countdown > 0) this.props.handleTick();
        }, 1000);
      }

    render(){
        return (
            <div className='Timer'>
                {this.toMMSS(this.props.countdown)}
            </div>
        )
    }

};

export default Timer;