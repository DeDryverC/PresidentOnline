import React from 'react';
import { NavLink } from 'react-router-dom';
import "./NavigationAutres.css" 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'



const NavigationAutres =() => {
    return (
        <main>
            <Container fluid="lg"> 
                <Row>
                    <Col md="auto" style = {{
                        border: '2px solid moccasin',
                        borderRadius: '10px',
                        backgroundColor: 'palegoldenrod'
                        }}>
                        <NavLink to="/" exact className ="hover" activeClassName='nav-active'>
                            <h1 style={{
                                fontSize: 64,
                                }}>Président Online</h1>
                        </NavLink>
                    </Col>
                    <Col/>
                    <Col/>
                    <Col/>
                </Row>
            </Container>
        </main>
    );
};

export default NavigationAutres;