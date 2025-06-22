let colors = new Set(['Green', 'Red', 'Orange', 'Yellow', 'red']);  
console.log(colors);  


let color = new Set(['Green', 'Red', 'Orange', 'Yellow', 'Red']);  
console.log(color.size);  
console.log(color);  

colors.add('Violet');  
colors.add('Indigo');  
colors.add('Blue');  
colors.add('Violet');  
console.log(colors.size);  
console.log(colors);  

colors.add('Violet');  
colors.add('Indigo');  
colors.add('Blue');  
colors.add('Violet');  
colors.clear();
console.log(colors.size);  

colors.add('Violet');  
colors.add('Indigo');  
colors.add('Blue');  
colors.add('Violet');  
colors.delete('Violet');  
console.log(colors.size);  
console.log(colors);  