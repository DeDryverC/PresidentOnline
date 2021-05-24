import React from "react";
import NavigationAutres from "../../components/NavigationAutres";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

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
        

        /*let pass=this.state.password
        var bcrypt = require('bcryptjs');
        bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(pass, salt, function(err, hash){
                    console.log(hash)
                })
            })*/

        
        //console.log(this.state.email)
        //console.log(typeof(this.state.email))
        //console.log(this.state.emailsbdd)
        //console.log(this.state.password)
        //console.log(this.state.bdd)
       

        for (let i=0; i<this.state.bdd.length;i++){
            //console.log(this.state.email)
            if (this.state.email != this.state.bdd[i].Email){
                //console.log("unknown mail")
            }
            else{
                //alert("Mail in bdd")
                this.state.passwordtest= this.state.bdd[i].Password
                /*let pass=this.state.password
                var bcrypt = require('bcryptjs');
                bcrypt.genSalt(10,function(err,salt){
                    bcrypt.hash(pass, salt, function(err, hash){
                        console.log(hash)
                    })
                })*/
                
                //console.log(this.state.password)
                //console.log(this.state.bdd[i].Password)
                var bcrypt = require('bcryptjs');
                bcrypt.compare( this.state.password,this.state.bdd[i].Password, function(err,res){
                    console.log(res)
                    console.log(err)
                    if(res){
                        console.log(null , {message: "logged"});
                        
                        }else{
                          console.log(null , {message:'error'});
                          
                        } 
                       
                })

                console.log(this.state.connected)
                localStorage.setItem('Connect', true)
                localStorage.setItem('Email', this.state.email)
                localStorage.setItem('Pseudo', this.state.bdd[i].Pseudo)
                localStorage.getItem('Connect')
                window.location.href= "http://localhost:3000/"
            }
        }
      }

      componentDidMount(){
        localStorage.setItem('Connect',false)
          fetch('http://localhost:5000/loginall')
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
                                <Col>
                            <label style={{textAlign: "center", fontSize: 30, color:'white',marginTop:'10%',marginLeft:'67%'}}>
                                Email :
                            <input type="text" value={this.state.email} onChange={text => this.setState({email: text.target.value})} />
                            </label>
                            </Col>
                            <Col>
                            <label style={{textAlign: "center", fontSize: 30, color:'white',marginTop:'10%',marginLeft:'67%'}}>
                                Password :
                            <input type="password" value={this.state.password} onChange={text => this.setState({password: text.target.value})} />
                            </label>
                            <br></br><br></br><br></br>
                            <input style={{textAlign: "center", fontSize: 45, color:'red',marginTop:'8%', marginLeft:'73%'}} type="submit" value="Connexion" />
                            </Col>
                            </Container>
                        </form>  
                    </Col>
                </Row>     
            </html>
        );
    }
}

export default Signin