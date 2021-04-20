
import React from "react";
import NavigationProfil from "../../components/NavigationProfil";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class Profil extends React.Component {

    constructor(props) {
        super(props);
       
        this.state={
            name:'',
            surname:'',
            email:'',
            pseudo:'',
            password:'',
            winrate:'39 %',
            victory:'214',
            roundpresi:'107',
            roundvp:'58',
            roundvtdc:'137',
            roundtdc:'72',
            donnees:'',


   
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
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white',marginTop:'10%'}}> Name : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.name} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white'}}> Surname : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.surname} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white'}}> Email : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.email} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white'}}> Pseudo : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.pseudo} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white'}}> Password : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.password} </h2><br></br>
                    </Col>
                    <Col>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white',marginTop:'%'}}> Winrate : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.winrate} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white'}}> Victory : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.victory} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white'}}> Rounds as President : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.roundpresi} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white'}}> Round as vice President : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.roundvp} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white'}}> Round as Vice Tdc : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.roundvtdc} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white'}}> Round as Tdc : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.roundtdc} </h2><br></br>
                    </Col>
                    
                </Row>     
            </html>
        );
    }
}

export default Profil