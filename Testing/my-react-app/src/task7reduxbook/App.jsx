import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Import your components
import BookDashboard from './components/BookDashBoard';
import BookForm from './components/AddBookForm';

// Assuming you have Bootstrap CSS imported globally (e.g., in src/index.js)
// import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:3006/books3'; // Your JSON Server endpoint for books

const App = () => {
  // State for managing the active tab: 'dashboard' or 'addBook' (or 'editBook' if explicitly separate)
  const [activeTab, setActiveTab] = useState('dashboard');
  // NEW: State for the book currently being edited. Null means no book is being edited.
  const [editingBook, setEditingBook] = useState(null);

  // Redux hooks
  const dispatch = useDispatch();
  const books = useSelector(state => state.books.items); // Assuming state.books.items is your array of books

  // Fetch books from API on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(API_URL);
        dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: response.data });
      } catch (error) {
        console.error("Error fetching books:", error);
        alert("Failed to fetch books. Please check JSON Server connection.");
      }
    };

    fetchBooks();
  }, [dispatch]);

  // Handler for adding a new book (called by BookForm when in add mode)
  const handleAddBook = async (newBookData) => {
    try {
      const response = await axios.post(API_URL, newBookData);
      dispatch({ type: 'ADD_BOOK_SUCCESS', payload: response.data });
      alert("Book added successfully!");
      setActiveTab('dashboard'); // Switch back to dashboard after adding
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    }
  };

  // NEW: Handler for deleting a book (called by BookDashboard)
  const handleDeleteBook = async (bookId) => {
    if (window.confirm(`Are you sure you want to delete book with ID: ${bookId}?`)) {
      try {
        await axios.delete(`${API_URL}/${bookId}`);
        // Dispatch an action to remove the book from Redux store
        dispatch({ type: 'DELETE_BOOK_SUCCESS', payload: bookId });
        alert("Book deleted successfully!");
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Failed to delete book. Please try again.");
      }
    }
  };

  // NEW: Handler for starting the edit process (called by BookDashboard)
  const handleEditClick = (book) => {
    setEditingBook(book); // Set the book object to be edited
    setActiveTab('addBook'); // Switch to the form tab
  };

  // NEW: Handler for updating an existing book (called by BookForm when in edit mode)
  const handleUpdateBook = async (updatedBookData) => {
    try {
      // Send PUT request to update the book by its ID
      const response = await axios.put(`${API_URL}/${updatedBookData.id}`, updatedBookData);
      // Dispatch an action to update the book in Redux store
      dispatch({ type: 'UPDATE_BOOK_SUCCESS', payload: response.data });
      alert("Book updated successfully!");
      setEditingBook(null); // Clear editing state
      setActiveTab('dashboard'); // Switch back to dashboard
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book. Please try again.");
    }
  };

  // NEW: Handler for canceling an edit operation
  const handleCancelEdit = () => {
    setEditingBook(null); // Clear editing state
    setActiveTab('dashboard'); // Switch back to dashboard
  };


  return (
    <div className="container mt-4" style={{ padding: '20px' }}>
      <h1>Book Management Application</h1>

      {/* Navigation Tabs/Buttons */}
      <div className="mb-3">
        <button
          className={`btn me-2 ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => {
            setActiveTab('dashboard');
            setEditingBook(null); // Clear editing state when going to dashboard
          }}
        >
          Book List
        </button>
        <button
          className={`btn ${activeTab === 'addBook' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => {
            setActiveTab('addBook');
            setEditingBook(null); // Clear editing state when going to add new book
          }}
        >
          {editingBook ? 'Edit Book' : 'Add Book'} {/* Text changes based on edit mode */}
        </button>
      </div>

      {/* Conditional Rendering based on activeTab */}
      {activeTab === 'dashboard' && (
        <BookDashboard
          books={books}
          onDeleteBook={handleDeleteBook} // Pass delete handler
          onEditBook={handleEditClick}   // Pass edit start handler
        />
      )}
      {activeTab === 'addBook' && (
        <BookForm
          onAddBook={handleAddBook}
          onUpdateBook={handleUpdateBook} // Pass update handler
          onCancel={handleCancelEdit}     // Pass cancel handler
          editingBook={editingBook}       // Pass the book being edited (or null)
        />
      )}
    </div>
  );
};

export default App;