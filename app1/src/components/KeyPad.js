import React,{Component} from 'react';
import Time from '../lib/Time'
class KeyPad extends Component {
    
    
    
    render(){
       console.log("success")
    return (
        <div class="calculator-keys">
          <button className = "btn btn-light btn-sm" type="button" onClick = {() =>this.props.InputHandler(1)}> 1 </button>
          <button className = "btn btn-light btn-sm" type="button" onClick = {() =>this.props.InputHandler(2)}> 2 </button>
          <button className = "btn btn btn-sm" type="button" onClick = {() =>this.props.InputHandler(3)}> 3 </button>
          <br/>
          <button className = "btn btn btn-sm" type="button" onClick = {() =>this.props.InputHandler(4)}> 4 </button>
          <button  className = "btn btn-light btn-sm" type="button" onClick = {() =>this.props.InputHandler(5)}> 5 </button>
          <button className = "btn btn-light btn-sm" type="button" onClick = {() =>this.props.InputHandler(6)}> 6 </button>
          <br/>
          <button className = "btn btn btn-sm" type="button" onClick = {() =>this.props.InputHandler(7)}> 7 </button>
          <button className = "btn btn-light btn-sm" type="button" onClick = {() =>this.props.InputHandler(8)}> 8 </button>
          <button  className = "btn btn-light btn-sm" type="button" onClick = {() =>this.props.InputHandler(9)}> 9 </button>
          <br />
          <button className = "btn btn-light btn-sm" type="button" onClick = {() =>this.props.InputHandler(0)}> 0 </button>
          
        </div>
        )
}
}

export default KeyPad
