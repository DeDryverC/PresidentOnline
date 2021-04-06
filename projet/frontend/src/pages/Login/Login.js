
import React from "react";
import NavigationAutres from "../../components/NavigationAutres";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class Signin extends React.Component {

    constructor(props) {
        super(props);
       
        this.state={
            email:'',
            password:'',
   
        }
        

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      

      handleSubmit(event) {
        console.log('Le mail a été soumis : ' + this.state.email);
        console.log('Le password a été soumis : ' + this.state.password);

        console.log(this.state)
        event.preventDefault();
      }


    render() {
        return (
            <html>
                <Row>  
                    <Col>
                        <div class="hautpage">
                            <NavigationAutres />
                        </div> 
                    </Col> 
                </Row>
                <Row>
                    <Col>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Email :
                            <input type="text" value={this.state.email} onChange={text => this.setState({email: text.target.value})} />
                            </label>
                           
                            <label>
                                Password :
                            <input type="text" value={this.state.password} onChange={text => this.setState({password: text.target.value})} />
                            </label>
                            <br></br><br></br><br></br>
                            <input type="submit" value="Connexion" />
                        </form>  
                    </Col>
                </Row>     
            </html>
        );
    }
}

export default Signin