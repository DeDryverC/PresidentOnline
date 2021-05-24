import React, { Component } from 'react';

/* ATTENTION , React est build pour find directement dans le dossier public, donc les images viennent du dossier /frontend/public/cartes/..*/


class Carte extends Component {


    imageClick = () => {
        console.log('clickclickboom')
    }

    render(){
        return(
            <div id='divcards' key={this.props.index} style={this.props.style}>
                {this.props.identity === 'usercards' ? 
                    <img src={'cartes/'+this.props.num+'.png'} alt={this.props.num} key={this.props.index} id={this.props.identity} onClick={() => this.props.action(this.props.num)}/> 
                    : 
                    <img src={'cartes/'+this.props.num+'.png'} alt={this.props.num} key={this.props.index} id={this.props.identity} />}
            </div>
        )
    }
}
export default Carte;