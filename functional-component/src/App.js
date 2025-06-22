import React from 'react';
import Employee from './component/Employee';

// Functional Component to display a welcome message
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
}

// Root Component
function App() {
  return (
    <div>   
    
      {/* Rendering multiple Welcome components with different names */}
      <Welcome name="Sara" />      
      <Welcome name="Cahal" />      
      <Welcome name="Edite" />    
    
      {/* Employee section */}
      <h1>Employee List</h1>
      <Employee />

    </div>
  );
}

export default App;
