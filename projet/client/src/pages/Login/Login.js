import React from "react";
import NavigationAutres from "../../components/NavigationAutres";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import CookieConsent from 'react-cookie-consent';

class Signin extends React.Component {

    constructor(props) {
        super(props);
       
        this.state={
            email:'',
            password:'',
            bdd:'',
            emailsPassbdd:'',
            connected:false,
            passwordtest:'',
            
   
        }
        

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      

      

      handleSubmit(event) {
        event.preventDefault();
        


        
       

        for (let i=0; i<this.state.bdd.length;i++){
            if (this.state.email !== this.state.bdd[i].Email){
            }
            else{
                //alert("Mail in bdd")
                this.state.passwordtest = this.state.bdd[i].Password
                /*let pass=this.state.password
                var bcrypt = require('bcryptjs');
                bcrypt.genSalt(10,function(err,salt){
                    bcrypt.hash(pass, salt, function(err, hash){
                    })
                })*/
                
                var bcrypt = require('bcryptjs');
                bcrypt.compare( this.state.password,this.state.bdd[i].Password, function(err,res){
                    if(res){
                        
                        localStorage.setItem('Connect', true)
                        
                        window.location.href= "http://135.125.101.210/"
                        }
                       
                })
                
                localStorage.setItem('Email', this.state.email)
                localStorage.setItem('Pseudo', this.state.bdd[i].Pseudo)
                localStorage.getItem('Connect')
                /*
                localStorage.setItem('Connect', true)
                localStorage.setItem('Email', this.state.email)
                localStorage.setItem('Pseudo', this.state.bdd[i].Pseudo)
                localStorage.getItem('Connect')
                window.location.href= "http://135.125.101.210/" */
            }
        }
      }

      componentDidMount(){
        localStorage.setItem('Connect',false)
          fetch('http://135.125.101.210:5000/loginall')
          .then(response => response.json())
          .then(json => {
            
            this.setState({bdd: json})
            
          })
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
                                <Col className="mt-5">
                                    <label style={{textAlign: "center", fontSize: 30, color:'white',marginTop:'10%',marginLeft:'33%',marginRight:'67%'}}>
                                        Email :
                                        <input type="text" value={this.state.email} onChange={text => this.setState({email: text.target.value})} />
                                    </label>
                                </Col>
                                <Col className="mt-5">
                                    <label style={{textAlign: "center", fontSize: 30, color:'white',marginTop:'4%',marginLeft:'33%',marginRight:'67%'}}>
                                        Password :
                                        <input type="password" value={this.state.password} onChange={text => this.setState({password: text.target.value})} />
                                    </label>
                                    <br></br><br></br><br></br>
                                    <input style={{textAlign: "center", fontSize: 45, color:'red',marginTop:'5%', marginLeft:'39%'}} type="submit" value="Connexion" />
                                </Col>
                            </Container>
                        </form>  
                    </Col>
                </Row> 
                <CookieConsent
                                onAccept={localStorage.setItem('Cookies',true)}
                                location="bottom"
                                style={{ backgroundColor : 'DarkRed', fontSize:20}}
                                buttonStyle={{backgroundColor:"palegoldenrod", fontSize:20}}
                                buttonText="I agree !"
                                expires={365}>
                             
                                This website uses cookies, accept them to remove the banner
                </CookieConsent>    
            </html>
        );
    }
}

export default Signin