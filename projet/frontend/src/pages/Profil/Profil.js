
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

    

      async componentDidMount(){
        await fetch(`http://localhost:5000/profil/${this.state.pseudo}`)
          .then(response => response.json())
          .then(json => {
            this.setState({donneesprofil: json[0]})
          })

        await fetch(`http://localhost:5000/statistics/${this.state.pseudo}`)
          .then(response => response.json())
          .then(json => {
            this.setState({donneesstats: json})
          })
        
        let wins=0;
        for(let item of this.state.donneesstats){
            if(item.Position === 1){
                wins++;
            }
        }
        this.setState({playerWins: wins});
    };


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
                        
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white', marginTop:'9%'}}> Games played : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.donneesstats.length} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white', marginTop:'9%'}}> Wins : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {this.state.playerWins} </h2><br></br>
                        <h2 style={{textAlign: "center", fontSize: 32, color:'white', marginTop:'9%'}}> Ratio : </h2>
                        <h2 style={{textAlign: "center", fontSize: 25, color:'white'}}> {(this.state.playerWins/this.state.donneesstats.length).toFixed(2)} Win(s) per lose </h2><br></br>
                    </Col>
                    
                </Row>     
            </html>
        );
    }
}

export default Profil