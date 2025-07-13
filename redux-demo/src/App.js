import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        <h3>A: {this.props.a}</h3>
        <button onClick={() => this.props.updateA(this.props.b)}>Update A</button>
        <h3>B: {this.props.b}</h3>
        <button onClick={() => this.props.updateB(this.props.a)}>Update B</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  a: state.reducerA.a,
  b: state.reducerB.b,
});

const mapDispatchToProps = (dispatch) => ({
  updateA: (b) => dispatch({ type: 'UPDATE_A', payload: b }),
  updateB: (a) => dispatch({ type: 'UPDATE_B', payload: a }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
