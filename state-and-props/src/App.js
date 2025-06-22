import React from 'react';
import Users from './users/Users';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Passing title as props */}
      <Users title="Users List Props" />
    </div>
  );
}

export default App;
