// ES6 Arrow Function Example

// Array of employees
let employees = [
    { id: 1, name: "John", designation: "Developer", salary: 50000 },
    { id: 2, name: "Jane", designation: "Designer", salary: 45000 },
    { id: 3, name: "Mike", designation: "Manager", salary: 60000 }
];

// Using an arrow function to iterate over the array
employees.forEach(employee => {
    console.log(`ID: ${employee.id}, Name: ${employee.name}, Designation: ${employee.designation}, Salary: $${employee.salary}`);
});
