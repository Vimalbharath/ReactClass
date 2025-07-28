import React from 'react';
import {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Dashboard from '../pages/Dashboard';
import Rating from '../pages/Rating';

const Layout = () => {
  const [activeTab,setActiveTab]=useState('dashboard');
  return (
   
    <div className='d-flex flex-column min-vh-100 bg-light'>

      <Header className="bg-primary text-white shadow" />
      <div className="d-flex flex-grow-1 container-fluid py-4">
        <Sidebar setActiveTab={setActiveTab} />

       
        <div className="col-md-9 p-4 bg-white shadow-sm rounded-end">
         
          {activeTab==='dashboard' && <Dashboard />}
          {activeTab==='rating' && <Rating />}
    
          
        </div>
      </div>
      <Footer className="bg-secondary text-white p-3 text-center mt-auto" />
    </div>
  );
};

export default Layout;