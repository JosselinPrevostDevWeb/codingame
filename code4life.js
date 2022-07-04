/**
 * Bring data on patient samples from the diagnosis machine to the laboratory with enough molecules to produce medicine!
 **/

const projectCount = parseInt(readline());
for (let i = 0; i < projectCount; i++) {
    var inputs = readline().split(' ');
    const a = parseInt(inputs[0]);
    const b = parseInt(inputs[1]);
    const c = parseInt(inputs[2]);
    const d = parseInt(inputs[3]);
    const e = parseInt(inputs[4]);
}
// class for bots
class BotProperties {
    constructor(target,eta,score,storageA,storageB,storageC,storageD,storageE,expertiseA,expertiseB,expertiseC,expertiseD,expertiseE,totStorageMol) {
        this.target =  target; // bot coordinate
        this.eta = eta; // ignore it for this league
        this.score = score; // points de vie
        this.storageA = storageA; // A molécules carrying by my bot
        this.storageB = storageB;  // etc...
        this.storageC = storageC;
        this.storageD = storageD;
        this.storageE = storageE;
        this.totStorageMol = storageA+storageB+storageC+storageD+storageE; // how many molecules we are carrying
        this.expertiseA = expertiseA; // ignore it for this league
        this.expertiseB = expertiseB;
        this.expertiseC = expertiseC;
        this.expertiseD = expertiseD;
        this.expertiseE = expertiseE;
    }
}

// class for samples
class SampleProperties {
    constructor(sampleId,carriedBy,rank,expertiseGain,health,costA,costB,costC,costD,costE,totCostMol) {
        this.sampleId = sampleId; // sample's id
        this.carriedBy = carriedBy; // 0 if sample is carried by my bot / 1 if by the other one / else -1 
        this.rank = rank; // ignore it for this league
        this.expertiseGain = expertiseGain; // ignore it for this league
        this.health = health; // score
        this.costA = costA; // A molecules needed for the solution
        this.costB = costB; // etc...
        this.costC = costC;
        this.costD = costD;
        this.costE = costE;
        this.totCostMol = costA+costB+costC+costD+costE;
    }
}

// action's controls values
let stage = 0;

// ***************************************************************
// GAME LOOP'S START
// ***************************************************************

while (true) {
    // give bots properties in the array "botsProperties"
    let botsProperties = [];
    for (let i = 0; i < 2; i++) {
        var inputs = readline().split(' ');
        let bot = new BotProperties (inputs[0],parseInt(inputs[1]),parseInt(inputs[2]),parseInt(inputs[3]),parseInt(inputs[4]),parseInt(inputs[5]),parseInt(inputs[6]),parseInt(inputs[7]),parseInt(inputs[8]),parseInt(inputs[9]),parseInt(inputs[10]),parseInt(inputs[11]),parseInt(inputs[12]));
        botsProperties.push(bot);
    }

    // Game's controls values
    var inputs = readline().split(' ');
    const availableA = parseInt(inputs[0]); // A molecules available in 'MOLECULE'
    const availableB = parseInt(inputs[1]); // etc...
    const availableC = parseInt(inputs[2]);
    const availableD = parseInt(inputs[3]);
    const availableE = parseInt(inputs[4]);
    const sampleCount = parseInt(readline()); // number of samples in game

    // give all samples properties in the array "sampleProperties"
    let sampleProperties = []; 
    for (let i = 0; i < sampleCount; i++) {
        var inputs = readline().split(' ');
        let sample = new SampleProperties (parseInt(inputs[0]),parseInt(inputs[1]),parseInt(inputs[2]),inputs[3],parseInt(inputs[4]),parseInt(inputs[5]),parseInt(inputs[6]),parseInt(inputs[7]),parseInt(inputs[8]),parseInt(inputs[9]));
        sampleProperties.push(sample);        
    }

    // **********************************************************************
    // CONSIGNES
    //
    // Général :
    //  1 - prendre des samples au modul DIAGNOSIS
    //  2 - aller chercher les molécules spécifier sur le/les sample(s) au module MOLECULE
    //  3 - aller créer les médicaments avec le/les sample(s) et les molécules au module LABORATORY
    //
    //  chaque robot peut porter jusqu'à 3 samples et 10 molécules
    //  chaque sample à un id unique : 0 puis 1 puis 2 etc..
    //  les molécules sont notées A B C D & E
    //
    //  les consignes sont données avec GOTO & CONNECT :
    //
    // GOTO :
    // + DIAGNOSIS || MOLECULES || LABORATORY pour se déplacer vers 1 des 3 modules
    //
    // CONNECT : 
    //      DIAGNOSIS
    //          id -> donne un id au fichier télecharger depuis le cloud
    //      MOLECULES
    //          type -> = type de molecules à télécharger
    //      LABORATORY
    //          id -> identifiant du fichier pour faire le médicament
    //
    // EXEMPLES :
    //      console.error('GOTO MOLECULES'); -> aller à MOLECULES
    //      console.error('CONNECT 0'); -> prendre le fichier 0 à DIAGNOSIS
    //      console.error('CONNECT A'); -> prendre la molecule A à MOLECULES
    // **********************************************************************

    // raccourcis commandes
    const me = botsProperties[0];
    const him = botsProperties[1];
    const goD = 'GOTO DIAGNOSIS';
    const goM = 'GOTO MOLECULES';
    const goL = 'GOTO LABORATORY';
    const diag = 'DIAGNOSIS';
    const mol = 'MOLECULES';
    const lab = 'LABORATORY';
    const takeA = 'CONNECT A';
    const takeB = 'CONNECT B';
    const takeC = 'CONNECT C';
    const takeD = 'CONNECT D';
    const takeE = 'CONNECT E';

    // values which need to be update each turn
    let mySample = []; // all my samples
    sampleProperties.forEach(object=>{
        if (object.carriedBy == 0) {
            mySample.push(object);
        }
    });
    let hisSample = []; // all his samples
    sampleProperties.forEach(object=>{
        if (object.carriedBy == 1) {
            hisSample.push(object);
        }
    });

    // console.error for debug
    // mySample.forEach(object=>{
    //     console.error(object);
    // })
    // hisSample.forEach(object=>{
    //         console.error("adversaire carrying =");
    //         console.error(object);
    // })
    // console.error("moi =");
    // console.error(me);
    // console.error("lui = ");
    // console.error(him);

    // if / else for check in what case i am.
    if (me.target == diag) {
        if (mySample.length < 3) {
            stage = 1;
        } else if (mySample.length == 3) {
            stage = 2;
        }
    } else if (me.target == mol) {
        if (me.totStorageMol < 10) {
            stage = 3;
        } else if (me.totStorageMol == 10) {
            stage = 4;
        }  
    } else if (me.target == lab) {
            stage = 5;
    } 

    // give a probability score for which molecule to take

    // actions for each stage
    switch (stage) {
        case 0 :
            console.log(goD); // aller à DIAGNOSIS
        break;
        case 1 :
            // sort samples by score
            for (let i in sampleProperties) {
                for (let j in mySample) {
                    if (sampleProperties[i].sampleId == mySample[j].sampleId) {
                        sampleProperties.splice(i,1);
                    }
                }
            }
            sampleProperties.sort((a,b)=>b.health - a.health);
            // and take the available one
            for (let i = 0 ; i < sampleCount ; i++) {
                if (sampleProperties[i].carriedBy == -1) {
                    console.log('CONNECT '+sampleProperties[i].sampleId);
                    break;
                }
            }            
        break;
        case 2 :
            console.log(goM); // aller à MOLECULES
        break;
        case 3 :
            // Choose the best molecule to take
            let scoreA; // initialiser les scores
            let scoreB;
            let scoreC;
            let scoreD;
            let scoreE;
            for (let i in mySample) { // si un des samples à besoin de la molecule, attribuer 0 / -1 sinon
                if (mySample[i].costA-me.storageA > 0){
                    scoreA = 0;
                    break;
                } else {
                    scoreA = -1;
                }
            }
            for (let i in mySample) {
                if (mySample[i].costB-me.storageB > 0){ // etc...
                    scoreB = 0;
                    break;
                } else {
                    scoreB = -1;
                }
            }
            for (let i in mySample) {
                if (mySample[i].costC-me.storageC > 0){
                    scoreC = 0;
                    break;
                } else {
                    scoreC = -1;
                }
            }
            for (let i in mySample) {
                if (mySample[i].costD-me.storageD > 0){
                    scoreD = 0;
                    break;
                } else {
                    scoreD = -1;
                }
            }
            for (let i in mySample) {
                if (mySample[i].costE-me.storageE > 0){
                    scoreE = 0;
                    break;
                } else {
                    scoreE = -1;
                }
            }
            for (let i = 0 ; i < mySample.length ; i++) { // ajouter 1 au score de la molecule si le stock total moins mes besoins - celui de l'adversaire > 0
                for (let j = 0 ; j < hisSample.length ; j++) {
                    if (availableA - (hisSample[j].costA + mySample[i].costA) > 0 && scoreA != -1) {
                        scoreA++;
                    }
                    if (availableB - (hisSample[j].costB + mySample[i].costB) > 0 && scoreB != -1) {
                        scoreB++;
                    }
                    if (availableC - (hisSample[j].costC + mySample[i].costC) > 0 && scoreC != -1){
                        scoreC++;
                    }
                    if (availableD - (hisSample[j].costD + mySample[j].costD) > 0 && scoreD != -1){
                        scoreD++;
                    }
                    if (availableE - (hisSample[j].scoreE + mySample[i].costE) > 0 && scoreE != -1){
                        scoreE++;
                    }
                }
            }
            let scoreTot = [scoreA,scoreB,scoreC,scoreD,scoreE]; // ranger les scores dans un tableau qu'on va trier avec la plus grande valeur en premier
            scoreTot.sort((a,b)=>b-a);
            let takeWhatMolecule;
            if (scoreTot[0] == scoreA){ // attribuer une lettre à "takeWhatMolecule" en fonction de la correspondance entre le plus grand score du tableau et celui de chaque molecules
                takeWhatMolecule = 'A';
            } else if (scoreTot[0] == scoreB) {
                takeWhatMolecule = 'B';
            } else if (scoreTot[0] == scoreC) {
                takeWhatMolecule = 'C';
            } else if (scoreTot[0] == scoreD) {
                takeWhatMolecule = 'D';
            } else if (scoreTot[0] == scoreE) {
                takeWhatMolecule = 'E';
            }
            switch (takeWhatMolecule) { // prendre la molecule
                case 'A' :
                    console.log(takeA);
                break;
                case 'B':
                    console.log(takeB);
                break;
                case 'C' :
                    console.log(takeC);
                break;
                case 'D' :
                    console.log(takeD);
                break;
                case 'E' :
                    console.log(takeE);
                break;
            }
        break;
        case 4 :
            console.log(goL); // aller à LABORATORY
        break;
        case 5 :
            // let giveWhatSolution;
            for (let i in mySample){
                if (me.storageA>=mySample[i].costA && me.storageB>=mySample[i].costB && me.storageC>=mySample[i].costC && me.storageD>=mySample[i].costD && me.storageE>=mySample[i].costE) {
                    mySample[i].health+=100;
                    console.log("CONNECT "+mySample[i].sampleId);
                    break;
                } else {
                    console.log(goD);
                    break;
                }
            }
            // switch (giveWhatSolution) {
            //     case 0 :
            //         console.log("CONNECT "+mySample[0].sampleId);
            //     break;
            //     case 1 :
            //         console.log("CONNECT "+mySample[1].sampleId);
            //     break;
            //     case 2 :
            //         console.log("CONNECT "+mySample[2].sampleId);
            //     break;
            //     default:
            //         stage = 0;
            // }
        break;
        default:
            console.error("erreur de stage");
    }
}