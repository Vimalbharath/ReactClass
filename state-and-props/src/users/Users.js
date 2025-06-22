import React, { Component } from 'react';
import User from './User';

class Users extends Component {
  state = {
    users: [
      { name: "John", age: 10 },
      { name: "Jill", age: 30 },
      { name: "Jamie", age: 40 },
      { name: "Jackie", age: 30 },
      { name: "Joshua", age: 40 },
      { name: "Jonathan", age: 40 },
      { name: "Joseph", age: 30 },
    ],
    title: "Users List"
  }

  // Event handler to reduce age by 1
  makeMeYounger = () => {
    const updatedUsers = this.state.users.map(user => {
      return {
        ...user,
        age: user.age > 0 ? user.age - 1 : 0
      };
    });

    this.setState({ users: updatedUsers });
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1> {/* From props */}
        <h1>{this.state.title}</h1> {/* From internal state */}
        
        {/* Display each user */}
        {
          this.state.users.map((user, index) => {
            return <User key={index} age={user.age}>{user.name}</User>;
          })
        }

        {/* Trigger age update */}
        <button onClick={this.makeMeYounger}>Make Us 1 Year Younger</button>
      </div>
    );
  }
}

export default Users;
