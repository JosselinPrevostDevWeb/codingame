/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

// pour utiliser boost une seule fois
let useBoost = true;

// initalize the checkpoint's array + create class for checkpoint propertis
let map = [];
class Checkpoint {
    constructor(nextX,nextY,nextD,nextA){
        this.nextX = nextX;
        this.nextY = nextY;
        this.nextD = nextD;
        this.nextA = nextA;
    }
}
let isMapFull = false;
let countForMap = -1;
let countForCheck = 0;

// game loop
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

    // memorize the map
    if (isMapFull == false) {
        console.error('countForMap = '+countForMap);
        // create the next checkpoint object
        let checkpoint = new Checkpoint (nextCheckpointX,nextCheckpointY,nextCheckpointDist,nextCheckpointAngle);
        // push only the first one
        if (countForMap == -1) {
            map.push(checkpoint);
            countForMap++;    
            console.error('mapInit =');
            map.forEach(object =>{
                console.error(object);
            });  
        // end the process when the next is equal to the first    
        } else if (countForMap > 0 && nextCheckpointX == map[0].nextX && nextCheckpointY == map[0].nextY) {
                isMapFull = true;
        // add checkpoint only when we have new properties
        } else if (map[countForMap].nextX !== nextCheckpointX && map[countForMap].nextY !== nextCheckpointY) {
            map.push(checkpoint);
            countForMap++;
            console.error('mapAdd =');
            map.forEach(object =>{
                console.error(object);
            });
        }
    }
    // let a = 30;
    // let b = 40;
    // let c = 60;
    // let angleArad = Math.acos(((b*b)+(c*c)-(a*a))/(2*b*c));
    // let AngleAdeg = angleArad*180/Math.PI;
    // console.error('angleA = '+AngleAdeg);
    if (isMapFull == true) {
        console.error('map is full = ');
        map.forEach(object =>{
            console.error(object);
        });
        console.error('countformap = '+countForMap+' and map.length = '+map.length);
        // for (let i = 0 ; i < map.length ; i++){
        //     let triangle = {
        //         a: ,
        //         b: ,
        //         c: ,
        //         A: ,
        //         bac: ,
        //         abc: ,
        //         bca: 
        //     }
        //     map[i].nextA = 
        // }
    }
 
    console.error('nextX = ' + nextCheckpointX + ' & nextY = '+nextCheckpointY);
    console.error('x et y = '+x+ ' '+y);
    // nextCheckpointAngle
    // nextCheckpointDist
    // thrust

    // Pod behaviour
    // for the first "blind" lap
    if (isMapFull == false) {
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
    // for the rest of the laps
    } else if (isMapFull == true) {
        thrust = 100;

        if (nextCheckpointDist > 4000 && nextCheckpointAngle == 0) {
            thrust = "BOOST";
        }
    }

    // utiliser boost dans les bonnes conditions
 

    // You have to output the target position
    // followed by the power (0 <= thrust <= 100)
    // i.e.: "x y thrust"
    console.log(nextCheckpointX + ' ' + nextCheckpointY + ' ' + thrust);
}