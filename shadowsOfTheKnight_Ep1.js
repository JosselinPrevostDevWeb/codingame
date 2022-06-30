/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const W = parseInt(inputs[0]); // width of the building. match with X
let maxX = W;  //definition des bordures sur X
let minX = 0;


let H = parseInt(inputs[1]); // height of the building. match with Y
let maxY = H;  //definition des bordures sur Y
let minY = 0;

const N = parseInt(readline()); // maximum number of turns before game over.
var inputs = readline().split(' ');
let X0 = parseInt(inputs[0]);
let Y0 = parseInt(inputs[1]);

// game loop
while (true) {
    const bombDir = readline(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
    let whatDir = bombDir.split(''); 
    let dirOfBombA = whatDir[0]; // = 1ère valeur de bombDir
    let dirOfBombB = whatDir[1]; // 2ème val. si il y en a 2 

    let jumpDir = ''; // initialisation des coordonées du saut
    if (dirOfBombA == 'L' || dirOfBombB == 'L') { // si plus à gauche
        if (X0 == 1) {
            X0 = 0;
            maxX = X0;
            jumpDir = X0 + ' ';
        } else {
            maxX = X0;
            X0 = Math.floor(maxX - ((maxX-minX)/2));
            jumpDir = X0 + ' ';
        }
    } else if (dirOfBombA == 'R' || dirOfBombB == 'R') { // si plus à droite
        minX = X0;
        X0 = minX + Math.floor((maxX - minX) / 2);
        jumpDir = X0 + ' ';
    } else {
        jumpDir = X0 + ' ';
    }

    if (dirOfBombA == 'U' || dirOfBombB == 'U') { // si plus haut
        if (Y0 == 1) {
            Y0 = 0;
            maxY = Y0;
            jumpDir += Y0;
        } else {
            maxY = Y0;
            Y0 = Math.floor(maxY - ((maxY-minY)/2));
            jumpDir += Y0;
        }
    } else if (dirOfBombA == 'D' || dirOfBombB == 'D') { // si plus bas
        minY = Y0;
        Y0 = minY + Math.floor((maxY - minY) / 2);
        jumpDir += Y0;
    } else {
        jumpDir += Y0;
    }

    // the location of the next window Batman should jump to.
    console.log(jumpDir);
}