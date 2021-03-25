"use strict"
//import React from "react";

class Deck {
    constructor(){
        this.deck = [];
        this.reset();
        this.shuffle();
    }

    reset(){
        this.deck = [];

        const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

        for (let su of suits) {
            for (let val of values) {
                let card = {Value: val, Suit: su};
                this.deck.push(card);
            }
        }
    }

    shuffle() {
        const { deck } = this;
        let m = deck.length, i;

        while(m){
            i = Math.floor(Math.random() * m--);

            [deck[m], deck[i]] = [deck[i], deck[m]];
        }
        return this;
    }

    deal(){
        return this.deck.pop();
    }

}

const d1 = new Deck();
console.log(d1.deal());
