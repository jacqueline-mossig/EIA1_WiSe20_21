namespace tictactoe {

window.addEventListener("load", startGame);

let severity: string;                                   //bestimmt den Schwierigkeitsgrad
let severityLength: number;                             //bestimmt die Länge der Runden

let game: HTMLDivElement[] = [];                        //Array für die Auswerung des Spielefeldes
let existingPlaceholder: HTMLDivElement[] = [];         //Array für die wegfallenden Platzhalter

let untakenDiv: HTMLDivElement;                         //Platzalter, die zu Beginn erstellt werden
let emtpyDiv: HTMLDivElement;                           //Platzhalter, die aus dem Array genommen werden

let pointsBeginning: number = 0;                        //Punkteanzahl des Spielers und Computers zu Beginn des Spieles
let pointsToGet: number = 1;                            //dient dem Erhöhen der Punkteanzahl
let pointsPlayer: HTMLDivElement;                       //Punkte des Spielers
let pointsComputer: HTMLDivElement;                     //Punkte des Computers
let pointsRound: HTMLDivElement;                        //Rundenanzahl

let winner: string;                                     //enthält die Informationen, wie das Spiel ausgeht

let computerTurnNumber: number = 0;                     //Absicherung für den Zug des Computers

let a: HTMLDivElement;
let b: HTMLDivElement;
let c: HTMLDivElement;
let d: HTMLDivElement;
let e: HTMLDivElement;


// Fragt den Spieler, mit welchem Schwierigkeitsgrad er spielen möchte 
function startGame(): void {
    console.log("Das Spiel wird gestartet.");
    severity = String(window.prompt("Mit welchem Schwierigkeitsgrad möchtest du spielen? Wähle zwischen 'easy', 'middle' oder 'difficult'!"));

    showPlaceholders(severity);
    showPoints();
}

// Erstellt die Platzhalter angepasst an den Schwierigkeitsgrad
function showPlaceholders(_userInput: string): void {
    switch (severity) { 
        case "easy":
            severityLength = 3;

            let fieldEasy: HTMLDivElement = <HTMLDivElement>document.getElementById("field");
            fieldEasy.innerHTML = "";

            for (let i: number = 0; i < 9; i++) {
            untakenDiv = document.createElement("div");
            untakenDiv.setAttribute("class", "placeholderEasy");
            fieldEasy.appendChild(untakenDiv);
            game.push(untakenDiv);
            existingPlaceholder.push(untakenDiv);
            untakenDiv.addEventListener("click", function(): void {playerTurn (i, game[i]); });
            }

            console.log("Die Platzhalter werden erstellt");
            severityLength = 3;   
            break;                   
        
        case "middle":
            severityLength = 4;

            let fieldMiddle: HTMLDivElement = <HTMLDivElement>document.getElementById("field");
            fieldMiddle.innerHTML = "";

            for (let i: number = 0; i < 16; i++) {
            untakenDiv = document.createElement("div");
            untakenDiv.setAttribute("class", "placeholderMiddle");
            fieldMiddle.appendChild(untakenDiv);
            game.push(untakenDiv);
            existingPlaceholder.push(untakenDiv);
            untakenDiv.addEventListener("click", function(): void {playerTurn (i, game[i]); });
            }

            console.log("Die Platzhalter werden erstellt");
            severityLength = 4;   
            break;
        
        case "difficult":
            severityLength = 5;

            let fieldDifficult: HTMLDivElement = <HTMLDivElement>document.getElementById("field");
            fieldDifficult.innerHTML = "";

            for (let i: number = 0; i < 25; i++) {
            untakenDiv = document.createElement("div");
            untakenDiv.setAttribute("class", "placeholderDifficult");
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

// Zeigt die Punkte des Spielers und des Computers zu Beginn des Spieles
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

// Regelt den Spielzug des Spielers
// Dabei kann der Spieler eine seiner Spielkarten auf einen Platzhalter legen
function playerTurn(_placeholderNumber: number, _placeholderDiv: HTMLDivElement): void {
    let playerCard: HTMLDivElement = <HTMLDivElement>document.createElement("div");
    
    if (existingPlaceholder[_placeholderNumber] == emtpyDiv) {
        console.log("Leider ist dieser Platzhalter schon belegt");
    } else {
        playerCard.setAttribute("class", "cardPlayer");
        playerCard.setAttribute("taken", "taken");
        _placeholderDiv.appendChild(playerCard);
    
        game.splice(_placeholderNumber, 1, playerCard);
        existingPlaceholder[_placeholderNumber] = emtpyDiv;
        
        console.log("emptyDiv", emtpyDiv);
        console.log("existingPlaceholder", existingPlaceholder);
        console.log("game", game);
        console.log("Spielstein von Spieler gelegt");

        checkLinesForAllSeverity();
        setTimeout(computerTurn, 500);
    }
}

// Regelt den Spielzug des Computers
// Dabei legt der Computer zufällig eine seiner Spielkarten auf einen Platzhalter
function computerTurn(): void {
    let randomDiv: HTMLDivElement;
    randomDiv = existingPlaceholder[Math.floor(Math.random() * existingPlaceholder.length)];

    while (randomDiv == emtpyDiv && computerTurnNumber < 15) {
        randomDiv = existingPlaceholder[Math.floor(Math.random() * existingPlaceholder.length)];
        computerTurnNumber++;
    }

    console.log("randomDiv", randomDiv);
    console.log("existingPLaceholder", existingPlaceholder);
    
    let computerCard: HTMLDivElement = <HTMLDivElement>document.createElement("div");
    computerCard.setAttribute("class", "cardComputer");
    computerCard.setAttribute("taken", "taken");
    randomDiv.appendChild(computerCard);

    let indexOfTakenDiv: number;
    indexOfTakenDiv = game.indexOf(randomDiv);

    game.splice(indexOfTakenDiv, 1, computerCard);
    existingPlaceholder[indexOfTakenDiv] = emtpyDiv;

    console.log("Spielstein von Computer gelegt");

    checkLinesForAllSeverity();
}

// Überprüft, ob die einzelnen Reihen mit nur einer Art von Spielkarte gefüllt sind
// Dabei werden je nach Schwierigkeitsgrad die einzelnen Möglichkeiten überprüft und dementsprechend die Runde weitergeführt oder beendet
function checkLinesForAllSeverity(): void {
    switch (severity) {                          
        case "easy":
            let winningConditionsEasy: number[][] = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
            ];

            for (let i: number = 0; i <= 7; i++) {
                let winCondition: number[] = winningConditionsEasy[i];
                a = game[winCondition[0]];
                b = game[winCondition[1]];
                c = game[winCondition[2]];
                console.log("test", a, b, c);
                
                if (a.getAttribute("taken") && b.getAttribute("taken") && c.getAttribute("taken")) {
                    console.log("Reihe ist voll");
                    checkLinesEasy();
                }
                else 
                console.log("Runde geht weiter");
            }

        // case "middle":
        //     let winningConditionsMiddle: number[][] = [
        //     [0, 1, 2, 3],
        //     [4, 5, 6, 7],
        //     [8, 9, 10, 11],
        //     [12, 13, 14, 15],
        //     [0, 4, 8, 12],
        //     [1, 5, 9, 13],
        //     [2, 6, 10, 14],
        //     [3, 7, 11, 15],
        //     [0, 5, 10, 15],
        //     [3, 6, 9, 12]
        //     ];
        
        //     for (let i: number = 0; i <= 10; i++) {
        //         let winCondition: number[] = winningConditionsMiddle[i];
        //         a = game[winCondition[0]];
        //         b = game[winCondition[1]];
        //         c = game[winCondition[2]];
        //         d = game[winCondition[3]];
        //         console.log("test", a, b, c, d);
            
        //         if (a.getAttribute("taken") && b.getAttribute("taken") && c.getAttribute("taken") && d.getAttribute("taken")) {
        //         console.log("Reihe ist voll");
        //         checkLinesMiddle();
        //     }
        //     else 
        //         console.log("Runde geht weiter");
        // }

        // case "difficult":
        //     let winningConditionsDifficult: number[][] = [
        //         [0, 1, 2, 3, 4],
        //         [5, 6, 7, 8, 9],
        //         [10, 11, 12, 13, 14],
        //         [15, 16, 17, 18, 19],
        //         [20, 21, 22, 23, 24],
        //         [0, 5, 10, 15, 20],
        //         [1, 6, 11, 16, 21],
        //         [2, 7, 12, 17, 22],
        //         [3, 8, 13, 18, 23],
        //         [4, 9, 14, 19, 24],
        //         [0, 6, 12, 18, 24],
        //         [4, 8, 12, 16, 20]
        //         ];
        
        //     for (let i: number = 0; i <= 12; i++) {
        //             let winCondition: number[] = winningConditionsDifficult[i];
        //             a = game[winCondition[0]];
        //             b = game[winCondition[1]];
        //             c = game[winCondition[2]];
        //             d = game[winCondition[3]];
        //             e = game[winCondition[4]];
        //             console.log("test", a, b, c, d, e);
                
        //             if (a.getAttribute("taken") && b.getAttribute("taken") && c.getAttribute("taken") && d.getAttribute("taken") && e.getAttribute("taken")) {
        //             console.log("Reihe ist voll");
        //             checkLinesDifficult();
        //         }
        //         else 
        //             console.log("Runde geht weiter");
        //     }
    
        }
}

function checkLinesEasy(): void {
    if (a.getAttribute("class") && b.getAttribute("class") && c.getAttribute("class")) {
        console.log("Reihe ist voll mit Karten des Spielers");
        winner = "player";
        // roundEnd(winner);
    }   else if (a.getAttribute("class") && b.getAttribute("class") && c.getAttribute("class")) {
        console.log("Reihe ist voll mit Karten des Computers");
        winner = "computer";
        // roundEnd(winner);
    }
    else {
    console.log("Runde geht weiter 2");
    }
}

function checkLinesMiddle(): void {
    if (a.getAttribute("cardPlayer") === b.getAttribute("cardPlayer") && b.getAttribute("cardPlayer") === c.getAttribute("cardPlayer") && c.getAttribute("cardPlayer") === d.getAttribute("cardPlayer")) {
        console.log("Reihe ist voll mit Karten des Spielers");
        winner = "player";
        // roundEnd(winner);
    }
    else if (a.getAttribute("cardComputer") === b.getAttribute("cardComputer") && b.getAttribute("cardComputer") === c.getAttribute("cardComputer") && c.getAttribute("cardComputer") === d.getAttribute("cardComputer")) {
        console.log("Reihe ist voll mit Karten des Computers");
        winner = "computer";
        // roundEnd(winner);
    }
    else {
    console.log("Runde geht weiter");
    }
}

function checkLinesDifficult(): void {
    if (a.getAttribute("cardPlayer") === b.getAttribute("cardPlayer") && b.getAttribute("cardPlayer") === c.getAttribute("cardPlayer") && c.getAttribute("cardPlayer") === d.getAttribute("cardPlayer") && d.getAttribute("cardPlayer") === e.getAttribute("cardPlayer")) {
        console.log("Reihe ist voll mit Karten des Spielers");
        winner = "player";
        // roundEnd(winner);
    }
    else if (a.getAttribute("cardComputer") === b.getAttribute("cardComputer") && b.getAttribute("cardComputer") === c.getAttribute("cardComputer") && c.getAttribute("cardComputer") === d.getAttribute("cardComputer") && d.getAttribute("cardComputer") === e.getAttribute("cardComputer")) {
        console.log("Reihe ist voll mit Karten des Computers");
        winner = "computer";
        // roundEnd(winner);
    }
    else {
    console.log("Runde geht weiter");
    }
}
        
        // for (let i: number = 0; i <= game.length; i++) {
        //     if (game[i].hasAttribute("playerCard")) {
        //         console.log("Alle Platzhalter sind belegt");
        //         return;
        //     }
        // }

// Regelt das Ende einer Runde
// Dabei wird ausgewertet, wer gewonnen hat und dementsprechend ein Punkt vergeben und eine Nachricht an den Spieler gesendet
// function roundEnd(_winner: string): void {
//     pointsRound.innerHTML = "Runde: ";
//     pointsBeginning += pointsToGet; 
//     pointsRound.innerHTML += + pointsBeginning;
    
//     switch (winner) {     
//         case "player":
//             //Spieler bekommt einen Punkt
//             pointsPlayer.innerHTML = "Dein Punktestand: ";
//             pointsBeginning += pointsToGet; 
//             console.log("Hsjhadskhdkashdhdshdl", pointsBeginning);
//             pointsPlayer.innerHTML += pointsBeginning;
                    
//             setTimeout(function(): void {window.alert("Du hast diese Runde gewonnen!"); showPlaceholders(severity); }, 500);
//             break;
//         case "computer":
//             //Computer bekommt einen Punkt
//             pointsComputer.innerHTML = "Computer Punktestand: ";
//             pointsBeginning += pointsToGet; 
//             pointsComputer.innerHTML += pointsBeginning;
                    
//             setTimeout(function(): void {window.alert("Der Computer hat diese Runde gewonnen!"); showPlaceholders(severity); }, 500);
//             break;
//         case "tied":
//             setTimeout(function(): void {window.alert("Diese Runde ist unentschieden."); showPlaceholders(severity); }, 500);
//             break;
//     }
// }

// Regelt das Ende des Spieles
// Dabei wird ausgewertet, wer gewonnen hat und es wird dementsprechend eine Nachricht an den Spieler gesendet
// function gameEnd(): void {
//     if (pointsPlayer > pointsComputer) {
//         setTimeout(function(): void {window.alert("Du hast dieses Spiel gewonnen!"); startGame(); }, 500);
//     }
//     else if (pointsPlayer < pointsComputer) {
//         setTimeout(function(): void {window.alert("Der Computer hat dieses Spiel gewonnen!"); startGame(); }, 500);
//     }
//     else {
//         setTimeout(function(): void {window.alert("Dieses Spiel geht unentschieden aus!"); startGame(); }, 500);
//     }
}



