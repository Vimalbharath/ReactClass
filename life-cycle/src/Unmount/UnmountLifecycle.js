import React, { Component } from 'react';

class UnmountLifecycle extends Component {
  componentDidMount() {
    console.log('🟢 Timer started');
    this.timer = setInterval(() => {
      console.log("⏰ Tick...");
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    console.log('🔴 componentWillUnmount: Timer cleared');
  }

  render() {
    return <h3>Check the console for ticking logs.</h3>;
  }
}

export default UnmountLifecycle;
