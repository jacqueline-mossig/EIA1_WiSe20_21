"use strict";
var Memory;
(function (Memory) {
    //Anlegen von globalen Variablen
    let n;
    let deck = [];
    let deckCard;
    let cardArea;
    let pointsBeginning = 0;
    let pointsToGet = 1;
    let pointsPlayerShowing;
    let pointsComputerShowing;
    let cardComputerOne;
    let cardComputerTwo;
    let cardPlayerOne;
    let cardPlayerTwo;
    // Event-Listener startet das Programm mit der Funktion startGame
    window.addEventListener("load", startGame);
    //Die Funktion startGame fragt den Nutzer nach dem Schwirigkeitsgrad und bereitet das Programm dementsprechend vor
    function startGame() {
        console.log("Das Spiel wird gestartet.");
        n = String(window.prompt("Mit welchem Schwierigkeitsgrad möchtest du spielen? Wähle zwischen 'easy', 'middle' oder 'difficult'!"));
        shuffleDeck(n);
    }
    //Je nachdem, welchen Schwierigkeitsgrad der Spieler wählt, wird ein Array mit den entsprechenden Memory-Karten gewählt und gemischt
    function shuffleDeck(_userInput) {
        switch (n) {
            case "easy":
                deck = Memory.easy;
                break;
            case "middle":
                deck = Memory.middle;
                break;
            case "difficult":
                deck = Memory.difficult;
                break;
            default:
                n = String(window.prompt("Das war kein erlaubter Schwierigkeitsgrad! Versuch es nochmal!"));
                break;
        }
        console.log("Deck wurde erstellt.");
        let newPosition;
        let temp;
        for (let i = deck.length - 1; i > 0; i--) {
            newPosition = Math.floor(Math.random() * (i + 1));
            temp = deck[i];
            deck[i] = deck[newPosition];
            deck[newPosition] = temp;
        }
        console.log("Das Deck wird gemischt.");
        showPoints();
        showDeck();
    }
    //Die Funktion showPoints zeigt die Punkte des Spielers und Computer zu beginn des Spiels
    function showPoints() {
        pointsPlayerShowing = document.getElementById("pointsPlayer");
        pointsPlayerShowing.innerHTML = "Dein Punktestand: " + pointsBeginning;
        console.log("Die Punkte des Spielers werden angezeigt.", pointsBeginning);
        pointsComputerShowing = document.getElementById("pointsComputer");
        pointsComputerShowing.innerHTML = "Computer Punktestand: " + pointsBeginning;
        console.log("Die Punkte des Computers werden angezeigt.", pointsBeginning);
    }
    //Die Funktion showDeck erstellt die Memory-Karten des Arrays sowie deren Rückseiten und fügt alle dem Kartenbereich hinzu
    //Außerdem fügt sie den Memory-Karten einen Event-Listener hinzu
    function showDeck() {
        cardArea = document.getElementById("cardArea");
        cardArea.innerHTML = "";
        for (let i = 0; i < deck.length; i++) {
            deckCard = document.createElement("img");
            deckCard.setAttribute("src", deck[i].cardBack);
            cardArea.appendChild(deckCard);
            console.log("Die Karten werden erstellt und verdeckt");
            deckCard.addEventListener("click", clickedCardsPlayer);
        }
    }
    //Die Funktion clickedCardsPlayer zeigt die Vorderseiten der zwei gewählten Karten
    function clickedCardsPlayer(_event) {
        let targetOne = _event.target;
        let parentOne = targetOne.parentNode;
        cardPlayerOne = Number(targetOne);
        deckCard.removeAttribute("src");
        parentOne.removeChild(deckCard);
        deckCard.setAttribute("src", deck[cardPlayerOne].cardColor);
        parentOne.appendChild(deckCard);
        deckCard.setAttribute("src", deck[cardPlayerTwo].cardPiktogram);
        parentOne.appendChild(deckCard);
        let targetTwo = _event.target;
        let parentTwo = targetTwo.parentNode;
        cardPlayerTwo = Number(targetTwo);
        deckCard.removeAttribute("src");
        parentTwo.removeChild(deckCard);
        deckCard.setAttribute("src", deck[cardPlayerOne].cardColor);
        parentTwo.appendChild(deckCard);
        deckCard.setAttribute("src", deck[cardPlayerTwo].cardPiktogram);
        parentTwo.appendChild(deckCard);
        matchCardsPlayer();
    }
    //Die Funktion coverCardsPlayer verdeckt wieder die beiden Vorderseiten der zwei gewählten Karten...
    //...wenn diese nicht zusammenpassen
    function coverCardsPlayer() {
        deckCard.setAttribute("src", deck[cardPlayerOne].cardBack);
        cardArea.appendChild(deckCard);
        deckCard.setAttribute("src", deck[cardPlayerTwo].cardBack);
        cardArea.appendChild(deckCard);
    }
    //Die Funktion matchCardsPlayer überprüft, ob die zwei vom Spieler gewählten Karten zusammenpassen
    //Wenn diese zusammenpassen, werden die Karten aussortiert und der Spieler erhält einen Punkt
    //Wenn diese nicht zusammenpassen, werden die beiden Karten über die Funktion coverCardsPlayer...
    //...1,5 Sekunden wieder zugedeckt und der Computer ist dran
    function matchCardsPlayer() {
        if (deck[cardPlayerOne].cardColor == deck[cardPlayerTwo].cardColor) {
            console.log("Kartenfarben passen");
            deck.splice(cardPlayerOne, 1);
            deck.splice(cardPlayerOne, 1);
            showDeck();
            pointsPlayerShowing.innerHTML = "Dein Punktestand: ";
            pointsBeginning += pointsToGet;
            pointsPlayerShowing.innerHTML += +pointsBeginning;
            console.log("Die Karten passen zusammen.");
            console.log("Der Spieler hat einen Punkt bekommen");
            // gameEnd();
        }
        else
            setTimeout(coverCardsPlayer, 1500);
        console.log("Die Karten passen nicht zusammen.");
        computerChooseCards();
    }
    //Die Funktion computerChooseCards lässt den Computer zwei zufällige Karten wählen
    function computerChooseCards() {
        console.log("Der Computer ist jetzt dran.");
        let min = 0;
        let max = deck.length;
        cardComputerOne = Math.round(Math.random() * (max - min)) + min;
        cardComputerTwo = Math.round(Math.random() * (max - min)) + min;
        showCardsComputer();
    }
    //Die Funktion showCardsComputer zeigt die vom Computer zufällig gewählten Karten
    function showCardsComputer() {
        deckCard.removeAttribute("src");
        cardArea.removeChild(deckCard);
        deckCard.setAttribute("src", deck[cardComputerOne].cardColor);
        deckCard.appendChild(deckCard);
        deckCard.setAttribute("src", deck[cardComputerOne].cardPiktogram);
        deckCard.appendChild(deckCard);
        deckCard.removeAttribute("src");
        cardArea.removeChild(deckCard);
        deckCard.setAttribute("src", deck[cardComputerTwo].cardColor);
        deckCard.appendChild(deckCard);
        deckCard.setAttribute("src", deck[cardComputerTwo].cardPiktogram);
        deckCard.appendChild(deckCard);
        console.log("Der Computer hat seine Karten gewählt.");
        matchCardsComputer();
    }
    //Die Funktion coverCardsComputer verdeckt wieder die beiden Vorderseiten der zwei gewählten Karten...
    //...wenn diese nicht zusammenpassen
    function coverCardsComputer() {
        deckCard.setAttribute("src", deck[cardComputerOne].cardBack);
        cardArea.appendChild(deckCard);
        deckCard.setAttribute("src", deck[cardComputerTwo].cardBack);
        cardArea.appendChild(deckCard);
    }
    //Die Funktion matchCardsComputer überprüft, ob die zwei vom Computer gewählten Karten zusammenpassen
    //Wenn diese zusammenpassen, werden die Karten aussortiert und der Computer erhält einen Punkt
    //Wenn diese nicht zusammenpassen, werden die beiden Karten über die Funktion coverCardsComputer...
    //...nach 1,5 Sekunden wieder zugedeckt und der Computer ist dran
    function matchCardsComputer() {
        if (deck[cardComputerOne].cardColor == deck[cardComputerTwo].cardColor) {
            deck.splice(cardComputerOne, 1);
            deck.splice(cardComputerTwo, 1);
            showDeck();
            pointsComputerShowing.innerHTML = "Computer Punktestand: ";
            pointsBeginning += pointsToGet;
            pointsComputerShowing.innerHTML += +pointsBeginning;
            console.log("Die Karten passen zusammen.");
            console.log("Der Computer hat einen Punkt bekommen.");
            gameEnd();
        }
        else
            console.log("Die Karten passen nicht zusammen.");
        setTimeout(coverCardsComputer, 1500);
        deckCard.addEventListener("click", clickedCardsPlayer);
        console.log("Der Spieler ist jetzt dran.");
    }
    //Die Funktion gameEnd wertet nach jedem Spielzug die Deck-Länge aus
    //Wenn diese 0 beträgt, wertet es die Punktezahl des Spielers aus
    //Wenn diese größer ist als die des Computers, hat der Spieler gewonnen
    function gameEnd() {
        console.log("Punkte werden ausgewertet");
        for (let i = 0; i == deck.length; i) {
            if (pointsPlayerShowing >= pointsComputerShowing) {
                console.log("Das Spiel ist zu Ende.");
                alert("Du hast gewonnen!");
                startGame();
            }
            else
                alert("Du hast verloren!");
            startGame();
        }
    }
})(Memory || (Memory = {}));
//# sourceMappingURL=Endaufgabe_EIA1_InteraktivesMemory.js.map