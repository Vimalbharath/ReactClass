import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3006/employees';

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmp, setNewEmp] = useState({ name: '', role: '' });

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
      <button onClick={addEmployee}>Add Employee</button>

      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} - {emp.role}
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