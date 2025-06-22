let colors = ['Red', 'Yellow'];  
let newColors = [...colors, 'Violet', 'Orange', 'Green'];  
console.log(newColors); 

//Without using spread operator
let color = ['Red', 'Yellow'];  
let newColor = color;  
newColor.push('Green');  
console.log(newColor);  
console.log(color);

//Using spread operator
let colorss = ['Red', 'Yellow'];  
let newColorss = [...colorss];  
newColorss.push('Green');  
console.log(newColorss);  
console.log(colorss);  

//Spread operator and Strings
let str = ['A', ...'EIO', 'U'];  
console.log(str);  

let myObj = {
    a:1,
    b:3,
    c:5,
    d:8,
}
  
  // we use the rest operator to grab everything else left in the object.
  let { a, b, ...z } = myObj;
  console.log(a);     // 1
  console.log(b);     // 3
  console.log(z);     // {c: 5, d: 8}
  
  // using the spread syntax we cloned our Object
  let clone = { ...myObj };
  console.log(clone);
  // {a: 1, b: 3, c: 5, d: 8}
  myObj.e = 15;
  console.log(clone)
  // {a: 1, b: 3, c: 5, d: 8}
  console.log(myObj)
  // {a: 1, b: 3, c: 5, d: 8, e: 15}