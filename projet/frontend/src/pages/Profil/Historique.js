import React from "react";
import NavigationProfil from "../../components/NavigationProfil";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class Historique extends React.Component {

    constructor(props) {
        super(props);
       
        this.state={
            id:'2',
            donnees:[],


   
        }
      }
      componentDidMount(){
        
        fetch(`http://localhost:5000/getHistory/${this.state.id}`)
          .then(response => response.json())
          .then(json => {
            this.setState({donnees: json})
            
            console.log(this.state.donnees)
            
            
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
                        <h2 style={{textAlign: "center", fontSize: 50, color:'white',marginTop:'5%'}}> Games : </h2><br></br><br></br>
                        

                        
                    </Col>
                    
                </Row>     
                    
            </html>
        );
    }
}

export default Historique