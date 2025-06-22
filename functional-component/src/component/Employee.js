import React from 'react';

// Employee component to show static employee details
const Employee = () => {
    // Employee attributes
    let name = "Zara";
    let department = 'Fire & Safety';
    let empid = 'F05';

    return (
        <div>
            <h3>Employee {name}</h3>    
            <p>{department}</p>
            <p>{empid}</p>
        </div>
    );
}

export default Employee;
