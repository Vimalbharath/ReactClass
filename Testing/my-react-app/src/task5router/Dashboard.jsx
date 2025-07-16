import React from 'react';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';

const Dashboard = ({books}) => {
   console.log(books)
  return (
    <div>
      <h2>Welcome to Dashboard Page</h2>
      {
        books.map((bookitem)=>{
          return (<div key={bookitem.id}>{bookitem.id}: 
          
          <NavLink to={`/dashboard/books/${bookitem.id}`}> {bookitem.book}</NavLink></div>)
        })
      }
     
    </div>
  );
};

export default Dashboard;
