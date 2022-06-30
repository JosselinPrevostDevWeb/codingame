/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/


// game loop
// pour utiliser boost une seule fois
let useBoost = true;

while (true) {
    var inputs = readline().split(' ');
    const x = parseInt(inputs[0]);
    const y = parseInt(inputs[1]);
    const nextCheckpointX = parseInt(inputs[2]); // x position of the next check point
    const nextCheckpointY = parseInt(inputs[3]); // y position of the next check point
    const nextCheckpointDist = parseInt(inputs[4]); // distance to the next checkpoint
    const nextCheckpointAngle = parseInt(inputs[5]); // angle between your pod orientation and the direction of the next checkpoint
    var inputs = readline().split(' ');
    const opponentX = parseInt(inputs[0]);
    const opponentY = parseInt(inputs[1]);
    let thrust; // initialisation de la puissance

    console.error('x et y = '+x+ ' '+y);
    // nextCheckpointAngle
    // nextCheckpointDist
    // thrust
    if (nextCheckpointDist > 3000) {
        thrust = 100;
    } else if (nextCheckpointDist > 2000) {
        if (nextCheckpointAngle > 90 || nextCheckpointAngle < -90) {
            thrust = 30;
        } else if (nextCheckpointAngle > 45 || nextCheckpointAngle < -45) {
            thrust = 75;
        } else {
            thrust = 100;
        }
    } else if (nextCheckpointDist > 1000) {
        if (nextCheckpointAngle > 90 || nextCheckpointAngle < -90) {
            thrust = 15;
        } else if (nextCheckpointAngle > 45 || nextCheckpointAngle < -45) {
            thrust = 40;
        } else {
            thrust = 60;
        }
    } else {
        if (nextCheckpointAngle > 90 || nextCheckpointAngle < -90) {
            thrust = 0;
        } else if (nextCheckpointAngle > 45 || nextCheckpointAngle < -45) {
            thrust = 50;
        } else {
            thrust = 80;
        }
    }

    // utiliser boost dans les bonnes conditions
    if (nextCheckpointDist > 4000 && nextCheckpointAngle == 0) {
        thrust = "BOOST";
    }

    // You have to output the target position
    // followed by the power (0 <= thrust <= 100)
    // i.e.: "x y thrust"
    console.log(nextCheckpointX + ' ' + nextCheckpointY + ' ' + thrust);
}