import { Component } from "react";
class Counter extends Component {
     state = {
    value: 10
  }
   decrease = () => {
    const updatedValue = this.state.value >0? this.state.value-1:0;
     
 
    this.setState({ value: updatedValue });
  }
   increase = () => {
    const updatedValue =  this.state.value+1;
     
 
    this.setState({ value: updatedValue });
  }
  render() {
   

    return (
      <div >
        <h1>
            Counter
        </h1>
        <button onClick={this.increase}>Add one: +</button>
        <h2>{this.state.value}</h2>
        <button onClick={this.decrease}>Subtract one: -</button>
       
      </div>
    );
  }
}

export default Counter;