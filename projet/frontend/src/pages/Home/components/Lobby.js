import React, { Component } from 'react';
import { Button, Row, Col, Container, Badge } from 'react-bootstrap'

class Lobby extends Component{
    render(){
        return(
        <Container fluid>
            {console.log('userLobby + + + + +')}
            {console.log(this.props.userLobby)}
            {console.log(typeof(userLobby))}
            {console.log('userLobby - - - - -')}
            {this.props.userLobby.map((data, key)=>{
                const user =' : '+ String(data.user);
                
                if(data.token === 1){
                    return <Row key={key}><span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border:'2px solid #FF3535',borderRadius: '10px',color: '#FF3535' }}>| Owner |</span ><p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', verticalAlign:'center'}}>{user}</p><br/></Row>
                } 
                if(data.token ===0){
                    return <Row key={key}><span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border:'2px solid #4185FA',borderRadius: '10px',color: '#4185FA' }}>| User |</span ><p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', verticalAlign:'center'}} >{user}</p><br/></Row>;
                }
            })}
        </Container>
    )
    }
}
export default Lobby;