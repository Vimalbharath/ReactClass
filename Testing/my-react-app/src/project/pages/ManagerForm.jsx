// src/components/ManagerForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import AssociateDisplayCard from './AssociateDisplayCard'; // Import the new component

const ManagerForm = ({ user }) => {
    const [directReports, setDirectReports] = useState([]);


        const fetchDirectReports = async () => {
          
                const res = await api.get('/project');
                const allEmployees = Array.isArray(res.data) ? res.data : [];

                const filteredAssociates = allEmployees.filter(
                    (employee) =>
                        employee.role === 'associate' && employee.reportsTo === user.id
                );
                setDirectReports(filteredAssociates);
            }

    useEffect(()=>{
        fetchDirectReports();
    },[])


    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h3 className="mb-0">Manager: {user.name.toUpperCase()}</h3>
                <p className="mb-0"><small>Email: {user.email}</small></p>
            </div>

            <div className="card-body">
                <h5 className="mb-3 text-primary">Your Direct Reports (Associates)</h5>
              {directReports.length === 0 ? (
                    <p className="text-muted">You currently have no direct reports.</p>
                ) : (
                    <ul className="list-group list-group-flush">
                        {directReports.map((associate) => (
                            <AssociateDisplayCard
                                key={associate.id}
                                associate={associate}
                               
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ManagerForm;