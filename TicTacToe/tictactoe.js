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
    let pointsToGet = 1; //dient dem Erhöhen der Punkteanzahl
    let pointsPlayer; //zeigt die Punkte des Spielers
    let pointsComputer; //zeigt die Punkte des Computers
    let pointsRound; //zeigt die Rundenanzahl
    let showRound; //zeigt den visuellen Balken der Rundenanzahl
    let winner; //enthält die Informationen, wie das Spiel ausgeht
    let computerTurnNumber = 0; //Absicherung für den Zug des Computers
    let a;
    let b;
    let c;
    let d;
    let e;
    // Fragt den Spieler, mit welchem Schwierigkeitsgrad er spielen möchte 
    function startGame() {
        console.log("Das Spiel wird gestartet.");
        severity = String(window.prompt("Mit welchem Schwierigkeitsgrad möchtest du spielen? Wähle zwischen 'easy', 'middle' oder 'difficult'!"));
        showPlaceholders(severity);
        showPoints();
    }
    // Erstellt die Platzhalter angepasst an den Schwierigkeitsgrad
    function showPlaceholders(_userInput) {
        switch (severity) {
            case "easy":
                // severityLength = 3;
                let fieldEasy = document.getElementById("field");
                fieldEasy.innerHTML = "";
                for (let i = 0; i < 9; i++) {
                    untakenDiv = document.createElement("div");
                    untakenDiv.setAttribute("class", "placeholderEasy");
                    fieldEasy.appendChild(untakenDiv);
                    game.push(untakenDiv);
                    existingPlaceholder.push(untakenDiv);
                    untakenDiv.addEventListener("click", function () { playerTurn(i, game[i]); });
                    untakenDiv.addEventListener("touch", function () { playerTurn(i, game[i]); });
                }
                console.log("Die Platzhalter werden erstellt");
                break;
            case "middle":
                // severityLength = 4;
                let fieldMiddle = document.getElementById("field");
                fieldMiddle.innerHTML = "";
                for (let i = 0; i < 16; i++) {
                    untakenDiv = document.createElement("div");
                    untakenDiv.setAttribute("class", "placeholderMiddle");
                    fieldMiddle.appendChild(untakenDiv);
                    game.push(untakenDiv);
                    existingPlaceholder.push(untakenDiv);
                    untakenDiv.addEventListener("click", function () { playerTurn(i, game[i]); });
                    untakenDiv.addEventListener("touch", function () { playerTurn(i, game[i]); });
                }
                console.log("Die Platzhalter werden erstellt");
                break;
            case "difficult":
                // severityLength = 5;
                let fieldDifficult = document.getElementById("field");
                fieldDifficult.innerHTML = "";
                for (let i = 0; i < 25; i++) {
                    untakenDiv = document.createElement("div");
                    untakenDiv.setAttribute("class", "placeholderDifficult");
                    fieldDifficult.appendChild(untakenDiv);
                    game.push(untakenDiv);
                    existingPlaceholder.push(untakenDiv);
                    untakenDiv.addEventListener("click", function () { playerTurn(i, game[i]); });
                    untakenDiv.addEventListener("touch", function () { playerTurn(i, game[i]); });
                }
                console.log("Die Platzhalter werden erstellt");
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
        showRound = document.createElement("progress");
        showRound.setAttribute("class", "test");
        pointsRound.appendChild(showRound);
        severityLength = 1;
        switch (severity) {
            case "easy":
                showRound.max = 3;
                showRound.value = 1;
                break;
            case "middle":
                showRound.max = 4;
                showRound.value = 1;
                break;
            case "difficult":
                showRound.max = 5;
                showRound.value = 1;
                break;
        }
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
            playerCard.setAttribute("player", "player");
            _placeholderDiv.appendChild(playerCard);
            game.splice(_placeholderNumber, 1, playerCard);
            existingPlaceholder[_placeholderNumber] = emtpyDiv;
            console.log("Spielstein von Spieler gelegt");
            setTimeout(checkLinesForEasy, 200);
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
        let computerCard = document.createElement("div");
        computerCard.setAttribute("class", "cardComputer");
        computerCard.setAttribute("taken", "taken");
        computerCard.setAttribute("computer", "computer");
        randomDiv.appendChild(computerCard);
        let indexOfTakenDiv;
        indexOfTakenDiv = game.indexOf(randomDiv);
        game.splice(indexOfTakenDiv, 1, computerCard);
        existingPlaceholder[indexOfTakenDiv] = emtpyDiv;
        console.log("Spielstein von Computer gelegt");
        setTimeout(checkLinesForEasy, 200);
    }
    // Überprüft, ob die einzelnen Reihen mit nur einer Art von Spielkarte gefüllt sind
    // Dabei werden je nach Schwierigkeitsgrad die einzelnen Möglichkeiten überprüft und dementsprechend die Runde weitergeführt oder beendet
    function checkLinesForEasy() {
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
                for (let i = 0; i <= 7; i++) {
                    let winCondition = winningConditionsEasy[i];
                    a = game[winCondition[0]];
                    b = game[winCondition[1]];
                    c = game[winCondition[2]];
                    // console.log(a, b, c);
                    if (a.getAttribute("taken") && b.getAttribute("taken") && c.getAttribute("taken")) {
                        console.log("Reihe ist voll");
                        checkLinesEasy();
                    }
                    else {
                        console.log("Runde geht weiter");
                        // checkAllLines();
                    }
                }
                break;
            case "middle":
                let winningConditionsMiddle = [
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
                for (let i = 0; i <= 9; i++) {
                    let winCondition = winningConditionsMiddle[i];
                    a = game[winCondition[0]];
                    b = game[winCondition[1]];
                    c = game[winCondition[2]];
                    d = game[winCondition[3]];
                    console.log("test", a, b, c, d);
                    if (a.getAttribute("taken") && b.getAttribute("taken") && c.getAttribute("taken") && d.getAttribute("taken")) {
                        console.log("Reihe ist voll");
                        checkLinesMiddle();
                    }
                    else {
                        console.log("Runde geht weiter");
                        // checkAllLines();
                    }
                }
                break;
            case "difficult":
                let winningConditionsDifficult = [
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
                for (let i = 0; i <= 11; i++) {
                    let winCondition = winningConditionsDifficult[i];
                    a = game[winCondition[0]];
                    b = game[winCondition[1]];
                    c = game[winCondition[2]];
                    d = game[winCondition[3]];
                    e = game[winCondition[4]];
                    // console.log("test", a, b, c, d, e);
                    if (a.getAttribute("taken") && b.getAttribute("taken") && c.getAttribute("taken") && d.getAttribute("taken") && e.getAttribute("taken")) {
                        console.log("Reihe ist voll");
                        checkLinesDifficult();
                    }
                    else {
                        console.log("Runde geht weiter");
                        // checkAllLines();
                    }
                }
                break;
        }
    }
    function checkLinesEasy() {
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
            // checkAllLines();
        }
    }
    function checkLinesMiddle() {
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
    function checkLinesDifficult() {
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
    //         if (!game[i].hasAttribute("taken")) {
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
    function roundEnd() {
        pointsRound.innerHTML = "Runde: ";
        pointsBeginning += pointsToGet;
        pointsRound.innerHTML += +pointsBeginning;
        showRound = document.createElement("progress");
        showRound.setAttribute("class", "test");
        pointsRound.appendChild(showRound);
        showRound.value += 1;
        severityLength += 1;
        switch (winner) {
            case "player":
                //Spieler bekommt einen Punkt
                pointsPlayer.innerHTML = "Dein Punktestand: ";
                pointsBeginning += pointsToGet;
                pointsPlayer.innerHTML += pointsBeginning;
                //Der Spieler bekommt eine Nachricht
                window.alert("Du hast diese Runde gewonnen.");
                break;
            case "computer":
                //Computer bekommt einen Punkt
                pointsComputer.innerHTML = "Computer Punktestand: ";
                pointsBeginning += pointsToGet;
                pointsComputer.innerHTML += pointsBeginning;
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
                if (severityLength == 3) {
                    console.log("Spiel ist zu Ende");
                    gameEnd();
                }
                else {
                    console.log("Spiel geht weiter 3");
                    showPlaceholders(severity);
                }
                break;
            case "middle":
                if (severityLength == 4) {
                    console.log("Spiel ist zu Ende");
                    // gameEnd();
                }
                else {
                    console.log("Spiel geht weiter");
                    showPlaceholders(severity);
                }
                break;
            case "difficult":
                if (severityLength == 5) {
                    console.log("Spiel ist zu Ende");
                    // gameEnd();
                }
                else {
                    console.log("Spiel geht weiter");
                    showPlaceholders(severity);
                }
                break;
        }
    }
    // Regelt das Ende des Spieles
    // Dabei wird ausgewertet, wer gewonnen hat und es wird dementsprechend eine Nachricht an den Spieler gesendet
    function gameEnd() {
        if (pointsPlayer > pointsComputer) {
            window.alert("Du hast dieses Spiel gewonnen!");
            setTimeout(startGame, 500);
        }
        else if (pointsPlayer < pointsComputer) {
            window.alert("Der Computer hat dieses Spiel gewonnen!");
            setTimeout(startGame, 500);
        }
        else {
            window.alert("Dieses Spiel geht unentschieden aus!");
            setTimeout(startGame, 500);
        }
    }
})(tictactoe || (tictactoe = {}));
//# sourceMappingURL=tictactoe.js.map