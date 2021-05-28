import React, { Component } from "react";
import { Button, Row, Col, Container, Alert } from 'react-bootstrap';
import Carte from '../../components/Carte'
import io from "socket.io-client";

/* TODO :   connexion a la game
            token

            Reconnection si deco
            fin de round
            fin de game
            envoi stats
            page de fin 

*/
let gameSocket

class Game extends Component {

    constructor() {
        super();

        /*********** Global Variables ***********/

        this.state = {
            /* Usefull variables*/
            playerToken: 0,
            selectedCard: [],
            switcher: false,
            errorMessage: { type: null, title: null, message: null, variant: null },
            game_id : localStorage.getItem('gameId'),
            currentUser: localStorage.getItem('pseudo'),
            orderTurn: localStorage.getItem('turn').split(','),
            countTurn: 0,
            countRound: 0,

            /* Test variable */
            testChgPile: [5, 18],
            testChgPile2: [13],

            /* socket io */
            connectionConfig: {
                "force new connection": true,
                "reconnectionAttemps": "Infinity",
                "timeout": 10000,
                "transports": ["websocket"]
            },
            endpoint: 'localhost:5002',

            /* RAW DATA */
            playersData: null,
            data: null,

            /* PLAYERS */
            players: [],
            player1: { pseudo: null, cards: [], set: false, connected : false },
            player2: { pseudo: null, cards: [], set: false, connected : false },
            player3: { pseudo: null, cards: [], set: false, connected : false },
            player4: { pseudo: null, cards: [], set: false, connected : false },
            player5: { pseudo: null, cards: [], set: false, connected : false },

            /* STYLE */
            defStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
            cardStyle: { border: '2px solid red', borderRadius: '10px', },

            /* VISIBLE CARDS */
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
        gameSocket = io(this.state.endpoint, this.state.connectionConfig)
        
    }

    /********************** Game Function **********************/

    /***********  ***********/

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
        }
    }

    


    isRoundOver = (cards, cardsNum) => {
        if (cards.length === 4) {
            return true
        } else if (cardsNum === 20) {
            return true
        }
        return false
    }
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

   


    generatePlayersData = () => {
        const players = this.state.players
        const p1 = this.state.player1
        const p2 = this.state.player2
        const p3 = this.state.player3
        const p4 = this.state.player4
        const p5 = this.state.player5
        players.map(
            (data, key) => {
                if (key === 0) {
                    if (p1.set === false) {
                        const dataf = data.split('|')
                        p1.pseudo = dataf[0]
                        for (let i = 0; i < dataf[1]; i++) { p1.cards.push(0) }
                        p1.set = true;
                    }
                } if (key === 1) {
                    if (p2.set === false) {
                        const dataf = data.split('|')
                        p2.pseudo = dataf[0];
                        for (let i = 0; i < dataf[1]; i++) { p2.cards.push(0) }
                        p2.set = true;
                    }
                } if (key === 2) {
                    if (p3.set === false) {
                        const dataf = data.split('|')
                        p3.pseudo = dataf[0];
                        for (let i = 0; i < dataf[1]; i++) { p3.cards.push(0) }
                        p3.set = true;
                    }
                } if (key === 3) {
                    if (p4.set === false) {
                        const dataf = data.split('|')
                        p4.pseudo = dataf[0]
                        for (let i = 0; i < dataf[1]; i++) { p4.cards.push(0) }
                        p4.set = true;
                    }
                } if (key === 4) {
                    if (p5.set === false) {
                        const dataf = data.split('|')
                        p5.pseudo = dataf[0]
                        for (let i = 0; i < dataf[1]; i++) { p5.cards.push(0) }
                        p5.set = true;
                    }
                }
                return 0;
            }
        )
        this.setState({ player1: p1, player2: p2, player3: p3, player4: p4, player5: p5 })
        
    }


    resetError = () => {
        const error = { type: null, title: null, message: null, variant: null }
        this.setState({ errorMessage: error })
    }

    pileTypeCard = () => {
        const pile = this.state.pile
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
    canHeStart(){
        if(this.state.countRound < 1)
        {
            const currUser = this.state.currentUser
            if (this.state.playerCard.indexOf('25') !== -1) {
                this.setState({ playerToken: 1 })
                gameSocket.emit('startPlaying', { user: currUser })
            } else {

            }
        }
    }
    canHePlay = () => {
        if (this.state.playerToken === 1) {
            const actualPile = this.state.pile
            //const playerCard = this.state.playerCard
            const selCard = this.state.selectedCard
            const ssc = this.sameSelectedCard()
            const ptc = this.pileTypeCard()
            if (actualPile.length > selCard.length && ssc !== 20) {
                const error = { type: 'rules', title: 'You cannot play this', message: 'You cannot play fewer cards than there are in the pile', variant: 'danger' }
                this.setState({ errorMessage: error })

            }
            else if (ssc === -1 && ssc !== 20) {
                const error = { type: 'rules', title: 'You cannot play this', message: 'You cannot play two cards of different value', variant: 'danger' }
                this.setState({ errorMessage: error })
            } else if (ssc < ptc && ssc !== 20) {
                const error = { type: 'rules', title: 'You cannot play this', message: 'You cannot play one or more cards smaller than those in the pile', variant: 'danger' }
                this.setState({ errorMessage: error })
            }
            else if (actualPile.length - 1 > selCard.length && ssc === 20) {
                const error = { type: 'rules', title: 'You cannot play this', message: 'You need an extra 2 if you want to cut a series of 3 cards', variant: 'danger' }
                this.setState({ errorMessage: error })
            }
            else {

                const message = { type: 'finish', title: 'You just played', message: 'Wait for your turn.', variant: 'success' }
                
                
                const user = this.state.currentUser
                let counter = this.state.countTurn
                counter++;
                const copyTable = this.state.orderTurn.slice()
                const nextUser= copyTable[counter]
                this.setState({ errorMessage: message, playerToken: 0,countTurn: counter})
                gameSocket.emit('finishTurn', nextUser)

                this.delSelectedCard()
                this.changePile(selCard, ssc)
            }

        }
        else {
            const error = { type: 'Not your turn', title: 'You cant play now', message: 'Its not your turn, wait for it.', variant: '' }
            this.setState({ errorMessage: error })
        }

    }

    changePile = (newCards, newCardsNum) => {

        if (this.isRoundOver(newCards, newCardsNum) === false) {
            const game_id= this.state.game_id
            gameSocket.emit('chgpile', {newcds :newCards, gid : game_id})
        }
        else{
            //switch socket.
            const game_id= this.state.game_id
            gameSocket.emit('chgpile', {newcds :newCards, gid : game_id})
        }

    }
    playButton = () => {
        return (
            <div style={this.state.defStyle}>
                <Button>Play selected cards</Button>
            </div>
        )
    }
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
        } else if(this.state.errorMessage.type ==='token'){
            return (
                <Row style={this.state.defStyle}>
                    <Alert variant={this.state.errorMessage.variant} onClose={() => this.resetError()} dismissible>
                        <Alert.Heading>{this.state.errorMessage.title}</Alert.Heading>
                        {this.state.errorMessage.message}
                    </Alert>
                </Row>
            )
        }

    }
    isThere4Players = () => {
        if (this.state.player4.pseudo !== null) {
            return (
                <div>
                    <Row style={this.state.defStyle}>
                        {
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

    isThere5Players = () => {
        if (this.state.player5.pseudo !== null) {
            return (
                <div>
                    <Row style={this.state.defStyle}>
                        {
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
    componentDidMount() {
        const currUser = this.state.currentUser;
        const gameId = this.state.gameId
        gameSocket.on('connection', function (data) {

        })
        // Requete backend pour savoir les cartes de l'utilisateur local
        gameSocket.emit('join_game', {gid: this.state.game_id, user: this.state.currentUser})
        gameSocket.on('userCard',(sdata) => {
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
        // Requete backend pour avoir le nombre de carte des joueurs
        gameSocket.on('othersCount',(sdata) =>{
            const json = sdata
            this.setState({ playersData: json })
                json.forEach(({ user, Ncards }) => {
                    const passerelle = user + '|' + Ncards
                    this.setState(state => {
                        const players = state.players.concat(passerelle)
                        return {
                            players,
                        };
                }, this.generatePlayersData)
            })
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
        
        gameSocket.on('newpile', (sdata) =>{
            const newpile = sdata
            this.setState({ pile: newpile })
        })

        gameSocket.on('playerdeconnexion', (sdata) =>{
            const player = sdata.user;
        })
        gameSocket.on('userPlayed', (sdata)=>{
            let counter = this.state.countTurn
            counter++;
            if(sdata===currUser){
                const msg={ type: 'turn', title: 'La partie a commencé', message: `C'est a toi de jouer chef`, variant: 'success' }
                this.setState({playerToken: 1, errorMessage : msg})
            }
            this.setState({countTurn: counter})
        })
        gameSocket.on('gameStarted', (sdata)=>{
            const msg = { type: 'start', title: 'La partie a commencé', message: `${sdata} dispose de la dame de coeur, il commence la partie`, variant: 'info' }
            this.setState({errorMessage: msg})
        })
        const playerCard=this.state.playerCard


    }

    delSelectedCard = () => {
        const selCard = this.state.selectedCard
        var userCard = this.state.playerCard
        gameSocket.emit('delcard',{gid: this.state.game_id, us:this.state.currentUser, sc : this.state.selectedCard, usc : this.state.playerCard})
        gameSocket.on('delcardReturn', (sdata)=>{
            const userCard = sdata;
            this.setState({ playerCard: userCard, selectedCard: [] })
        })
    }
    closeAlert = () => {
        this.setState({ showAlert: false })
    }

    componentDidUpdate() {
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
                            {/* Rien */}
                        </Col>
                        <Col>
                            <Container fluid >
                                <Row style={this.state.defStyle}>
                                    {
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
                                {
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
                            <Row style={this.state.defStyle}>
                                {
                                    this.state.pile === [] ? <span>VIDE</span> : this.state.pile.map((value, key) => {
                                        return <Carte num={value} index={key} identity='cards' />
                                    })
                                }
                            </Row>
                            <br />
                            <Row>

                            </Row>
                        </Col>
                        <Col>
                            <Row style={this.state.defStyle}>
                                {
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
                    <Row>
                        {this.state.playerToken ===1 ? <Col style={this.state.defStyle}><Button variant='secondary' block disable>pass</Button></Col> : <Col style={this.state.defStyle}><Button block >pass</Button></Col>}
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
                        {this.state.selectedCard.length > 0 ? this.state.playerToken === 1 ? <Col style={this.state.defStyle}><Button onClick={() => this.canHePlay()} block>Play selected cards</Button></Col> :<Col style={this.state.defStyle}><Button variant="secondary" block disabled>Play selected cards</Button></Col> : <Col style={this.state.defStyle}><Button variant="secondary" block disabled>Play selected cards</Button></Col>}

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
