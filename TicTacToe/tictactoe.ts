namespace tictactoe {

window.addEventListener("load", startGame);

let severity: string;                                   //bestimmt den Schwierigkeitsgrad
let severityLength: number;                             //bestimmt die Länge der Runden

let game: HTMLDivElement[] = [];                        //Array für die Auswerung des Spielefeldes
let existingPlaceholder: HTMLDivElement[] = [];         //Array für die wegfallenden Platzhalter

let untakenDiv: HTMLDivElement;                         //Platzalter, die zu Beginn erstellt werden
let emptyDiv: HTMLDivElement;                           //Platzhalter, die aus dem Array genommen werden

let pointsPlayer: number;                               //Punkteanzahl des Spielers und Computers zu Beginn des Spieles
let pointsComputer: number;
let showingPointsPlayer: HTMLDivElement;                //zeigt die Punkte des Spielers
let showingPointsComputer: HTMLDivElement;              //zeigt die Punkte des Computers

let rounds: HTMLDivElement;                             //zeigt die Rundenanzahl
let roundCounter: number;
let roundsProgress: HTMLProgressElement;                //zeigt den visuellen Balken der Rundenanzahl

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
            let fieldEasy: HTMLDivElement = <HTMLDivElement>document.getElementById("field");
            fieldEasy.innerHTML = "";
            game.splice(0, game.length);
            existingPlaceholder.splice(0, existingPlaceholder.length);

            for (let i: number = 0; i < 9; i++) {
            untakenDiv = document.createElement("div");
            untakenDiv.setAttribute("class", "placeholderEasy");
            fieldEasy.appendChild(untakenDiv);
            game.push(untakenDiv);
            existingPlaceholder.push(untakenDiv);
            untakenDiv.addEventListener("click", function(): void {playerTurn (i, game[i]); });
            untakenDiv.addEventListener("touch", function(): void {playerTurn (i, game[i]); });
            }

            console.log("Die Platzhalter werden erstellt"); 
            break;                   
        
        case "middle":
            let fieldMiddle: HTMLDivElement = <HTMLDivElement>document.getElementById("field");
            fieldMiddle.innerHTML = "";
            game.splice(0, game.length);
            existingPlaceholder.splice(0, existingPlaceholder.length);

            for (let i: number = 0; i < 16; i++) {
            untakenDiv = document.createElement("div");
            untakenDiv.setAttribute("class", "placeholderMiddle");
            fieldMiddle.appendChild(untakenDiv);
            game.push(untakenDiv);
            existingPlaceholder.push(untakenDiv);
            untakenDiv.addEventListener("click", function(): void {playerTurn (i, game[i]); });
            untakenDiv.addEventListener("touch", function(): void {playerTurn (i, game[i]); });
            }

            console.log("Die Platzhalter werden erstellt");
            break;
        
        case "difficult":
            let fieldDifficult: HTMLDivElement = <HTMLDivElement>document.getElementById("field");
            fieldDifficult.innerHTML = "";
            game.splice(0, game.length);
            existingPlaceholder.splice(0, existingPlaceholder.length);

            for (let i: number = 0; i < 25; i++) {
            untakenDiv = document.createElement("div");
            untakenDiv.setAttribute("class", "placeholderDifficult");
            fieldDifficult.appendChild(untakenDiv);
            game.push(untakenDiv);
            existingPlaceholder.push(untakenDiv);
            untakenDiv.addEventListener("click", function(): void {playerTurn (i, game[i]); });
            untakenDiv.addEventListener("touch", function(): void {playerTurn (i, game[i]); });
            }

            console.log("Die Platzhalter werden erstellt");
            break;   

        default:
            severity = String(window.prompt("Das war kein erlaubter Schwierigkeitsgrad! Versuch es nochmal!"));
            break;
    }
}

// Zeigt die Punkte des Spielers und des Computers zu Beginn des Spieles
function showPoints(): void {
    severityLength = 1;

    pointsPlayer = 0;
    showingPointsPlayer = <HTMLDivElement>document.getElementById("player");
    showingPointsPlayer.innerHTML = "Dein Punktestand: " + pointsPlayer;
    // console.log("Die Punkte des Spielers werden angezeigt.", pointsBeginning);

    pointsComputer = 0;
    showingPointsComputer = <HTMLDivElement>document.getElementById("computer");
    showingPointsComputer.innerHTML = "Computer Punktestand: " + pointsComputer;
    // console.log("Die Punkte des Computers werden angezeigt.", pointsBeginning);

    roundCounter = 1;
    rounds = <HTMLDivElement>document.getElementById("round");
    roundsProgress = <HTMLProgressElement>document.createElement("progress");

    switch (severity) { 
        case "easy":
            rounds.innerHTML = "Runde: " + roundCounter + "/3";

            roundsProgress.setAttribute("class", "test");
            rounds.appendChild(roundsProgress);
            roundsProgress.max = 3;
            roundsProgress.value = 1;
            break;  
        case "middle":
            rounds.innerHTML = "Runde: " + roundCounter + "/4";

            roundsProgress.setAttribute("class", "test");
            rounds.appendChild(roundsProgress);
            roundsProgress.max = 4;
            roundsProgress.value = 1;
            break;
        case "difficult":
            rounds.innerHTML = "Runde: " + roundCounter + "/5";

            roundsProgress.setAttribute("class", "test");
            rounds.appendChild(roundsProgress);
            roundsProgress.max = 5;
            roundsProgress.value = 1;
            break;
}
}

// Regelt den Spielzug des Spielers
// Dabei kann der Spieler eine seiner Spielkarten auf einen Platzhalter legen
function playerTurn(_placeholderNumber: number, _placeholderDiv: HTMLDivElement): void {
    let playerCard: HTMLDivElement = <HTMLDivElement>document.createElement("div");
    
    if (existingPlaceholder[_placeholderNumber] == emptyDiv) {
        console.log("Leider ist dieser Platzhalter schon belegt");
    } else {
        playerCard.setAttribute("class", "cardPlayer");
        playerCard.setAttribute("taken", "taken");
        playerCard.setAttribute("player", "player");
        _placeholderDiv.appendChild(playerCard);
    
        game.splice(_placeholderNumber, 1, playerCard);
        existingPlaceholder[_placeholderNumber] = emptyDiv;
        
        console.log("Spielstein von Spieler gelegt");

        setTimeout(checkLinesForEasy, 200);
        setTimeout(computerTurn, 500);
    }
}

// Regelt den Spielzug des Computers
// Dabei legt der Computer zufällig eine seiner Spielkarten auf einen Platzhalter
function computerTurn(): void {
    let randomDiv: HTMLDivElement;
    randomDiv = existingPlaceholder[Math.floor(Math.random() * existingPlaceholder.length)];

    do {
        randomDiv = existingPlaceholder[Math.floor(Math.random() * existingPlaceholder.length)];
        computerTurnNumber++;
    }
    while (randomDiv == emptyDiv && computerTurnNumber < 15);
    
    let computerCard: HTMLDivElement = <HTMLDivElement>document.createElement("div");
    computerCard.setAttribute("class", "cardComputer");
    computerCard.setAttribute("taken", "taken");
    computerCard.setAttribute("computer", "computer");
    randomDiv.appendChild(computerCard);

    let indexOfTakenDiv: number;
    indexOfTakenDiv = game.indexOf(randomDiv);

    game.splice(indexOfTakenDiv, 1, computerCard);
    existingPlaceholder[indexOfTakenDiv] = emptyDiv;

    console.log("Spielstein von Computer gelegt");

    setTimeout(checkLinesForEasy, 200);
}

// Überprüft, ob die einzelnen Reihen mit nur einer Art von Spielkarte gefüllt sind
// Dabei werden je nach Schwierigkeitsgrad die einzelnen Möglichkeiten überprüft und dementsprechend die Runde weitergeführt oder beendet
function checkLinesForEasy(): void {
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
                // console.log(a, b, c);
                
                if (a.getAttribute("taken") && b.getAttribute("taken") && c.getAttribute("taken")) {
                    console.log("Reihe ist voll");
                    checkLinesEasy();
                } else {
                console.log("Runde geht weiter 1");
                // checkAllLines();
            }
        }
        break;
        case "middle":
        let winningConditionsMiddle: number[][] = [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15],
            [0, 4, 8, 12],
            [1, 5, 9, 13],
            [2, 6, 10, 14],
            [3, 7, 11, 15],
            [0, 5, 10, 15],
            [3, 6, 9, 12]
            ];
            
        for (let i: number = 0; i <= 9; i++) {
            let winCondition: number[] = winningConditionsMiddle[i];
            a = game[winCondition[0]];
            b = game[winCondition[1]];
            c = game[winCondition[2]];
            d = game[winCondition[3]];
            console.log("test", a, b, c, d);
                
            if (a.getAttribute("taken") && b.getAttribute("taken") && c.getAttribute("taken") && d.getAttribute("taken")) {
                    console.log("Reihe ist voll");
                    checkLinesMiddle();
            } else {
                console.log("Runde geht weiter 1");
                // checkAllLines();
            }
        }
        break;
        case "difficult":
            let winningConditionsDifficult: number[][] = [
                [0, 1, 2, 3, 4],
                [5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14],
                [15, 16, 17, 18, 19],
                [20, 21, 22, 23, 24],
                [0, 5, 10, 15, 20],
                [1, 6, 11, 16, 21],
                [2, 7, 12, 17, 22],
                [3, 8, 13, 18, 23],
                [4, 9, 14, 19, 24],
                [0, 6, 12, 18, 24],
                [4, 8, 12, 16, 20]
                ];
        
            for (let i: number = 0; i <= 20; i++) {
                let winCondition: number[] = winningConditionsDifficult[i];
                a = game[winCondition[0]];
                b = game[winCondition[1]];
                c = game[winCondition[2]];
                d = game[winCondition[3]];
                e = game[winCondition[4]];
                // console.log("test", a, b, c, d, e);
                
                if (a.getAttribute("taken") && b.getAttribute("taken") && c.getAttribute("taken") && d.getAttribute("taken") && e.getAttribute("taken")) {
                console.log("Reihe ist voll");
                checkLinesDifficult();
                } else {
                console.log("Runde geht weiter 1");
                // checkAllLines();
                }
            }
            break;
    }
}

function checkLinesEasy(): void {
    if (a.getAttribute("player") && b.getAttribute("player") && c.getAttribute("player")) {
        console.log("Reihe ist voll mit Karten des Spielers");
        winner = "player";
        roundEnd();
    }  
    else if (a.getAttribute("computer") && b.getAttribute("computer") && c.getAttribute("computer")) {
        console.log("Reihe ist voll mit Karten des Computers");
        winner = "computer";
        roundEnd();
    }
    else {
    console.log("Runde geht weiter 2");
    }
}

function checkLinesMiddle(): void {
    if (a.getAttribute("player") && b.getAttribute("player") && c.getAttribute("player") && d.getAttribute("player")) {
        console.log("Reihe ist voll mit Karten des Spielers");
        winner = "player";
        roundEnd();
    }
    else if (a.getAttribute("computer") && b.getAttribute("computer") && c.getAttribute("computer") && d.getAttribute("computer")) {
        console.log("Reihe ist voll mit Karten des Computers");
        winner = "computer";
        roundEnd();
    }
    else {
    console.log("Runde geht weiter");
    }
}

function checkLinesDifficult(): void {
    if (a.getAttribute("player") && b.getAttribute("player") && c.getAttribute("player") && d.getAttribute("player") && e.getAttribute("player")) {
        console.log("Reihe ist voll mit Karten des Spielers");
        winner = "player";
        roundEnd();
    }
    else if (a.getAttribute("computer") && b.getAttribute("computer") && c.getAttribute("computer") && d.getAttribute("computer") && e.getAttribute("computer")) {
        console.log("Reihe ist voll mit Karten des Computers");
        winner = "computer";
        roundEnd();
    }
    else {
    console.log("Runde geht weiter");
    }
}

// function checkAllLines(): void {
//     for (let i: number = 0; i <= game.length; i++) {
//         if (game[i].getAttribute("player") || game[i].getAttribute("computer")) {
//             console.log("Alle Platzhalter sind belegt");
//             roundEnd();
//         }
//         else {
//             console.log("Spiel geht weiter, da nicht alle Platzhalter belegt sind");
//         }
//     }
// }

// Regelt das Ende einer Runde
// Dabei wird ausgewertet, wer gewonnen hat und dementsprechend ein Punkt vergeben und eine Nachricht an den Spieler gesendet
function roundEnd(): void {
    severityLength += 1;
    roundCounter += 1;

    console.log(roundsProgress);
    
    switch (winner) {     
        case "player":
            //Spieler bekommt einen Punkt
            pointsPlayer += 1; 
            showingPointsPlayer.innerHTML = "Dein Punktestand: " + pointsPlayer;
            //Der Spieler bekommt eine Nachricht
            window.alert("Du hast diese Runde gewonnen.");
            break;
        
        case "computer":
            //Computer bekommt einen Punkt
            pointsComputer += 1; 
            showingPointsComputer.innerHTML = "Dein Punktestand: " + pointsComputer;
            //Der Spieler bekommt eine Nachricht
            window.alert("Der Computer hat diese Runde gewonnen.");
            break;
        
        case "tied":
            //Der Spieler bekommt eine Nachricht
            window.alert("Diese Runde ist unentschieden.");
            break;
    }

    switch (severity) {
        case "easy":
            if (severityLength == 4) {
                console.log("Spiel ist zu Ende");
                gameEnd();
            }
            else {
                console.log("Spiel geht weiter 3");
                rounds.innerHTML = "Runde: " + roundCounter + "/3";
                roundsProgress.setAttribute("class", "test");
                rounds.appendChild(roundsProgress);
                roundsProgress.max = 3;
                roundsProgress.value += 1;
                showPlaceholders(severity);
            }
            break;
        
        case "middle":
            if (severityLength == 5) {
                console.log("Spiel ist zu Ende");
                // gameEnd();
            }
            else {
                console.log("Spiel geht weiter 3");
                rounds.innerHTML = "Runde: " + roundCounter + "/4";
                roundsProgress.setAttribute("class", "test");
                rounds.appendChild(roundsProgress);
                roundsProgress.max = 4;
                roundsProgress.value += 1;
                showPlaceholders(severity);
            }
            break;

        case "difficult":
            if (severityLength == 6) {
                console.log("Spiel ist zu Ende");
                // gameEnd();
            }
            else {
                console.log("Spiel geht weiter 3");
                rounds.innerHTML = "Runde: " + roundCounter + "/5";
                roundsProgress.setAttribute("class", "test");
                rounds.appendChild(roundsProgress);
                roundsProgress.max = 5;
                roundsProgress.value += 1;
                showPlaceholders(severity);
                }
            break;
    }
}

// Regelt das Ende des Spieles
// Dabei wird ausgewertet, wer gewonnen hat und es wird dementsprechend eine Nachricht an den Spieler gesendet
function gameEnd(): void {
    if (pointsPlayer > pointsComputer) {
        window.alert("Du hast dieses Spiel gewonnen!");
        startGame();
    }
    else if (pointsPlayer < pointsComputer) {
        window.alert("Der Computer hat dieses Spiel gewonnen!");
        startGame();
    }
    else {
        window.alert("Es ist unentschieden!");
        startGame();
    }
}
}


