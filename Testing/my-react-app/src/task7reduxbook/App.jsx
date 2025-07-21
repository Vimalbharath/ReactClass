import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import BookDashboard from './components/BookDashBoard';
import BookForm from './components/AddBookForm';
const API_URL = 'http://localhost:3006/books3'; 

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingBook, setEditingBook] = useState(null);

  // Redux hooks
  const dispatch = useDispatch();
  const books = useSelector(state => state.books.items); 

  useEffect(() => {
    const fetchBooks = async () => {
        const response = await axios.get(API_URL);
        dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: response.data })
       };
    fetchBooks();
  }, [dispatch]);


  const handleAddBook = async (newBookData) => {
      const response = await axios.post(API_URL, newBookData);
      dispatch({ type: 'ADD_BOOK_SUCCESS', payload: response.data });
      setActiveTab('dashboard');
  };

  
  const handleDeleteBook = async (bookId) => {
        await axios.delete(`${API_URL}/${bookId}`);
        dispatch({ type: 'DELETE_BOOK_SUCCESS', payload: bookId })
  };

  const handleEditClick = (book) => {
    setEditingBook(book); 
    setActiveTab('addBook'); 
  };

  
  const handleUpdateBook = async (updatedBookData) => {
      const response = await axios.put(`${API_URL}/${updatedBookData.id}`, updatedBookData);
      dispatch({ type: 'UPDATE_BOOK_SUCCESS', payload: response.data });
      setEditingBook(null); 
      setActiveTab('dashboard');
  };

  
  const handleCancelEdit = () => {
    setEditingBook(null); 
    setActiveTab('dashboard'); 
  };


  return (
    <div className="container mt-4 p-5" >
      <h1>Book Management - Redux</h1>
      <div className="mb-3">
        <button
          className={`btn me-2 ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => {
            setActiveTab('dashboard');
            setEditingBook(null); 
          }}
        >
          Dash Board
        </button>
        <button
          className={`btn ${activeTab === 'addBook' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => {
            setActiveTab('addBook');
            setEditingBook(null); 
          }}
        >
          {editingBook ? 'Edit Book' : 'Add Book'} 
        </button>
      </div>

     
      {activeTab === 'dashboard' && (
        <BookDashboard
          books={books}
          onDeleteBook={handleDeleteBook} 
          onEditBook={handleEditClick}   
        />
      )}
      {activeTab === 'addBook' && (
        <BookForm
          onAddBook={handleAddBook}
          onUpdateBook={handleUpdateBook} 
          onCancel={handleCancelEdit}     
          editingBook={editingBook}       
        />
      )}
    </div>
  );
};

export default App;