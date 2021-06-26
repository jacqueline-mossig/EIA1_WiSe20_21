namespace tictactoe {

window.addEventListener("load", startGame);

let severity: string;
let d: string;

let game: HTMLDivElement[] = [];            //Array für den Schwierigkeitsgrad
let auswertung: HTMLDivElement[] = [];      //Array für die Auswertung des Spielfeldes

let untakenDiv: HTMLDivElement;

let pointsBeginning: number = 0;
let pointsToGet: number = 1;
let pointsPlayer: HTMLDivElement;
let pointsComputer: HTMLDivElement;

let winner: string | null;
// let hint: HTMLParagraphElement;

function startGame(): void {
    console.log("Das Spiel wird gestartet.");
    severity = String(window.prompt("Mit welchem Schwierigkeitsgrad möchtest du spielen? Wähle zwischen 'easy', 'middle' oder 'difficult'!"));

    showCards(severity);
    showPoints();
}

function showCards(_userInput: string): void {

    switch (severity) {                          
        case "easy":
            let field: HTMLDivElement = <HTMLDivElement>document.getElementById("field");
            field.innerHTML = "";

            for (let i: number = 0; i < 9; i++) {
            untakenDiv = document.createElement("div");
            untakenDiv.setAttribute("class", "platzhalter1");
            field.appendChild(untakenDiv);
            game.push(untakenDiv);
            // untakenDiv.addEventListener("click", playerTurn);
            untakenDiv.addEventListener("click", function(): void {playerTurn (i, untakenDiv); });
            // auswertung.push(untakenDiv);
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

function showPoints(): void {
    pointsPlayer = <HTMLDivElement>document.getElementById("player");
    pointsPlayer.innerHTML = "Dein Punktestand: " + pointsBeginning;
    console.log("Die Punkte des Spielers werden angezeigt.", pointsBeginning);

    pointsComputer = <HTMLDivElement>document.getElementById("computer");
    pointsComputer.innerHTML = "Computer Punktestand: " + pointsBeginning;
    console.log("Die Punkte des Computers werden angezeigt.", pointsBeginning);
}

function playerTurn(_placeholderNumber: number, _placeholderDiv: HTMLDivElement): void {
    let playerCard: HTMLDivElement = <HTMLDivElement>document.createElement("div");
    playerCard.setAttribute("class", "cardPlayer");
    playerCard.setAttribute("disabled", "disabled");
    // let target: Node = <Node>_event.target;
    // target.appendChild(playerCard);
    console.log(_placeholderNumber, "geklickter Platzhalter als Nummer");
    console.log(_placeholderDiv, "geklickter Platzhalter als Div");
    _placeholderDiv.appendChild(playerCard);
    
    game.splice(_placeholderNumber, 1, playerCard);
    // auswertung.splice(indexOfTakenDiv, 1, playerCard);

    console.log("game", game);
    console.log("Spielstein von Spieler gelegt");

    checkAllLines();
    setTimeout(computerTurn, 500);
}

function computerTurn(): void {
    let randomDiv: HTMLDivElement;
    randomDiv = game[Math.floor(Math.random() * game.length)];
    
    let computerCard: HTMLDivElement = <HTMLDivElement>document.createElement("div");
    computerCard.setAttribute("class", "cardComputer");
    computerCard.setAttribute("disabled", "disabled");
    randomDiv.appendChild(computerCard);

    let indexOfTakenDiv: number;
    indexOfTakenDiv = game.indexOf(randomDiv);
    game.splice(indexOfTakenDiv, 1, computerCard);
    // auswertung.splice(indexOfTakenDiv, 1, computerCard);

    console.log("game", game);
    console.log("Spielstein von Computer gelegt");

    // untakenDiv.removeEventListener("click", function(): void {playerTurn(i, untakenDiv); }, false);
    // checkAllLines();
}

function checkAllLines(): void {
    let check: boolean;
    check = true;

    //Prüft, ob alle Felder makiert sind
    for (let i: number = 0; i < game.length; i++) {
        if (!game[i].hasAttribute("disabled")) {
        check = false;
        console.log("Runde geht weiter");
        console.log("shdshd", game);
        // checkSingleLines();
        break;
        }

        if (check) {
        console.log("Ende der Runde");
        // roundEndTied();
    }
    }
}

// function roundEndTied(): void {
//     setTimeout(function(): void {window.alert("Diese Runde ist unentschieden."); startGame(); }, 500);
// }

// function checkSingleLines(): void {
//     switch (severity) {                          
//         case "easy":
//             let i: number = 0;

//             // Prüft, ob eine der Reihen passt
//             for (i = 0; i < 3; i++) {

//             // 3 senkrecht
//             if (auswertung[0 + i].getAttribute("aria-label") != ""
//             && auswertung[0 + i].getAttribute("aria-label") == auswertung[3 + i].getAttribute("aria-label")
//             && auswertung[3 + i].getAttribute("aria-label") == auswertung[6 + i].getAttribute("aria-label")
//             ) {
//             winner = game[0 + i].getAttribute("aria-label");
//             console.log("Ende des Spieles");
//             }

//             // 3 waagrecht
//             if (auswertung[i * 3].getAttribute("aria-label") != ""
//             && auswertung[i * 3].getAttribute("aria-label") == auswertung[i * 3 + 1].getAttribute("aria-label")
//             && auswertung[i * 3 + 1].getAttribute("aria-label") == auswertung[i * 3 + 2].getAttribute("aria-label")
//             ) {
//             winner = auswertung[i * 3].getAttribute("aria-label");
//             console.log("Ende des Spieles");
//             }

//             // diagonal links oben nach rechts unten
//             if (auswertung[0].getAttribute("aria-label") != ""
//             && auswertung[0].getAttribute("aria-label") == auswertung[4].getAttribute("aria-label")
//             && auswertung[4].getAttribute("aria-label") == auswertung[8].getAttribute("aria-label")
//             ) {
//             winner = auswertung[0].getAttribute("aria-label");
//             console.log("Ende des Spieles");
//             }

//             // diagonal rechts oben nach links unten
//             if (auswertung[2].getAttribute("aria-label") != ""
//             && auswertung[2].getAttribute("aria-label") == auswertung[4].getAttribute("aria-label")
//             && auswertung[4].getAttribute("aria-label") == auswertung[6].getAttribute("aria-label")
//             ) {
//             winner = auswertung[2].getAttribute("aria-label");
//             console.log("Ende des Spieles");
//             }

//             else {
//             console.log("...");
//             }
// }
// }
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

// }

