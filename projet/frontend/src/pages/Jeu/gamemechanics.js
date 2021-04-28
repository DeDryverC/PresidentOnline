'use strict'

function createDeck(){

    let deck = [];

    /* normal variation */
    let suitsA = ['spades', 'clubs', 'hearts', 'diamonds'];
    let valuesA = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    /* for API
    using array suitsA, we will convert the order of the suits in numerical value
    spades = 1, clubs = 2, hearts = 3, diamonds = 4
    
    we will fix the card value as 13, as there are 13 cards per suit
    */
    let suitsB = 4, valuesB = 13;

    /*
    for(let i=1; i <= suitsB; i++){
        for(let j=1; j <= valuesB; j++){

            // create a new object 
            let card = {suit: i, value: j};
            deck.push(card);
        }
    }
    */

    let cards = 52;
    for (let value = 1; value <= cards; value++){
        deck.push(value);
    }

    return deck;
}

let test = createDeck();

function shuffleDeck(deck){

    for(let i = deck.length - 1; i > 0; i--){

        let card1 = Math.floor((Math.random() * i));
        let card2 = deck[i];

        deck[i] = deck[card1];
        deck[card1] = card2;
    }

}

shuffleDeck(test);
console.log(test);

function distributeDeck(deck, playerCount){
    // create arrays equal to the number of players in the game
    let distribution = [];
    for(let player = 1; player <= playerCount; player++){
        distribution.push(new Array);
    }

    // reuse the for loop variables to distribute the cards
    while(deck.length){
        for(let player = 0; player < playerCount; player++){
            
            // check the last card in the deck
            let lastCard = deck[deck.length-1];
            console.log(lastCard);

            // add the last card in the deck (the top card) to the first player
            distribution[player].push(lastCard);

            // remove the last card from the deck
            deck.pop();
        }
    }
    return distribution;
}

let game = distributeDeck(test, 4);
console.log(game);