

function test(){
    var pot=[];
    let carte1=prompt('valeur de la carte')
    let carte2=prompt('valeur de la carte 2')
  

    pot.push(parseInt(carte1));

    if(carte2>carte1){
        pot=[carte2]
    }

    else if(carte2==2){
        pot=[]
    }
    else{
        
            while(carte2<carte1){
                alert("vous ne pouvez pas jouer plus petit que " + pot[0])
                carte2=prompt("entrez une carte plus haute que " + pot[0])
        }
    }
    
}