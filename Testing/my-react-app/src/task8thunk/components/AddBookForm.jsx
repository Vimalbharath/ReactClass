import React, { useState, useEffect } from 'react';


const AddBookForm = ({ onAddBook, onUpdateBook, onCancel, editingBook }) => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    if (editingBook) {
      setBookTitle(editingBook.book || ''); 
      setAuthor(editingBook.author || '');
      setDescription(editingBook.description || '');
    } else {
     
      setBookTitle('');
      setAuthor('');
      setDescription('');
    }
  }, [editingBook]); 

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!bookTitle.trim() || !author.trim() || !description.trim()) {
  //     alert("Book Title, Author, and Description are required!");
  //     return;
  //   }

  //   const bookData = {
  //     book: bookTitle.trim(),
  //     author: author.trim(),
  //     description: description.trim()
  //   };

  //   if (editingBook) {
      
  //     onUpdateBook({ ...bookData, id: editingBook.id });
  //   } else {
     
  //     onAddBook(bookData);
  //   }
  // };

  return (
    <div>
      <h3>{editingBook ? 'Edit Book Details' : 'Add New Book'}</h3>
      <form >
        <input
          type="text"
          name="bookTitle"
          placeholder="Book Title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          className="form-control mb-4" 
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
         className="form-control mb-4" 
        />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
         className="form-control mb-5" 
        ></textarea>
        {editingBook ? (
          <>
            <button type="submit" className="btn btn-success me-2">Save Changes</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </>
        ) : (
          <button type="submit" className="btn btn-success">Add Book</button>
        )}
      </form>
    </div>
  );
};

export default AddBookForm;