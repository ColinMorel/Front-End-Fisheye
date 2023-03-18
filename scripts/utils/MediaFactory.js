class MediaFactory{
    /* Static permet de pouvoir appeler directement la fonction */
    static createMediaElement(mediaType){
        if(mediaType!== "video/mp4"){
            return document.createElement("img");
        } 
        return document.createElement("video");
    }
}