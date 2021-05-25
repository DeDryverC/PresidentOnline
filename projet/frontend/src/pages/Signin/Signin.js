import React from "react";
import NavigationAutres from "../../components/NavigationAutres";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'




class Signin extends React.Component {

    constructor(props) {
        super(props);
       
        this.state={
            /*name:'flo',
            surname:'zz',
            pseudo:'zz',
            email:'zz',
            birthDate:'zz',
            password:'zz',
            confirmPassword:'zz',
            gameCount:'0'*/
            name:'',
            surname:'',
            pseudo:'',
            email:'',
            birthDate:'',
            password:'',
            confirmPassword:'',
            gameCount:'0',
            testsign:false
        }
        

        this.handleSubmit = this.handleSubmit.bind(this);
      }

  

    handleSubmit(event) {
        

        if(this.state.name === '' || this.state.surname === '' || this.state.pseudo === '' || this.state.birthDate === '' || this.state.email === '' || this.state.password === '' || this.state.confirmPassword === '' ){
            alert("You forget to fill a field")
        }
        
        else if(this.state.email.includes('@') === false || this.state.email.includes('.') === false || this.state.email.length < 10) {
            alert("insert a valid email address")
        }


        else if(this.state.password !== this.state.confirmPassword){
            let simpleAlertHandler = () => {
                alert("Passwords didn't match !");
              };
              simpleAlertHandler();
              return;
        }

        else if(this.state.password.length<8 || this.state.password.match(/\d+/) == null || this.state.password === this.state.password.toLowerCase()){
            alert("password not hard enough")
        }

        else{
        /*console.log('Le nom a été soumis : ' + this.state.name);
        console.log('Le prenom a été soumis : ' + this.state.surname);
        console.log('Le pseudo a été soumis : ' + this.state.pseudo);
        console.log('La date de naissance a été soumis : ' + this.state.birthDate);
        console.log('Le mail a été soumis : ' + this.state.email);
        console.log('Le password a été soumis : ' + this.state.password);
        console.log('Le confirmPassword a été soumis : ' + this.state.confirmPassword);
        console.log('Le gameCount a été soumis : ' + this.state.gameCount);
        console.log(this.state)*/

        event.preventDefault();
        fetch('http://localhost:5000/sign',{
             
              method:'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"true"
              },
              body: JSON.stringify({
                pseudo:this.state.pseudo,
                name:this.state.name,
                surname:this.state.surname,      
                email:this.state.email,
                birthDate:this.state.birthDate,
                password:this.state.password,
                gameCount:this.state.gameCount
              }),
              
              
            }).then(response => response.json())
            .then(json => {
                    console.log(json.message)
                
        
                
              }).catch((error) => {
               
                
                
                alert("Echec d'inscription'. Réessayez.");
                
          });
          alert("Inscription terminée !")
          window.location.href= "https://president-online.netlify.app/"
          //window.location.href= "http://localhost:3000/"
        };
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
                            <Container>
                            <Row>
                                <Col className="mt-5">
                                    <label style={{textAlign: "center", fontSize: 30, color:'white',marginTop:'15%',marginLeft:'15%'}}>
                                        Name :
                                        <input type="text" value={this.state.name}  onChange={text => this.setState({name: text.target.value})} />
                                    </label>
                                </Col >
                                <Col className="mt-5">
                                    <label style={{textAlign: "center", fontSize: 30, color:'white',marginTop:'15%',marginLeft:'10%'}}>
                                        Surname :
                                        <input type="text" value={this.state.surname} onChange={text => this.setState({surname: text.target.value})} />
                                    </label>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col className="mt-5">
                                    <label style={{textAlign: "center", fontSize: 30, color:'white',marginTop:'15%',marginLeft:'15%'}}>
                                    Pseudo :
                                    <input type="text" value={this.state.pseudo} onChange={text => this.setState({pseudo: text.target.value})} />
                                    </label>
                                </Col>
                                <Col className="mt-5">
                                    <label style={{textAlign: "center", fontSize: 30, color:'white',marginTop:'15%',marginLeft:'15%',marginRight:'5%'}}>
                                        Email :
                                        <input type="text" value={this.state.email} onChange={text => this.setState({email: text.target.value})} />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-5">
                                    <label style={{textAlign: "center", fontSize: 30, color:'white',marginTop:'15%',marginLeft:'15%'}}>
                                        Birthdate :
                                        <input type="text" value={this.state.birthDate} onChange={text => this.setState({birthDate: text.target.value})} />
                                    </label>
                                </Col>
                                <Col>
                                    <label style={{textAlign: "center", fontSize: 30, color:'white',marginTop:'15%',marginLeft:'10%'}}>
                                        Password :
                                        <input type="password" value={this.state.password} secureTextEntry={true} style={{}} onChange={text => this.setState({password: text.target.value})} />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-5">
                                    <label style={{textAlign: "center", fontSize: 30, color:'white',marginTop:'8%',marginLeft:'36%',marginRight:'40%'}}>
                                        Confirm your password :
                                        <input type="password" value={this.state.confirmPassword} secureTextEntry={true} onChange={text => this.setState({confirmPassword: text.target.value})} />
                                    </label>
                                </Col>
                            </Row>
                            
                            
                            <input style={{textAlign: "center", fontSize: 35, color:'red',marginTop:'5%', marginLeft:'48%'}} type="submit" value="S'inscrire" />
                            </Container> 
                        </form>  
                    </Col>
                </Row>   
                 
            </html>
        );
    }
}

export default Signin
