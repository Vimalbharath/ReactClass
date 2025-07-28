import React from 'react';
import {useState,useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Dashboard from '../pages/Dashboard';
import Rating from '../pages/Rating';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const [activeTab,setActiveTab]=useState('dashboard');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
   
    <div className='d-flex flex-column min-vh-100 bg-light'>

      <Header logout={logout}className="bg-primary text-white shadow" />
      <div className="d-flex flex-grow-1 container-fluid py-4">
        <Sidebar setActiveTab={setActiveTab} />

       
        <div className="col-md-9 p-4 bg-white shadow-sm rounded-end">
         
          {activeTab==='dashboard' && <Dashboard user={user}/>}
          {activeTab==='rating' && <Rating user={user}/>}
    
          
        </div>
      </div>
      <Footer className="bg-secondary text-white p-3 text-center mt-auto" />
    </div>
  );
};

export default Layout;