"use strict";
var tictactoe;
(function (tictactoe) {
    window.addEventListener("load", startGame);
    let severity;
    let d;
    let game = []; //Array entsteht während des Spieles
    let auswertung = [];
    let cardDiv;
    let pointsBeginning = 0;
    let pointsToGet = 1;
    let pointsPlayer;
    let pointsComputer;
    let winner;
    // let hint: HTMLParagraphElement;
    function startGame() {
        console.log("Das Spiel wird gestartet.");
        severity = String(window.prompt("Mit welchem Schwierigkeitsgrad möchtest du spielen? Wähle zwischen 'easy', 'middle' oder 'difficult'!"));
        showCards(severity);
        showPoints();
    }
    function showCards(_userInput) {
        switch (severity) {
            case "easy":
                let field = document.getElementById("field");
                field.innerHTML = "";
                for (let i = 0; i < 9; i++) {
                    cardDiv = document.createElement("div");
                    cardDiv.setAttribute("class", "platzhalter1");
                    field.appendChild(cardDiv);
                    cardDiv.addEventListener("click", playerTurn);
                    game.push(cardDiv);
                    auswertung.push(cardDiv);
                }
                console.log("Die Platzhalter werden erstellt");
                console.log(game);
                break;
            // case "middle":
            //     break;
            // case "difficult":
            //     break;
            default:
                severity = String(window.prompt("Das war kein erlaubter Schwierigkeitsgrad! Versuch es nochmal!"));
                break;
        }
    }
    function showPoints() {
        pointsPlayer = document.getElementById("player");
        pointsPlayer.innerHTML = "Dein Punktestand: " + pointsBeginning;
        console.log("Die Punkte des Spielers werden angezeigt.", pointsBeginning);
        pointsComputer = document.getElementById("computer");
        pointsComputer.innerHTML = "Computer Punktestand: " + pointsBeginning;
        console.log("Die Punkte des Computers werden angezeigt.", pointsBeginning);
    }
    function playerTurn(_event) {
        let newCarddDiv = document.createElement("div");
        newCarddDiv.setAttribute("card", "x");
        newCarddDiv.setAttribute("disabled", "disabled");
        let target = _event.target;
        target.appendChild(newCarddDiv);
        let indexOfNewDiv;
        indexOfNewDiv = game.indexOf(newCarddDiv);
        game.splice(indexOfNewDiv, 1);
        auswertung.splice(indexOfNewDiv, 1, newCarddDiv);
        console.log(newCarddDiv);
        console.log("Spielstein von Spieler gelegt");
        checkAllLines();
        setTimeout(computerTurn, 1000);
    }
    function computerTurn() {
        let randomDiv;
        randomDiv = game[Math.floor(Math.random() * game.length)];
        let newCardDiv = document.createElement("div");
        newCardDiv.setAttribute("card", "o");
        newCardDiv.setAttribute("disabled", "disabled");
        randomDiv.appendChild(newCardDiv);
        let indexOfNewDiv;
        indexOfNewDiv = game.indexOf(newCardDiv);
        game.splice(indexOfNewDiv, 1);
        auswertung.splice(indexOfNewDiv, 1, newCardDiv);
        console.log(newCardDiv);
        console.log("Spielstein von Computer gelegt");
        checkAllLines();
    }
    function checkAllLines() {
        let check;
        check = true;
        //Prüft, ob alle Felder makiert sind
        for (let i = 0; i < auswertung.length; i++) {
            if (!auswertung[i].hasAttribute("disabled")) {
                check = false;
                console.log("Spiel geht weiter");
                checkSingleLines();
            }
            if (check) {
                console.log("Ende des Spieles");
            }
        }
    }
    function checkSingleLines() {
        switch (severity) {
            case "easy":
                let i = 0;
                // Prüft, ob eine der Reihen passt
                for (i = 0; i < 3; i++) {
                    // 3 senkrecht
                    if (auswertung[0 + i].getAttribute("aria-label") != ""
                        && auswertung[0 + i].getAttribute("aria-label") == auswertung[3 + i].getAttribute("aria-label")
                        && auswertung[3 + i].getAttribute("aria-label") == auswertung[6 + i].getAttribute("aria-label")) {
                        winner = game[0 + i].getAttribute("aria-label");
                        console.log("Ende des Spieles");
                    }
                    // 3 waagrecht
                    if (auswertung[i * 3].getAttribute("aria-label") != ""
                        && auswertung[i * 3].getAttribute("aria-label") == auswertung[i * 3 + 1].getAttribute("aria-label")
                        && auswertung[i * 3 + 1].getAttribute("aria-label") == auswertung[i * 3 + 2].getAttribute("aria-label")) {
                        winner = auswertung[i * 3].getAttribute("aria-label");
                        console.log("Ende des Spieles");
                    }
                    // diagonal links oben nach rechts unten
                    if (auswertung[0].getAttribute("aria-label") != ""
                        && auswertung[0].getAttribute("aria-label") == auswertung[4].getAttribute("aria-label")
                        && auswertung[4].getAttribute("aria-label") == auswertung[8].getAttribute("aria-label")) {
                        winner = auswertung[0].getAttribute("aria-label");
                        console.log("Ende des Spieles");
                    }
                    // diagonal rechts oben nach links unten
                    if (auswertung[2].getAttribute("aria-label") != ""
                        && auswertung[2].getAttribute("aria-label") == auswertung[4].getAttribute("aria-label")
                        && auswertung[4].getAttribute("aria-label") == auswertung[6].getAttribute("aria-label")) {
                        winner = auswertung[2].getAttribute("aria-label");
                        console.log("Ende des Spieles");
                    }
                    else {
                        console.log("...");
                    }
                }
        }
    }
    // function RoundEndWinner(_winInput: string): void {
    //     switch (d) {                          
    //         case "win":
    //             if (winner == "x") {
    //                 // hint.className = "success";	
    //                 setTimeout(function(): void {window.alert("Du hast diese Runde gewonnen!"); startGame(); }, 500);
    //                 PlayergetsPoint();
    //             }
    //             else{
    //                 setTimeout(function(): void {window.alert("Der Computer hat diese Runde gewonnen!"); startGame(); }, 500);
    //                 ComputergetsPoint();
    //             }
    // }
    // function RoundEndTied(_tiedInput: string): void {
    //      setTimeout(function(): void {window.alert("Diese Runde ist unentschieden."); startGame(); }, 500);
    // }
    // function showSolution(_cells): void {
    //     for (var i: number = 0; i < 3; i++) {
    //         _cells[i].classList.add("highlighted");
    //       }
    //     }
    // function PlayergetsPoint(): void {
    //     pointsPlayer.innerHTML = "Dein Punktestand: ";
    //     pointsBeginning += pointsToGet; 
    //     pointsPlayer.innerHTML += + pointsBeginning;
    // }
    // function ComputergetsPoint(): void {
    //     pointsComputer.innerHTML = "Computer Punktestand: ";
    //     pointsBeginning += pointsToGet; 
    //     pointsComputer.innerHTML += + pointsBeginning;
    // }
})(tictactoe || (tictactoe = {}));
//# sourceMappingURL=tictactoe.js.map