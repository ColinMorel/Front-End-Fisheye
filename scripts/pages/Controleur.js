class Controleur{
    async showPhotographers(){
        let modele = new Modele();
        let list_photographers =  await modele.getPhotographers();

        let vue = new VueIndex();
        vue.displayIndex(list_photographers);    
    }
    async showAPhotographer(){
        let params = new URL(document.location).searchParams;
        let id = params.get("id");
        let modele = new Modele();
        let photographer =  await modele.getAPhotographer(id);

        let vue = new VuePhotographer();
        vue.displayAPhotographer(photographer);    
    }
    async showMediasOfThePhotographer(){
        let params = new URL(document.location).searchParams;
        let id = params.get("id");
        let modele = new Modele();
        let photographer =  await modele.getAPhotographer(id);

        let listMediasOfThePhotographer =  await modele.getMediasOfAPhotographer(id);
        let vue = new VuePhotographer(listMediasOfThePhotographer,photographer.name,photographer.price);
        let vueLightbox = new VueLightbox();
        vue.displayPageOfAPhotographer();
        vueLightbox.lightboxHandler();
    }
}