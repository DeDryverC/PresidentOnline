import React, { Component } from 'react';
import { Button, Row, Col, Container, Badge } from 'react-bootstrap'


class Pool extends Component {
    render() {
        return(
            <Container fluid>
                {console.log("pool + + + +")}
                {console.log(this.props.pool)}
                {console.log("pool - - - -")}
                {this.props.pool.map((data, key)=>{
                    if (data.currPlayers >= data.maxPlayers){
                        return <Row key={key}><Button variant="danger">Full [{data.currPlayers}/{data.maxPlayers}]</Button><p>{data.gameId}</p></Row>
                    }
                    else {
                        return <Row key={key}><Button variant="success" onClick={() => this.props.actionJoin(data.gameId)}>Join [{data.currPlayers}/{data.maxPlayers}]</Button><p>{data.gameId}</p></Row>
                    }
                })}
            </Container>
        )
    }
}
export default Pool;



