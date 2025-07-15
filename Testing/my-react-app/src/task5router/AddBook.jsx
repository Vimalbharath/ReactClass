import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            book: '', 
            description: '' 
        };
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
      this.props.addBook({
            id:this.state.id,
            book: this.state.book,
            description: this.state.description
        });
        this.setState({
            id:'',
            book: '',
            description: ''
        });

       
        // const navigate = useNavigate();
        // navigate('/dashboard');
    };

    render() {
        return (
            <div>
                <h2>Add New Book</h2>
                <form onSubmit={this.handleSubmit}>
                  <div>
                        <label htmlFor="bookid">Book Id:</label>
                        <input
                            type="text"
                            id="bookid"
                            name="id" 
                            value={this.state.id}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="bookTitle">Book Title:</label>
                        <input
                            type="text"
                            id="bookTitle"
                            name="book" 
                            value={this.state.book}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="bookDescription">Description:</label>
                        <input
                            type="text"
                            id="bookDescription"
                            name="description" 
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Add Book</button>
                </form>
            </div>
        );
    }
}

export default AddBook;