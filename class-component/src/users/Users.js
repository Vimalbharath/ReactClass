import React, { Component } from 'react';
import User from './User';

class Users extends Component {
  render() {
    const { title } = this.props;

    return (
      <div className="users-container">
        <h1>{title}</h1>

        {/* Users with and without children */}
        <User />
        <User>Jill</User>
        <User age="30">Jamie</User>
        <User age="40">Rajesh</User>
        <User></User>
      </div>
    );
  }
}

export default Users;
