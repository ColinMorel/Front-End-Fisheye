class VueIndex{
    displayIndex(photographers){
        const photographersSection = document.querySelector(".photographer_section");
        for(let i=0;i<photographers.length;i++){
            let photographerCard = document.createElement("article");
            photographersSection.appendChild(photographerCard);

            let photographerLink = document.createElement("a");
            photographerLink.href=`./photographer.html?id=${photographers[i].id}`;
            photographerCard.appendChild(photographerLink);

            let photographerImage = document.createElement("img");
            photographerImage.src=`./././assets/SamplePhotos/PhotographersIdPhotos/${photographers[i].portrait}`;
            photographerImage.alt=`${photographers[i].portrait}`;
            photographerLink.appendChild(photographerImage);

            let photographerName = document.createElement("h2");
            photographerName.innerText=photographers[i].name;
            photographerLink.appendChild(photographerName);            

            let photographerLocalisation = document.createElement("h3");
            photographerLocalisation.innerText=`${photographers[i].city}, ${photographers[i].country}`;
            photographerCard.appendChild(photographerLocalisation);

            let photographerTagLine = document.createElement("p");
            photographerTagLine.innerText=photographers[i].tagline;
            photographerCard.appendChild(photographerTagLine);

            let photographerPrice = document.createElement("p");
            photographerPrice.classList.add("photographerPrice");
            photographerPrice.innerText=`${photographers[i].price}€/jour`;
            photographerCard.appendChild(photographerPrice);

        }
    };    
}