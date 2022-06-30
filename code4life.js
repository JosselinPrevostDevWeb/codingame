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
// Création de classe pour stocker les infos des bots.
class BotProperties {
    constructor(target,eta,score,storageA,storageB,storageC,storageD,storageE,expertiseA,expertiseB,expertiseC,expertiseD,expertiseE) {
        this.target =  target; //emplacement du bot
        this.eta = eta; // à ignorer pour cette ligue
        this.score = score; // points de vie
        this.storageA = storageA; // nombres de molécules A transportées par le bot
        this.storageB = storageB;  // etc...
        this.storageC = storageC;
        this.storageD = storageD;
        this.storageE = storageE;
        this.expertiseA = expertiseA; // à ignorer pour cette ligue
        this.expertiseB = expertiseB;
        this.expertiseC = expertiseC;
        this.expertiseD = expertiseD;
        this.expertiseE = expertiseE;
    }
}

// Création de classe pour stocker les infos des samples.
class SampleProperties {
    constructor(sampleId,carriedBy,rank,expertiseGain,health,costA,costB,costC,costD,costE) {
        this.sampleId = sampleId; // id unique du fichier
        this.carriedBy = carriedBy; // 0 si le fichier est porté par mon bot / 1 si par l'autre / -1 sinon
        this.rank = rank; // à ignorer pour cette ligue
        this.expertiseGain = expertiseGain; // à ignorer pour cette ligue
        this.health = health; // points de vie accordés quand fichier validé
        this.costA = costA; // nombres de molecules A nécessaire pour valider le fichier
        this.costB = costB; // etc...
        this.costC = costC;
        this.costD = costD;
        this.costE = costE;
    }
}

// Création des valeurs de contrôle d'actions
let didICameDiag = false;
let sampleAvailable;
let didITookSample = false;
let didICamMol = false;
let AmIFullOfMol = false;
let didICamLab = false;
let didICreatedSolution = false;

// ***************************************************************
// DEBUT DE LA GAME LOOP
// ***************************************************************

while (true) {
    // assigniation des propriétées des bots dans le tableau botsProperties
    let botsProperties = [];
    for (let i = 0; i < 2; i++) {
        var inputs = readline().split(' ');
        let bot = new BotProperties (inputs[0],parseInt(inputs[1]),parseInt(inputs[2]),parseInt(inputs[3]),parseInt(inputs[4]),parseInt(inputs[5]),parseInt(inputs[6]),parseInt(inputs[7]),parseInt(inputs[8]),parseInt(inputs[9]),parseInt(inputs[10]),parseInt(inputs[11]),parseInt(inputs[12]));
        botsProperties.push(bot);
    }

    // Valeurs de contrôles du jeux
    var inputs = readline().split(' ');
    const availableA = parseInt(inputs[0]); // nombres de molecules A disponibles
    const availableB = parseInt(inputs[1]); // etc...
    const availableC = parseInt(inputs[2]);
    const availableD = parseInt(inputs[3]);
    const availableE = parseInt(inputs[4]);
    const sampleCount = parseInt(readline()); // nombre de fichiers d'échantillons en jeux

    // assigniation des propriétées des samples dans le tableau sampleProperties
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

    // données à imprimer en console.error pour débug
    sampleProperties.forEach(object=>{
        if (object.carriedBy == 0) {
            console.error('mon sample = ');
            console.error(object);
        } else if (object.carriedBy == 1) {
            console.error('sample du bot adverse = ');
            console.error(object);
        }
    })

    // pour 1ère phase uniquement
    if (me.target == 'START_POS') {
        console.log(goD);
        didICameDiag = true;
    // début de la boucle => prendre un sample à DIAGNOSIS
    } else if (didICameDiag == true) {
        if (sampleProperties[0].carriedBy == -1) {
            sampleAvailable = sampleProperties[0].sampleId;
        } else if (sampleProperties[0].carriedBy == 1) {
            sampleAvailable = sampleProperties[1].sampleId;
        }
        // sampleAvailable = sampleProperties[0].sampleId;
        let result = 'CONNECT '+ sampleAvailable;
        console.log(result);
        didICameDiag = false;
        didITookSample = true;
    // puis aller à MOLECULES
    } else if (didITookSample == true) {
        console.log(goM);
        didITookSample = false;
        didICamMol = true;
    // prendre toutes les molécules nécessaires
    } else if (didICamMol == true) {
        if (me.storageA < sampleProperties[0].costA) {
            console.log(takeA);
        } else if (me.storageB < sampleProperties[0].costB) {
            console.log(takeB);
        } else if (me.storageC < sampleProperties[0].costC) {
            console.log(takeC);
        } else if (me.storageD < sampleProperties[0].costD) {
            console.log(takeD);
        } else if (me.storageE < sampleProperties[0].costE) {
            console.log(takeE);
    // Quand c'est fini, aller à LABORATORY
        } else {
            AmIFullOfMol = true;
            didICamMol = false;
            didICamLab = true;
            console.log(goL);
        } 
    // fabriquer la solution
    } else if (didICamLab == true) {
        let result = 'CONNECT '+ sampleAvailable;
        console.log(result);
        didICamLab = false;
        didICreatedSolution = true;
    // puis retourner à DIAGNOSIS
    } else if (didICreatedSolution == true) {
        console.log(goD);
        didICreatedSolution = false;
        didICameDiag = true;
    }
}