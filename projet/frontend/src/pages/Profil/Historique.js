import React from "react";
import NavigationProfil from "../../components/NavigationProfil";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class Historique extends React.Component {

    constructor(props) {
        super(props);
       
        this.state={
            game1:'Victory : 4 rounds as P, 2 rounds as vp, 3 rounds as tdc, 1 round as tdc',
            game2:'Defeat : 2 rounds as P, 2 rounds as vp, 2 rounds as tdc, 6 round as tdc',
            game3:'Defeat : 0 rounds as P, 0 rounds as vp, 0 rounds as tdc, 10 round as tdc',
            game4:'Victory : 7 rounds as P, 2 rounds as vp, 1 rounds as tdc, 0 round as tdc',
            game5:'Victory : 5 rounds as P, 2 rounds as vp, 3 rounds as tdc, 0 round as tdc',

   
        }
      }



    render() {
        return (
            <html>
                <Row>  
                    <Col>
                        <div class="hautpage">
                            <NavigationProfil />
                        </div> 
                    </Col> 
                </Row>
                <Row>
                    <Col>
                        <h2 style={{textAlign: "center", fontSize: 50, color:'white',marginTop:'5%'}}> Games : </h2><br></br><br></br>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'green'}}> {this.state.game1} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'red'}}> {this.state.game2} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'red'}}> {this.state.game3} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'green'}}> {this.state.game4} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'green'}}> {this.state.game5} </h2><br></br>
                    </Col>
                    
                </Row>     
                    
            </html>
        );
    }
}

export default Historique