import React, { Component } from 'react';

class UpdateLifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('Constructor - init');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('🔄 shouldComponentUpdate called');
    return true; // Return false to prevent update
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('📸 getSnapshotBeforeUpdate called');
    return "Snapshot before update";
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('✅ componentDidUpdate called');
    console.log('Snapshot:', snapshot);
  }

  increment = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    console.log('🎨 render called');
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default UpdateLifecycle;
