import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3006/employees1'; // Your JSON Server endpoint

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                setError(null); // Clear previous errors
                const response = await axios.get(API_URL);
                setEmployees(response.data);
            } catch (err) {
                console.error("Failed to fetch employees:", err);
                setError('Failed to load employee data.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees(); // Call the fetch function when the component mounts
    }, []); // Empty dependency array means this runs once on mount

    if (loading) {
        return <div className="text-center mt-5">Loading employees...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-5">Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">All Employee Details</h2>
            {employees.length === 0 ? (
                <p className="text-muted">No employees found.</p>
            ) : (
                <ul className="list-group">
                    {employees.map(employee => (
                        <li key={employee.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{employee.firstName} {employee.lastName}</strong> ({employee.role}) - {employee.department}
                                <br />
                                <small>Email: {employee.email}</small>
                                {employee.managerId && (
                                    <small className="d-block text-muted">Manager ID: {employee.managerId}</small>
                                )}
                            </div>
                            {/* You could add buttons for View/Edit/Delete here */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmployeeList;