import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../reducers/bookSlice';

const BookDashboard = ({  onDeleteBook, onEditBook }) => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.book);
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = list.filter(bookItem => {
    if (searchTerm === '') {
      return true;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      bookItem.book.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div>
      <h3 className="mb-3">List of Books</h3> 
  
      <div className="mb-4"> 
        <input
          type="text"
          className="form-control" 
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

     
      {filteredBooks.length === 0 ? (
        <p className="text-muted">{searchTerm ? "No books found matching your search." : "No books available. Add some!"}</p> 
      ) : (
        <ul className="list-unstyled"> 
          {filteredBooks.map((bookItem) => (
            <li
              key={bookItem.id}
              className="mb-3 pb-2 border-bottom d-flex justify-content-between align-items-center" 
            >
              <div>
                <div><strong>Title:</strong> {bookItem.book}</div>
                <div><strong>Author:</strong> {bookItem.author}</div>
                <div><strong>Description:</strong> {bookItem.description}</div>
              </div>
              <div>
                
                <button
                  className="btn btn-warning btn-sm me-2" 
                  onClick={() => onEditBook(bookItem)}
                >
                  Edit
                </button>
               
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDeleteBook(bookItem.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookDashboard;