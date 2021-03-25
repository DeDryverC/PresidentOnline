import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navigation.scss" 


const Navigation =() => {
    return (
        <main>
            <div className="navigationHautG"> 
                
                    <NavLink to="/" exact className ="hover" activeClassName='nav-active'>
                         <h1>Président Online </h1>
                    </NavLink>
                
            </div>
            <div className="navigationHautD"> 

                        <h2> Account </h2>
                        <NavLink to="/signin" className ="hover" activeClassName='nav-active'> 
                            <h4>Sign In</h4>
                        </NavLink>
                        <NavLink to="/login" className ="hover" activeClassName='nav-active'> 
                            <h4>Log In</h4>
                        </NavLink>

                        <li className="nav-profil"> Profile
                            <ul classname="comp-profil">
                                <NavLink to="/stats" className ="hover" activeClassName='nav-active'> 
                                <li>Stats</li>
                                </NavLink>
                                <NavLink to="/myprofile" className ="hover" activeClassName='nav-active'> 
                                <li>Me</li>
                                </NavLink>
                                <NavLink to="/historique" className ="hover" activeClassName='nav-active'> 
                                <li>Historique</li>
                                </NavLink>
                            </ul>
                       </li>
                
            </div>
            <div className="navigation"> 
                <h2> Menu </h2>
                <ul>
                    <li>
                        <NavLink to="/howto" exact className ="hover" activeClassName='nav-active'>
                            How to play ?
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/rules" exact className ="hover" activeClassName='nav-active'>
                            Rules
                        </NavLink>
                    </li>
                </ul>
            </div>
        </main>
    );
};

export default Navigation;