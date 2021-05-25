import React from "react";
import NavigationHisto from "../../components/NavigationHisto";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
//import Container from 'react-bootstrap/Container'
//import ListItem from '@material-ui/core/ListItem';

class Historique extends React.Component {

    constructor(props) {
        super(props);
       
        this.state={
            id:localStorage.getItem('Pseudo'),
            donnees:[],


   
        }
      }
      componentDidMount(){
        
        fetch(`http://localhost:5000/history/${this.state.id}`)
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
                            <NavigationHisto />
                        </div> 
                    </Col> 
                </Row>
                <Row>
                    <Col>
                        <h2 style={{textAlign: "center", fontSize: 50, color:'white',marginTop:'5%'}}> Games : </h2><br></br><br></br>
                        {
                            this.state.donnees.map((l, i) => (
                                
                                    <Col>
                                        <h2 className="mt-5" style={{color:'white',textAlign: "center"}}> Game of the {l.Date} : Position {l.Position} </h2>
                                    </Col> 
                                
                                
                            
                            ))
                        }
                    </Col>
                    
                </Row>     
                    
            </html>
        );
    }
}

export default Historique