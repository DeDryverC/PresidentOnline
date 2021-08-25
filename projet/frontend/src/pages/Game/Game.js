import React, { Component } from "react";
import { Button, Row, Col, Container, Alert, Image, Table } from 'react-bootstrap';
import Carte from '../../components/Carte'
import io, { Socket } from "socket.io-client";
import Chatbox from '../../components/ChatSocket/Chatbox'


/* Game.js

Auth: Cédric De Dryver
last update: 05/08/2021


PREAMBULE DOCUMENTATION

Ce fichier est loin d'etre optimisé a 100%, mais le travail fait ici a pris enormement de temps, et j'ai coder étape par étape du jeu, certaines choses peuvent etre regrouper
ou etre plsu concis, mais j'ai peur en changeant beaucoup de chose que je prenne beaucoup de temps pour reharmoniser tout et que ça marche aussi bien que maintenant,
donc l'ordre des fonction, variables globales n'ont pas vraiment de sens.

Bonne chance pour vous y retrouver.
*/


/* KNOWNS BUGS :
-> Token après qu'un joueur n'ai plus de carte, le token n'attend pas les 5 secondes pour s'actualiser
-> Le tour se fini parfois sans que une condition de fin de tour soit validé
[FIXED?]-> Après une relance de partie, plusieurs joueurs on un token de jeu 
-> si un joueur n'as plus qu'un 2 dans sa main, il ne peut rien faire et la partie ne peut etre terminée.
            
*/
let gameSocket

class Game extends Component {

    constructor() {
        super();

        /*********** Global Variables ***********/

        this.state = {
            /* 
            Les variables booléennes servent a afficher / ou pas certaines choses
            Les variables les plus utiles sont :
            - playerToken : (int-boolean) (permet de jouer ou non)
            - countTurn :  (int) compte le nombre de tour (permet de redonner le contexte d'une partie si deconnexion/ refresh de page
            - countPass :  (int) compte le nombre de fois que le bouton pass est activé a la suite (permet de finir un tour si le nbr de joueur-1 = countPass))
            - countRound:  (int) compte le nombre de Round (determine si le token revient au joueur qui possède la dame de ♡ au début d'une partie)
            - ownRank : (str) determine le rang du joueur local a la fin d'une partie
            - selectedCard : (Array) tableau des cartes selectionnées (selon leurs IDs et pas leurs valeur)
            - errorMessage : (Object) permet d'afficher un message en dessous de la pile (voir bootstrap Alert et a fonction locale isThereErrorMessage)
            - gameId : (str) Id de la partie actuelle
            - currentPlayer : (str) nom du joueur actuel
            - potHistory : (Array) Historique entier de la pile d'une partie ('000:000' signifie une fin de tour.)
            - winnerList : (Array) Tableau des gagnants pas forcement ordonnée
            - finalList : (Array) jeu de mot drole, tableau des gagnants forcément ordonné selon leurs ordre (President, vice pré, neutre, vice beggar, beggar)
            - readyList : (Array) liste des joueurs pret a relancer une partie
            - currentPlayerFinished : (Bool) permet de savoir si le joueur a terminer afin de desactiver l'interface des cartes / boutons pour jouer.
            - previousPlayerBeforePass: (str) nom du joueur qui a jouer avant un joueur qui passe (permet de definir que c'est lui qui termine le round si tout le monde passe son tour)
            - everyoneFinished : (Bool) permet de savoir si tt les joueurs ont fini afin de remplacer la pile par le tableau classement final de la partie.
            - isReady: (Bool) determine si le joueur local est pret pour relancer
            - cardExchange : (Bool) determine si le joueur local est en phase d'échange (en cas de relance de partie, ils echangent leurs cartes selon leurs titre respectif.)
            - playerTraded : (Bool) desactive les options d'echange de carte quand ils ont fini leurs échange ou quand le joueur n'a pas besoin d'échanger.
            - readyExlist : (Array) liste des joueurs qui ont fini leurs échanges, permet de lancer la partie quand tout les joueurs ont échanger.
            - exNum: (int) sert pas a grand chose mais je savais pas si cette variable allait etre utile autre part, determine le nombre de joueurs qui doivent échanger leurs cartes.
            - titleList : (Array) Liste des titre pour le classement, pas besoin d'etre une variable globale
            */

            playerToken: 0,
            countTurn: 0,
            countPass: 0,
            countRound: 0,
            ownRank: 0,
            selectedCard: [],
            switcher: false,
            errorMessage: { type: null, title: null, message: null, variant: null },
            game_id: localStorage.getItem('gameId'),
            currentUser: localStorage.getItem('pseudo'),
            potHistory: [],
            winnerList: [],
            finalList: [{ user: '' }],
            readyList: [],
            currentPlayerFinished: false,
            previousPlayerBeforePass: undefined,
            everyoneFinished: false,
            isReady: false,
            cardExchange: false,
            playerTraded: false,
            readyExList: [],
            exNum: 4,
            titleList: ['President', 'Vice-President', '', 'Vice-Beggar', 'Beggar'],

            /*
            Game modifiers
            - isEightTrue : (Bool) default false, determines if an 8 card ends the turn
            - isRevTrue: (Bool) default false, determines if 4 cards of the same value reverse card strength

            - toggleRev: (Bool) default false, reverse card strength if true 
            */
           isEightTrue: localStorage.getItem('isEightTrue'),
           isRevTrue: localStorage.getItem('isRevTrue'),
           toggleRev: false,

            /* --- socket io ---
            
            Configuration de la librairie socket.io
            */
            connectionConfig: {
                "force new connection": true,
                "reconnectionAttemps": "Infinity",
                "timeout": 10000,
                "transports": ["websocket"]
            },
            endpoint: 'localhost:5002',

            /*  --- RAW DATA --- 
            
            Pas utile mais j'ai peur de casser qqch si je l'enleve
            Outils de debug
            */
            playersData: null,
            data: null,

            /* --- PLAYERS --- 
            
            Donnees des autres joueurs
            */
            nextStarter: '',
            unordList: [],
            ordList: [],
            plList: [],
            tokenList: [],
            players: [],
            player1: { pseudo: null, cards: [], finish: false, connected: false },
            player2: { pseudo: null, cards: [], finish: false, connected: false },
            player3: { pseudo: null, cards: [], finish: false, connected: false },
            player4: { pseudo: null, cards: [], finish: false, connected: false },
            player5: { pseudo: null, cards: [], finish: false, connected: false },
            checkDuplicateRequest: false,

            /* --- STYLE --- 
            
            code CSS majoritairement utilisé dans le render()
            */
            defStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
            cardStyle: { border: '2px solid red', borderRadius: '10px', },

            /* --- VISIBLE CARDS ---
            
            - pile : (Array) cartes dans la pile actuelle (pas dans l'historique)
            - playerCard : (Array) carte du joueur local, dans la section interactions
            */
            pile: [],
            playerCard: [],

            /* List of all card, refers to their .png */
            cardList: {
                ace: ['1', '14', '27', '40'],
                two: ['2', '15', '28', '41'],
                three: ['3', '16', '29', '42'],
                four: ['4', '17', '30', '43'],
                five: ['5', '18', '31', '44'],
                six: ['6', '19', '32', '45'],
                seven: ['7', '20', '33', '46'],
                eight: ['8', '21', '34', '47'],
                nine: ['9', '22', '35', '48'],
                ten: ['10', '23', '36', '49'],
                jack: ['11', '24', '37', '50'],
                queen: ['12', '25', '38', '51'],
                king: ['13', '26', '39', '52'],

            }

        }
        /* Initialisation du websocket */
        gameSocket = io(this.state.endpoint, this.state.connectionConfig)

    }

    /********************** Game Function **********************/

    /* -- whatCardIs --

    TEST UNITAIRE

    PARAMS:
        - num : (INT) Id de la carte

    retourne la valeur et le signe de la carte selon son ID, dans cet ordre 'ID:SIGNE'
    les signes :  's'=> spades, 'h' => heart, 'c' => club, 'd' => diamond
    ATTENTION: pour l'as et le 2, les valeurs sont modifier pour simplifier la comparaison des cartes 
    comme le 2 est avant l'as et l'as avant les autres, il est plus simple de leurs donner des grandes 
    valeurs ici quand dans les fonctions qui utilise cette fonction)
    */
    whatCardIs = (num) => {
        // RETURN -1 IF NOT
        if (this.state.cardList.ace.indexOf(String(num)) !== -1) {
            switch (this.state.cardList.ace.indexOf(String(num))) {
                case 0: return '15:s';
                case 1: return '15:h';
                case 2: return '15:c';
                case 3: return '15:d';
                default: return 0;
            }
        } else if (this.state.cardList.two.indexOf(String(num)) !== -1) {
            switch (this.state.cardList.two.indexOf(String(num))) {
                case 0: return '20:s';
                case 1: return '20:h';
                case 2: return '20:c';
                case 3: return '20:d';
                default: return 0;
            }
        } else if (this.state.cardList.three.indexOf(String(num)) !== -1) {
            switch (this.state.cardList.three.indexOf(String(num))) {
                case 0: return '3:s';
                case 1: return '3:h';
                case 2: return '3:c';
                case 3: return '3:d';
                default: return 0;
            }
        } else if (this.state.cardList.four.indexOf(String(num)) !== -1) {
            switch (this.state.cardList.four.indexOf(String(num))) {
                case 0: return '4:s';
                case 1: return '4:h';
                case 2: return '4:c';
                case 3: return '4:d';
                default: return 0;
            }
        } else if (this.state.cardList.five.indexOf(String(num)) !== -1) {
            switch (this.state.cardList.five.indexOf(String(num))) {
                case 0: return '5:s';
                case 1: return '5:h';
                case 2: return '5:c';
                case 3: return '5:d';
                default: return 0;
            }
        } else if (this.state.cardList.six.indexOf(String(num)) !== -1) {
            switch (this.state.cardList.six.indexOf(String(num))) {
                case 0: return '6:s';
                case 1: return '6:h';
                case 2: return '6:c';
                case 3: return '6:d';
                default: return 0;
            }
        } else if (this.state.cardList.seven.indexOf(String(num)) !== -1) {
            switch (this.state.cardList.seven.indexOf(String(num))) {
                case 0: return '7:s';
                case 1: return '7:h';
                case 2: return '7:c';
                case 3: return '7:d';
                default: return 0;
            }
        } else if (this.state.cardList.eight.indexOf(String(num)) !== -1) {
            switch (this.state.cardList.eight.indexOf(String(num))) {
                case 0: return '8:s';
                case 1: return '8:h';
                case 2: return '8:c';
                case 3: return '8:d';
                default: return 0;
            }
        } else if (this.state.cardList.nine.indexOf(String(num)) !== -1) {
            switch (this.state.cardList.nine.indexOf(String(num))) {
                case 0: return '9:s';
                case 1: return '9:h';
                case 2: return '9:c';
                case 3: return '9:d';
                default: return 0;
            }
        } else if (this.state.cardList.ten.indexOf(String(num)) !== -1) {
            switch (this.state.cardList.ten.indexOf(String(num))) {
                case 0: return '10:s';
                case 1: return '10:h';
                case 2: return '10:c';
                case 3: return '10:d';
                default: return 0;
            }
        } else if (this.state.cardList.jack.indexOf(String(num)) !== -1) {
            switch (this.state.cardList.jack.indexOf(String(num))) {
                case 0: return '11:s';
                case 1: return '11:h';
                case 2: return '11:c';
                case 3: return '11:d';
                default: return 0;
            }
        } else if (this.state.cardList.queen.indexOf(String(num)) !== -1) {
            switch (this.state.cardList.queen.indexOf(String(num))) {
                case 0: return '12:s';
                case 1: return '12:h';
                case 2: return '12:c';
                case 3: return '12:d';
                default: return 0;
            }
        } else if (this.state.cardList.king.indexOf(String(num)) !== -1) {
            switch (this.state.cardList.king.indexOf(String(num))) {
                case 0: return '13:s';
                case 1: return '13:h';
                case 2: return '13:c';
                case 3: return '13:d';
                default: return 0;
            }
        } else if (String(num) === "000:000") {
            return '000:000'
        }
    }

    /* --- startAnothrGame --- 
    
    Permet de relancer une partie (le gagnant de la precedante partie a le privilège de relancer si tout le monde est pret.)
    
    socket: [ASYNC] 'sendDataHistory': 
        -> /history/set : (tout les $joueurs, selon leurs $positions)
        -> /toggle/ : (remplace le token de tout les $joueurs a 0 (en théorie))[BUGS]
        -> /rank/ : (remplace le rank de tout les $joueurs a $'0')
        -> /deck/wipe : 2fois, une pour le potHistory et une seconde pour le deck du $gameId
        -> /lobby/ : reprend les informations du lobby pour recreer le deck
        -> /deck/ : redistribue les cartes selons les informations du lobby
    */
    startAnothrGame = () => {
        let p1 = this.state.player1
        let p2 = this.state.player2
        let p3 = this.state.player3
        let p4 = this.state.player4
        let p5 = this.state.player5

        p1.finish = false
        p2.finish = false
        p3.finish = false
        p4.finish = false
        p5.finish = false
        this.setState({ player1: p1, player2: p2, player3: p3, player4: p4, player5: p5, cardExchange: true, currentPlayerFinished: false })
        gameSocket.emit('sendDataHistory', this.state.finalList)
    }

    /* -- rdyForAnthrGame --
    
    Permet de mettre le joueur local en mode pret pour relancer une partie.
    La requete toggle le token de la table lobby a 1.
    
    */
    rdyForAnthrGame = () => {
        if (this.state.isReady === false) {
            gameSocket.emit('readyAnother', this.state.currentUser)
            this.setState({ isReady: true })
        } else {
            gameSocket.emit('notReadyAnother', this.state.currentUser)
            this.setState({ isReady: false })
        }
    }

    /* -- isRoundOver --

    Verifie si le round est terminé (par rapport aux règles)
    */

    isRoundOver = () => {
        const cardsPile = this.state.pile
        const selCard = this.state.selectedCard
        const cardsNum = this.pileTypeCard(selCard)
        const ssc = this.sameSelectedCard()
        const eight = this.state.isEightTrue
        const rev = this.state.isRevTrue
        const historyPile = this.state.potHistory
        const numHistPile = []
        for (let i = 0; i < selCard.length; i++) {
            historyPile.push(selCard[i])
        }
        for (let i = 0; i < historyPile.length; i++) {
            numHistPile.push(this.pileTypeCard(historyPile[i]))
        }
        const reversedHistPile = numHistPile.reverse()
        if (reversedHistPile[0] === reversedHistPile[1] && reversedHistPile[1] === reversedHistPile[2] && reversedHistPile[2] === reversedHistPile[3]) {
            return true 
        }
        if (selCard.length === 4) {
            /*
                if the revolution mod is active
                every four cards played flips card strength
            */
            if(rev){
                this.toggleRevolution()
            }
            return true
        }
        if (cardsNum === 20) {
            return true
        }
        /*
        if Eight Stop is enabled, any eight played stops the round
        */
        if (ssc === 8 && eight){
            return true
        }
        return false
    }

    /* -- ShowCard --
    
    Permet de mettre une bordure rouge autour des cartes dans l'inferface utilisateur.
    */
    showCard = (card) => {
        if (this.state.selectedCard.indexOf(card) === -1) {
            this.setState(state => {
                const selectedCard = state.selectedCard.concat(card)
                return {
                    selectedCard,
                };
            })
        } else {
            var selectedCard = [...this.state.selectedCard]
            const index = this.state.selectedCard.indexOf(card);
            selectedCard.splice(index, 1)
            this.setState({ selectedCard: selectedCard })
        }
        return 0;
    }


    /* -- orderList --

    TEST UNITAIRE

    Permet de réindexer la liste (qui se trouve de base dans l'ordre d'arrivée des joueurs dans le lobby) et permet de
    mettre le joueur local au début de la liste.

    ex : si joueur local: 'Seldric' et la liste ['andrelacastagne', 'poulna', 'Seldric', 'RoulBe']
    return => ['Seldric','RoulBe','andrelacastagne','poulna']    
    */
    orderList = (list, index) => {
        let copyList = list.slice()
        let slicedList = []
        for (let i = 0; i < index; i++) {
            slicedList = copyList.slice(1)
            slicedList.push(copyList[0])
            copyList = slicedList.slice()
        }
        return copyList;
    }

    /* -- generatePlayerData --
    
    
    Fonction qui initialise toutes les valeurs globale, les cartes etc...

    Permet de lancer la partie, ou de remmettre les valeurs d'une game en cours si il y a eu déconnexion ou refresh de page

    Trop complexe a detailler.
    */
    generatePlayersData = () => {

        const unList = this.state.unordList;
        const user = this.state.currentUser;
        const winList = this.state.winnerList
        let orderedList = this.orderList(unList, unList.indexOf(user))
        let placementList = orderedList.slice(1)
        let indexList = []
        this.setState({ ordList: orderedList, plList: placementList })




        const players = this.state.players
        /*EG
        (3) [Array(2), Array(2), Array(2)]
        0: (2) ["andrelacastagne", 13]
        1: (2) ["poulna", 13]
        2: (2) ["RoulBe", 13]
        length: 3
        __proto__: Array(0)*/
        const p1 = this.state.player1
        const p2 = this.state.player2
        const p3 = this.state.player3
        const p4 = this.state.player4
        const p5 = this.state.player5
        if (placementList.length === players.length) {
            for (let j = 0; j < placementList.length; j++) {
                for (let i = 0; i < players.length; i++) {
                    if (players[i][0] === placementList[j]) {
                        indexList.push(i)
                    }
                }
            }
        }
        else {
            console.log('ERREUR')
        }
        // Player1 devient player2 selon l'ordre d'affichage
        // ( ordre de base )
        //       [ 1 ]                                   [ 2 ]                           [ 3 ]                           [ 3 ]  
        //  [ 2 ]     [ 3 ]   => si 4 joueurs =>    [ 1 ]     [ 3 ] => 5joueurs =>  [ 2 ]     [ 4 ] => 6joueurs =>  [ 2 ]     [ 4 ]
        //  [ 4 ]     [ 5 ]                         [ / ]     [ / ]                 [ 1 ]     [ / ]                 [ 1 ]     [ 5 ]
        if (placementList.length === 3) {
            if (p2.finish === true) {
                p2.cards.push(0)
            }
            else {
                p2.pseudo = players[indexList[0]][0]
                if (winList.includes(p2.pseudo)) {
                    p2.finish = true;
                    p2.cards.push(0)
                }
                else {
                    for (let i = 0; i < players[indexList[0]][1]; i++) { p2.cards.push(0) }
                }
            }
            if (p1.finish === true) {
                p1.cards.push(0)
            }
            else {
                p1.pseudo = players[indexList[1]][0]
                if (winList.includes(p1.pseudo)) {
                    p1.finish = true;
                    p1.cards.push(0)
                }
                else {
                    for (let i = 0; i < players[indexList[1]][1]; i++) { p1.cards.push(0) }
                }
            }
            if (p3.finish === true) {
                p3.cards.push(0)
            }
            else {
                p3.pseudo = players[indexList[2]][0]
                if (winList.includes(p3.pseudo)) {
                    p3.finish = true;
                    p3.cards.push(0)
                }
                else {
                    for (let i = 0; i < players[indexList[2]][1]; i++) { p3.cards.push(0) }
                }
            }
        }
        else if (placementList.length >= 4) {
            if (p4.finish === true) {
                p4.cards.push(0)
            }
            else {
                p4.pseudo = players[indexList[0]][0]
                if (winList.includes(p4.pseudo)) {
                    p4.finish = true;
                    p4.cards.push(0)
                }
                else {
                    for (let i = 0; i < players[indexList[0]][1]; i++) { p4.cards.push(0) }

                }
            }
            if (p2.finish === true) {
                p2.cards.push(0)
            }
            else {
                p2.pseudo = players[indexList[1]][0]
                if (winList.includes(p2.pseudo)) {
                    p2.finish = true;
                    p2.cards.push(0)
                }
                else {
                    for (let i = 0; i < players[indexList[1]][1]; i++) { p2.cards.push(0) }
                }
            }
            if (p1.finish === true) {
                p1.cards.push(0)
            }
            else {
                p1.pseudo = players[indexList[2]][0]
                if (winList.includes(p1.pseudo)) {
                    p1.finish = true;
                    p1.cards.push(0)
                } else {
                    for (let i = 0; i < players[indexList[2]][1]; i++) { p1.cards.push(0) }
                }
            }
            if (p3.finish === true) {
                p3.newCardsNum.push(0)
            }

            else {
                p3.pseudo = players[indexList[3]][0]
                if (winList.includes(p3.pseudo)) {
                    p3.finish = true;
                    p3.cards.push(0)
                }
                else {
                    for (let i = 0; i < players[indexList[3]][1]; i++) { p3.cards.push(0) }
                }
            }
        }
        if (placementList.length === 5) {
            if (p5.finish === true) {
                p5.cards.push(0)
            }
            else {
                p5.pseudo = players[indexList[4]][0]
                if (winList.includes(p5.pseudo)) {
                    p5.finish = true;
                    p5.cards.push(0)
                }
                else {
                    for (let i = 0; i < players[indexList[4]][1]; i++) { p5.cards.push(0) }
                }
            }
        }
        let evFinished
        if (winList.length === orderedList.length) {
            evFinished = true
            const tokList = this.state.tokenList
            let isRdy = this.state.isReady
            let wtList = []
            for (let i = 0; i < tokList.length; i++) {
                if (tokList[i].token === 1) {
                    if (tokList[i].user === this.state.currentUser) {
                        isRdy = true
                    }
                    wtList.push(tokList[i].user)
                }
            }
            this.setState({ readyList: wtList, isReady: isRdy })
            gameSocket.emit('refreshEOG', this.state.game_id)

        }
        else {
            evFinished = false
        }
        this.setState({ player1: p1, player2: p2, player3: p3, player4: p4, player5: p5, ordList: orderedList, plList: placementList, indList: indexList, everyoneFinished: evFinished })
    }

    /* -- updatePlayersData --
    
    Permet de reupdate le pot quand qqun vient de jouer
    
    */
    updatePlayersData = (players) => {
        const p1 = this.state.player1
        const p2 = this.state.player2
        const p3 = this.state.player3
        const p4 = this.state.player4
        const p5 = this.state.player5
        const placementList = this.state.plList
        const indexList = []

        p1.cards = []
        p2.cards = []
        p3.cards = []
        p4.cards = []
        p5.cards = []

        if (placementList.length === players.length) {
            for (let j = 0; j < placementList.length; j++) {
                for (let i = 0; i < players.length; i++) {
                    if (players[i][0] === placementList[j]) {
                        indexList.push(i)
                    }
                }
            }
        }
        else {
            console.log('ERREUR')
        }
        if (placementList.length === 3) {
            for (let i = 0; i < players[indexList[0]][1]; i++) { p2.cards.push(0) }
            for (let i = 0; i < players[indexList[1]][1]; i++) { p1.cards.push(0) }
            for (let i = 0; i < players[indexList[2]][1]; i++) { p3.cards.push(0) }
        }
        else if (placementList.length >= 4) {
            for (let i = 0; i < players[indexList[0]][1]; i++) { p4.cards.push(0) }
            for (let i = 0; i < players[indexList[1]][1]; i++) { p2.cards.push(0) }
            for (let i = 0; i < players[indexList[2]][1]; i++) { p1.cards.push(0) }
            for (let i = 0; i < players[indexList[3]][1]; i++) { p3.cards.push(0) }
        }
        if (placementList.length === 5) {
            for (let i = 0; i < players[indexList[4]][1]; i++) { p5.cards.push(0) }
        }
        this.setState({ players: players, player1: p1, player2: p2, player3: p3, player4: p4, player5: p5 })
    }


    /* -- resetError --
    
    permet d'enlever le message qui apparait en dessous de la pile.
    */
    resetError = () => {
        const error = { type: null, title: null, message: null, variant: null }
        this.setState({ errorMessage: error })
    }
    /* -- pileTypeCard --
    
    TEST UNITAIRE

    permet d'envoyer la valeur de la carte qui se trouve dans la pile (pour checker si on peut jouer par dessus ou non)
    ATTENTION : Certaines valeurs sont en int :(2: 20, as: 15 ,roi: 13, dame: 12, valet: 11)
    */
    pileTypeCard = (rawpile) => {
        const pile = rawpile
        if (pile.length === 0) {
            return -1
        }
        else {
            const numPile = this.whatCardIs(pile[0]).split(':')
            if (numPile[0] === 0) {
                return 10
            }
            else {
                return Number(numPile[0])
            }
        }
    }

    /* -- sameSelectedCard --
    
    Permet de verifier si les cartes selectionnées dans l'interface utilisateur sont bien de la meme valeur,

    sinon retourne -1
    */
    sameSelectedCard = () => {
        var selCard = this.state.selectedCard
        var len = selCard.length
        var prev1 = this.whatCardIs(selCard[0]).split(':')
        var prev = prev1[0]
        if (len === 1) {
            return Number(prev)
        }
        else {

            for (let i = 0; i < len; i++) {
                const actual = this.whatCardIs(selCard[i]).split(':')
                if (prev !== actual[0]) {
                    return -1
                }
                prev = actual[0]
            }
            return Number(prev)
        }
    }

    /* -- canHeStart --
    
    Permet de donner le droit de jouer au joueur qui possède la dame de ♡ 
    Ne fonctionne pas si l'historique de la pile n'est pas vide.

    */
    canHeStart() {
        if (this.state.countRound < 1) {
            const currUser = localStorage.getItem('Pseudo')
            if (this.state.playerCard.indexOf('25') !== -1 && this.state.checkDuplicateRequest === false) {
                this.setState({ playerToken: 1, checkDuplicateRequest: true })
                gameSocket.emit('startPlaying', { user: currUser })
            }
        }
    }

    /* -- toggleRevolution

    When triggered, reverse card strength with 3 being the strongest and 2 being the weakest

    */
    toggleRevolution(){
        if (this.state.playerToken === 1) {
            const revolution = { type: 'finish', title: 'Revolution', message: 'Revolution! You flipped the card strength!', variant: ''}
            this.setState(toggleRev, !toggleRev)

        } else {
            const error = { type: 'Not your turn', title: 'You cant play now', message: 'Its not your turn, wait for it.', variant: '' }
            this.setState({ errorMessage: error })
        }
    }

    /* -- canHePlay -- 
    
    Permet de determiner si le joueur peut jouer les cartes séléctionner ou pas ( depends des règles misent de base.)
    */
    canHePlay = () => {
        if (this.state.playerToken === 1) {
            const actualPile = this.state.pile
            //const playerCard = this.state.playerCard.
            const selCard = this.state.selectedCard
            const ssc = this.sameSelectedCard()
            const ptc = this.pileTypeCard(this.state.pile)
            const eight = this.state.isEightTrue
            const canRev = this.state.isRevTrue
            const rev = this.state.toggleRev
            if (actualPile.length > selCard.length && ssc !== 20) {
                const error = { type: 'rules', title: 'You cannot play this', message: 'You cannot play fewer cards than there are in the pile', variant: 'danger' }
                this.setState({ errorMessage: error })
            }
            else if (ssc === -1 && ssc !== 20) {
                const error = { type: 'rules', title: 'You cannot play this', message: 'You cannot play two cards of different value', variant: 'danger' }
                this.setState({ errorMessage: error })
            /*
                this is default checking of card value if it's greater than previous cards played
            */
            } else if (ssc < ptc && ssc !== 20) {
                const error = { type: 'rules', title: 'You cannot play this', message: 'You cannot play one or more cards smaller than those in the pile', variant: 'danger' }
                this.setState({ errorMessage: error })
            } 
            /*
            only if Revolution is enabled for this game
            this will check if the cards played are smaller than previously played cards
            and also if the player is not playing 3s (which in Revolution is the strongest card)
            */
            else if (rev === true && ssc > ptc && ssc !== 3) {
                const error = { type: 'rules', title: 'You cannot play this', message: 'You cannot play one or more cards bigger than those in the pile', variant: 'danger' }
                this.setState({ errorMessage: error })
            }
            else if (actualPile.length - 1 > selCard.length && ssc === 20) {
                const error = { type: 'rules', title: 'You cannot play this', message: 'You need an extra 2 if you want to cut a series of 3 cards', variant: 'danger' }
                this.setState({ errorMessage: error })
            }
            else if (this.state.countTurn === 0 && ssc === 20) {
                const error = { type: 'rules', title: 'You cannot play this', message: 'You cant start with a 2.', variant: 'danger' }
                this.setState({ errorMessage: error })
            }
            else if(selCard.length === 4 && canRev === true){

            }
            /* 
                only if Eight Stop is enabled for this game
                check if card or cards played consist of 8s
                if yes, stop the round
            */
             else {
                const checkEOR = this.isRoundOver()

                if (checkEOR === true) {
                    const user = this.state.currentUser
                    const msg = { type: 'turn', title: 'Fin du round', message: `Fin du round, début du prochain round dans : 5`, variant: 'danger' }
                    this.delSelectedCard()
                    this.changePile(selCard, ssc)
                    this.setState({ errorMessage: msg, playerToken: 4, countTurn: 0 })
                    gameSocket.emit('endOfRound', user)
                }
                else {
                    const message = { type: 'finish', title: 'You just played', message: 'Wait for your turn.', variant: 'success' }


                    const user = this.state.currentUser
                    let counter = this.state.countTurn
                    counter++;
                    this.setState({ errorMessage: message, playerToken: 0, countTurn: counter })
                    const indexNextUser = this.state.ordList.indexOf(this.state.currentUser)
                    const nextUser = this.state.ordList[indexNextUser + 1]
                    gameSocket.emit('finishTurn', nextUser)

                    this.delSelectedCard()
                    this.changePile(selCard, ssc)
                }
            }

        }
        else {
            const error = { type: 'Not your turn', title: 'You cant play now', message: 'Its not your turn, wait for it.', variant: '' }
            this.setState({ errorMessage: error })
        }

    }

    /* -- changePile --
    
    Permet de changer la carte dans la pile ( je ne sais plus pourquoi j'ai fais un if else comme ça)
    */
    changePile = (newCards, newCardsNum) => {

        if (this.isRoundOver(newCards, newCardsNum) === false) {
            const game_id = this.state.game_id
            gameSocket.emit('chgpile', { newcds: newCards, gid: game_id })
        }
        else {
            //switch socke
            const game_id = this.state.game_id
            gameSocket.emit('chgpile', { newcds: newCards, gid: game_id })
        }

    }
    /* -- startingNextTurn -- 

    Permet de lancer le prochain tour ( compte a rebours de 5secondes )
    */
    startingNextTurn = async () => {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        if (this.state.playerToken === 4) {
            let count = 5
            gameSocket.emit('resetPile', count)
            while (count !== 0) {
                let msg = { type: 'turn', title: 'Fin du round', message: `Fin du round, début du prochain round dans : ${count}`, variant: 'danger' }
                this.setState({ errorMessage: msg })
                await delay(1000)
                count--
            }
            const newPile = []
            const msg = { type: 'start', title: 'La partie a recommencé', message: `Vous avez fini le dernier tours, a vous de jouer.`, variant: 'info' }
            this.setState({ errorMessage: msg, pile: [], playerToken: 1, countPass: 0, countTurn: 0 })

        } else {
            let count = 5
            const nextStart = this.state.nextStarter
            while (count !== 0) {
                let msg = { type: 'turn', title: 'Fin du round', message: `${nextStart} vient de cloturer le round, début du prochain round dans : ${count} secondes`, variant: 'danger' }
                this.setState({ errorMessage: msg })
                await delay(1000)
                count--
            }

            const newPile = []
            const msg = { type: 'start', title: 'La partie a recommencé', message: `${nextStart} a fini le dernier tours, a lui de jouer.`, variant: 'info' }
            this.setState({ errorMessage: msg, pile: newPile, countPass: 0, countTurn: 0 })
        }
    }

    /* -- passTheTurn --
    
    Fonction pour passer le tour si on ne sait pas jouer
    Si il ya X* nombre de joueurs qui passent le tour, cela fait gagner le tour a celui qui a jouer en dernier
    *: nombre de joueur de la partie -1  
    */
    passTheTurn = () => {


        const message = { type: 'finish', title: 'You just pass your turn', message: 'Wait for your turn.', variant: 'warning' }

        let counter = this.state.countTurn
        let counterPass = this.state.countPass

        if (counter < 1) {
            const message = { type: 'rules', title: 'You cant pass your turn', message: 'You cant pass when you are the 1st to play.', variant: 'danger' }
            this.setState({ errorMessage: message })
        }
        else {
            if (this.state.previousPlayerBeforePass === undefined) {
                counter++;
                counterPass++;
                this.setState({ errorMessage: message, playerToken: 0, countTurn: counter, countPass: counterPass })
                const indexNextUser = this.state.ordList.indexOf(this.state.currentUser)
                const nextUser = this.state.ordList[indexNextUser + 1]
                let prevUser
                if ((indexNextUser - 1) === -1) {
                    prevUser = this.state.ordList[Number(this.state.ordList.length) - 1]
                }
                else {
                    prevUser = this.state.ordList[Number(indexNextUser) - 1]
                }

                gameSocket.emit('finishTurnPass', { user: nextUser, count: counterPass, winUser: prevUser })
            }
            else {
                counter++;
                counterPass++;
                this.setState({ errorMessage: message, playerToken: 0, countTurn: counter, countPass: counterPass })
                const indexNextUser = this.state.ordList.indexOf(this.state.currentUser)
                const nextUser = this.state.ordList[indexNextUser + 1]
                const prevUser = this.state.previousPlayerBeforePass
                gameSocket.emit('finishTurnPass', { user: nextUser, count: counterPass, winUser: prevUser })
            }
        }
    }

    /* -- isThereErrorMessage --
    
    Affiche un message d'information ou d'alerte en dessous de la box Pile.
    ne fonction que si on renseigne un type.
    */
    isThereErrorMessage = () => {
        if (this.state.errorMessage.type === 'rules') {
            return (
                <Row style={this.state.defStyle}>
                    <Alert variant={this.state.errorMessage.variant}>
                        <Alert.Heading>{this.state.errorMessage.title}</Alert.Heading>
                        {this.state.errorMessage.message}
                        <br />Check the rules for more informations
                    </Alert>
                </Row>
            )
        } else if (this.state.errorMessage.type === 'finish') {
            return (
                <Row style={this.state.defStyle}>
                    <Alert variant={this.state.errorMessage.variant} onClose={() => this.resetError()} dismissible>
                        <Alert.Heading>{this.state.errorMessage.title}</Alert.Heading>
                        {this.state.errorMessage.message}
                    </Alert>
                </Row>
            )
        } else if (this.state.errorMessage.type === 'token') {
            return (
                <Row style={this.state.defStyle}>
                    <Alert variant={this.state.errorMessage.variant} onClose={() => this.resetError()} dismissible>
                        <Alert.Heading>{this.state.errorMessage.title}</Alert.Heading>
                        {this.state.errorMessage.message}
                    </Alert>
                </Row>
            )
        } else if (this.state.errorMessage.type === 'turn') {
            return (
                <Row style={this.state.defStyle}>
                    <Alert variant={this.state.errorMessage.variant} onClose={() => this.resetError()} dismissible>
                        <Alert.Heading>{this.state.errorMessage.title}</Alert.Heading>
                        {this.state.errorMessage.message}
                    </Alert>
                </Row>
            )
        } else if (this.state.errorMessage.type === 'start') {
            return (
                <Row style={this.state.defStyle}>
                    <Alert variant={this.state.errorMessage.variant} onClose={() => this.resetError()} dismissible>
                        <Alert.Heading>{this.state.errorMessage.title}</Alert.Heading>
                        {this.state.errorMessage.message}
                    </Alert>
                </Row>
            )
        } else if (this.state.errorMessage.type === 'exchange') {
            return (
                <Row style={this.state.defStyle}>
                    <Alert variant={this.state.errorMessage.variant} onClose={() => this.resetError()}>
                        <Alert.Heading>{this.state.errorMessage.title}</Alert.Heading>
                        {this.state.errorMessage.message}
                    </Alert>
                </Row>
            )
        }

    }

    /* -- isThere4Players --


    Permet d'afficher si il y a 4+ joueurs dans la partie.
    retourne du JSX
    */
    isThere4Players = () => {
        if (this.state.player4.pseudo !== null) {
            return (
                <div>
                    <Row style={this.state.defStyle}>
                        {this.state.player4.finish === true ?
                            <Alert variant='primary'>This player finished at the {this.state.winnerList.indexOf(this.state.player4.pseudo) + 1} place</Alert>
                            :
                            this.state.player4.cards.map((value, key) => {
                                return <Carte num={value} index={key} identity='othercards' />
                            })}
                    </Row>
                    <br />
                    <Row style={this.state.defStyle}>
                        {this.state.player4.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player4.pseudo}</span> : <span></span>}
                    </Row>
                </div>
            )
        } else {
            return (
                <div>
                    <span></span>
                </div>
            )
        }
    }
    /* -- isThere5Players --


    Permet d'afficher si il y a 5 joueurs dans la partie.
    retourne du JSX
    */
    isThere5Players = () => {
        if (this.state.player5.pseudo !== null) {
            return (
                <div>
                    <Row style={this.state.defStyle}>
                        {this.state.player5.finish === true ?
                            <Alert variant='primary'>This player finished at the {this.state.winnerList.indexOf(this.state.player5.pseudo) + 1} place</Alert>
                            :
                            this.state.player5.cards.map((value, key) => {
                                return <Carte num={value} index={key} identity='othercards' />
                            })}
                    </Row>
                    <br />
                    <Row style={this.state.defStyle}>

                        {this.state.player5.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player5.pseudo}</span> : <span></span>}
                    </Row>
                </div>
            )
        } else {
            return (
                <div>
                    <span></span>
                </div>
            )
        }
    }

    /* -- classementRendu --

    PErmet de retourner un classement en JSX qui apparaiteras a la place de la pile
    */
    classementRendu = () => {
        const classement = this.state.finalList
        const title = this.state.titleList
        let rows = []
        for (let i = 0; i < classement.length; i++) {
            rows.push(<tr><td>{i + 1}</td><td>{classement[i].user}</td><td>{title[classement[i].rang - 1]}</td></tr>)
        }
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nickname</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>
        )
    }

    /* -- componentDidMount --
    
    Permet d'écouter toutes les réponses de socketIO du backend
    Il faut ouvrir le fichier server.js pour comprendre les réponses de requete
    */


    componentDidMount() {
        const currUser = this.state.currentUser;
        const gameId = this.state.gameId
        gameSocket.on('connection', function (data) {

        })
        // Requete backend pour savoir les cartes de l'utilisateur local.

        // Join la partie
        gameSocket.emit('join_game', { gid: this.state.game_id, user: this.state.currentUser })

        gameSocket.on('playerList', (sdata) => {
            let rawList = []
            let winList = []
            let tokList = []
            for (let i = 0; i < sdata.length; i++) {
                winList.push('')
            }
            sdata.forEach(({ user, token, rang }) => {
                rawList.push(user)
                tokList.push({ user: user, token: token })
                if (this.state.currentUser === user) {
                    if (rang !== '0') {
                        this.setState({ playerToken: token, currentPlayerFinished: true })
                        winList.splice(Number(rang) - 1, 1, user)
                    }
                    else {
                        winList.splice(winList.length - 1, winList.length)
                    }
                    this.setState({ playerToken: token })
                }
                else if (rang !== '0') {
                    winList.splice(Number(rang) - 1, 1, user)
                } else {
                    winList.splice(winList.length - 1, winList.length)
                }

            })

            if (winList[2] === '') {
                winList.splice(2, 1)
            }
            this.setState({ unordList: rawList, tokenList: sdata, winnerList: winList, tokenList: tokList })
        })
        gameSocket.on('userCard', (sdata) => {
            const json = sdata
            json.forEach(({ user, card }) => {
                this.setState(state => {
                    const playerCard = state.playerCard.concat(card)
                    return {
                        playerCard,
                    };
                }, this.canHeStart)
            })
        })
        // Requete backend pour avoir le nombre de carte des joueurs..
        gameSocket.on('othersCount', (sdata) => {
            const json = sdata
            const players = []
            this.setState({ playersData: json })
            json.forEach(({ user, Ncards }) => {
                const passerelle = []
                passerelle.push(user)
                passerelle.push(Ncards)
                players.push(passerelle)
            })
            this.setState({ players: players }, this.generatePlayersData)
        })

        gameSocket.on('cardsPot', (sdata) => {
            const json = sdata
            json.forEach(({ user, card }) => {
                this.setState(state => {
                    const pile = state.pile.concat(card)
                    return {
                        pile,
                    };
                })
            })
        })

        gameSocket.on('newpile', (sdata) => {
            const newpile = sdata
            this.setState({ pile: newpile })
            gameSocket.emit('requestUpdate', this.state.currentUser)
        })
        gameSocket.on('newRound', (sdata) => {
            const msg = { type: 'turn', title: 'Fin du round', message: `${sdata} vient de cloturer le round, début du prochain round dans : 5 secondes`, variant: 'danger' }
            this.setState({ errorMessage: msg, nextStarter: sdata })
            this.startingNextTurn()
        })
        gameSocket.on('playerdeconnexion', (sdata) => {
            const player = sdata.user;
        })
        gameSocket.on('userPlayed', (sdata) => {


            let counter = this.state.countTurn
            counter++;
            if (sdata === currUser) {
                if (this.state.currentPlayerFinished === true) {
                    const indexNextUser = this.state.ordList.indexOf(this.state.currentUser)
                    const nextUser = this.state.ordList[indexNextUser + 1]
                    gameSocket.emit('finishTurn', nextUser)
                }
                else {
                    const msg = { type: 'turn', title: 'A ton tour', message: `C'est a toi de jouer chef`, variant: 'success' }
                    this.setState({ playerToken: 1, errorMessage: msg })
                }
            }
            if (this.state.previousPlayerBeforePass !== undefined) {
                this.setState({ previousPlayerBeforePass: undefined, countTurn: counter, countPass: 0 })
            }
            else {
                this.setState({ countTurn: counter, countPass: 0 })
            }
            gameSocket.on('needPotHistory', '')
        })
        gameSocket.on('potHist', (sdata) => {
            const countturnjson = sdata.length
            this.setState({ countRound: countturnjson })
        })
        gameSocket.on('deliverHistory', (sdata) => {

            const json = sdata
            const potHisList = []
            json.forEach(({ potHistory }) => {
                potHisList.push(potHistory)
            })
            this.setState({ potHistory: potHisList })

        })
        gameSocket.on('userPassed', (sdata) => {
            let counter = this.state.countTurn
            let counterPass = sdata.count
            const prevUser = sdata.winUser

            counter++;
            if (counterPass >= (this.state.plList.length - this.state.winnerList.length)) {
                if (prevUser === this.state.currentUser) {
                    this.setState({ playerToken: 4 }, this.startingNextTurn)
                }
                else {
                    this.setState({ nextStarter: prevUser }, this.startingNextTurn)
                }
            }
            else if (sdata.user === currUser) {
                if (this.state.currentPlayerFinished === true) {
                    const indexNextUser = this.state.ordList.indexOf(this.state.currentUser)
                    const nextUser = this.state.ordList[indexNextUser + 1]
                    sdata.user = nextUser
                    gameSocket.emit('finishTurnPass', sdata)
                }
                else {
                    const msg = { type: 'turn', title: 'A ton tour', message: `C'est a toi de jouer chef`, variant: 'success' }
                    this.setState({ playerToken: 1, errorMessage: msg })
                }
            }
            this.setState({ countTurn: counter, countPass: counterPass, previousPlayerBeforePass: prevUser })
        })
        gameSocket.on('gameStarted', (sdata) => {
            const msg = { type: 'start', title: 'La partie a commencé', message: `${sdata} dispose de la dame de coeur, il commence la partie`, variant: 'info' }
            this.setState({ errorMessage: msg })
        })
        gameSocket.on('updateCards', (sdata) => {
            const json = sdata
            const players = []
            this.setState({ playersData: json })
            json.forEach(({ user, Ncards }) => {
                const passerelle = []
                passerelle.push(user)
                passerelle.push(Ncards)
                players.push(passerelle)
            })
            this.updatePlayersData(players)
        })
        gameSocket.on('someoneFinished', (sdata) => {
            if (this.state.player1.pseudo === sdata.user) {
                const player = this.state.player1
                player.finish = true;
                this.setState({ player1: player })
            }
            else if (this.state.player2.pseudo === sdata.user) {
                const player = this.state.player2
                player.finish = true;
                this.setState({ player2: player })
            }
            else if (this.state.player3.pseudo === sdata.user) {
                const player = this.state.player3
                player.finish = true;
                this.setState({ player3: player })
            }
            else if (this.state.player4.pseudo === sdata.user) {
                const player = this.state.player4
                player.finish = true;
                this.setState({ player4: player })
            }
            else if (this.state.player5.pseudo === sdata.user) {
                const player = this.state.player5
                player.finish = true;
                this.setState({ player5: player })
            }
            this.setState({ winnerList: sdata.winlist })
        })
        gameSocket.on('endOfGame', (sdata) => {
            sdata.sort(function (a, b) {
                return a.rang - b.rang
            });
            this.setState({ finalList: sdata, everyoneFinished: true, currentPlayerFinished: true })

        })
        gameSocket.on('playerReady', (sdata) => {
            let waitList = this.state.readyList
            waitList.push(sdata)
            this.setState({ readyList: waitList })
        })
        gameSocket.on('playerNotReady', (sdata) => {
            let waitList = this.state.readyList
            waitList.splice(waitList.indexOf(sdata), 1)

            this.setState({ readyList: waitList })
        })

        gameSocket.on('giveCards', (sdata) => {
            const classmnt = this.state.finalList
            let rank;
            this.setState({ selectedCard: [] })
            for (let i = 0; i < classmnt.length; i++) {
                if (classmnt[i].user === this.state.currentUser) {
                    rank = classmnt[i].rang
                }
            }
            if (rank === '1') {
                const msg = { type: 'exchange', title: 'Vous devez donner des cartes ', message: `Vous devez choisir 2 cartes de votre choix a donner au clochard, celui ci vous donnera ses meilleures cartes`, variant: 'info' }
                this.setState({ errorMessage: msg, playerCard: [], ownRank: rank })
                gameSocket.emit('retrieveCards', this.state.currentUser)
            }
            else if (rank === '2') {
                const msg = { type: 'exchange', title: 'Vous devez donner une carte', message: `Vous devez choisir une cartes de votre choix a donner au vice clochard, celui ci vous donnera sa meilleure carte`, variant: 'info' }
                this.setState({ errorMessage: msg, playerCard: [], ownRank: rank })
                gameSocket.emit('retrieveCards', this.state.currentUser)
            }
            else if (rank === '3') {
                const msg = { type: 'exchange', title: 'Vous devez patienter', message: `Vous devez patientez pendant que les autres joueurs s'échangent leurs cartes`, variant: 'info' }
                this.setState({ errorMessage: msg, playerCard: [], ownRank: rank, playerTraded: true })
            }
            else if (rank === '4') {
                this.selBestCards(1)
                const msg = { type: 'exchange', title: 'Vous devez donner une carte', message: `Vous devez confirmer le choix automatique des cartes a donner au vice president, celui ci vous donnera une carte de son choix.`, variant: 'info' }
                this.setState({ errorMessage: msg, playerCard: [], ownRank: rank })
                gameSocket.emit('retrieveCards', this.state.currentUser)
            }
            else if (rank === '5') {
                this.selBestCards(2)
                const msg = { type: 'exchange', title: 'Vous devez donner une carte', message: `Vous devez confirmer le choix automatique des cartes a donner aupresident, celui ci vous donnera deux carte de son choix.`, variant: 'info' }
                this.setState({ errorMessage: msg, playerCard: [], ownRank: rank })
                gameSocket.emit('retrieveCards', this.state.currentUser)
            }

        })
        gameSocket.on('switchCards', (sdata) => {
            const json = sdata
            json.forEach(({ user, card }) => {
                this.setState(state => {
                    const playerCard = state.playerCard.concat(card)
                    return {
                        playerCard,
                    };
                })
            })
            this.setState({ cardExchange: true, everyoneFinished: false })
        })

        gameSocket.on('exchangeRdy', (sdata) => {
            const rdyExList = this.state.readyExList
            rdyExList.push(sdata)
            if (rdyExList.length === this.state.exNum) {
                window.location.reload();
            }
            this.setState({ readyExList: rdyExList })
        })
    }

    /* -- delSelectedCard --
    
    Supprime la/les carte.s sélectionné dans l'interface utilisateur.
    */
    delSelectedCard = () => {
        const selCard = this.state.selectedCard
        const userCards = this.state.playerCard
        if (selCard.length - userCards.length === 0) {
            if (this.state.winnerList.length === 0) {
                let winList = this.state.winnerList
                winList.push(this.state.currentUser)
                this.setState({ currentPlayerFinished: true, winnerList: winList })
                gameSocket.emit('delCardFinish', { gid: this.state.game_id, us: this.state.currentUser, finlist: winList, rank: '1' })
                const indexNextUser = this.state.ordList.indexOf(this.state.currentUser)
                const nextUser = this.state.ordList[indexNextUser + 1]
                gameSocket.emit('endOfRound', nextUser)
            } else {
                if (this.state.winnerList.length === 1) {
                    let winList = this.state.winnerList
                    winList.push(this.state.currentUser)
                    this.setState({ currentPlayerFinished: true, winnerList: winList })
                    gameSocket.emit('delCardFinish', { gid: this.state.game_id, us: this.state.currentUser, finlist: winList, rank: '2' })
                    const indexNextUser = this.state.ordList.indexOf(this.state.currentUser)
                    const nextUser = this.state.ordList[indexNextUser + 1]
                    gameSocket.emit('endOfRound', nextUser)
                }
                else if (this.state.winnerList.length === this.state.unordList.length - 2) {
                    let winList = this.state.winnerList
                    winList.push(this.state.currentUser)
                    const list = this.state.unordList
                    let lastuser

                    for (let i = 0; i < list.length; i++) {
                        if (winList.includes(list[i]) === false) {
                            lastuser = list[i]
                        }
                    }
                    winList.push(lastuser)
                    const sendingData = { vicebeggar: this.state.currentUser, beggar: lastuser, gid: this.state.game_id }
                    gameSocket.emit('gameIsFinished', sendingData)
                    this.setState({ currentPlayerFinished: true, winnerList: winList })
                }
                else if (this.state.winnerList.length >= 2) {
                    let winList = this.state.winnerList
                    winList.push(this.state.currentUser)
                    this.setState({ currentPlayerFinished: true, winnerList: winList })
                    gameSocket.emit('delCardFinish', { gid: this.state.game_id, us: this.state.currentUser, finlist: winList, rank: '3' })
                    const indexNextUser = this.state.ordList.indexOf(this.state.currentUser)
                    const nextUser = this.state.ordList[indexNextUser + 1]
                    gameSocket.emit('endOfRound', nextUser)
                }
            }


        }
        else {
            gameSocket.emit('delcard', { gid: this.state.game_id, us: this.state.currentUser, sc: this.state.selectedCard, usc: userCards })
            gameSocket.on('delcardReturn', (sdata) => {
                const userCard = sdata;
                this.setState({ playerCard: userCard, selectedCard: [] })
            })
        }
    }
    /* -- selBestCards --

    Selectionne les meilleurs cartes pour le beggar et vice beggar lors de l'échange des cartes
    */
    selBestCards = (num) => {
        const pCards = this.state.playerCard
        let selCards = []
        if (num === 1) {
            selCards = ['3']
            for (let i = 0; i < pCards.length; i++) {
                const numPile = this.whatCardIs(pCards[i]).split(':')
                const selPile1 = this.whatCardIs(selCards[0]).split(':')
                if (selPile1[0] >= numPile[0]) {
                    selCards.splice(0, 1, pCards[i])
                }
            }
        }
        else if (num === 2) {
            selCards = ['3', '16']
            for (let i = 0; i < pCards.length; i++) {
                const numPile = this.whatCardIs(pCards[i]).split(':')
                const selPile1 = this.whatCardIs(selCards[0]).split(':')
                const selPile2 = this.whatCardIs(selCards[0]).split(':')
                if (selPile1[0] >= numPile[0]) {
                    selCards.splice(0, 1, pCards[i])
                }
                else if (selPile2[0] <= numPile[0]) {
                    selCards.splice(1, 1, pCards[i])
                }
            }
        }
        this.setState({ selectedCard: selCards })

    }


    /* --giveCards --
    
    Fonction pour échanger les cartes, selon le rang.
    */
    giveCards = () => {
        const selCards = this.state.selectedCard
        const rank = this.state.ownRank
        const winList = this.state.winnerList
        let userCard = this.state.playerCard
        if (rank === '1') {
            if (this.state.selectedCard.length === 2) {
                gameSocket.emit('exchangeCards', { num: 2, pseudo: winList[winList.length - 1], cards: selCards, usr: this.state.currentUser })
                for (let i = 0; i < selCards.length; i++) {
                    const index = userCard.indexOf(selCards[i])
                    userCard.splice(index, 1)
                }
                const msg = { type: 'exchange', title: 'Vous devez patienter', message: `Vous devez patientez pendant que les autres joueurs s'échangent leurs cartes`, variant: 'info' }
                this.setState({ errorMessage: msg, playerCard: userCard, selectedCard: [], playerTraded: true })

            }
            else {
                const msg = { type: 'exchange', title: 'Vous devez choisir 2 cartes ', message: `Vous devez choisir 2 cartes de votre choix a donner au clochard, celui ci vous donnera ses meilleures cartes`, variant: 'danger' }
                this.setState({ errorMessage: msg })
            }

        }
        else if (rank === '2') {
            if (this.state.selectedCard.length === 1) {
                gameSocket.emit('exchangeCards', { num: 1, pseudo: winList[winList.length - 2], cards: selCards, usr: this.state.currentUser })
                for (let i = 0; i < selCards.length; i++) {
                    const index = userCard.indexOf(selCards[i])
                    userCard.splice(index, 1)
                }
                const msg = { type: 'exchange', title: 'Vous devez patienter', message: `Vous devez patientez pendant que les autres joueurs s'échangent leurs cartes`, variant: 'info' }
                this.setState({ errorMessage: msg, playerCard: userCard, selectedCard: [], playerTraded: true })
            }
            else {
                const msg = { type: 'exchange', title: 'Vous devez choisir 1 carte ', message: `Vous devez choisir une cartes de votre choix a donner au vice clochard, celui ci vous donnera sa meilleure carte`, variant: 'danger' }
                this.setState({ errorMessage: msg })
            }

        }
        else if (rank === '4') {
            if (this.state.selectedCard.length === 1) {
                gameSocket.emit('exchangeCards', { num: 1, pseudo: winList[0], cards: selCards, usr: this.state.currentUser })
                for (let i = 0; i < selCards.length; i++) {
                    const index = userCard.indexOf(selCards[i])
                    userCard.splice(index, 1)
                }
                const msg = { type: 'exchange', title: 'Vous devez patienter', message: `Vous devez patientez pendant que les autres joueurs s'échangent leurs cartes`, variant: 'info' }
                this.setState({ errorMessage: msg, playerCard: userCard, selectedCard: [], playerTraded: true })
            }
            else {
                const msg = { type: 'exchange', title: 'Vous devez choisir 1 carte ', message: `Vous devez confirmer le choix automatique des cartes a donner au vice president, celui ci vous donnera une carte de son choix.`, variant: 'danger' }
                this.setState({ errorMessage: msg })
            }

        }
        else if (rank === '5') {
            if (this.state.selectedCard.length === 2) {
                gameSocket.emit('exchangeCards', { num: 2, pseudo: winList[0], cards: selCards, usr: this.state.currentUser })
                for (let i = 0; i < selCards.length; i++) {
                    const index = userCard.indexOf(selCards[i])
                    userCard.splice(index, 1)
                }
                const msg = { type: 'exchange', title: 'Vous devez patienter', message: `Vous devez patientez pendant que les autres joueurs s'échangent leurs cartes`, variant: 'info' }
                this.setState({ errorMessage: msg, playerCard: userCard, selectedCard: [], playerTraded: true })
            }
            else {
                const msg = { type: 'exchange', title: 'Vous devez choisir 2 cartes ', message: `Vous devez confirmer le choix automatique des cartes a donner aupresident, celui ci vous donnera deux carte de son choix`, variant: 'danger' }
                this.setState({ errorMessage: msg })
            }
        }
    }
    render() {
        return (
            <div style={{
                border: '1px solid black',
                backgroundColor: '#5DAB51',

            }}>
                <Container fluid>
                    <Row>
                        <Col>
                            {/* Rien / */}
                        </Col>
                        <Col>
                            <Container fluid >
                                <Row style={this.state.defStyle}>
                                    {this.state.player1.finish === true ?
                                        <Alert variant='primary'>This player finished at the {this.state.winnerList.indexOf(this.state.player1.pseudo) + 1} place</Alert>
                                        :
                                        this.state.player1.cards.map((value, key) => {
                                            return <Carte num={value} index={key} identity='othercards' />
                                        })}
                                </Row>
                                <br />
                                <Row style={this.state.defStyle}>

                                    {this.state.player1.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player1.pseudo}</span> : <span></span>}
                                </Row>
                            </Container>
                        </Col>
                        <Col>
                            {/* Rien */}
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col>
                            <Row style={this.state.defStyle}>

                                {this.state.player2.finish === true ?
                                    <Alert variant='primary'>This player finished at the {this.state.winnerList.indexOf(this.state.player2.pseudo) + 1} place</Alert>
                                    :
                                    this.state.player2.cards.map((value, key) => {
                                        return <Carte num={value} index={key} identity='othercards' />
                                    })}
                            </Row>
                            <br />
                            <Row style={this.state.defStyle}>
                                {this.state.player2.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player2.pseudo}</span> : <span></span>}
                            </Row>

                        </Col>
                        <Col style={{ border: '2px solid red', borderRadius: '10px', }}>
                            <Row style={this.state.defStyle}>
                                {this.state.switcher === true ? <span id={String(this.state.switcher)}>Pile</span> : <span id={String(this.state.switcher)}>Pile</span>}
                            </Row>
                            {this.state.cardExchange === true ?
                                <Row style={this.state.defStyle}>
                                    <Alert variant='primary'> {this.state.readyExList.length} / {this.state.exNum} players are ready.</Alert>
                                    <br />
                                    <Alert variant='primary'> Wait while players finish their trades </Alert>
                                </Row>
                                :
                                <Row style={this.state.defStyle}>
                                    {
                                        this.state.everyoneFinished ? this.classementRendu() : this.state.pile.map((value, key) => {
                                            return <Carte num={value} index={key} identity='cards' />
                                        })
                                    }
                                </Row>
                            }
                            <br />
                            <Row><Col>
                                {this.state.everyoneFinished ? <Row style={this.state.defStyle}><Alert variant='primary'> {this.state.readyList.length} / {this.state.ordList.length} players are ready.</Alert></Row> : <span></span>}
                                {this.state.everyoneFinished === true ? this.state.isReady === false ? <div><Row style={this.state.defStyle}><Button block onClick={() => this.rdyForAnthrGame()}>Ready for another game</Button></Row><br /></div> : <div><Row style={this.state.defStyle}><Button block onClick={() => this.rdyForAnthrGame()}>Not ready</Button></Row><br /></div> : <span> </span>}
                                {this.state.finalList[0].user === this.state.currentUser ? this.state.readyList.length === this.state.ordList.length ? <div><Row style={this.state.defStyle}><Button variant="primary" block onClick={() => this.startAnothrGame()}>Launch next game</Button></Row></div> : <div><Row style={this.state.defStyle}><Button variant="secondary" block disabled>Launch next game</Button><br /></Row></div> : <span></span>}
                            </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={this.state.defStyle}>
                                {this.state.player3.finish === true ?
                                    <Alert variant='primary'>This player finished at the {this.state.winnerList.indexOf(this.state.player3.pseudo) + 1} place</Alert>
                                    :
                                    this.state.player3.cards.map((value, key) => {
                                        return <Carte num={value} index={key} identity='othercards' />
                                    })}
                            </Row>
                            <br />
                            <Row style={this.state.defStyle}>

                                {this.state.player3.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player3.pseudo}</span> : <span></span>}
                            </Row>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col>
                            {this.isThere4Players()}
                        </Col>
                        <Col>
                            {this.isThereErrorMessage()}
                        </Col>
                        <Col>
                            {this.isThere5Players()}
                        </Col>
                    </Row>
                </Container>
                <br />
                <br />
                <Container fluid>
                    {this.state.cardExchange === true ?
                        <div>
                            <Row>
                                <Col style={this.state.defStyle}>
                                    {
                                        this.state.playerCard.map((value, index) => {
                                            if (this.state.selectedCard.indexOf(value) !== -1) {
                                                return <Carte num={value} index={index} identity='usercards' action={this.showCard} style={this.state.cardStyle} />;
                                            } else {
                                                return <Carte num={value} index={index} identity='usercards' action={this.showCard} />;
                                            }
                                        })
                                    }
                                </Col>
                                {this.state.selectedCard.length >= 1 && this.state.playerTraded === false ?
                                    <Col style={this.state.defStyle}>
                                        <Button onClick={() => this.giveCards()} block>Give cards</Button>
                                    </Col>
                                    :
                                    <Col style={this.state.defStyle}>
                                        <Button variant="secondary" block disabled> Give cards</Button>
                                    </Col>}
                            </Row>
                        </div>
                        :
                        <div>
                            {this.state.currentPlayerFinished === true ? <Row><Col style={this.state.defStyle}><Alert variant='success'>You finished, wait everyone for the next game.</Alert></Col></Row> :
                                <Row>
                                    {this.state.playerToken === 1 ? <Col style={this.state.defStyle}><Button block onClick={() => this.passTheTurn()}>pass</Button></Col> : <Col style={this.state.defStyle}><Button variant='secondary' block disable>pass</Button></Col>}
                                    <Col style={this.state.defStyle}>
                                        {
                                            this.state.playerCard.map((value, index) => {
                                                if (this.state.selectedCard.indexOf(value) !== -1) {
                                                    return <Carte num={value} index={index} identity='usercards' action={this.showCard} style={this.state.cardStyle} />;
                                                } else {
                                                    return <Carte num={value} index={index} identity='usercards' action={this.showCard} />;
                                                }
                                            })
                                        }
                                    </Col>
                                    {this.state.selectedCard.length > 0 ? this.state.playerToken === 1 ? <Col style={this.state.defStyle}><Button onClick={() => this.canHePlay()} block>Play selected cards</Button></Col> : <Col style={this.state.defStyle}><Button variant="secondary" block disabled>Play selected cards</Button></Col> : <Col style={this.state.defStyle}><Button variant="secondary" block disabled>Play selected cards</Button></Col>}

                                </Row>}
                        </div>}
                    <Row>
                        <Col>
                            <Chatbox />
                        </Col>
                    </Row>
                </Container>
                <br />
                <br />
                <br />
                <div></div>
            </div>
        )
    }
}

export default Game;




/*{
            ace :   '1:14:27:40' ,
            two:    '2:15:28:41',
            three:  '3:16:29:42',
            four:   '4:17:30:43',
            five:   '5:18:31:44',
            six:    '6:19:32:45',
            seven:  '7:20:33:46',
            eight:  '8:21:34:47',
            nine:   '9:22:35:48',
            ten:    '10:23:36:49',
            jack:   '11:24:37:50',
            queen:  '12:25:38:51',
            king:   '13:26:39:52',

            } */
