import React, { useState } from 'react';

const BookDashboard = ({ books, onDeleteBook, onEditBook }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(bookItem => {
    if (searchTerm === '') {
      return true;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      bookItem.book.toLowerCase().includes(lowerCaseSearchTerm) ||
      bookItem.author.toLowerCase().includes(lowerCaseSearchTerm) ||
      bookItem.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div>
      <h3 className="mb-3">Current Books</h3> {/* Added margin-bottom */}

      {/* Search Input Field */}
      <div className="mb-4"> {/* Replaced inline style with Bootstrap margin-bottom */}
        <input
          type="text"
          className="form-control" // Bootstrap class for full-width input styling
          placeholder="Search by title, author, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display the filtered list of books */}
      {filteredBooks.length === 0 ? (
        <p className="text-muted">{searchTerm ? "No books found matching your search." : "No books available. Add some!"}</p> // Added text-muted for subtle color
      ) : (
        <ul className="list-unstyled"> {/* Replaced inline style with Bootstrap list-unstyled */}
          {filteredBooks.map((bookItem) => (
            <li
              key={bookItem.id}
              className="mb-3 pb-2 border-bottom d-flex justify-content-between align-items-center" // Replaced inline styles with Bootstrap classes
            >
              <div>
                <div><strong>Title:</strong> {bookItem.book}</div>
                <div><strong>Author:</strong> {bookItem.author}</div>
                <div><strong>Description:</strong> {bookItem.description}</div>
              </div>
              <div>
                {/* Edit Button */}
                <button
                  className="btn btn-warning btn-sm me-2" // Replaced inline style with Bootstrap margin-end
                  onClick={() => onEditBook(bookItem)}
                >
                  Edit
                </button>
                {/* Delete Button */}
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