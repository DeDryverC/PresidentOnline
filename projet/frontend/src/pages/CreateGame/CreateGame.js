
import React from "react";
import { ButtonGroup, Button, Row, Col, Container } from 'react-bootstrap'
import Select from 'react-select'


const options = [
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },

  ]


class CreateGame extends React.Component {

    

    // TODO : deplacer les states que ça ne fasse pas de pb de collision
    constructor(props){
        super(props);
        this.state={
            gameId: undefined,
            players: undefined,
            code: undefined
        }
        this.handleCreate = this.handleCreate.bind(this);
    }
    handleCreate(event) {
        event.preventDefault();
        fetch('http://localhost:5000/table', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                gameId: this.state.gameId,
                players: this.state.players,
                code: this.state.code
            }),

        }).then(response => response.json())
            .then(json => {

                console.log(json.message)

            }).catch((error) => {
                alert("Echec de creation'. Réessayez.");

            });

        console.log(this.state)
    };

    componentDidMount() {
        this.handleCreate = this.handleCreate.bind(this);
    }

    render() {
        return (
            <Container>
                <Col style={{
                    border: '2px solid moccasin',
                    borderRadius: '10px',
                    backgroundColor: 'palegoldenrod'
                }}>

                    <Row>
                        {/* Ici un composant réactif qui changera selon ce qu'on touche (Genre le home c'est la liste des games, puis lorsque l'on naviguera sur la barre "menu", cela changera ce qu'il y a ici.) 
                                        En attendant je hardcode le listing des game disponible*/}
                        <Container>
                            <Col>
                                <h2>Create a game</h2>
                                <br /><br />


                                <form onSubmit={this.handleCreate}>

                                    <label>
                                        <p>Lobby's name :</p>
                                        <input type="text" value={this.state.gameId} onChange={text => this.setState({ gameId: text.target.value })} />
                                    </label>
                                    <br /><br />

                                    <label>
                                        <p>Amount of player : </p>
                                        <Select options={options} />
                                    </label>
                                    <br /><br />
                                    <input type="submit" value="Create lobby" />
                                </form>



                            </Col>
                        </Container>
                    </Row>
                </Col>
            </Container>
        );
    }
}

export default CreateGame