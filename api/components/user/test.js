const myArray = [1, 2, 3, 4, 5];

const index = myArray.indexOf(7);

// Si encuentra el valor, eliminas
if (index != '-1') {
    // "Splice" for DELETE an element in an array (2 ARGUMENTS Position and Number of items to delete)
    console.log("Array BEFORE delete: " + myArray)
    myArray.splice(index, 1);
    console.log("Array AFTER delete: " + myArray)
} else {
    console.log("No encontre nada, dejo array intacto: " + myArray)
}




