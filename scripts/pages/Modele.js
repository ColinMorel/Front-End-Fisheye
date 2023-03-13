class Modele{    
    getPhotographers(){
        return fetch("././data/photographers.json")
        .then((resp)=>{return resp.json()})
        .then(function(data){
            return data.photographers; //return le tableau d'objet des photographeurs
        });
    }

    getAPhotographer(id){
        return fetch("././data/photographers.json")
        .then((resp)=>{return resp.json()})
        .then(function(data){
            for(let i=0;i<data.photographers.length;i++){
                if(data.photographers[i].id == id){
                    return data.photographers[i];
                }
            }
        });
    }

    getMediasOfAPhotographer(id){
        let mediasOfThePhotographer = [];
        return fetch("././data/photographers.json")
        .then((resp)=>{return resp.json()})
        .then(function(data){
            for(let i=0;i<data.media.length;i++){
                if(data.media[i].photographerId == id){
                    mediasOfThePhotographer.push(data.media[i]);
                }
            }
            return mediasOfThePhotographer; //return le tableau d'objet des photographeurs
        });
    }

}