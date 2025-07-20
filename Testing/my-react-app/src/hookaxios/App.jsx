import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3006/employees';

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmp, setNewEmp] = useState({ name: '', role: '' });
  const [editingEmp, setEditingEmp] = useState(null); 

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get(API_URL);
    setEmployees(res.data);
  };

  const addEmployee = async () => {
    if (!newEmp.name || !newEmp.role) return alert("All fields required");
    await axios.post(API_URL, newEmp);
    setNewEmp({ name: '', role: '' });
    fetchEmployees(); // Refresh list
  };
   const deleteEmployee = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchEmployees(); // Refresh list
  };
   const handleEditClick = (employee) => {
    setEditingEmp(employee); 
    setNewEmp({ name: employee.name, role: employee.role });
  };
   const cancelEdit = () => {
    setEditingEmp(null);
    setNewEmp({ name: '', role: '' }); 
  };
  const updateEmployee = async () => {
    if (!newEmp.name.trim() || !newEmp.role.trim()) {
      return alert("All fields are required!");
    }
    if (!editingEmp) return;
    await axios.put(`${API_URL}/${editingEmp.id}`, {
        id: editingEmp.id, 
        name: newEmp.name.trim(),
        role: newEmp.role.trim()
      });
      setEditingEmp(null);
      setNewEmp({ name: '', role: '' });
      fetchEmployees();
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Employee Directory</h2>

      <input
        type="text"
        placeholder="Name"
        value={newEmp.name}
        onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Role"
        value={newEmp.role}
        onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
      />
      {editingEmp ? (
           
            <>
              <button onClick={updateEmployee} className='btn btn-success me-2'>Save Changes</button>
              <button onClick={cancelEdit} className='btn btn-secondary'>Cancel</button>
            </>
          ) : (
           
            <button onClick={addEmployee} className='btn btn-primary'>Add Employee</button>
          )}

      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} - {emp.role} <button className='btn btn-danger' onClick={()=>deleteEmployee(emp.id)}>X</button>
            <button className='btn btn-warning' onClick={()=>handleEditClick(emp)}> Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;




/* 

✅ useState([])

const [employees, setEmployees] = useState([]);
employees is an array.

It holds a list of employee objects, like:

[
  { id: 1, name: 'John', role: 'Developer' },
  { id: 2, name: 'Jane', role: 'Designer' }
]
This is useful for rendering a list with .map().

❌ useState({ name: '', role: '' })

const [newEmp, setNewEmp] = useState({ name: '', role: '' });
newEmp is an object, not an array.

It holds form input state for a single employee.

Example:

{ name: 'Alice', role: 'Tester' }

✅ Summary
Variable	Type	Purpose
employees	Array	List of all employees (for display)
newEmp	Object	Form values for new employee 

*/