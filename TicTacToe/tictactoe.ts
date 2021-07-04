namespace tictactoe {

    window.addEventListener("load", startGame);

    let severity: string;                                   //bestimmt den Schwierigkeitsgrad
    let severityLength: number;                             //bestimmt die Länge der Runden

    let game: HTMLDivElement[] = [];                        //Array für die Auswerung des Spielefeldes
    let existingPlaceholder: HTMLDivElement[] = [];         //Array für die wegfallenden Platzhalter

    let untakenDiv: HTMLDivElement;                         //Platzalter, die zu Beginn erstellt werden
    let emptyDiv: HTMLDivElement;                           //Platzhalter, die aus dem Array genommen werden

    let pointsPlayer: number;                               //Punkteanzahl des Spielers
    let pointsComputer: number;                             //Punkteanzahl des Spielers
    let showingPointsPlayer: HTMLDivElement;                //zeigt die Punkte des Spielers
    let showingPointsComputer: HTMLDivElement;              //zeigt die Punkte des Computers

    let showingRounds: HTMLDivElement;                      //zeigt die Rundenanzahl
    let gameRound: number = 0;                              //bezieht sich auf das Array game bei den Spielzügen
    let roundCounter: number;                               //Rundenanzahl
    let roundsProgress: HTMLProgressElement;                //zeigt den visuellen Balken der Rundenanzahl

    let winner: string;                                     //enthält die Informationen, wie das Spiel ausgeht

    let a: HTMLDivElement;
    let b: HTMLDivElement;
    let c: HTMLDivElement;                                  //Variablen für die Überprüfung der Reihen
    let d: HTMLDivElement;
    let e: HTMLDivElement;

    let clicked: boolean = false;                           //Schränkt das Klicken des Spielers ein

    // Fragt den Spieler, mit welchem Schwierigkeitsgrad er spielen möchte und ruft die Funktionen zu Spielvorbereitung auf
    function startGame(): void {
        console.log("Das Spiel wird gestartet");
        severity = String(window.prompt("Mit welchem Schwierigkeitsgrad möchtest du spielen? Wähle zwischen 'easy', 'middle' oder 'difficult'!"));

        createPlaceholders(severity);
        showPoints();
    }

    // Erstellt die Platzhalter angepasst an den Schwierigkeitsgrad
    function createPlaceholders(_userInput: string): void {
        switch (severity) {
            case "easy":
                //Leerung des Feldes und der Arrays
                let fieldEasy: HTMLDivElement = <HTMLDivElement>document.getElementById("field");
                fieldEasy.innerHTML = "";
                game.splice(0, game.length);
                existingPlaceholder.splice(0, existingPlaceholder.length);

                //Erstellung und Platzierung der Platzhalter angepasst an den Schwierigkeitsgrad easy
                for (let i: number = 0; i < 9; i++) {
                    untakenDiv = document.createElement("div");
                    untakenDiv.setAttribute("class", "placeholderEasy");
                    untakenDiv.setAttribute("placeholder", "placeholder");
                    fieldEasy.appendChild(untakenDiv);
                    game.push(untakenDiv);
                    existingPlaceholder.push(untakenDiv);
                    untakenDiv.addEventListener("click", function (): void { playerTurn(i, game[i]); });
                    untakenDiv.addEventListener("touch", function (): void { playerTurn(i, game[i]); });
                }

                console.log("Die Platzhalter werden erstellt");
                break;

            case "middle":
                //Leerung des Feldes und der Arrays
                let fieldMiddle: HTMLDivElement = <HTMLDivElement>document.getElementById("field");
                fieldMiddle.innerHTML = "";
                game.splice(0, game.length);
                existingPlaceholder.splice(0, existingPlaceholder.length);

                //Erstellung und Platzierung der Platzhalter angepasst an den Schwierigkeitsgrad middle
                for (let i: number = 0; i < 16; i++) {
                    untakenDiv = document.createElement("div");
                    untakenDiv.setAttribute("class", "placeholderMiddle");
                    fieldMiddle.appendChild(untakenDiv);
                    game.push(untakenDiv);
                    existingPlaceholder.push(untakenDiv);
                    untakenDiv.addEventListener("click", function (): void { playerTurn(i, game[i]); });
                    untakenDiv.addEventListener("touch", function (): void { playerTurn(i, game[i]); });
                }

                console.log("Die Platzhalter werden erstellt");
                break;

            case "difficult":
                //Leerung des Feldes und der Arrays
                let fieldDifficult: HTMLDivElement = <HTMLDivElement>document.getElementById("field");
                fieldDifficult.innerHTML = "";
                game.splice(0, game.length);
                existingPlaceholder.splice(0, existingPlaceholder.length);

                //Erstellung und Platzierung der Platzhalter angepasst an den Schwierigkeitsgrad difficult
                for (let i: number = 0; i < 25; i++) {
                    untakenDiv = document.createElement("div");
                    untakenDiv.setAttribute("class", "placeholderDifficult");
                    fieldDifficult.appendChild(untakenDiv);
                    game.push(untakenDiv);
                    existingPlaceholder.push(untakenDiv);
                    untakenDiv.addEventListener("click", function (): void { playerTurn(i, game[i]); });
                    untakenDiv.addEventListener("touch", function (): void { playerTurn(i, game[i]); });
                }

                console.log("Die Platzhalter werden erstellt");
                break;

            //Bei falscher Eingabe des Spielers startet das Spiel nochmal neu
            default:
                startGame();
                break;
        }
    }

    // Zeigt die Punkte des Spielers und des Computers und die Rundenanzeigen zu Beginn des Spieles
    function showPoints(): void {
        severityLength = 1;

        //Punkte des Spielers
        pointsPlayer = 0;
        showingPointsPlayer = <HTMLDivElement>document.getElementById("player");
        showingPointsPlayer.innerHTML = "Dein Punktestand: " + pointsPlayer;

        //Punkte des Computers
        pointsComputer = 0;
        showingPointsComputer = <HTMLDivElement>document.getElementById("computer");
        showingPointsComputer.innerHTML = "Computer Punktestand: " + pointsComputer;

        //Vorbereitungen für Rundenanzeigen
        roundCounter = 1;
        showingRounds = <HTMLDivElement>document.getElementById("round");
        roundsProgress = <HTMLProgressElement>document.createElement("progress");

        switch (severity) {
            case "easy":
                //Rundenanzeige beim Schwierigkeitsgrad easy
                showingRounds.innerHTML = "Runde: " + roundCounter + "/3";

                //Anzeige des Fortschrittsbalkens für die Runden beim Schwierigkeitsgrad easy
                roundsProgress.setAttribute("class", "progress");
                showingRounds.appendChild(roundsProgress);
                roundsProgress.max = 3;
                roundsProgress.value = 1;
                break;
            case "middle":
                //Rundenanzeige beim Schwierigkeitsgrad middle
                showingRounds.innerHTML = "Runde: " + roundCounter + "/4";

                //Anzeige des Fortschrittsbalkens für die Runden beim Schwierigkeitsgrad middle
                roundsProgress.setAttribute("class", "progress");
                showingRounds.appendChild(roundsProgress);
                roundsProgress.max = 4;
                roundsProgress.value = 1;
                break;
            case "difficult":
                //Rundenanzeige beim Schwierigkeitsgrad difficult
                showingRounds.innerHTML = "Runde: " + roundCounter + "/5";

                //Anzeige des Fortschrittsbalkens für die Runden beim Schwierigkeitsgrad difficult
                roundsProgress.setAttribute("class", "progress");
                showingRounds.appendChild(roundsProgress);
                roundsProgress.max = 5;
                roundsProgress.value = 1;
                break;
        }
    }

    // Regelt den Spielzug des Spielers
    // Dabei kann der Spieler einmal eine seiner Spielkarten auf einem Platzhalter ablegen
    function playerTurn(_placeholderNumber: number, _placeholderDiv: HTMLDivElement): void {
        let playerCard: HTMLDivElement = <HTMLDivElement>document.createElement("div");

        //Überprüfung, wo der Spieler seine Karte ablegen kann
        if (existingPlaceholder[_placeholderNumber] == emptyDiv) {
            console.log("Leider ist dieser Platzhalter schon belegt");
        } else {
            //Erstellung und Platzierung der Karte des Computers
            playerCard.setAttribute("class", "cardPlayer");
            playerCard.setAttribute("taken", "taken");
            playerCard.setAttribute("player", "player");
            _placeholderDiv.appendChild(playerCard);
            gameRound += 1;
            console.log("Du hast einen Spielstein platziert");

            if (clicked === true) {
                console.log("Du bist leider nicht dran");
                _placeholderDiv.removeChild(playerCard);
            } else {
                //Aktualisierung der Arrays
                game.splice(_placeholderNumber, 1, playerCard);
                existingPlaceholder[_placeholderNumber] = emptyDiv;

                setTimeout(checkLines, 200);
                checkAllLines();
                setTimeout(computerTurn, 500);
                clicked = true;
            }
        }
    }

    // Regelt den Spielzug des Computers
    // Dabei legt der Computer zufällig eine seiner Spielkarten auf einen Platzhalter
    function computerTurn(): void {
        let i: number = 0;
        let randomDiv: HTMLDivElement;
        //Mischung des Arrays
        randomDiv = existingPlaceholder[Math.floor(Math.random() * existingPlaceholder.length)];
        while (randomDiv == emptyDiv && i < 100) {
            randomDiv = existingPlaceholder[Math.floor(Math.random() * existingPlaceholder.length)];
        }
        i++;

        //Erstellung und Platzierung der Karte des Computers
        let computerCard: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        computerCard.setAttribute("class", "cardComputer");
        computerCard.setAttribute("taken", "taken");
        computerCard.setAttribute("computer", "computer");
        randomDiv.appendChild(computerCard);

        //Aktualisierung der Arrays
        let indexOfTakenDiv: number;
        indexOfTakenDiv = game.indexOf(randomDiv);
        game.splice(indexOfTakenDiv, 1, computerCard);
        existingPlaceholder[indexOfTakenDiv] = emptyDiv;
        gameRound += 1;

        console.log("Der Computer hat einen Spielstein platziert");
        clicked = false;
        setTimeout(checkLines, 200);
        checkAllLines();
    }

    // Überprüft je nach Schwierigkeitsgrad, ob die Platzhalter der einzelnen Reihen mit Spielkarten belegt sind
    function checkLines(): void {
        switch (severity) {
            case "easy":
                //Mögliche Varianten für den Schwierigkeitsgrad easy
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

                //Überprüfung, ob bei einer Variante die Platzhalter mit Spielkarten belegt sind
                for (let i: number = 0; i <= 7; i++) {
                    let winCondition: number[] = winningConditionsEasy[i];
                    a = game[winCondition[0]];
                    b = game[winCondition[1]];
                    c = game[winCondition[2]];

                    //Wenn bei einer Variante die Platzhalter mit Spielkarten belegt sind, wird die Funktion checkLinesEasy() aufgerufen
                    if (a.getAttribute("taken") && b.getAttribute("taken") && c.getAttribute("taken")) {
                        checkLinesEasy();
                    }
                }
                break;
            case "middle":
                //Mögliche Varianten für den Schwierigkeitsgrad middle
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

                //Überprüfung, ob bei einer Variante die Platzhalter mit Spielkarten belegt sind
                for (let i: number = 0; i <= 9; i++) {
                    let winCondition: number[] = winningConditionsMiddle[i];
                    a = game[winCondition[0]];
                    b = game[winCondition[1]];
                    c = game[winCondition[2]];
                    d = game[winCondition[3]];

                    //Wenn bei einer Variante die Platzhalter mit Spielkarten belegt sind, wird die Funktion checkLinesMiddle() aufgerufen
                    if (a.getAttribute("taken") && b.getAttribute("taken") && c.getAttribute("taken") && d.getAttribute("taken")) {
                        checkLinesMiddle();
                    } 
                }
                break;
            case "difficult":
                //Mögliche Varianten für den Schwierigkeitsgrad difficult
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

                //Überprüfung, ob bei einer Variante die Platzhalter mit Spielkarten belegt sind
                for (let i: number = 0; i <= 11; i++) {
                    let winCondition: number[] = winningConditionsDifficult[i];
                    a = game[winCondition[0]];
                    b = game[winCondition[1]];
                    c = game[winCondition[2]];
                    d = game[winCondition[3]];
                    e = game[winCondition[4]];

                    //Wenn bei einer Variante die Platzhalter mit Spielkarten belegt sind, wird die Funktion checkLinesDifficult() aufgerufen
                    if (a.getAttribute("taken") && b.getAttribute("taken") && c.getAttribute("taken") && d.getAttribute("taken") && e.getAttribute("taken")) {
                        checkLinesDifficult();
                    }
                }
                break;
        }
    }

    // Überprüft für den Schwirigkeitsgrad easy, ob die einzelne Reihe mit nur einer Art von Spielkarte belegt ist
    function checkLinesEasy(): void {
        //Wenn die einzelne Reihe mit den Spielkarten des Spielers belegt ist, gewinnt der Spieler die Runde
        if (a.getAttribute("player") && b.getAttribute("player") && c.getAttribute("player")) {
            console.log("Das Spiel ist zu Ende");
            winner = "player";
            roundEnd();
        }
        //Wenn die einzelne Reihe mit den Karten des Computers belegt ist, gewinnt der Computer die Runde
        else if (a.getAttribute("computer") && b.getAttribute("computer") && c.getAttribute("computer")) {
            console.log("Das Spiel ist zu Ende");
            winner = "computer";
            roundEnd();
        }
        //Wenn die einzelne Reihe mit unterschiedlichen Karten belegt ist, passiert nichts
        else {
            console.log("Das Spiel geht weiter");
        }
    }

    // Überprüft für den Schwirigkeitsgrad middle, ob die einzelne Reihe mit nur einer Art von Spielkarte belegt ist
    function checkLinesMiddle(): void {
        //Wenn die einzelne Reihe mit den Spielkarten des Spielers belegt ist, gewinnt der Spieler die Runde
        if (a.getAttribute("player") && b.getAttribute("player") && c.getAttribute("player") && d.getAttribute("player")) {
            console.log("Das Spiel ist zu Ende");
            winner = "player";
            roundEnd();
        }
        //Wenn die einzelne Reihe mit den Karten des Computers belegt ist, gewinnt der Computer die Runde
        else if (a.getAttribute("computer") && b.getAttribute("computer") && c.getAttribute("computer") && d.getAttribute("computer")) {
            console.log("Das Spiel ist zu Ende");
            winner = "computer";
            roundEnd();
        }
        //Wenn die einzelne Reihe mit unterschiedlichen Karten belegt ist, passiert nichts
        else {
            console.log("Das Spiel geht weiter");
        }
    }

    // Überprüft für den Schwirigkeitsgrad difficult, ob die einzelne Reihe mit nur einer Art von Spielkarte belegt ist
    function checkLinesDifficult(): void {
        //Wenn die einzelne Reihe mit den Spielkarten des Spielers belegt ist, gewinnt der Spieler die Runde
        if (a.getAttribute("player") && b.getAttribute("player") && c.getAttribute("player") && d.getAttribute("player") && e.getAttribute("player")) {
            console.log("Das Spiel ist zu Ende");
            winner = "player";
            roundEnd();
        }
        //Wenn die einzelne Reihe mit den Karten des Computers belegt ist, gewinnt der Computer die Runde
        else if (a.getAttribute("computer") && b.getAttribute("computer") && c.getAttribute("computer") && d.getAttribute("computer") && e.getAttribute("computer")) {
            console.log("Das Spiel ist zu Ende");
            winner = "computer";
            roundEnd();
        }
        //Wenn die einzelne Reihe mit unterschiedlichen Karten belegt ist, passiert nichts
        else {
            console.log("Das Spiel geht weiter");
        }
    }

    // Überprüft, ob alle Platzhalter mit Spielkarten belegt sind, um ein mögliches Unentschieden feststellen zu können
    function checkAllLines(): void {
        // Überprüfung der Platzhalter
        if (gameRound >= game.length) {
            gameRound = 0;
            console.log("Die Runde ist zu Ende");
            winner = "tied";
            roundEnd();
        }
        //Wenn nicht alle Platzhalter belegt sind, geht die Runde weiter
        else {
            console.log("Die Runde geht weiter");
        }
    }

    // Regelt das Ende einer Runde
    // Dabei wird ausgewertet, wer die Runde gewonnen hat und dementsprechend wird ein Punkt vergeben und eine Nachricht an den Spieler gesendet
    // Außerdem wird ausgewertet, ob das Spiel zu Ende ist oder nicht
    function roundEnd(): void {
        severityLength += 1;
        roundCounter += 1;
        gameRound = 0;

        switch (winner) {
            //Der Spieler hat die Runde gewonnen
            case "player":
                //Der Spieler bekommt einen Punkt
                pointsPlayer += 1;
                showingPointsPlayer.innerHTML = "Dein Punktestand: " + pointsPlayer;
                //Der Spieler bekommt eine Nachricht
                window.alert("Du hast diese Runde gewonnen.");
                break;

            //Der Computer hat die Runde gewonnen
            case "computer":
                //Der Computer bekommt einen Punkt
                pointsComputer += 1;
                showingPointsComputer.innerHTML = "Dein Punktestand: " + pointsComputer;
                //Der Spieler bekommt eine Nachricht
                window.alert("Der Computer hat diese Runde gewonnen.");
                break;

            //Keiner hat die Runde gewonnen und niemand erhält einen Punkt
            case "tied":
                //Der Spieler bekommt eine Nachricht
                window.alert("Diese Runde ist unentschieden.");
                break;
        }

        switch (severity) {
            case "easy":
                //Beim Schwierigkeitgrad easy wird das Spiel nach drei Runden beendet
                if (severityLength == 4) {
                    console.log("Das Spiel ist zu Ende");
                    gameEnd();
                }
                //Falls das Spiel nicht beendet wird, werden die Anzeigen für die Runde aktualisiert
                else {
                    console.log("Das Spiel geht weiter");
                    showingRounds.innerHTML = "Runde: " + roundCounter + "/3";
                    roundsProgress.setAttribute("class", "progress");
                    showingRounds.appendChild(roundsProgress);
                    roundsProgress.max = 3;
                    roundsProgress.value += 1;
                    createPlaceholders(severity);
                }
                break;

            case "middle":
                //Beim Schwierigkeitgrad middle wird das Spiel nach vier Runden beendet
                if (severityLength == 5) {
                    console.log("Das Spiel ist zu Ende");
                    gameEnd();
                }
                //Falls das Spiel nicht beendet wird, werden die Anzeigen für die Runde aktualisiert
                else {
                    console.log("Das Spiel geht weiter");
                    showingRounds.innerHTML = "Runde: " + roundCounter + "/4";
                    roundsProgress.setAttribute("class", "progress");
                    showingRounds.appendChild(roundsProgress);
                    roundsProgress.max = 4;
                    roundsProgress.value += 1;
                    createPlaceholders(severity);
                }
                break;

            case "difficult":
                //Beim Schwierigkeitgrad difficult wird das Spiel nach fünf Runden beendet
                if (severityLength == 6) {
                    console.log("Das Spiel ist zu Ende");
                    gameEnd();
                }
                //Falls das Spiel nicht beendet wird, werden die Anzeigen für die Runde aktualisiert
                else {
                    console.log("Das Spiel geht weiter");
                    showingRounds.innerHTML = "Runde: " + roundCounter + "/5";
                    roundsProgress.setAttribute("class", "progress");
                    showingRounds.appendChild(roundsProgress);
                    roundsProgress.max = 5;
                    roundsProgress.value += 1;
                    createPlaceholders(severity);
                }
                break;
        }
    }

    // Regelt das Ende des Spieles
    // Dabei wird ausgewertet, wer gewonnen hat und dementsprechend wir dem Spieler eine Nachricht gesendet
    function gameEnd(): void {
        //Wenn der Spieler mehr Punkte hat, gewinnt er
        if (pointsPlayer > pointsComputer) {
            window.alert("Du hast dieses Spiel gewonnen!");
            startGame();
        }
        //Wenn der Computer mehr Punkte hat, gewinnt er
        else if (pointsPlayer < pointsComputer) {
            window.alert("Der Computer hat dieses Spiel gewonnen!");
            startGame();
        }
        //Wenn sie beide gleich viele Punkte haben, ist es unentschieden
        else {
            window.alert("Dieses Spiel ist unentschieden!");
            startGame();
        }
    }
}


