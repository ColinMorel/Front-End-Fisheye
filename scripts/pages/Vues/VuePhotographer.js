class VuePhotographer {
    constructor(mediasOfAPhotographer,photographerName,photographerPrice){
        this.mediasOfAPhotographer=mediasOfAPhotographer;
        this.photographerName = photographerName;
        this.priceOfAPhotographer = photographerPrice;
        const main = document.querySelector("main");
        let photographerMain = document.createElement("div");
        photographerMain.classList.add("photographerMain")
        main.appendChild(photographerMain);
        this.photographerMain = photographerMain;
        let heartTab = [];
        this.heartTab = heartTab;
    }
    displayAPhotographer(photographer) {
        const photographerHeader = document.querySelector(".photographHeader");
        let photographerNameDiv = document.createElement("div");
        photographerHeader.appendChild(photographerNameDiv);

        let photographerName = document.createElement("h1");
        photographerName.innerText = photographer.name;

        let photographerLocalisation = document.createElement("h2");
        photographerLocalisation.innerText = `${photographer.city}, ${photographer.country}`;

        let photographerTagLine = document.createElement("p");
        photographerTagLine.innerText = photographer.tagline;

        photographerNameDiv.appendChild(photographerName);
        photographerNameDiv.appendChild(photographerLocalisation);
        photographerNameDiv.appendChild(photographerTagLine);

        let photographerImage = document.createElement("img");
        photographerImage.classList.add("photographHeaderImg");
        photographerImage.src = `./././assets/SamplePhotos/PhotographersIdPhotos/${photographer.portrait}`;
        photographerImage.alt = `${photographer.portrait}`;
        photographerHeader.appendChild(photographerImage);

        //Partie gestion du formulaire

        const modalTitle = document.getElementById("modalTitle");
        modalTitle.innerText += photographer.name;
    };

    displayPageOfAPhotographer(){        
        this.displaySortButtons();
        this.displayMediasOfAPhotographer();
        this.displayTotalLikesOfAPhotographer();
    }

    displaySortButtons(){
        let photographerMainTitle = document.createElement("h2");
        photographerMainTitle.innerText = "Trier par";
        photographerMainTitle.style.margin="0";        
        let photographerSortBigDiv = document.createElement("div");
        photographerSortBigDiv.classList.add("photographerSortBigDiv");

        let photographerSort = document.createElement("div");
        photographerSort.classList.add("photographerSortDiv")
        let photographerSortPopularityDiv = document.createElement("div");
        photographerSortPopularityDiv.classList.add("photographerSortPopularityDiv")
        let photographerSortPopularity = document.createElement("div");
        photographerSortPopularity.innerHTML = "Popularité";
        photographerSortPopularity.setAttribute("aria-label","Tri par popularité");
        let photographerSortPopularityUp = document.createElement("a");
        photographerSortPopularityUp.classList.add("photographerSortPopularityUpLink");
        photographerSortPopularityUp.tabIndex=4;
               
        this.photographerMain.appendChild(photographerSortBigDiv);
        photographerSortBigDiv.appendChild(photographerMainTitle);
        photographerSortBigDiv.appendChild(photographerSort);
        photographerSortPopularityDiv.appendChild(photographerSortPopularity);
        photographerSortPopularityDiv.appendChild(photographerSortPopularityUp);
        photographerSort.appendChild(photographerSortPopularityDiv);
        let photographerSortPopularityUpImg = document.createElement("i");
        photographerSortPopularityUpImg.classList.add("fa-solid", "fa-chevron-up");
        photographerSortPopularityUp.appendChild(photographerSortPopularityUpImg);
        photographerSortPopularity.classList.add("photographerSortLink");
        photographerSortPopularity.tabIndex=3;
        let photographerSortDate = document.createElement("div");
        photographerSortDate.classList.add("photographerSortLink");
        photographerSortDate.innerHTML = "Date";
        photographerSortDate.setAttribute("aria-label","Tri par date");
        photographerSortDate.classList.add("photographerSortDate");

        let photographerSortTitle = document.createElement("div");
        photographerSortTitle.classList.add("photographerSortTitle");
        photographerSortTitle.classList.add("photographerSortLink");
        photographerSortTitle.innerHTML = "Titre";
        photographerSortTitle.setAttribute("aria-label","Tri par ordre alphabétique");
        photographerSort.appendChild(photographerSortDate);
        photographerSort.appendChild(photographerSortTitle);

        photographerSortDate.classList.add("sortHidden");
        photographerSortDate.tabIndex=5;
        photographerSortTitle.tabIndex=6;

        let photographerSortPopularityUpImgAngle = 0;
        photographerSortTitle.classList.add("sortHidden");
        photographerSortPopularityUp.addEventListener("keypress",(e)=>{
            if(e.key === "Enter"){
                photographerSortPopularityUpImgAngle = this.popularityUpClicked(photographerSortPopularityUp,photographerSortPopularityUpImg,photographerSortPopularityUpImgAngle,photographerSortDate,photographerSortTitle);
            }
        })
        photographerSortPopularityUp.addEventListener("click", () => {
            photographerSortPopularityUpImgAngle = this.popularityUpClicked(photographerSortPopularityUp,photographerSortPopularityUpImg,photographerSortPopularityUpImgAngle,photographerSortDate,photographerSortTitle);
        })

        this.addEventSortMediasOfAPhotographer(photographerSortPopularity,photographerSortTitle,photographerSortDate);
    }

    popularityUpClicked(Btn,Img,Angle,SortDate,SortTitle){
        Angle+=180;
        console.log(Angle)
        Img.style.transform=`rotate(${Angle}deg)`;
        if (Btn.isClicked) {
            Btn.isClicked = false;
            SortDate.classList.add("sortHidden");
            SortTitle.classList.add("sortHidden");
        } else {
            Btn.isClicked = true;
            SortDate.classList.remove("sortHidden");
            SortTitle.classList.remove("sortHidden");
        }
        return Angle;
    }

    displayMediasOfAPhotographer(){
        
        let photographerGrid = document.createElement("div");
        photographerGrid.classList.add("photographerGrid");
        this.photographerMain.appendChild(photographerGrid);        

        let totalLikesOfAPhotographer = 0;
        let vueLightbox = new VueLightbox();

        for (let i = 0; i < this.mediasOfAPhotographer.length; i++){
            let photographerMediaCard = document.createElement("div");
            photographerMediaCard.classList.add("photographerMediaCard");
            let photographerMediaCardImgOrVideo;

            if (this.mediasOfAPhotographer[i].video != null) {
                photographerMediaCardImgOrVideo = document.createElement("video");
                photographerMediaCardImgOrVideo.src = `./././assets/SamplePhotos/${this.photographerName}/${this.mediasOfAPhotographer[i].video}`;
                photographerMediaCardImgOrVideo.type = "video/mp4";
                photographerMediaCardImgOrVideo.controls = true;
            }
            else if (this.mediasOfAPhotographer[i].image != null) {
                photographerMediaCardImgOrVideo = document.createElement("img");
                photographerMediaCardImgOrVideo.src = `./././assets/SamplePhotos/${this.photographerName}/${this.mediasOfAPhotographer[i].image}`
            }
            else { console.log("Erreur : pas de vidéo ou d'image") }
            photographerMediaCardImgOrVideo.id = this.mediasOfAPhotographer[i].id;
            photographerMediaCardImgOrVideo.style.maxWidth = "100%";
            photographerMediaCardImgOrVideo.classList.add("photographerMediaCardImgOrVideo");
<<<<<<< HEAD
            photographerMediaCardImgOrVideo.tabIndex=6+(i+1);
            photographerMediaCardImgOrVideo.alt=this.mediasOfAPhotographer[i].title;
            photographerMediaCardImgOrVideo.setAttribute("aria-label",`${this.mediasOfAPhotographer[i].title}, sélectionnez le pour afficher sa lightbox`)

           
            photographerMediaCardImgOrVideo.addEventListener("keypress",(e)=>{
                if(e.key === "Enter"){
                    vueLightbox.lightboxHandler(true,photographerMediaCardImgOrVideo);
                }
            })
=======
            photographerMediaCardImgOrVideo.alt=this.mediasOfAPhotographer[i].title;
>>>>>>> master


            let photographerMediaCardLowDiv = document.createElement("div");
            photographerMediaCardLowDiv.classList.add("photographerMediaCardLowDiv");

            let photographerMediaCardTitle = document.createElement("h2");
            photographerMediaCardTitle.innerText = this.mediasOfAPhotographer[i].title;

            let photographerMediaCardLikesDiv = document.createElement("div");
            photographerMediaCardLikesDiv.classList.add("photographerMediaCardLikesDiv");

            let photographerMediaCardLikes = document.createElement("p");
            photographerMediaCardLikes.innerHTML = Number(this.mediasOfAPhotographer[i].likes);

            let photographerMediaCardHeart = document.createElement("i");
            photographerMediaCardHeart.classList.add("fa-regular", "fa-heart", "photographerHeartIcon");
            photographerMediaCardHeart.tabIndex=6+(i+1);            
            photographerMediaCardHeart.setAttribute("aria-label",`${this.mediasOfAPhotographer[i].title} like button`);

            photographerMediaCardHeart.addEventListener("keypress",(e)=>{
                if(e.key === "Enter"){
                    this.likesClicked(e);
                }
            })
            
            photographerMediaCardHeart.addEventListener("click", (e) => {
                this.likesClicked(e);
                // e.currentTarget.innerHTML = this.likesClicked(photographerMediaCardLikes.innerHTML, photographerMediaCardHeart,i)
            })

            photographerGrid.appendChild(photographerMediaCard);
            photographerMediaCard.appendChild(photographerMediaCardImgOrVideo);
            photographerMediaCard.appendChild(photographerMediaCardLowDiv);
            photographerMediaCardLowDiv.appendChild(photographerMediaCardTitle);
            photographerMediaCardLowDiv.appendChild(photographerMediaCardLikesDiv);
            photographerMediaCardLikesDiv.appendChild(photographerMediaCardLikes);
            photographerMediaCardLikesDiv.appendChild(photographerMediaCardHeart);

            totalLikesOfAPhotographer += this.mediasOfAPhotographer[i].likes;
        }
        this.totalLikesOfAPhotographer = totalLikesOfAPhotographer;
    }

    displayTotalLikesOfAPhotographer(){
        let totalLikesDiv = document.createElement("div");
        totalLikesDiv.classList.add("totalLikesDiv");
        this.photographerMain.appendChild(totalLikesDiv);
        let totalLikesLeftPart = document.createElement("div");
        totalLikesLeftPart.classList.add("totalLikesLeftPart");
        totalLikesDiv.appendChild(totalLikesLeftPart);
        let totalLikesRightPart = document.createElement("div");
        totalLikesRightPart.classList.add("totalLikesRightPart");
        totalLikesDiv.appendChild(totalLikesRightPart);

        let totalLikesText = document.createElement("p");
        let totalLikesValue = 0;
        
        for(let i = 0; i < this.mediasOfAPhotographer.length; i++){
            totalLikesValue+=this.mediasOfAPhotographer[i].likes;
        }
        
        totalLikesText.classList.add("totalLikesText");
        totalLikesText.innerHTML = totalLikesValue;
        totalLikesLeftPart.appendChild(totalLikesText);
        let photographerTotalLikesHeart = document.createElement("i");
        photographerTotalLikesHeart.classList.add("fa-regular", "fa-heart");
        photographerTotalLikesHeart.style.fontWeight = "bold";
        totalLikesLeftPart.appendChild(photographerTotalLikesHeart);

        let totalLikesPrice = document.createElement("p");
        totalLikesPrice.innerHTML = `${this.priceOfAPhotographer}€/ jour`;
        totalLikesPrice.classList.add("totalLikesText");
        totalLikesRightPart.appendChild(totalLikesPrice);
    }

    addEventSortMediasOfAPhotographer(popularitySort,titleSort,dateSort){

        let vueLightbox = new VueLightbox();
        popularitySort.addEventListener("click",()=>{
            this.sortByLikes(vueLightbox);
        })
        popularitySort.addEventListener("keypress",(e)=>{
            if(e.key==="Enter"){
                this.sortByLikes(vueLightbox);
            }
        })
        dateSort.addEventListener("click",()=>{
            this.sortByDate(vueLightbox);
        })
        dateSort.addEventListener("keypress",(e)=>{
            if(e.key==="Enter"){
                this.sortByDate(vueLightbox);
            }
        })
        titleSort.addEventListener("click",()=>{
            this.sortByName(vueLightbox);
        })
        titleSort.addEventListener("keypress",(e)=>{
            if(e.key==="Enter"){
                this.sortByName(vueLightbox);
            }
        })
    }
    sortByLikes(vueLightbox){
        this.mediasOfAPhotographer.sort((a,b)=>b.likes - a.likes);
        while(this.photographerMain.firstChild){
            this.photographerMain.removeChild(this.photographerMain.lastChild);
        }
        
        this.displayPageOfAPhotographer();
        vueLightbox.lightboxHandler();
    }
    sortByDate(vueLightbox){
        console.log("Tri par date YYYY/MM/DD")
        this.mediasOfAPhotographer.sort((a,b)=>{
            if (a.date < b.date) {return -1;}
            if (a.date > b.date) {return 1;}
            return 0;
        });
        while(this.photographerMain.firstChild){
            this.photographerMain.removeChild(this.photographerMain.lastChild);
        }

        this.displayPageOfAPhotographer();
        vueLightbox.lightboxHandler();
    }
    sortByName(vueLightbox){
        this.mediasOfAPhotographer.sort((a,b)=>{
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA < nameB) {return -1;}
            if (nameA > nameB) {return 1;}
            return 0;
        });
        while(this.photographerMain.firstChild){
            this.photographerMain.removeChild(this.photographerMain.lastChild);
        }
        this.displayPageOfAPhotographer();
        vueLightbox.lightboxHandler();
    }
    likesClicked(e) {
        let heartParent = e.target.closest(".photographerMediaCardLikesDiv");
        let heartLikesTag = heartParent.querySelector("p");
        let heartLikesValue = Number(heartLikesTag.innerText);
        let totalLikesTag = document.querySelector(".totalLikesText");
        let totalLikesValue = Number(totalLikesTag.innerText);
        
        if(e.target.classList.contains("heartLiked")){
            e.target.classList.remove("heartLiked");
            heartLikesTag.innerText = heartLikesValue - 1;
            totalLikesTag.innerText = totalLikesValue - 1;
        }else{
            e.target.classList.add("heartLiked");
            heartLikesTag.innerText = heartLikesValue + 1;
            totalLikesTag.innerText = totalLikesValue + 1;
        }
    }
}