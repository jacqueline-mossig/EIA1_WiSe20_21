"use strict";
var Memory;
(function (Memory) {
    //Anlegen der Arrays für die Schwierigkeitsgrade
    Memory.easy = [
        {
            cardColor: "red",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeEinfach/RedHeart1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "red",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeEinfach/RedHeart2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightblue",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeEinfach/BlueSpades1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightblue",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeEinfach/BlueSpades2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightgreen",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeEinfach/GreenClubs1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightgreen",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeEinfach/GreenClubs2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "yellow",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeEinfach/YellowDiamonds1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "yellow",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeEinfach/YellowDiamonds2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        }
    ];
    Memory.middle = [
        {
            cardColor: "red",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/RedHeartSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "red",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/RedHeartSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "purple",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/PurpleHeartSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "purple",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/PurpleHeartSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightblue",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/LightBlueSpadesSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightblue",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/LightBlueSpadesSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "darkblue",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/DarkBlueSpadesSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "darkblue",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/DarkBlueSpadesSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightgreen",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/LightGreenClubsSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightgreen",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/LightGreenClubsSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "darkgreen",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/DarkGreenClubsSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "darkgreen",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/DarkGreenClubsSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "yellow",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/YellowDiamondsSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "yellow",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/YellowDiamondsSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "orange",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/OrangeDiamondsSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "orange",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeMittel/OrangeDiamondsSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        }
    ];
    Memory.difficult = [
        {
            cardColor: "red1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/RedSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "red1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/RedSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "red2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/RedSentence3.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "red2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/RedSentence4.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "purple1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/PurpleSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "purple1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/PurpleSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "purple2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/PurpleSentence3.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "purple2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/PurpleSentence4.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightblue1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/LightBlueSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightblue1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/LightBlueSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightblue2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/LightBlueSentence3.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightblue2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/LightBlueSentence4.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "darkblue1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/DarkBlueSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "darkblue1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/DarkBlueSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "darkblue2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/DarkBlueSentence3.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "darkblue2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/DarkBlueSentence4.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightgreen1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/LightGreenSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightgreen1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/LightGreenSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightgreen2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/LightGreenSentence3.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "lightgreen2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/LightGreenSentence4.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "darkgreen1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/DarkGreenSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "darkgreen1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/DarkGreenSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "darkgreen2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/DarkGreenSentence3.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "darkgreen2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/DarkGreenSentence4.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "yellow1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/YellowSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "yellow1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/YellowSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "yellow2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/YellowSentence3.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "yellow2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/YellowSentence4.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "orange1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/OrangeSentence1.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "orange1",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/OrangeSentence2.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "orange2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/OrangeSentence3.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        },
        {
            cardColor: "orange2",
            cardPiktogram: "PiktogrammeSchwierigkeitsstufeSchwer/OrangeSentence4.jpg",
            cardSentence: "...",
            cardBack: "CardBack.jpg"
        }
    ];
})(Memory || (Memory = {}));
//# sourceMappingURL=Cards.js.map