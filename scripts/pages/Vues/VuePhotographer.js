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
    }

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
        let photographerSortPopularityUp = document.createElement("a");
        photographerSortPopularityUp.classList.add("photographerSortPopularityUpLink");
               
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
        let photographerSortDate = document.createElement("div");
        photographerSortDate.classList.add("photographerSortLink");
        photographerSortDate.innerHTML = "Date";
        photographerSortDate.classList.add("photographerSortDate");

        let photographerSortTitle = document.createElement("div");
        photographerSortTitle.classList.add("photographerSortTitle");
        photographerSortTitle.classList.add("photographerSortLink");
        photographerSortTitle.innerHTML = "Titre";
        photographerSort.appendChild(photographerSortDate);
        photographerSort.appendChild(photographerSortTitle);

        photographerSortDate.classList.add("sortHidden");
        photographerSortTitle.classList.add("sortHidden");
        let photographerSortPopularityUpImgAngle = 0;
        photographerSortPopularityUp.addEventListener("click", () => {
            photographerSortPopularityUpImgAngle+=180;
            photographerSortPopularityUpImg.style.transform=`rotate(${photographerSortPopularityUpImgAngle}deg)`;
            if (photographerSortPopularityUp.isClicked) {
                photographerSortPopularityUp.isClicked = false;
                photographerSortDate.classList.add("sortHidden");
                photographerSortTitle.classList.add("sortHidden");
            } else {
                photographerSortPopularityUp.isClicked = true;
                photographerSortDate.classList.remove("sortHidden");
                photographerSortTitle.classList.remove("sortHidden");
            }
        })

        this.addEventSortMediasOfAPhotographer(photographerSortPopularity,photographerSortTitle,photographerSortDate);
    }

    displayMediasOfAPhotographer(){
        
        let photographerGrid = document.createElement("div");
        photographerGrid.classList.add("photographerGrid");
        this.photographerMain.appendChild(photographerGrid);        

        let totalLikesOfAPhotographer = 0;

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
            this.mediasOfAPhotographer.sort((a,b)=>b.likes - a.likes);
            while(this.photographerMain.firstChild){
                this.photographerMain.removeChild(this.photographerMain.lastChild);
            }
            
            this.displayPageOfAPhotographer();
            vueLightbox.lightboxHandler();
        })
        dateSort.addEventListener("click",()=>{
            console.log("Tri par date YYYY/MM/DD")
            this.mediasOfAPhotographer.sort((a,b)=>{
                if (a.date < b.date) {return -1;}
                if (a.date > b.date) {return 1;}
                return 0;
            });
            while(this.photographerMain.firstChild){
                this.photographerMain.removeChild(this.photographerMain.lastChild);
            }

            // console.log(photographerSortDiv.childNodes[0])
            // photographerSortDiv.replaceChild(photographerSortPopularityDiv,photographerSortDate);
            // console.log(photographerSortDiv.childNodes[0])

            this.displayPageOfAPhotographer();
            vueLightbox.lightboxHandler();
        })
        titleSort.addEventListener("click",()=>{
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
        })
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