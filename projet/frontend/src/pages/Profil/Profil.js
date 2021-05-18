
import React from "react";
import NavigationProfil from "../../components/NavigationProfil";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class Profil extends React.Component {

    constructor(props) {
        super(props);
       
        this.state={
            /*name:'',
            surname:'',
            email:'',
            pseudo:'Neshtai',
            /*password:'',
            winrate:'39 %',
            victory:'214',
            roundpresi:'107',
            roundvp:'58',
            roundvtdc:'137',
            roundtdc:'72',*/
            donneesprofil:'',
            donneesstats:[],
            gameAmount:'',
            email:localStorage.getItem("Email"),
            pseudo:localStorage.getItem("Pseudo")
   
        }
      }

    

      componentDidMount(){
        console.log(this.state.pseudo)
        fetch(`http://localhost:5000/profil/${this.state.pseudo}`)
          .then(response => response.json())
          .then(json => {
            this.setState({donneesprofil: json[0]})
            
            console.log(this.state.donneesprofil)
            
            
          })

        fetch(`http://localhost:5000/statistics/${this.state.pseudo}`)
          .then(response => response.json())
          .then(json => {
            this.setState({donneesstats: json})
            this.setState({gameAmount:this.state.donneesstats.length})
            console.log(this.state.donneesstats.length)
            
            
          })

        
        
       
        
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
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.donneesprofil.Name} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white'}}> Surname : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.donneesprofil.Surname} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white'}}> Email : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.donneesprofil.Email} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white'}}> Pseudo : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.donneesprofil.Pseudo} </h2><br></br>

                    </Col>
                    <Col>
                        
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white', marginTop:'9%'}}> Game amount : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.gameAmount} </h2><br></br>
                    </Col>
                    
                </Row>     
            </html>
        );
    }
}

export default Profil