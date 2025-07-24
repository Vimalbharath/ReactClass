import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3006/employees1'; // Ensure this matches your JSON Server port

const EmployeeCRUD = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for the form inputs
    const [id, setId] = useState(''); // Only used for editing (pre-existing ID)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Associate'); // Default role for new entries
    const [department, setDepartment] = useState('');
    const [reportsTo, setReportsTo] = useState(''); // Renamed from managerId for clarity

    // State to track which employee is being edited
    const [editingEmployee, setEditingEmployee] = useState(null); // null if adding, object if editing

    // --- READ: Fetch Employees on Component Mount ---
    const fetchEmployees = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(API_URL);
            setEmployees(response.data);
        } catch (err) {
            console.error("Failed to fetch employees:", err);
            setError('Failed to load employee data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []); // Runs only once on mount

    // --- EDIT UI: Populate form when editingEmployee changes ---
    useEffect(() => {
        if (editingEmployee) {
            setId(editingEmployee.id);
            setFirstName(editingEmployee.firstName);
            setLastName(editingEmployee.lastName);
            setEmail(editingEmployee.email);
            setRole(editingEmployee.role);
            setDepartment(editingEmployee.department);
            setReportsTo(editingEmployee.reportsTo || ''); // Handle cases where reportsTo might be undefined (e.g., CEO)
        } else {
            // Reset form for new employee
            setId('');
            setFirstName('');
            setLastName('');
            setEmail('');
            setRole('Associate'); // Default for new entry
            setDepartment('');
            setReportsTo('');
        }
    }, [editingEmployee]);

    // --- FORM SUBMISSION (CREATE/UPDATE) ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!firstName || !lastName || !email || !role || !department) {
            alert('Please fill in all required fields: First Name, Last Name, Email, Role, Department.');
            return;
        }

        // Specific validation for 'reportsTo' based on role
        if (role !== 'CEO' && !reportsTo.trim()) {
            alert(`Employees with role "${role}" must report to someone. Please provide a "Reports To ID".`);
            return;
        }
        if (role === 'CEO' && reportsTo.trim()) {
            alert('The CEO should not report to anyone. Please clear the "Reports To ID" field.');
            return;
        }

        const employeeData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            role: role.trim(),
            department: department.trim(),
            // Only include reportsTo if it's provided and role is not CEO
            ...(role !== 'CEO' && reportsTo.trim() && { reportsTo: reportsTo.trim() })
        };

        try {
            setLoading(true);
            if (editingEmployee) {
                // --- UPDATE ---
                const response = await axios.put(`${API_URL}/${id}`, { ...employeeData, id });
                setEmployees(employees.map(emp => (emp.id === id ? response.data : emp)));
                alert('Employee updated successfully!');
            } else {
                // --- CREATE ---
                const response = await axios.post(API_URL, employeeData);
                setEmployees([...employees, response.data]);
                alert('Employee added successfully!');
            }
            resetForm(); // Clear form and reset editing state
        } catch (err) {
            console.error('Error saving employee:', err);
            setError(`Failed to save employee: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setId('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setRole('Associate'); // Reset to default for new entries
        setDepartment('');
        setReportsTo('');
        setEditingEmployee(null); // Exit editing mode
    };

    // --- DELETE ---
    const handleDelete = async (employeeToDeleteId, employeeRole) => {
        if (!window.confirm(`Are you sure you want to delete ${employeeToDeleteId}?`)) {
            return;
        }

        // --- Hierarchy Deletion Constraints ---
        let dependents = [];
        let dependentRole = '';

        if (employeeRole === 'Manager') {
            dependents = employees.filter(emp => emp.reportsTo === employeeToDeleteId && emp.role === 'Associate');
            dependentRole = 'associate(s)';
        } else if (employeeRole === 'Director') {
            dependents = employees.filter(emp => emp.reportsTo === employeeToDeleteId && emp.role === 'Manager');
            dependentRole = 'manager(s)';
        } else if (employeeRole === 'CEO') {
            dependents = employees.filter(emp => emp.reportsTo === employeeToDeleteId && emp.role === 'Director');
            dependentRole = 'director(s)';
        }

        if (dependents.length > 0) {
            alert(`Cannot delete ${employeeRole} ${employeeToDeleteId}. ${dependents.length} ${dependentRole} are still reporting to them.`);
            return;
        }

        try {
            setLoading(true);
            await axios.delete(`${API_URL}/${employeeToDeleteId}`);
            setEmployees(employees.filter(emp => emp.id !== employeeToDeleteId));
            alert('Employee deleted successfully!');
        } catch (err) {
            console.error('Error deleting employee:', err);
            setError(`Failed to delete employee: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // --- EDIT CLICK ---
    const handleEditClick = (employee) => {
        setEditingEmployee(employee);
    };

    if (loading && employees.length === 0) { // Only show full loading if no data yet
        return <div className="text-center mt-5">Loading employees...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-5">Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">{editingEmployee ? 'Edit Employee Details' : 'Add New Employee'}</h2>
            {/* Employee Form (Add/Edit) */}
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light mb-5">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="department" className="form-label">Department</label>
                        <input
                            type="text"
                            className="form-control"
                            id="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="Department"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select
                            className="form-select"
                            id="role"
                            value={role}
                            onChange={(e) => {
                                setRole(e.target.value);
                                // Clear reportsTo if CEO is selected, as CEO reports to no one
                                if (e.target.value === 'CEO') {
                                    setReportsTo('');
                                }
                            }}
                            required
                        >
                            <option value="Associate">Associate</option>
                            <option value="Manager">Manager</option>
                            <option value="Director">Director</option>
                            <option value="CEO">CEO</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="reportsTo" className="form-label">Reports To ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="reportsTo"
                            value={reportsTo}
                            onChange={(e) => setReportsTo(e.target.value)}
                            placeholder="ID of manager/director/CEO"
                            disabled={role === 'CEO'} // CEO should not report to anyone
                        />
                        {role !== 'CEO' && <small className="form-text text-muted">Enter the ID of the person this employee reports to.</small>}
                        {role === 'CEO' && <small className="form-text text-muted">CEO does not report to anyone.</small>}
                    </div>
                </div>
                <div className="mt-4">
                    <button type="submit" className="btn btn-primary me-2" disabled={loading}>
                        {loading ? 'Saving...' : (editingEmployee ? 'Save Changes' : 'Add Employee')}
                    </button>
                    {editingEmployee && (
                        <button type="button" className="btn btn-secondary" onClick={resetForm} disabled={loading}>
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            <h2 className="mb-4">Employee Hierarchy</h2>
            {employees.length === 0 && !loading ? (
                <p className="text-muted">No employees found. Add some!</p>
            ) : (
                <ul className="list-group">
                    {/* Render CEO first, then Directors, Managers, Associates */}
                    {employees.filter(emp => emp.role === 'CEO').map(ceo => (
                        <li key={ceo.id} className="list-group-item bg-info-subtle mb-3 p-3">
                            <EmployeeCard employee={ceo} onEdit={handleEditClick} onDelete={handleDelete} />
                            {/* Directors reporting to this CEO */}
                            <ul className="list-group mt-2 ps-4">
                                {employees.filter(emp => emp.role === 'Director' && emp.reportsTo === ceo.id).map(director => (
                                    <li key={director.id} className="list-group-item bg-primary-subtle mb-2">
                                        <EmployeeCard employee={director} onEdit={handleEditClick} onDelete={handleDelete} />
                                        {/* Managers reporting to this Director */}
                                        <ul className="list-group mt-2 ps-4">
                                            {employees.filter(emp => emp.role === 'Manager' && emp.reportsTo === director.id).map(manager => (
                                                <li key={manager.id} className="list-group-item bg-success-subtle mb-2">
                                                    <EmployeeCard employee={manager} onEdit={handleEditClick} onDelete={handleDelete} />
                                                    {/* Associates reporting to this Manager */}
                                                    <ul className="list-group mt-2 ps-4">
                                                        {employees.filter(emp => emp.role === 'Associate' && emp.reportsTo === manager.id).map(associate => (
                                                            <li key={associate.id} className="list-group-item bg-secondary-subtle mb-2">
                                                                <EmployeeCard employee={associate} onEdit={handleEditClick} onDelete={handleDelete} />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                    {/* Display employees without a recognized reportsTo (orphans or initial setup) */}
                     {employees.filter(emp => !emp.reportsTo && emp.role !== 'CEO').length > 0 && (
                        <li className="list-group-item bg-warning-subtle mt-3 p-3">
                            <h4>Unassigned Employees (No direct report-to structure, excluding CEO)</h4>
                            <ul className="list-group mt-2 ps-4">
                                {employees.filter(emp => !emp.reportsTo && emp.role !== 'CEO').map(unassigned => (
                                    <li key={unassigned.id} className="list-group-item mb-2">
                                        <EmployeeCard employee={unassigned} onEdit={handleEditClick} onDelete={handleDelete} />
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                </ul>
            )}
            {loading && employees.length > 0 && <div className="text-center mt-3">Performing operation...</div>}
        </div>
    );
};

export default EmployeeCRUD;


// Helper Component for Employee Display (to keep main component cleaner)
const EmployeeCard = ({ employee, onEdit, onDelete }) => (
    <div className="d-flex justify-content-between align-items-center w-100">
        <div>
            <strong>{employee.firstName} {employee.lastName}</strong> (ID: {employee.id}) - {employee.role}
            <br />
            <small>Email: {employee.email} | Dept: {employee.department}</small>
            {employee.reportsTo && (
                <small className="d-block text-muted">Reports To: {employee.reportsTo}</small>
            )}
        </div>
        <div>
            <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => onEdit(employee)}
            >
                Edit
            </button>
            <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(employee.id, employee.role)}
            >
                Delete
            </button>
        </div>
    </div>
);