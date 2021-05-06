import React, { Component } from "react";
import { Button } from 'react-bootstrap';
//import Image from 'react-native'
// Recevoir les données du deck visible,
// boucle for sur le length de data abt *
// boucle for sur les length des cartes des autres joueurs
// bouton gauche pass
// bouton droite pick
// les cartes sont clickable
// TODO FAIRE UN COMPONENT CARTE QUI AFFICHE LES CARTES SELON LEURS IDS

class Game extends Component {
    state = {
        player: null,
        visible_deck: null,
        token: null,
        data: null,
        playerCard: []    
    }
    

    /* Generate game, initialiser le deck du joueur, l'id du joueur ainsi que le nombre de carte chez les autres joueur, ainsi que l'ID des autre joueurs, a hasher plus tard */
    generateGame = () => {
        

    }

    componentDidMount() {
        fetch(`http://localhost:5000/deck/GameTest/1`)
            .then(response => response.json())
            .then(json => {
                this.setState({data: json, player: json[0].user})
                json.forEach(({user, card}) => {
                    this.setState(state => {
                        const playerCard = state.playerCard.concat(card)
                        
                        return {
                            playerCard,
                        };
                    })
                })
                console.log("sheeesh  " + this.state.playerCard)
            }
        )
    }

    render() {
        return (
            <div id="gameBody" style={{
                border: '1px solid black',
                backgroundColor: 'lightgreen',
                width: '100%',
                height: '100%',
            }}>
                {/* Ici nous aurons les cartes (face caché) des autres joueurs afin de pouvoir estimer si ils sont  +/- proche de la victoire*/}
                <div>
                    <span> Joueur 1 </span>
                </div>
                <div>
                    <span> Joueur 2 </span>
                </div>
                <div>
                    <span> Joueur 3 </span>
                </div>
                
                {/* Ici nous aurons une image du deck (face caché) et les cartes qui viennent d'etre jouée */}
                <div>
                    <span> Deck caché </span>
                </div>
                <div>
                    <span> carte visible </span>
                </div>
                <div>
                    <span>______________</span>
                </div>
                
                {/* Ici nous aurons les cartes en local */}
                <div>
                    {/*{this.state.playerCard.map(item => (
                        <Image key={item} id='card' source={require('../../img/cartes/'+{item}+'.png')}/>
                    ))}*/}
                </div>
                <Button onClick={() => console.log(this.state.data)}>

                </Button>

            </div>
        )
    }
}

export default Game;