import React, { useState, useEffect } from 'react';

// Renamed from AddBookForm to BookForm
const BookForm = ({ onAddBook, onUpdateBook, onCancel, editingBook }) => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  // Use useEffect to pre-fill the form when editingBook prop changes
  useEffect(() => {
    if (editingBook) {
      setBookTitle(editingBook.book || ''); // Use 'book' property for title
      setAuthor(editingBook.author || '');
      setDescription(editingBook.description || '');
    } else {
      // Clear form if not editing (e.g., when switching to 'Add Book' tab)
      setBookTitle('');
      setAuthor('');
      setDescription('');
    }
  }, [editingBook]); // Re-run effect whenever editingBook prop changes

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookTitle.trim() || !author.trim() || !description.trim()) {
      alert("Book Title, Author, and Description are required!");
      return;
    }

    const bookData = {
      book: bookTitle.trim(),
      author: author.trim(),
      description: description.trim()
    };

    if (editingBook) {
      // If editing, include the ID and call onUpdateBook
      onUpdateBook({ ...bookData, id: editingBook.id });
    } else {
      // If not editing, call onAddBook
      onAddBook(bookData);
    }
  };

  return (
    <div>
      <h3>{editingBook ? 'Edit Book Details' : 'Add New Book'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="bookTitle"
          placeholder="Book Title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          style={{ marginBottom: '10px', display: 'block', width: '300px' }}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ marginBottom: '10px', display: 'block', width: '300px' }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: '10px', display: 'block', width: '300px', minHeight: '80px' }}
        ></textarea>
        {editingBook ? (
          <>
            <button type="submit" className="btn btn-success me-2">Save Changes</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </>
        ) : (
          <button type="submit" className="btn btn-primary">Add Book</button>
        )}
      </form>
    </div>
  );
};

export default BookForm;