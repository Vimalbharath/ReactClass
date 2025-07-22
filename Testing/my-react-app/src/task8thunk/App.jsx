import {useState} from 'react';
import BookDashboard from "./components/BookDashboard";
import AddBookForm from "./components/AddBookForm";
import Help from './components/Help';


const App=()=>{
     const [activeTab, setActiveTab] = useState('dashboard');
     const [editingBook, setEditingBook] = useState(null);
     
const handleEditClick = (book) => {
    setEditingBook(book); 
    setActiveTab('addBook'); 
  };
   const handleCancelEdit = () => {
    setEditingBook(null); 
    setActiveTab('dashboard'); 
  };

    return (
        <div className="container border p-5 mt-5">
            <h1 className="mb-5">Book Management- Redux Thunk</h1>
            <button className="btn btn-primary mb-5 me-5" 
            onClick={()=>setActiveTab('dashboard')}
            >Dashboard</button>
             <button className="btn btn-success mb-5 me-5"
             onClick={()=>setActiveTab('addbook')}
             >Add Book</button>
            <button className="btn btn-secondary mb-5 me-5" 
            onClick={()=>setActiveTab('help')}
            >Help</button>
            {(activeTab==='dashboard')&& <BookDashboard onEditBook={handleEditClick}/>}
            {(activeTab==='addbook')&& <AddBookForm onCancel={handleCancelEdit} editingBook={editingBook}/>}
            {(activeTab==='help')&& <Help/>}
            
        </div>
    )
}

export default App;