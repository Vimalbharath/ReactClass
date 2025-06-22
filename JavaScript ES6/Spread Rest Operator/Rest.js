function show(...args) {  
    let sum = 0;  
    for (let i of args) {  
        sum += i;  
    }  
    console.log("Sum = "+sum);  
  }  
    
  show(10, 20, 30,40,50); 

//Rest Parameters and Destructuring
  var colors = ["Violet", "Indigo", "Blue", "Green", "Yellow", "Orange", "Red"];    
        
  // destructuring assignment    
  var [a,b,...args] = colors;    
  console.log(a);   
  console.log(b);     
  console.log(args);  


//Rest Parameter in a dynamic function
let num = new Function('...args','return args'); 
console.log(num(10, 20, 30));  