import React, { useEffect, useState } from 'react';


const Dashboard = ({user}) => {
 

  return (
    <div>
      <h2>Dashboard</h2>
      {user && (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Emp ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
         
        </>
      )}
     
    </div>
  );
};

export default Dashboard;
