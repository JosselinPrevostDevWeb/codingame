/**
 * Don't let the machines win. You are humanity's last hope...
 **/
const width = parseInt(readline()); // the number of cells on the X axis
const height = parseInt(readline()); // the number of cells on the Y axis
//Create a table with all element. We will acces with table[i][j]
let table = [];
for (let i = 0; i < height; i++) {
    const line = readline(); // width characters, each either 0 or .
    table.push(line);
}
//analyse each element of the table
for (let i = 0; i < table.length; i++) { 
    for (let j = 0; j < table[i].length; j++) {       
        //when a 0 is find
        if (table[i][j] == '0') {
            //create a string for the answer
            let result = j + ' ' + i + ' ';
            // find the nearest neighbor to the right
                //create a table with only the right's neighbor on the same line
            let tableVR = [];
            for (let a = j+1 ; a < table[i].length ; a++) {
                tableVR.push(table[i][a]);
            }
                //check the table
            if (tableVR.indexOf('0') == -1) {
                result += '-1 -1 ';
            } else {
                let VR = j + 1 + tableVR.indexOf('0');
                result += VR+' '+i+' ';
            }
            // find the nearest neighbor to the bottom
                //same way..
            let tableVB = [];
            for (let a = i+1 ; a < table.length ; a++) {
                tableVB.push(table[a][j]);
            }
            if (tableVB.indexOf('0') == -1) {
                result += '-1 -1';
            } else {
                let VB = i + 1 + tableVB.indexOf('0');
                result += j+' '+VB+' ';
            }
            // give result
            console.log(result);
         } 
    }
}
