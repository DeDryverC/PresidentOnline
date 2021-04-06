import React from "react";
import NavigationAutres from "../../components/NavigationAutres";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class Signin extends React.Component {

    constructor(props) {
        super(props);
       
        this.state={
            name:'',
            surname:'',
            pseudo:'',
            email:'',
            birthDate:'',
            password:'',
            confirmPassword:'',
            
        }
        

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      

      handleSubmit(event) {

        if(this.state.password != this.state.confirmPassword){
            alert("Password doesn't match")
        }
        else{
        console.log('Le nom a été soumis : ' + this.state.name);
        console.log('Le prenom a été soumis : ' + this.state.surname);
        console.log('Le pseudo a été soumis : ' + this.state.pseudo);
        console.log('La date de naissance a été soumis : ' + this.state.birthDate);
        console.log('Le mail a été soumis : ' + this.state.email);
        console.log('Le password a été soumis : ' + this.state.password);
        console.log('Le confirmPassword a été soumis : ' + this.state.confirmPassword);
        console.log(this.state)
        }
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
                                Name :
                            <input type="text" value={this.state.nom}  onChange={text => this.setState({name: text.target.value})} />
                            </label><br></br>
                            <label>
                                Surname :
                            <input type="text" value={this.state.prenom} onChange={text => this.setState({surname: text.target.value})} />
                            </label><br></br>
                            <label>
                                Pseudo :
                            <input type="text" value={this.state.pseudo} onChange={text => this.setState({pseudo: text.target.value})} />
                            </label><br></br>
                            <label>
                                Email :
                            <input type="text" value={this.state.email} onChange={text => this.setState({email: text.target.value})} />
                            </label>
                            <label>
                                Birthdate :
                            <input type="text" value={this.state.dateNaiss} onChange={text => this.setState({birthDate: text.target.value})} />
                            </label><br></br>
                            <label>
                                Password :
                            <input type="text" value={this.state.password} style={{}} onChange={text => this.setState({password: text.target.value})} />
                            </label>
                            <label>
                                Confirm your password :
                            <input type="text" value={this.state.confirmPassword} onChange={text => this.setState({confirmPassword: text.target.value})} />
                            </label>
                            <br></br><br></br><br></br>
                            <input type="submit" value="S'inscrire" />
                        </form>  
                    </Col>
                </Row>     
            </html>
        );
    }
}

export default Signin