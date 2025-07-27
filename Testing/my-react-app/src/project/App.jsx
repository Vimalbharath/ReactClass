import EmployeeList from "./EmployeeList";
import EmployeeCRUD from "./EmployeeCrud";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

const App=()=>{
    return (
    <Router>
    
     
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Layout />} />
        </Routes>
 
    </Router>

      
       
    )
}

export default App;
