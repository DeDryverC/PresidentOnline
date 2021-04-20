import React from 'react';
import { NavLink } from 'react-router-dom';
import "./NavigationHome.css" 
import { ButtonGroup, Button, Row, Col, Container } from 'react-bootstrap'
import { useState } from 'react'

const HomeButton = (props) => {
    return <Button variant="outline-info" size="lg" onClick={props.changeState.howto}> How to ? </Button>
}

export default HomeButton