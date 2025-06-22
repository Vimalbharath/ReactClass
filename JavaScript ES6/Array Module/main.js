const arrays = require('./arrays.js'); // Ensure correct file name

// Adding elements
console.log("Adding elements:");
arrays.addElement({ "productName": "pen", "price": 50.00, "category": "stationary" });
arrays.addElement({ "productName": "pencil", "price": 25.00, "category": "stationary" });
arrays.addElement({ "productName": "eraser", "price": 15.00, "category": "stationary" });
arrays.addElement({ "productName": "mobile", "price": 5000.00, "category": "electronics" });
arrays.addElement({ "productName": "pendrive", "price": 500.00, "category": "electronics" });

// Attempt to add an extra element beyond ARRAY_SIZE (should return false)
console.log("Adding extra element (should be false):");
console.log(arrays.addElement({ "productName": "extraItem", "price": 100.00, "category": "misc" }));

// Display current elements
console.log("\nCurrent elements in array:");
console.log(arrays.getElements());

// Filtering elements
console.log("\nFiltering electronics category:");
let filteredArray = arrays.filterArray("electronics");
filteredArray.forEach(element => console.log(element));

// Adding an element to the beginning
console.log("\nAdding element at the beginning:");
console.log(arrays.addFirstElement({ "productName": "notebook", "price": 30.00, "category": "stationary" }));
console.log(arrays.getElements());

// Removing the last element
console.log("\nRemoving last element:");
arrays.removeElement();
console.log(arrays.getElements());

// Removing the first element
console.log("\nRemoving first element:");
arrays.removeFirstElement();
console.log(arrays.getElements());

// Filtering again after removals
console.log("\nFiltering electronics category after removals:");
let filteredArrayAfterRemoval = arrays.filterArray("electronics");
filteredArrayAfterRemoval.forEach((element) => console.log(element));
