
import React from "react";
import NavigationCreate from "../../components/NavigationCreate";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class CreateGame extends React.Component {

    constructor(props) {
        super(props);
       
        this.state={
        }
      }



    render() {
        return (
            <html>
                <Row>  
                    <Col>
                        <div class="hautpage">
                            <NavigationCreate />
                        </div> 
                    </Col> 
                </Row>
                   
            </html>
        );
    }
}

export default CreateGame