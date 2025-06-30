import React, { Component } from 'react';

class MountLifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Initializing...'
    };
    console.log('1️⃣ constructor called');
  }

  componentDidMount() {
    console.log('3️⃣ componentDidMount called');
    this.setState({ message: 'Component has mounted!' });
  }

  render() {
    console.log('2️⃣ render called');
    return <h2>{this.state.message}</h2>;
  }
}

export default MountLifecycle;
