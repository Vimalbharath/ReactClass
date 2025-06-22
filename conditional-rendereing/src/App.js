import React from 'react';
import './App.css';
import EmployeeFuncGreeting from './components/EmployeeFuncGreeting';
import EmployeeClassGreeting from './components/EmployeeClassGreeting';

function App() {
  return (
    <div className="App">
      <h2>👨‍🏫 Class Component Greeting</h2>
      <EmployeeClassGreeting />

      <h2>👩‍🏫 Functional Component Greeting</h2>
      <EmployeeFuncGreeting 
        isEmployeeLoggedIn={true} 
        employeeName="Jane Smith" 
      />
    </div>
  );
}

export default App;
