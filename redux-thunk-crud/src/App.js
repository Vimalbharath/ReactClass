// src/App.js
import React from 'react';
import InsuranceList from './features/insurance/InsuranceList';
import AddInsuranceForm from './features/insurance/AddInsuranceForm';

function App() {
  return (
    <div className="App">
      <h1>Insurance Management</h1>
      <AddInsuranceForm />
      <InsuranceList />
    </div>
  );
}

export default App;
