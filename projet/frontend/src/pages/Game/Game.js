import React, { Component } from "react";
import { Button, Row, Col, Container, Alert } from 'react-bootstrap';
import Carte from '../../components/Carte'
// TODO : Faire une actualisation du pile


class Game extends Component {


    /*********** Global Variables ***********/

    state = {
        /* Usefull variables*/
        token: true,
        selectedCard: [],
        switcher: false,
        errorMessage: {type: null, message: null},

        /* Test variable */
        testChgPile: [5,18],
        testChgPile2: [13],
        
        /* RAW DATA */
        playersData: null,
        data: null,

        /* PLAYERS */
        players: [],
        player1: { pseudo: null, cards: [], set: false },
        player2: { pseudo: null, cards: [], set: false },
        player3: { pseudo: null, cards: [], set: false },
        player4: { pseudo: null, cards: [], set: false },
        player5: { pseudo: null, cards: [], set: false },

        /* STYLE */
        defStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        cardStyle: {border: '2px solid red', borderRadius: '10px', },

        /* VISIBLE CARDS */
        pile: [],
        playerCard: [],

        /* List of all card, refers to their .png */    
        cardList: {
            ace :   ['1', '14', '27','40'] ,
            two:    ['2','15','28','41'],
            three:  ['3','16','29','42'],
            four:   ['4','17','30','43'],
            five:   ['5','18','31','44'],
            six:    ['6','19','32','45'],
            seven:  ['7','20','33','46'],
            eight:  ['8','21','34','47'],
            nine:   ['9','22','35','48'],
            ten:    ['10','23','36','49'],
            jack:   ['11','24','37','50'],
            queen:  ['12','25','38','51'],
            king:   ['13','26','39','52'],
            
            }
    }


    /********************** Game Function **********************/

    /***********  ***********/

    whatCardIs = (num) => {
        // RETURN -1 IF NOT
        if(this.state.cardList.ace.indexOf(String(num)) !== -1) {
            switch(this.state.cardList.ace.indexOf(String(num))){
                case 0: return '1:s';
                case 1: return '1:h';
                case 2: return '1:c';
                case 3: return '1:d';
                default: return 0;}
        } else if (this.state.cardList.two.indexOf(String(num)) !== -1) {
            switch(this.state.cardList.two.indexOf(String(num))){
                case 0: return '2:s';
                case 1: return '2:h';
                case 2: return '2:c';
                case 3: return '2:d';
                default: return 0;}
        } else if (this.state.cardList.three.indexOf(String(num)) !== -1) {
            switch(this.state.cardList.three.indexOf(String(num))){
                case 0: return '3:s';
                case 1: return '3:h';
                case 2: return '3:c';
                case 3: return '3:d';
                default: return 0;}
        } else if (this.state.cardList.four.indexOf(String(num)) !== -1) {
            switch(this.state.cardList.four.indexOf(String(num))){
                case 0: return '4:s';
                case 1: return '4:h';
                case 2: return '4:c';
                case 3: return '4:d';
                default: return 0;}
        } else if (this.state.cardList.five.indexOf(String(num)) !== -1) {
            switch(this.state.cardList.five.indexOf(String(num))){
                case 0: return '5:s';
                case 1: return '5:h';
                case 2: return '5:c';
                case 3: return '5:d';
                default: return 0;}
        } else if (this.state.cardList.six.indexOf(String(num)) !== -1) {
            switch(this.state.cardList.six.indexOf(String(num))){
                case 0: return '6:s';
                case 1: return '6:h';
                case 2: return '6:c';
                case 3: return '6:d';
                default: return 0;}
        } else if (this.state.cardList.seven.indexOf(String(num)) !== -1) {
            switch(this.state.cardList.seven.indexOf(String(num))){
                case 0: return '7:s';
                case 1: return '7:h';
                case 2: return '7:c';
                case 3: return '7:d';
                default: return 0;}
        } else if (this.state.cardList.eight.indexOf(String(num)) !== -1) {
            switch(this.state.cardList.eight.indexOf(String(num))){
                case 0: return '8:s';
                case 1: return '8:h';
                case 2: return '8:c';
                case 3: return '8:d';
                default: return 0;}
        } else if (this.state.cardList.nine.indexOf(String(num)) !== -1) {
            switch(this.state.cardList.ninr.indexOf(String(num))){
                case 0: return '9:s';
                case 1: return '9:h';
                case 2: return '9:c';
                case 3: return '9:d';
                default: return 0;}
        } else if (this.state.cardList.ten.indexOf(String(num)) !== -1) {
            switch(this.state.cardList.ten.indexOf(String(num))){
                case 0: return '10:s';
                case 1: return '10:h';
                case 2: return '10:c';
                case 3: return '10:d';
                default: return 0;}
        } else if (this.state.cardList.jack.indexOf(String(num)) !== -1) {
            switch(this.state.cardList.jack.indexOf(String(num))){
                case 0: return 'j:s';
                case 1: return 'j:h';
                case 2: return 'j:c';
                case 3: return 'j:d';
                default: return 0;}
        } else if (this.state.cardList.queen.indexOf(String(num)) !== -1) {
            switch(this.state.cardList.queen.indexOf(String(num))){
                case 0: return 'q:s';
                case 1: return 'q:h';
                case 2: return 'q:c';
                case 3: return 'q:d';
                default: return 0;}
        } else if (this.state.cardList.king.indexOf(String(num)) !== -1) {
            switch(this.state.cardList.king.indexOf(String(num))){
                case 0: return 'k:s';
                case 1: return 'k:h';
                case 2: return 'k:c';
                case 3: return 'k:d';
                default: return 0;}
        }
    }

    showCard = (card) => {
        if(this.state.selectedCard.indexOf(card) === -1) {
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
            this.setState({selectedCard: selectedCard})
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
        const error = {type: null, message: null}
        this.setState({errorMessage: error})
    }

    pileTypeCard = () => {
        const pile = this.state.pile
        if(pile.length === 0){
            return 0
        }
        else{
            const numPile = this.whatCardIs(pile[0]).split(':')
            console.log(numPile[0])
            if(numPile[0]===0){
                return 10
            }
            else{
                return numPile[0]
            }
        }
    }
    sameSelectedCard = () => {
        const selCard = this.state.selectedCard
        const len = selCard.length

        if(len===1){
            return true
        }
        else if(len===2){
            if(this.whatCardIs(selCard[0]) === this.whatCardIs(selCard[1])){
                return true
            }
            else{
                return false
            }
        }
    }

    canHePlay= () => {
        if(this.state.token === true) {
            const actualPile = this.state.pile
            const playerCard = this.state.playerCard
            const selCard = this.state.selectedCard
            if( actualPile.length > selCard.length){
                const error = {type : 'rules', message: 'You cannot play fewer cards than there are in the pile'}
                this.setState({errorMessage : error})
                
            }
            
            else{
                this.resetError()
                this.changePile(selCard)
        }
            
        }
        else {
            const error = {type : 'Not your turn', message: 'Its not your turn, wait for it.'}
            this.setState({errorMessage : error})
        }

    }

    checkRules = (selected) => {

        //if(selected.compareto(sdssss) === true )
    }

    changePile = (newCards) => {
        var sheesh = []
        fetch('http://localhost:5000/potd/GameTest')
        newCards.map((value, key) => {
            const fetchmsg = 'http://localhost:5000/pots/GameTest/'+String(value)
            sheesh.push(value)
            fetch(fetchmsg)
            return 0;
            })

        this.setState({pile : sheesh})

    }
    playButton = () => {
        return (
            <div style={this.state.defStyle}>
                <Button>Play selected cards</Button>
            </div>
        )
    }
    isThereErrorMessage = () => {
        if(this.state.errorMessage.type == 'rules') {
            return (
                <Row style={this.state.defStyle}>
                    <Alert variant="danger">
                        <Alert.Heading>Rules error</Alert.Heading>
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
                    <br/>
                    <Row style={this.state.defStyle}>
                        {this.state.player4.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player4.pseudo}</span> : <span></span>}
                    </Row>
                </div>
            )
        } else {
            return (
                <div>
                    <span>Empty</span>
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
                    <br/>
                    <Row style={this.state.defStyle}>
                        {this.state.player5.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player5.pseudo}</span> : <span></span>}
                    </Row>
                </div>
            )
        } else {
            return (
                <div>
                    <span>Empty</span>
                </div>
            )
        }
    }

    componentDidMount() {
        // Requete backend pour savoir les cartes de l'utilisateur local
        fetch(`http://localhost:5000/deck/GameTest/user1`)
            .then(response => response.json())
            .then(json => {
                this.setState({ data: json })
                json.forEach(({ user, card }) => {
                    this.setState(state => {
                        const playerCard = state.playerCard.concat(card)
                        return {
                            playerCard,
                        };
                    })
                })
            }
            )
        // Requete backend pour avoir le nombre de carte des joueurs
        fetch('http://localhost:5000/ccount/GameTest/user1')
            .then(response => response.json())
            .then(json => {
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
        // Requete backend pour la pile de carte au milieu
        fetch('http://localhost:5000/pot/GameTest')
            .then(response => response.json())
            .then(json => {
                json.forEach(({ user, card }) => {
                    this.setState(state => {
                        const pile = state.pile.concat(card)
                        return {
                            pile,
                        };
                    })
                })
            })

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
                                <br/>
                                <Row style={this.state.defStyle}>
                                    {this.state.player1.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player1.pseudo}</span> : <span></span>}
                                </Row>
                            </Container>
                        </Col>
                        <Col>
                            {/* Rien */}
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                        <Col>
                            <Row style={this.state.defStyle}>
                                {
                                    this.state.player2.cards.map((value, key) => {
                                        return <Carte num={value} index={key} identity='othercards' />
                                    })}
                            </Row>
                            <br/>
                            <Row style={this.state.defStyle}>
                                {this.state.player2.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player2.pseudo}</span> : <span></span>}
                            </Row>

                        </Col>
                        <Col style={{ border: '2px solid red', borderRadius: '10px',}}>
                            <Row style={this.state.defStyle}>
                                {this.state.switcher===true ? <span id={String(this.state.switcher)}>Pile</span> : <span id={String(this.state.switcher)}>Pile</span>}
                            </Row>
                            <Row style={this.state.defStyle}>
                                {
                                    this.state.pile === [] ? <span>VIDE</span> : this.state.pile.map((value, key) => {
                                        return <Carte num={value} index={key} identity='cards' />})
                                }
                            </Row>
                            <br/>
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
                            <br/>
                            <Row style={this.state.defStyle}>
                                {this.state.player3.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player3.pseudo}</span> : <span></span>}
                            </Row>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
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
                <br/>
                <br/>
                <Container fluid>
                    <Row>
                        <Col style={this.state.defStyle}><Button onClick={() => console.log(this.pileTypeCard())} block>pass</Button></Col>
                        <Col style={this.state.defStyle}>
                        {
                            this.state.playerCard.map((value, index) => {
                                if(this.state.selectedCard.indexOf(value) !== -1 ){
                                    return <Carte num={value} index={index} identity='usercards' action={this.showCard} style={this.state.cardStyle} />;
                                } else  {
                                    return <Carte num={value} index={index} identity='usercards' action={this.showCard}/>;
                                }
                            })
                        }
                        </Col>
                        {this.state.selectedCard.length > 0 ? <Col style={this.state.defStyle}><Button onClick={() => this.canHePlay()} block>Play selected cards</Button></Col> : <Col style={this.state.defStyle}><Button variant="secondary" onClick={() => console.log(this.state.pile)} block disabled>Play selected cards</Button></Col>}
                        
                    </Row>
                </Container>
                <br/>
                <br/>
                <br/>

                <div></div>
            </div>
        )
    }
}

export default Game;








                /*
                    <Row>
                        <Col />
                        <Col><Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{
                            this.state.player2.cards.map((value, key) => {
                                return <Carte num={value} index={key} identity='othercards' />
                            })}
                        </Row>
                            <br />
                            {this.state.player2.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player2.pseudo}</span> : <span></span>}


                        </Col>
                        <Col />
                    </Row>
                    <br />
                    <Row>
                        <Col><Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{
                            this.state.player1.cards.map((value, key) => {
                                return <Carte num={value} index={key} identity='othercards' />
                            })}</Row>
                            {this.state.player1.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player1.pseudo}</span> : <span></span>}


                        </Col>
                        <Col>
                            <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span>Pile</span>
                            </Row>
                            <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                {this.state.pile === [] ? <span>VIDE</span> : this.state.pile.map((value, key) => {
                                    return <Carte num={value} index={key} identity='cards' />
                            })}
                            </Row>
                        </Col>


                        <Col><Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{
                            this.state.player3.cards.map((value, key) => {
                                return <Carte num={value} index={key} identity='othercards' />
                            })}</Row>
                            {this.state.player3.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player3.pseudo}</span> : <span></span>}


                        </Col>
                    </Row><br />
                    {this.isThereMorePlayers()}
                </Container>
                <br></br>
                <Container>
                    <Row>
                        <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Button onClick={() => console.log(this.state.pile)}>pass</Button></Col>
                        <Col><Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{
                            this.state.playerCard.map((value, index) => {
                                return <Carte num={value} index={index} identity='cards' />
                            })
                        }</Row></Col>

                        <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Button onClick={() => console.log(this.state.player1)}>PICK</Button></Col>
                    </Row>*/


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
