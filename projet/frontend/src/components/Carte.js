import React from 'react'

/* ATTENTION , React est build pour find directement dans le dossier public, donc les images viennent du dossier /frontend/public/cartes/..*/
const Carte = ({ num, index }) => {
    

    return(
        <div id='divcards' key={index}>
    
            <img src={'cartes/'+num+'.png'} alt={num} key={index} id="cards"/>
            
        </div>
    )
}
export default Carte;