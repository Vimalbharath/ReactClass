import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class App extends Component {
  state = {
    name: '',
    email: '',
  };

  componentDidMount() {
    // Load contacts from JSON server directly (without thunk)
    axios.get('http://localhost:3006/contacts').then((response) => {
      this.props.dispatch({ type: 'FETCH_CONTACTS_SUCCESS', payload: response.data });
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    if (name && email) {
      axios
        .post('http://localhost:3006/contacts', { name, email })
        .then((response) => {
          this.props.dispatch({ type: 'ADD_CONTACT_SUCCESS', payload: response.data });
          this.setState({ name: '', email: '' });
        });
    }
  };

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Contact Manager</h2>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <button type="submit">Add Contact</button>
        </form>

        <h3>Contacts List</h3>
        <ul>
          {this.props.contacts.map((contact) => (
            <li key={contact.id}>{contact.name} - {contact.email}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: state.contacts.items,
});

export default connect(mapStateToProps)(App);