"use strict";
var tictactoe;
(function (tictactoe) {
    window.addEventListener("load", startGame);
    let severity; //bestimmt den Schwierigkeitsgrad
    let severityLength; //bestimmt die Länge der Runden
    let game = []; //Array für die Auswerung des Spielefeldes
    let existingPlaceholder = []; //Array für die wegfallenden Platzhalter
    let untakenDiv; //Platzalter, die zu Beginn erstellt werden
    let emtpyDiv; //Platzhalter, die aus dem Array genommen werden
    let pointsBeginning = 0; //Punkteanzahl des Spielers und Computers zu Beginn des Spieles
    let pointsToGet = 1; //dient dem Erhöhen der Punkte- bzw. Rundenanzahl
    let pointsPlayer; //Punkte des Spielers
    let pointsComputer; //Punkte des Computers
    let pointsRound; //Rundenanzahl
    let winner; //enthält die Informationen, wie das Spiel ausgeht
    let computerTurnNumber = 0; //Absicherung für den Zug des Computers
    // Fragt den Spieler, mit welchem Schwierigkeitsgrad er spielen möchte 
    function startGame() {
        console.log("Das Spiel wird gestartet.");
        severity = String(window.prompt("Mit welchem Schwierigkeitsgrad möchtest du spielen? Wähle zwischen 'easy', 'middle' oder 'difficult'!"));
        showCards(severity);
        showPoints();
    }
    // Erstellt die Platzhalter angepasst an den Schwierigkeitsgrad
    function showCards(_userInput) {
        switch (severity) {
            case "easy":
                severityLength = 3;
                let fieldEasy = document.getElementById("field");
                fieldEasy.innerHTML = "";
                for (let i = 0; i < 9; i++) {
                    untakenDiv = document.createElement("div");
                    untakenDiv.setAttribute("class", "platzhalterEasy");
                    fieldEasy.appendChild(untakenDiv);
                    game.push(untakenDiv);
                    existingPlaceholder.push(untakenDiv);
                    untakenDiv.addEventListener("click", function () { playerTurn(i, game[i]); });
                }
                console.log("Die Platzhalter werden erstellt");
                severityLength = 3;
                break;
            case "middle":
                severityLength = 4;
                let fieldMiddle = document.getElementById("field");
                fieldMiddle.innerHTML = "";
                for (let i = 0; i < 16; i++) {
                    untakenDiv = document.createElement("div");
                    untakenDiv.setAttribute("class", "platzhalterMiddle");
                    fieldMiddle.appendChild(untakenDiv);
                    game.push(untakenDiv);
                    existingPlaceholder.push(untakenDiv);
                    untakenDiv.addEventListener("click", function () { playerTurn(i, game[i]); });
                }
                console.log("Die Platzhalter werden erstellt");
                severityLength = 4;
                break;
            case "difficult":
                severityLength = 5;
                let fieldDifficult = document.getElementById("field");
                fieldDifficult.innerHTML = "";
                for (let i = 0; i < 25; i++) {
                    untakenDiv = document.createElement("div");
                    untakenDiv.setAttribute("class", "platzhalterDifficult");
                    fieldDifficult.appendChild(untakenDiv);
                    game.push(untakenDiv);
                    existingPlaceholder.push(untakenDiv);
                    untakenDiv.addEventListener("click", function () { playerTurn(i, game[i]); });
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
    function showPoints() {
        pointsPlayer = document.getElementById("player");
        pointsPlayer.innerHTML = "Dein Punktestand: " + pointsBeginning;
        // console.log("Die Punkte des Spielers werden angezeigt.", pointsBeginning);
        pointsComputer = document.getElementById("computer");
        pointsComputer.innerHTML = "Computer Punktestand: " + pointsBeginning;
        // console.log("Die Punkte des Computers werden angezeigt.", pointsBeginning);
        pointsRound = document.getElementById("round");
        pointsRound.innerHTML = "Runde: " + "1";
    }
    // Regelt den Spielzug des Spielers
    // Dabei kann der Spieler eine seiner Spielkarten auf einen Platzhalter legen
    function playerTurn(_placeholderNumber, _placeholderDiv) {
        let playerCard = document.createElement("div");
        if (existingPlaceholder[_placeholderNumber] == emtpyDiv) {
            console.log("Leider ist dieser Platzhalter schon belegt");
        }
        else {
            playerCard.setAttribute("class", "cardPlayer");
            playerCard.setAttribute("taken", "taken");
            _placeholderDiv.appendChild(playerCard);
            game.splice(_placeholderNumber, 1, playerCard);
            existingPlaceholder[_placeholderNumber] = emtpyDiv;
            console.log("emptyDiv", emtpyDiv);
            console.log("existingPlaceholder", existingPlaceholder);
            console.log("game", game);
            console.log("Spielstein von Spieler gelegt");
            checkLines();
            setTimeout(computerTurn, 500);
        }
    }
    // Regelt den Spielzug des Computers
    // Dabei legt der Computer zufällig eine seiner Spielkarten auf einen Platzhalter
    function computerTurn() {
        let randomDiv;
        randomDiv = existingPlaceholder[Math.floor(Math.random() * existingPlaceholder.length)];
        while (randomDiv == emtpyDiv && computerTurnNumber < 15) {
            randomDiv = existingPlaceholder[Math.floor(Math.random() * existingPlaceholder.length)];
            computerTurnNumber++;
        }
        console.log("randomDiv", randomDiv);
        console.log("existingPLaceholder", existingPlaceholder);
        let computerCard = document.createElement("div");
        computerCard.setAttribute("class", "cardComputer");
        computerCard.setAttribute("taken", "taken");
        randomDiv.appendChild(computerCard);
        let indexOfTakenDiv;
        indexOfTakenDiv = game.indexOf(randomDiv);
        game.splice(indexOfTakenDiv, 1, computerCard);
        existingPlaceholder[indexOfTakenDiv] = emtpyDiv;
        console.log("Spielstein von Computer gelegt");
        // checkLines();
    }
    // Überprüft, ob die einzelnen Reihen mit nur einer Art von Spielkarte gefüllt sind
    // Dabei werden je nach Schwierigkeitsgrad die einzelnen Möglichkeiten überprüft und dementsprechend die Runde weitergeführt oder beendet
    function checkLines() {
        switch (severity) {
            case "easy":
                let winningConditionsEasy = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6]
                ];
                let roundWonEasy = false;
                for (let i = 0; i <= 7; i++) {
                    let winCondition = winningConditionsEasy[i];
                    let a = game[winCondition[0]];
                    let b = game[winCondition[1]];
                    let c = game[winCondition[2]];
                    console.log("test", a, b, c);
                    if (a.getAttribute("taken") && b.getAttribute("taken") && c.getAttribute("taken")) {
                        console.log("Reihe ist voll");
                        continue;
                    }
                    if (a.getAttribute("playerCard") && b.getAttribute("playerCard") && c.getAttribute("playerCard")
                        || a.getAttribute("ComputerCard") && b.getAttribute("ComputerCard") && c.getAttribute("ComputerCard")) {
                        roundWonEasy = true;
                        console.log("Reihe ist voll mit einer Art Spielkarten");
                        break;
                    }
                    if (a.getAttribute("playerCard") && b.getAttribute("playerCard") && c.getAttribute("playerCard")) {
                        winner = "player";
                        console.log("Runde ist vorbei. Der Spieler hat gewonnen");
                        // roundEnd(winner);
                    }
                    if (a.getAttribute("computerCard") && b.getAttribute("computerCard") && c.getAttribute("computerCard")) {
                        winner = "computer";
                        console.log("Runde ist vorbei. Der Computer hat gewonnen");
                        // roundEnd(winner);
                    }
                    else {
                        winner = "tied";
                        console.log("Runde ist vorbei. Es ist unentschieden");
                        // roundEnd(winner);
                    }
                    break;
                }
                if (roundWonEasy) {
                    console.log("Runde geht weiter");
                    // playerTurn();
                    return;
                }
            // for (let i: number = 0; i <= game.length; i++) {
            //         if (game[i].hasAttribute("playerCard")) {
            //             console.log("Alle Platzhalter sind belegt");
            //             return;
            //         }
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
            //     let roundWonMiddle: boolean = false;
            //     for (let i: number = 0; i <= 10; i++) {
            //     let winCondition: number[] = winningConditionsMiddle[i];
            //     let a: HTMLDivElement = game[winCondition[0]];
            //     let b: HTMLDivElement = game[winCondition[1]];
            //     let c: HTMLDivElement = game[winCondition[2]];
            //     let d: HTMLDivElement = game[winCondition[3]];
            //     console.log("test", a, b, c, d);
            //     if (a.getAttribute("disabled") || b.getAttribute("disabled") || c.getAttribute("disabled") || d.getAttribute("disabled")) {
            //         continue;
            //     }
            //     if (a === b && b === c && c === d) {
            //             roundWonMiddle = true;
            //             console.log("Runde ist vorbei");
            //             break;
            //         }
            // }
            //     if (roundWonMiddle) {
            //     console.log("Runde geht weiter");
            //     return;
            //     }
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
            //     let roundWonDifficult: boolean = false;
            //     for (let i: number = 0; i <= 12; i++) {
            //             let winCondition: number[] = winningConditionsDifficult[i];
            //             let a: HTMLDivElement = game[winCondition[0]];
            //             let b: HTMLDivElement = game[winCondition[1]];
            //             let c: HTMLDivElement = game[winCondition[2]];
            //             let d: HTMLDivElement = game[winCondition[3]];
            //             let e: HTMLDivElement = game[winCondition[4]];
            //             console.log("test", a, b, c, d, e);
            //             if (a.getAttribute("disabled") || b.getAttribute("disabled") || c.getAttribute("disabled") || d.getAttribute("disabled") || e.getAttribute("disabled")) {
            //                 continue;
            //             }
            //             if (a === b && b === c && c === d && d === e) {
            //                 roundWonDifficult = true;
            //                 console.log("Runde ist vorbei");
            //                 break;
            //             }
            //         }
            //     if (roundWonDifficult) {
            //             console.log("Runde geht weiter");
            //             return;
            //         }
            // default: 
            //     console.log("Spiel geht weiter");
            //     break;
            //     }
            // }
        }
        // Regelt das Ende einer Runde
        // Dabei wird ausgewertet, wer gewonnen hat und dementsprechend ein Punkt vergeben und eine Nachricht an den Spieler gesendet
        // function roundEnd(_winner: string): void {
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
        //             case "tied":
        //                     setTimeout(function(): void {window.alert("Diese Runde ist unentschieden."); showCards(severity); }, 500);
        //                     break;
        //         }
        //         // gameEnd();
        //     }
        // }
        // Regelt das Ende des Spieles
        // Dabei wird ausgewertet, wer gewonnen hat und es wird dementsprechend eine Nachricht an den Spieler gesendet
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
})(tictactoe || (tictactoe = {}));
//# sourceMappingURL=tictactoe.js.map