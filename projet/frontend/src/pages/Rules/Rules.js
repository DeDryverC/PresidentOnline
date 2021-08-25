import React from "react";
import { Row, Col, Container } from 'react-bootstrap'

export default function Rules(){
    return (
            <Container fluid>
                            <Col style = {{
                            border: '2px solid moccasin',
                            borderRadius: '10px',
                            backgroundColor: 'palegoldenrod',
                            bottom: 0,
                            overflowY: 'scroll',
                            maxHeight: '500px',
                            width: '700px'
                            }}>
                                <Row> 
                                    <h2> Rules </h2>
                                </Row>
                                <Row>
                                {/* Ici un composant réactif qui changera selon ce qu'on touche (Genre le home c'est la liste des games, puis lorsque l'on naviguera sur la barre "menu", cela changera ce qu'il y a ici.) 
                                    En attendant je hardcode le listing des game disponible*/}
                                    <Container>
                                        <Col>
                                            <Row>
                                                <h5>General :</h5>
                                                <ul>
                                                    <li>
                                                        All cards are dealt to the players.
                                                    </li>
                                                    <li>
                                                        The goal is to get rid of all of your cards first.
                                                    </li>
                                                    <li>
                                                        The person with the 3 clover begins.
                                                    </li>
                                                    <li>
                                                        The highest card is 2, then the ace, king, queens etc ... until 3 which is the lowest card.
                                                    </li>
                                                    <li>
                                                        Each player can put 1 to 4 cards of the same value.
                                                    </li>
                                                    <li>
                                                        It is better for the first person to start the round that they put the smallest card.
                                                    </li>
                                                    <li>
                                                        The next player has several options :
                                                        <ul>
                                                            <li>
                                                                He has no higher cards or not the required number, he passes his turn,
                                                            </li>
                                                            <li>
                                                                He has one or more higher cards and places on top of those previously played,
                                                            </li>
                                                            <li>
                                                                He has one or more cards of the same value and places them on top, thus skipping the next player's turn.
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        The turn ends when no more player can place a card, the last player to have deposited one begins the next turn.
                                                    </li>
                                                    <li>
                                                        To win, you just need to be the first to run out of cards. When this happens, the game must continue until there is only one player left with cards.
                                                    </li> <br></br>
                                                </ul>
                                                <h5>Thus the naming of the players can begin :</h5><br></br>
                                                <ul>
                                                    <li>
                                                        The first to finish becomes the "President",
                                                    </li>
                                                    <li>
                                                        The second becomes the "Vice President",
                                                    </li>
                                                    <li>
                                                        The penultimate becomes the "Vice Beggar",
                                                    </li>
                                                    <li>
                                                        And finally the last becomes the "Beggar".
                                                    </li>
                                                    <li>
                                                        Between the second and the penultimate, if there are players, they will be called the "Neutrals".
                                                    </li>
                                                </ul>
                                                <h5>The advantage of naming players :</h5>
                                                <ul>
                                                    <li>
                                                        During the next game, the beggar will have to give his 2 best cards to the President, and in exchange, he will have to give 2 cards of his choice to the beggar.
                                                    </li>
                                                    <li>
                                                        Ditto for the vice beggar and president, except that only one card is exchanged.
                                                    </li>
                                                    <li>
                                                        When a round is over (and there is a new president, beggar etc), the beggar starts the next round.
                                                    </li>
                                                </ul>
                                            </Row>
                                            <Row>
                                                <h5>Game Modifiers</h5>
                                            </Row>
                                            <Row>
                                                <h6>Eight Stop</h6>
                                                    <ul>
                                                        <li>This game modifier makes the eight cards more powerful in a game of President.</li>
                                                        <li>When a player plays any number of 8s, the turn cycle immediately ends.</li>
                                                        <li>When that happens, that player can start a new sequence.</li>
                                                    </ul>
                                                <h6>Revolution</h6>
                                                    <ul>
                                                        <li>Revolution time!</li>
                                                        <li>When a player plays all four cards of the same value (a set), card strength reverses!</li>
                                                        <li>That means: 3 is now the strongest card and 2 is the weakest card.</li>
                                                        <li>This effect lasts until the end of the round or someone also plays a set during a round.</li>
                                                    </ul>
                                            </Row>
                                        </Col>
                                    </Container>
                                </Row>
                            </Col>
                       </Container>


    )
}