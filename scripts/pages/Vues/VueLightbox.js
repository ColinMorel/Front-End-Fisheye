class VueLightbox{
    lightboxHandler(){
        this.body = document.querySelector("body");
        this.lightboxModal = document.getElementById("lightboxModal");
        this.lightboxMediaDiv = document.querySelector("#lightboxMediaDiv");
        this.lightboxLeftArrowIcon = document.getElementById("lightboxLeftArrow");
        this.lightboxRightArrowIcon = document.getElementById("lightboxRightArrow");
        this.lightboxCloseIcon = document.getElementById("lightboxClose");
        
        this.photographerMedias = document.querySelectorAll(".photographerMediaCardImgOrVideo");
        this.listSrcOfMedias = [];
        this.indexOfCurrentSrcOfMedia;
        this.lightboxMedia;
        this.currentSrcOfMedia;
        this.isNextMediaAsked = false;

        for(let medias of this.photographerMedias){
            this.listSrcOfMedias.push(medias.src);
            medias.addEventListener("click",(e)=>{
                this.lightboxMedia = MediaFactory.createMediaElement(e.target.type);

                this.lightboxMedia.classList.add("lightboxMedia");
                this.lightboxMediaDiv.appendChild(this.lightboxMedia);
                
                /*Je donne à l'élement lightboxMedia que je viens de créer dans ma mediafactory, la src du media sur lequel je clique, pour l'afficher en gros dans ma lightbox*/
                this.lightboxMedia.src=e.target.src;
                this.lightboxModal.style.display="flex";
                this.body.style.overflow="hidden";
                this.currentSrcOfMedia = e.target.src;
                this.indexOfCurrentSrcOfMedia = this.listSrcOfMedias.indexOf(this.currentSrcOfMedia);
                console.log(`index du media cliqué : ${this.indexOfCurrentSrcOfMedia}`);

                /*Listener de : si j'appui sur esc, ou les fleches ; si j'appuis sur le logo*/ 
                this.keypressFunction(this.lightboxModal,this.lightboxMediaDiv,this.body,this.listSrcOfMedias,this.indexOfCurrentSrcOfMedia,medias.likes);
                this.lightboxLeftArrowIcon.addEventListener("click",()=>this.showPrevMedia(this.listSrcOfMedias,this.indexOfCurrentSrcOfMedia,this.lightboxMediaDiv,this.lightboxMedia));
                this.lightboxRightArrowIcon.addEventListener("click",()=>this.showNextMedia(this.listSrcOfMedias,this.indexOfCurrentSrcOfMedia,this.lightboxMediaDiv,this.lightboxMedia));
            })            
        } 
        this.lightboxCloseIcon.addEventListener("click",()=>{
            this.lightboxModal.style.display="none";
            this.body.style.overflow="scroll";
            this.lightboxMediaDiv.removeChild(this.lightboxMedia);
        });
    }

    keypressFunction(lightboxModal,lightboxMediaDiv,body,listSrcOfMedias,indexOfCurrentSrcOfMedia,mediaLikes){
        document.onkeydown = (e) => {
            let nextMedia;
            let lightboxMedia = document.querySelector(".lightboxMedia");
            let listMediaLikes = document.querySelectorAll(".photographerMediaCardLikesDiv p");
            let listLikes = [];
            for(let i=0;i<listMediaLikes.length;i++){
                listLikes[i] = listMediaLikes[i].innerHTML;
            }
            if(e.key == "Escape"){
                lightboxModal.style.display="none";
                body.style.overflow="scroll";
                lightboxMediaDiv.removeChild(lightboxMediaDiv.children[1]);
            }
            else if(e.key == "ArrowLeft"){
                nextMedia = this.showPrevMedia(listSrcOfMedias,indexOfCurrentSrcOfMedia,lightboxMediaDiv,lightboxMedia);
                indexOfCurrentSrcOfMedia = nextMedia[0];
                
            }
            else if(e.key == "ArrowRight"){
                nextMedia = this.showNextMedia(listSrcOfMedias,indexOfCurrentSrcOfMedia,lightboxMediaDiv,lightboxMedia);
                indexOfCurrentSrcOfMedia = nextMedia[0];
            }
            else if(e.key == " "){
                if(lightboxMedia.tagName == "VIDEO"){
                    if(lightboxMedia.isrunning !== true){
                        lightboxMedia.play();
                        lightboxMedia.isrunning = true;
                    }
                    else{
                        lightboxMedia.pause();
                        lightboxMedia.isrunning = false;
                    }                    
                }
            }
            else if(e.key == "a"){
                console.log(`Likes de ce media : ${listLikes[indexOfCurrentSrcOfMedia]}`)
            }
        };
    }

    showPrevMedia(listSrcOfMedias,indexOfCurrentSrcOfMedia,lightboxMediaDiv,lightboxMedia){
        let currentMediaExtension = listSrcOfMedias[indexOfCurrentSrcOfMedia].split(".").pop();
        let otherMediaExtension;
        if(indexOfCurrentSrcOfMedia == 0){
            otherMediaExtension = listSrcOfMedias[listSrcOfMedias.length-1].split(".").pop();
            this.extensionHandling(currentMediaExtension,otherMediaExtension,lightboxMediaDiv,lightboxMedia);
            lightboxMedia=document.querySelector(".lightboxMedia");
            lightboxMedia.src=listSrcOfMedias[listSrcOfMedias.length-1];
            indexOfCurrentSrcOfMedia = listSrcOfMedias.length-1;
        }
        else{
            otherMediaExtension = listSrcOfMedias[indexOfCurrentSrcOfMedia-1].split(".").pop();
            this.extensionHandling(currentMediaExtension,otherMediaExtension,lightboxMediaDiv,lightboxMedia);
            lightboxMedia=document.querySelector(".lightboxMedia");
            this.mediaDecrease(listSrcOfMedias,indexOfCurrentSrcOfMedia,lightboxMedia);
            indexOfCurrentSrcOfMedia -= 1;
        }
        let nextMedia = [ indexOfCurrentSrcOfMedia, lightboxMedia];
        return nextMedia;    
    }

    showNextMedia(listSrcOfMedias,indexOfCurrentSrcOfMedia,lightboxMediaDiv,lightboxMedia){
        let currentMediaExtension = listSrcOfMedias[indexOfCurrentSrcOfMedia].split(".").pop();
        let otherMediaExtension;
        
        /* Test si on est sur le dernier media de la page, si oui on passe au premier*/
        if(indexOfCurrentSrcOfMedia == listSrcOfMedias.length-1){
            otherMediaExtension = listSrcOfMedias[0].split(".").pop();
            
            lightboxMedia=this.extensionHandling(currentMediaExtension,otherMediaExtension,lightboxMediaDiv,lightboxMedia);
            lightboxMedia.src=listSrcOfMedias[0];
            indexOfCurrentSrcOfMedia = 0;
        }
        else{

            otherMediaExtension = listSrcOfMedias[indexOfCurrentSrcOfMedia+1].split(".").pop();
            this.extensionHandling(currentMediaExtension,otherMediaExtension,lightboxMediaDiv,lightboxMedia);
            lightboxMedia=document.querySelector(".lightboxMedia");
            this.mediaIncrease(listSrcOfMedias,indexOfCurrentSrcOfMedia,lightboxMedia);                
            indexOfCurrentSrcOfMedia += 1;                
        }
        let nextMedia = [ indexOfCurrentSrcOfMedia, lightboxMedia];
        return nextMedia;
    }

    extensionHandling(currentExtension,otherExtension,lightboxMediaDiv,lightboxMedia){
        let newChild;
        
        /* Test si on va avoir un changement d'extension */
        if(currentExtension !== otherExtension){
            // console.log(`Extension change, on passe de ${currentExtension} à ${otherExtension}, et on va enlever :`)
            lightboxMediaDiv.removeChild(lightboxMediaDiv.children[1]);

            /* Si on va arriver sur un media vidéo, alors , sinon ?*/
            if(otherExtension == "mp4"){
                newChild = document.createElement("video");
            }
            else{
                newChild = document.createElement("img");
            }
            newChild.classList.add("lightboxMedia");
            lightboxMediaDiv.appendChild(newChild);
            return newChild;
        }
        return document.querySelector(".lightboxMedia");
    }

    mediaIncrease(listSrcOfMedias,indexOfCurrentSrcOfMedia,lightboxMedia){        
        lightboxMedia.src=listSrcOfMedias[indexOfCurrentSrcOfMedia+1];
    }
    mediaDecrease(listSrcOfMedias,indexOfCurrentSrcOfMedia,lightboxMedia){
        lightboxMedia.src=listSrcOfMedias[indexOfCurrentSrcOfMedia-1];
    }
}