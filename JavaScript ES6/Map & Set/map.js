var map = new Map();  
map.set('John', 'author');  
map.set('arry', 'publisher');  
map.set('Mary', 'subscriber');  
map.set('James', 'Distributor');  

console.log(map.size);  

//for...of loop
var colors = new Map([   
    ['1', 'Red'],   
    ['2', 'Green'],   
    ['3', 'Yellow'],  
    ['4', 'Violet']   
 ]);  
   
 for (let col of colors.values()) {  
     console.log(col);  
 }  
   
 console.log(" ");
   
 for(let col of colors.entries())   
 console.log(`${col[0]}: ${col[1]}`);  

var itr = colors.values();  
console.log(itr.next());  
console.log(itr.next());  
console.log(itr.next());
console.log(itr.next());
console.log(itr.next());

var itr = colors.entries();  
console.log(itr.next());  
console.log(itr.next());  
console.log(itr.next());  
console.log(itr.next());
console.log(itr.next());

var itr = colors.keys();  
console.log(itr.next());  
console.log(itr.next());  
console.log(itr.next());  
console.log(itr.next());
console.log(itr.next());