namespace tictactoe {

window.addEventListener("load", startGame);

let severity: string;
let severityLength: number;

let game: HTMLDivElement[] = [];                        //Array für die Auswerung des SPielefeldes
let existingPlaceholder: HTMLDivElement[] = [];         //Array für die wegfallenden Platzhalter

let untakenDiv: HTMLDivElement;

let pointsBeginning: number = 0;
let pointsToGet: number = 1;
let pointsPlayer: HTMLDivElement;
let pointsComputer: HTMLDivElement;
let pointsRound: HTMLDivElement;

let winner: string | null;

function startGame(): void {
    console.log("Das Spiel wird gestartet.");
    severity = String(window.prompt("Mit welchem Schwierigkeitsgrad möchtest du spielen? Wähle zwischen 'easy', 'middle' oder 'difficult'!"));

    showCards(severity);
    showPoints();
}

function showCards(_userInput: string): void {

    switch (severity) {                          
        case "easy":
            let fieldEasy: HTMLDivElement = <HTMLDivElement>document.getElementById("field");
            fieldEasy.innerHTML = "";

            for (let i: number = 0; i < 9; i++) {
            untakenDiv = document.createElement("div");
            untakenDiv.setAttribute("class", "platzhalterEasy");
            fieldEasy.appendChild(untakenDiv);
            game.push(untakenDiv);
            existingPlaceholder.push(untakenDiv);
            untakenDiv.addEventListener("click", function(): void {playerTurn (i, game[i]); });
            }

            console.log("Die Platzhalter werden erstellt");
            severityLength = 3;   
            break;                   
        
        case "middle":
            let fieldMiddle: HTMLDivElement = <HTMLDivElement>document.getElementById("field");
            fieldMiddle.innerHTML = "";

            for (let i: number = 0; i < 16; i++) {
            untakenDiv = document.createElement("div");
            untakenDiv.setAttribute("class", "platzhalterMiddle");
            fieldMiddle.appendChild(untakenDiv);
            game.push(untakenDiv);
            existingPlaceholder.push(untakenDiv);
            untakenDiv.addEventListener("click", function(): void {playerTurn (i, game[i]); });
            }

            console.log("Die Platzhalter werden erstellt");
            severityLength = 4;   
            break;
        
        case "difficult":
            let fieldDifficult: HTMLDivElement = <HTMLDivElement>document.getElementById("field");
            fieldDifficult.innerHTML = "";

            for (let i: number = 0; i < 25; i++) {
            untakenDiv = document.createElement("div");
            untakenDiv.setAttribute("class", "platzhalterDifficult");
            fieldDifficult.appendChild(untakenDiv);
            game.push(untakenDiv);
            existingPlaceholder.push(untakenDiv);
            untakenDiv.addEventListener("click", function(): void {playerTurn (i, game[i]); });
            }

            console.log("Die Platzhalter werden erstellt");
            severityLength = 5; 
            break;   

        default:
            severity = String(window.prompt("Das war kein erlaubter Schwierigkeitsgrad! Versuch es nochmal!"));
            break;
    }
}

function showPoints(): void {
    pointsPlayer = <HTMLDivElement>document.getElementById("player");
    pointsPlayer.innerHTML = "Dein Punktestand: " + pointsBeginning;
    // console.log("Die Punkte des Spielers werden angezeigt.", pointsBeginning);

    pointsComputer = <HTMLDivElement>document.getElementById("computer");
    pointsComputer.innerHTML = "Computer Punktestand: " + pointsBeginning;
    // console.log("Die Punkte des Computers werden angezeigt.", pointsBeginning);

    pointsRound = <HTMLDivElement>document.getElementById("round");
    pointsRound.innerHTML = "Runde: " + "1";
}

function playerTurn(_placeholderNumber: number, _placeholderDiv: HTMLDivElement): void {
    let playerCard: HTMLDivElement = <HTMLDivElement>document.createElement("div");
    playerCard.setAttribute("class", "cardPlayer");
    playerCard.setAttribute("disabled", "disabled");
    _placeholderDiv.appendChild(playerCard);
    
    game.splice(_placeholderNumber, 1, playerCard);
    existingPlaceholder.splice(_placeholderNumber, 1);
    
    console.log("existingPlaceholder", existingPlaceholder);
    console.log("game", game);
    console.log("Spielstein von Spieler gelegt");

    // untakenDiv.removeEventListener("click", function(): void {playerTurn (i, game[i]); });
    checkAllLines();
    setTimeout(computerTurn, 500);
}

function computerTurn(): void {
    let randomDiv: HTMLDivElement;
    randomDiv = existingPlaceholder[Math.floor(Math.random() * existingPlaceholder.length)];

    console.log("randomDiv", randomDiv);
    console.log("existingPLaceholder", existingPlaceholder);
    
    let computerCard: HTMLDivElement = <HTMLDivElement>document.createElement("div");
    computerCard.setAttribute("class", "cardComputer");
    computerCard.setAttribute("disabled", "disabled");
    randomDiv.appendChild(computerCard);

    let indexOfTakenDiv: number;
    indexOfTakenDiv = game.indexOf(randomDiv);
    game.splice(indexOfTakenDiv, 1, computerCard);
    existingPlaceholder.splice(indexOfTakenDiv, 1);

    console.log("Spielstein von Computer gelegt");

    // untakenDiv.removeEventListener("click", function(): void {playerTurn (i, game[i]); });
    checkAllLines();
}

function checkAllLines(): void {
    let check: boolean;
    check = true;

    //Prüft, ob alle Felder makiert sind
    for (let i: number = 0; i < game.length; i++) {
        if (!game[i].hasAttribute("disabled")) {
        check = false;
        console.log("Runde geht weiter");
        checkSingleLines();
        break;
        }

        if (check) {
        winner = "tied";    
        console.log("Ende der Runde");
        // roundEnd();
        break;
    }
    }
}

function checkSingleLines(): void {
    switch (severity) {                          
        case "easy":
            let i: number = 0;

            //Spielerüberprüfung
            // Prüft, ob eine der Reihen passt
            for (i = 0; i < 3; i++) {

            // 3 senkrecht
            if (game[0 + i].getAttribute("cardPlayer") != ""
                && game[0 + i].getAttribute("cardPlayer") == game[3 + i].getAttribute("cardPlayer")
                && game[3 + i].getAttribute("cardPlayer") == game[6 + i].getAttribute("cardPlayer")
                ) {
                winner = "player";
                console.log("Ende des Spieles");
                break;
            }

            // 3 waagrecht
            if (game[i * 3].getAttribute("cardPlayer") != ""
                && game[i * 3].getAttribute("cardPlayer") == game[i * 3 + 1].getAttribute("cardPlayer")
                && game[i * 3 + 1].getAttribute("cardPlayer") == game[i * 3 + 2].getAttribute("cardPlayer")
                ) {
                winner = "player";
                console.log("Ende des Spieles");
                break;
            }

            // diagonal links oben nach rechts unten
            if (game[0].getAttribute("cardPlayer") != ""
                && game[0].getAttribute("cardPlayer") == game[4].getAttribute("cardPlayer")
                && game[4].getAttribute("cardPlayer") == game[8].getAttribute("cardPlayer")
                ) {
                winner = "player";
                console.log("Ende des Spieles");
                break;
            }

            // diagonal rechts oben nach links unten
            if (game[2].getAttribute("cardPlayer") != ""
                && game[2].getAttribute("cardPlayer") == game[4].getAttribute("cardPlayer")
                && game[4].getAttribute("cardPlayer") == game[6].getAttribute("cardPlayer")
                ) {
                winner = "player";
                console.log("Ende des Spieles");
                break;
            }

            //Computerüberprüfung
            // Prüft, ob eine der Reihen passt
            for (i = 0; i < 3; i++) {

            // 3 senkrecht
            if (game[0 + i].getAttribute("cardComputer") != ""
                && game[0 + i].getAttribute("cardComputer") == game[3 + i].getAttribute("cardComputer")
                && game[3 + i].getAttribute("cardComputer") == game[6 + i].getAttribute("cardComputer")
                ) {
                winner = "computer";
                console.log("Ende des Spieles");
                break;
            }
    
            // 3 waagrecht
            if (game[i * 3].getAttribute("cardComputer") != ""
                && game[i * 3].getAttribute("cardComputer") == game[i * 3 + 1].getAttribute("cardComputer")
                && game[i * 3 + 1].getAttribute("cardComputer") == game[i * 3 + 2].getAttribute("cardComputer")
                ) {
                winner = "computer";
                console.log("Ende des Spieles");
                break;
            }
    
            // diagonal links oben nach rechts unten
            if (game[0].getAttribute("cardComputer") != ""
                && game[0].getAttribute("cardComputer") == game[4].getAttribute("cardComputer")
                && game[4].getAttribute("cardComputer") == game[8].getAttribute("cardComputer")
                ) {
                winner = "computer";
                console.log("Ende des Spieles");
                break;
            }
    
            // diagonal rechts oben nach links unten
            if (game[2].getAttribute("cardComputer") != ""
                && game[2].getAttribute("cardComputer") == game[4].getAttribute("cardComputer")
                && game[4].getAttribute("cardComputer") == game[6].getAttribute("cardComputer")
                ) {
                winner = "computer";
                console.log("Ende des Spieles");
                break;
            }
    
            else {
                console.log("Spiel geht weiter");
                break;
            }
            }
        }
    }
}

// function roundEnd(): void {
//     //Neue Runde wird angezeigt
//     pointsRound.innerHTML = "Runde: ";
//     pointsBeginning += pointsToGet; 
//     pointsRound.innerHTML += + pointsBeginning;
    
//     for (let i: number = 0; i <= severityLength; i++) {
//         switch (winner) {                         
//             case "player":
//                     //Spieler bekommt einen Punkt
//                     pointsPlayer.innerHTML = "Dein Punktestand: ";
//                     pointsBeginning += pointsToGet; 
//                     pointsPlayer.innerHTML += + pointsBeginning;
                    
//                     setTimeout(function(): void {window.alert("Du hast diese Runde gewonnen!"); showCards(severity); }, 500);
//                     break;
//             case "computer":
//                     //Computer bekommt einen Punkt
//                     pointsComputer.innerHTML = "Computer Punktestand: ";
//                     pointsBeginning += pointsToGet; 
//                     pointsComputer.innerHTML += + pointsBeginning;
                    
//                     setTimeout(function(): void {window.alert("Der Computer hat diese Runde gewonnen!"); showCards(severity); }, 500);
//                     break;
//             default:
//                 setTimeout(function(): void {window.alert("Diese Runde ist unentschieden."); showCards(severity); }, 500);
//                 break;
//         }
//         gameEnd();
//     }
// }

// function gameEnd(): void {
//     if (pointsPlayer > pointsComputer) {
//         setTimeout(function(): void {window.alert("Du hast dieses Spiel gewonnen!"); startGame(); }, 500);
//     }
//     if (pointsPlayer < pointsComputer) {
//         setTimeout(function(): void {window.alert("Der Computer hat dieses Spiel gewonnen!"); startGame(); }, 500);
//     }
//     else {
//         setTimeout(function(): void {window.alert("Dieses Spiel geht unentschieden aus!"); startGame(); }, 500);
//     }
// }

}
