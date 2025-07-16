import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
const BookDetail = ({ books }) => {
    
    const { bookId } = useParams();

   
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return <div>Book not found!</div>;
    }

    return (
        <div>
            <h2>Book Details</h2>
            <p><strong>ID:</strong> {book.id}</p>
            <p><strong>Title:</strong> {book.book}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <NavLink to="/dashboard"> Back</NavLink>
           
        </div>
    );
};

export default BookDetail;