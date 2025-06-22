import React from 'react';
import './App.css';
/* The following line can be included in your src/index.js or App.js file*/
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentList from './Component/StudentList';


function App() {
  return (
    <div>      
      <StudentList/>
    </div>
  );
}

export default App;
