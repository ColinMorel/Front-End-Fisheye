class VueLightbox{
    lightboxHandler(keypress,mediaEnter){
        this.body = document.querySelector("body");
        this.main = document.querySelector("main");  
        this.lightboxModal = document.getElementById("lightboxModal");
        this.lightboxMediaDiv = document.querySelector("#lightboxMediaDiv");
        this.lightboxLeftArrowIcon = document.getElementById("lightboxLeftArrow");
        this.lightboxRightArrowIcon = document.getElementById("lightboxRightArrow");
        this.lightboxCloseIcon = document.getElementById("lightboxClose");
        this.lightboxClosePressed = false;
        this.lightboxLeftArrowPressed = false;
        this.lightboxRightArrowPressed = false;

        
        this.photographerMedias = document.querySelectorAll(".photographerMediaCardImgOrVideo");
        this.listSrcOfMedias = [];
        this.listTitlesOfMedias = [];
        this.indexOfCurrentSrcOfMedia;
        this.lightboxMedia;
        this.currentSrcOfMedia;
        this.isNextMediaAsked = false;

        this.lightboxCloseIcon.tabIndex=1;
        this.lightboxLeftArrowIcon.tabIndex=2;
        this.lightboxRightArrowIcon.tabIndex=3;

        for(let medias of this.photographerMedias){
            this.listSrcOfMedias.push(medias.src);
            this.listTitlesOfMedias.push(medias.alt)
            medias.addEventListener("click",(e)=>{
                this.lightboxShow(e.target)
                this.currentMediaTitle.innerHTML = medias.alt;
            })
        };

        if(keypress){
            this.lightboxShow(mediaEnter);
        }        
    }
    lightboxShow(mediaStart){
        this.lightboxMedia = MediaFactory.createMediaElement(mediaStart.type);
        this.lightboxMedia.classList.add("lightboxMedia");
        this.lightboxMediaDiv.appendChild(this.lightboxMedia);
        this.main.style.display="none";

        console.log(this.listTitlesOfMedias)


        /*Je donne à l'élement lightboxMedia que je viens de créer dans ma mediafactory, la src du media sur lequel je clique, pour l'afficher en gros dans ma lightbox*/
        this.lightboxMedia.src=mediaStart.src;
        this.lightboxModal.style.display="flex";
        this.body.style.overflow="hidden";
        this.main.classList.add="hidden";
        this.currentSrcOfMedia = mediaStart.src;
        this.currentMediaTitle = document.getElementById("currentMediaTitle");
        this.currentMediaTitle.innerHTML = mediaStart.alt;
        this.indexOfCurrentSrcOfMedia = this.listSrcOfMedias.indexOf(this.currentSrcOfMedia);

        this.keypressFunction(this.lightboxModal,this.lightboxMediaDiv,this.body,this.listSrcOfMedias,this.indexOfCurrentSrcOfMedia);
        this.isIconeClicked(this.indexOfCurrentSrcOfMedia,this.listSrcOfMedias,this.lightboxMediaDiv,this.lightboxMedia,this.currentMediaTitle,this.listTitlesOfMedias);
        this.isIconeFocusedAndSelected(this.indexOfCurrentSrcOfMedia,this.listSrcOfMedias,this.lightboxMediaDiv,this.lightboxMedia,this.currentMediaTitle,this.listTitlesOfMedias);
    }
    isIconeClicked(indexOfCurrentSrcOfMedia,listSrcOfMedias,lightboxMediaDiv,lightboxMedia,currentMediaTitle,listTitlesOfMedias){
        this.lightboxLeftArrowIcon.addEventListener("click",()=>{
            indexOfCurrentSrcOfMedia = this.showPrevMedia(listSrcOfMedias,indexOfCurrentSrcOfMedia,lightboxMediaDiv,lightboxMedia);            
            currentMediaTitle.innerHTML = listTitlesOfMedias[indexOfCurrentSrcOfMedia]
        });
        this.lightboxRightArrowIcon.addEventListener("click",()=>{
            indexOfCurrentSrcOfMedia = this.showNextMedia(listSrcOfMedias,indexOfCurrentSrcOfMedia,lightboxMediaDiv,lightboxMedia);
            currentMediaTitle.innerHTML = listTitlesOfMedias[indexOfCurrentSrcOfMedia];
        });
        this.lightboxCloseIcon.addEventListener("click",()=>{
            this.lightboxModal.style.display="none";
            this.body.style.overflow="scroll";
            this.main.style.display="flex";
            while(lightboxMediaDiv.children[1]){
                lightboxMediaDiv.removeChild(lightboxMediaDiv.children[1]);
            }
        });
    }
    isIconeFocusedAndSelected(indexOfCurrentSrcOfMedia,listSrcOfMedias,lightboxMediaDiv,lightboxMedia){
        this.lightboxLeftArrowIcon.addEventListener("keypress",(e)=>{
            if(e.key === "Enter"){
                indexOfCurrentSrcOfMedia = this.showPrevMedia(listSrcOfMedias,indexOfCurrentSrcOfMedia,lightboxMediaDiv,lightboxMedia);
                console.log("Left arrow focused and entered");
                this.currentMediaTitle.innerHTML = this.listTitlesOfMedias[indexOfCurrentSrcOfMedia]
            }
        })       
        this.lightboxRightArrowIcon.addEventListener("keypress",(e)=>{
            if(e.key === "Enter"){
                indexOfCurrentSrcOfMedia = this.showNextMedia(listSrcOfMedias,indexOfCurrentSrcOfMedia,lightboxMediaDiv,lightboxMedia);
                console.log("Right arrow focused and entered")
                this.currentMediaTitle.innerHTML = this.listTitlesOfMedias[indexOfCurrentSrcOfMedia]
            }
        })
        this.lightboxCloseIcon.addEventListener("keypress",(e)=>{
            if(e.key === "Enter"){
                this.lightboxModal.style.display="none";
                this.body.style.overflow="scroll";
                this.main.style.display="flex";
                while(lightboxMediaDiv.children[1]){
                    lightboxMediaDiv.removeChild(lightboxMediaDiv.children[1]);
                }
            }
        })
    }
    keypressFunction(lightboxModal,lightboxMediaDiv,body,listSrcOfMedias,indexOfCurrentSrcOfMedia){
         document.onkeydown = (e) => {
            let lightboxMedia = document.querySelector(".lightboxMedia");
            let listMediaLikes = document.querySelectorAll(".photographerMediaCardLikesDiv p");
            let listLikes = [];            
            // if document.activeElement.target est img#lightboxCloseIcone ou alors les fleches etc...

            for(let i=0;i<listMediaLikes.length;i++){
                listLikes[i] = listMediaLikes[i].innerHTML;
            }
            if(e.key == "Escape"){
                lightboxModal.style.display="none";
                body.style.overflow="scroll";
                while(lightboxMediaDiv.children[1]){
                    lightboxMediaDiv.removeChild(lightboxMediaDiv.children[1]);
                }
                this.main.style.display="flex";
            }
            else if(e.key == "ArrowLeft"){
                indexOfCurrentSrcOfMedia = this.showPrevMedia(listSrcOfMedias,indexOfCurrentSrcOfMedia,lightboxMediaDiv,lightboxMedia);
                this.currentMediaTitle.innerHTML = this.listTitlesOfMedias[indexOfCurrentSrcOfMedia]
            }
            else if(e.key == "ArrowRight"){
                indexOfCurrentSrcOfMedia = this.showNextMedia(listSrcOfMedias,indexOfCurrentSrcOfMedia,lightboxMediaDiv,lightboxMedia);
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
            else{
                return;
            }
            this.currentMediaTitle.innerHTML = this.listTitlesOfMedias[indexOfCurrentSrcOfMedia]
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
        };
        return indexOfCurrentSrcOfMedia;
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
        return indexOfCurrentSrcOfMedia;
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