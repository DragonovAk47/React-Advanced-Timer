import React,{Component} from 'react';
import Time from '../lib/Time'
import KeyPad from './KeyPad'
class AdvancedTimer extends Component {
    constructor(props){
        super(props)
        this.state = {
            time:0,
            hrs:0,
            min:0,
            sec:0,
            timeUnit:null,
            status:null,
            ready:false
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    onFocusChange = (Unit) =>
    {
          
          this.setState({
            timeUnit:Unit
          })
    }
    formatTime(time) {
        time = parseInt(time);
        return time < 10 ? '0' + time : time.toString().slice(time.toString().length - 2);
    }
    InputHandler = (time) =>
    {
        
       
        if(time&&this.state.timeUnit==='h')
        {
            if(time<0)
            {
                this.setState({
                    hrs:'00'
                })
            }
             else
                {
                    this.setState((prevState) => {
                        
                         let hrs = parseInt(this.formatTime(prevState.hrs + time));
                         
                         return ({ hrs: this.formatTime(hrs) });
            })

        }
        }
         else if(time&&this.state.timeUnit==='s')
        {
             if(time<0)
            {
                this.setState({
                    hrs:'00'
                })
            }
             else
                {
                    this.setState((prevState) => {
                         
                         let hrs = parseInt(this.formatTime(prevState.sec + time));
                         if(hrs>59)
                         {
                            hrs = prevState.sec
                         }
                         return ({ sec: this.formatTime(hrs),
                                                      });
            })

        }
        }
        else if (time&&this.state.timeUnit==='m') 
        {
             if(time<0)
            {
                this.setState({
                    hrs:'00'
                })
            }
             else
                {
                    this.setState((prevState) => {
                         let hrs = parseInt(this.formatTime(prevState.min + time));
                         if(hrs>59)
                         {
                            hrs = prevState.min
                         }
                         return ({ min: this.formatTime(hrs) });
            })

        }
        }
       this.setState((prevState) => ({
            ready: prevState.status !== 'started' && (parseInt(prevState.hrs) > 0
                || parseInt(prevState.min) > 0
                || parseInt(prevState.sec) > 0)
        }));


    }

    startHandler = () =>
    {
       
           this.setState({
            time : (this.state.hrs*3600+this.state.min*60+this.state.sec)*1000
           })
        
        

        if(this.state.status!=='started'){
            this.interval = setInterval(() => 
            {
                if(this.state.time!==0&&this.state.time>0)
                {
                    this.setState((prevState) => ({time:prevState.time -10}))
                }
                else
                {
                    this.setState({
                        time:0
                    })
                    clearInterval(this.interval);
                }
            },10)
            this.setState({
                status:'started'
            });
          }
    }
    stopHandler = () => {
        
        if (this.state.status && this.state.status === 'started') {

            clearInterval(this.interval);
            
            this.setState((prevState) => {
                return ({
                    status: 'stopped',
                });
            });
        }
    }
    resetHandler = () =>
    {
        clearInterval(this.interval);

        this.setState(() => ({ status: null, time: 0,hrs:'00',sec:'00',min:'00' }));
    }
    resumeHandler =() =>
    {
        if((this.state.status === 'stopped'))
        {
            this.interval = setInterval(() => 
            {
                if(this.state.time!==0&&this.state.time>0)
                {
                    this.setState((prevState) => ({time:prevState.time -10}))
                }
                else
                {
                    this.setState({
                        time:0
                    })
                    clearInterval(this.interval);
                }
            },10)
            this.setState({status:'started'})
        }
        
    }
    
    
    render(){
       const time = new Time();
       let clock = time.getTime(this.state.time)
    return (
        <div class="calculator">
        
        {
                (this.state.status!==null) && (
                    
                        
                        <div className="calculator-screen-1">
                            {time.getTime(this.state.time)}
                        </div>
                    
                )
            }
        {this.state.status===null &&
            <>
            <input onFocus = {() => this.onFocusChange('h')} value = {this.state.hrs} maxLength="2"
                                placeholder="00" class="calculator-screen"/>
            <input onFocus = {() => this.onFocusChange('m')} value = {this.state.min} maxLength="2"
                                placeholder="00"  class="calculator-screen"/>
            <input onFocus = {() => this.onFocusChange('s')} value = {this.state.sec} maxLength="2"
                                placeholder="00" class="calculator-screen" />

  
             <KeyPad InputHandler={this.InputHandler} status={this.state.status} /> 
            </>
        }
       {
                this.state.status===null  &&
                <>
                <button className="btn btn-success btn-lg btn-block"
                    onClick={this.startHandler}
                    disabled = {!this.state.ready}
                    >
                    Start
                </button>
                <button className="btn btn-danger btn-lg btn-block"
                        onClick={this.resetHandler}>
                        Reset
                    </button>
                    </>
            }
          {(this.state.status === 'started'||this.state.status === 'stopped')&&
                <div>
                    {
                        this.state.status === 'started' &&
                        <button className="btn btn-primary btn-lg btn-block"
                            onClick={this.stopHandler}>
                            Stop
                        </button>
                    }
                    {
                        this.state.status === 'stopped' &&
                        <button className="btn btn-success btn-lg btn-block"
                            onClick={this.resumeHandler}>
                            RESUME
                        </button>
                    }
                    <button className="btn btn-danger btn-lg btn-block"
                        onClick={this.resetHandler}>
                        Reset
                    </button>
                </div>
            }
        </div>
        )
}
}

export default AdvancedTimer
