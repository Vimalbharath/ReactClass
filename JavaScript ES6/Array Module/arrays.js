let arrElements = [];
const  ARRAY_SIZE = 5;

module.exports.addElement = function(element) {    
    if(arrElements.length < ARRAY_SIZE) {
        arrElements.push(element);
        return true;
    }
    else
        return false;
}

module.exports.getElements = () => {
    return arrElements;
}

module.exports.filterArray = (category) => {
    return arrElements.filter((element) => {
        return (element.category == category);
    })          
}

module.exports.addFirstElement = (element) => {   //function expression.  
    if(arrElements.length < ARRAY_SIZE) {
        arrElements.unshift(element);
        return true;
    }
    else
        return false;
}

module.exports.removeElement = () => {
    arrElements.pop();  // Removes the last element
    return true;
}

module.exports.removeFirstElement = () => {
    arrElements.shift();  // Removes the first element
    return true;
}
