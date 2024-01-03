const myArray = [1, 2, 3, 4, 5];

const index = myArray.indexOf(7);

// Si encuentra el valor, eliminas
if (index != "-1") {
    // "Splice" for DELETE an element in an array (2 ARGUMENTS Position and Number of items to delete)
    console.log("Array BEFORE delete: " + myArray);
    myArray.splice(index, 1);
    console.log("Array AFTER delete: " + myArray);
} else {
    console.log("No encontre nada, dejo array intacto: " + myArray);
}

// compare(data: string | Buffer, encrypted: string): Promise<boolean>
// The data to be encrypted.

const bcrypt = require("bcrypt");

// @return — A promise to be either resolved with the comparison result salt or rejected with an Error

// @example

// const myPlaintextPassword = 's0/\/\P4$$w0rD';
const myPlaintextPassword = "secretPassword";
const someOtherPlaintextPassword = "not_bacon";
const hash = "$2b$05$2X7ORQB7S7PJXJtop5Pn5eQN/v1zf1Qo7Ap1ovyi/YNEucrzBTSsa";
const hash2 = "$2b$05$YopYzMbacejA6hlEXfFxPOJIJH.HLukeKy9hpQAR71zfr6qSzSvrK";

(async () => {
    // Load hash from your password DB.
    const result1 = await bcrypt.compare(myPlaintextPassword, hash2);
    console.log(result1);
    // result1 == true

    const result2 = await bcrypt.compare(someOtherPlaintextPassword, hash2);
    console.log(result2);
    // result2 == false
})();

// lil test change
