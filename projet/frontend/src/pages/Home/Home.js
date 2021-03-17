import React from "react";

export default function Home(){
    return (
        <html>
            <div class="hautpage">
                <h1 class="titre">Président Online</h1>
                <h2 class="account">Account section</h2>
                <button class="boutAcc">Log in</button>
                <button class="boutAcc">Sign in</button>
            </div>
            <div class="menuGauche">
                <h2 class="menu">Menu</h2>
                <h4 class="menuItem" onclick='hello world'>How to play</h4>
                <h4 class="menuItem" onclick='hello world'>Rules</h4>
            </div>
            <div class="create">
                <button onclick=''> Create Game </button>
            </div>
            <div class="zoneFind">
                <h2 class="menu">Find games</h2>
                <ul>
                    <li>game 1</li>
                    <li>game 2</li>
                    <li>game 3</li>
                </ul>
            </div>
        </html>

    )
}