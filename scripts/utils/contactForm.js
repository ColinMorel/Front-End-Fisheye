// Get DOM ELEMENTS
class ContactForm{
    constructor(){
        this.modal = document.getElementById("contactModal");
        this.header = document.querySelector("header");
        this.main = document.querySelector("main");  
        const contactButton = document.querySelector(".contactButton");
        contactButton.addEventListener("click",()=>this.displayModal());  //Vu qu'on est dans une classe, on doit utiliser la notation fléchée pour pouvoir, dans displayModal, utiliser les this.modal....
        this.isInputValidList = {}; //Objet plutôt que tableau pour avoir en guise de clé, un id par exemple plutot que 0 1 2 3 ...
        this.sendFormButton = document.querySelector(".contactButton2");
    }

    displayModal(){   
        this.modal.style.display = "block";
        this.header.style.opacity="30%";
        this.main.style.opacity="30%";
        this.initEventListeners();
    }   

    initEventListeners(){
        this.modal.addEventListener("click",(e)=>this.closeModal(e));                
        const listInputs = document.querySelectorAll("#form input");        
        for(let currentInput of listInputs){
            this.isInputValidList[currentInput.id]=false;
            switch(currentInput.dataset.type){ /* pour récuperer mon data-type que j'ai ajouté*/ 
                case "text":        
                    this.inputIsNameHandler(currentInput);            
                    currentInput.addEventListener("input",()=>this.inputIsNameHandler(currentInput));
                    break;
                case "text-area":
                    this.inputIsTextHandler(currentInput);            
                    currentInput.addEventListener("input",()=>this.inputIsTextHandler(currentInput));
                    break;

                case "email":
                    this.inputIsEmailHandler(currentInput);
                    currentInput.addEventListener("input",()=>{this.inputIsEmailHandler(currentInput)});
                    break;

                default:
                    break;
            }
        }
            window.addEventListener("load",() => {
                currentInput.value="";
            }); // Vider le formulaire si on refresh la page!!
        this.checkButton();
    }
    

    closeModal(event){
        if(event.target.id !== "contactModal" && event.target.id !=="closeFormIcon" ){ //Si on clique sur tout sauf l'exterieur du form ou sur la croix, on ne fait rien, sinon on ferme le formulaire
            return;
        }

        const listInputs = document.querySelectorAll("#form input");
        for(let currentInput of listInputs){
            currentInput.value=""
            currentInput.style.border="none";
        }   

        this.modal.style.display = "none";
        this.header.style.opacity="100%";
        this.main.style.opacity="100%";        
    }    
    
    inputIsNameHandler(currentInput){        
        const namesRegex = /^[a-zA-Z\-]+$/;
        if(currentInput.value.match(namesRegex) && currentInput.value.length>2){
            currentInput.style.border="none";
            this.isInputValidList[currentInput.id] = true;   
        }
        else{
            currentInput.style.border="1px solid red";
            this.isInputValidList[currentInput.id] = false;   
        }
        this.checkButton();
    }

    inputIsTextHandler(currentInput){
        if(currentInput.value.length<10){
            console.log(`le message doit encore faire  ${10-currentInput.value.length} charactères`)
            currentInput.style.border="1px solid red";
            this.isInputValidList[currentInput.id] = false;   
        }
        else{
            currentInput.style.border="none";
            this.isInputValidList[currentInput.id] = true;   
        }
        this.checkButton();
    }

    inputIsEmailHandler(currentInput){
        const mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/;
        if(!currentInput.value.match(mailRegex)){
            currentInput.style.border="1px solid red";
            this.isInputValidList[currentInput.id] = false;
        }
        else{
            this.isInputValidList[currentInput.id] = true;
            currentInput.style.border="none";   
        }
        this.checkButton();
    }

    checkButton(){
        this.sendFormButton.disabled="true";
        for (let currentInputKey in this.isInputValidList){
            if(!this.isInputValidList[currentInputKey]){
                this.sendFormButton.disabled="true";
                return;
            }
        }
        this.sendFormButton.disabled=null;
    }    
}

