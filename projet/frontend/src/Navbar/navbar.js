import React, {userState, useEffect} from 'react'
import "./navbar.css"

export default function Navbar(){
    return (
    <nav>
        <ul className="liste">
            <li className ="pagesdiff"> Home </li>
            <li className ="pagesdiff"> Sign In </li>
            <li className ="pagesdiff"> Log In </li>
            <li className ="pagesdiff"> Profile </li>
            <li className ="pagesdiff"> Sign In </li>
            <li className ="pagesdiff"> Rules </li>
        </ul>
    </nav>
    )
}