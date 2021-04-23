// import {getTeddy} from './index.js'
// import {AddToDataStorage} from './pageFillingArticle.js'
// import {ExtractFromDataStorage} from './pageFillingArticle.js'

//Cette fonction permet d'extraire des variables stockées
const ExtractFromDataStorage = function (StorageLocationName){
    var obj = JSON.parse(sessionStorage[StorageLocationName]);
    return obj;
}

//Cette fonction permet de stocker (des objects) dans la session Storage. (Sous la forme d'un tableau.)
const AddToDataStorage = function (ObjectToStore, StorageLocationName, AddToMemory) {
    if (typeof Storage !== "undefined") {
        // localStorage & sessionStorage support!

        if (AddToMemory && sessionStorage.getItem(StorageLocationName) != null){
            let allreadyStoredObject = ExtractFromDataStorage(StorageLocationName);
            //console.log('%c Find below the list of all teddies that are in the previous shopping list', 'color: orange; font-weight: bold;');
            //console.log (allreadyStoredObject);
            
            allreadyStoredObject.push(ObjectToStore);
            //console.log('%c Find below the list of all teddies that are in the new shopping list', 'color: orange; font-weight: bold;');
            //console.log (allreadyStoredObject);

            sessionStorage.setItem(StorageLocationName, JSON.stringify(allreadyStoredObject));
        }
        else{
            let ArrayToStore = [];
            ArrayToStore.push(ObjectToStore);
            sessionStorage.setItem(StorageLocationName, JSON.stringify(ArrayToStore));
            //console.log('%c Find below the list of the teddy that was added in the shopping list', 'color: green; font-weight: bold;');
            //console.log (ArrayToStore);
        }
    }
    else {
        // No web storage support
        console.log('%c No web storage support', 'color: red; font-weight: bold;');
    }
}

//fonction GetAllTeddy : nous permet de recevoir un Array avec l'ensemble des ours
const getTeddy = async function (APIUrl) {
    try{
        console.log("The URL value is :" + APIUrl);
        let responseAllTeddy = await fetch(APIUrl)
        if(responseAllTeddy.ok){
            let data = await responseAllTeddy.json()
            console.log(data)
            return data;
        } else{
            console.error('Error code from server : ${error}');
        }
    } catch (e) {
        console.log(e);
    }
}

// --------------------------------------------------------------------------------

//permet d'afficher la liste de course
var basketToDisplay = JSON.parse(sessionStorage.listeBasketTest3);
//le tableau est completer en fonction des élements qui se trouvent dans l'object "panier"
for (let index = 0; index < basketToDisplay.length; index++) {
    //creer l'element tr
    let mainElem = document.getElementById('bodyToFill');
    const newTrElem = document.createElement("tr");
    newTrElem.id = basketToDisplay[index].id;
    mainElem.appendChild(newTrElem);

    let secondElem = document.getElementById(basketToDisplay[index].id);
        //creer l'element td Nom du Teddy
        const newTdElemName = document.createElement("td");
        newTdElemName.innerHTML = basketToDisplay[index].name;
        secondElem.appendChild(newTdElemName);

        //creer l'element td Couleur du Teddy
        const newTdElemColor = document.createElement("td");
        newTdElemColor.innerHTML = basketToDisplay[index].color;
        secondElem.appendChild(newTdElemColor);

        //creer l'element td Prix du Teddy
        const newTdElemPrice = document.createElement("td");
        newTdElemPrice.innerHTML = basketToDisplay[index].price;
        secondElem.appendChild(newTdElemPrice);
}  

//boucle pour calculer la somme du panier
var sommePrix = 0;
for (let index = 0; index < basketToDisplay.length; index++) {
    sommePrix += Number(basketToDisplay[index].price);
}
document.getElementById('summePriceBasket').innerHTML = sommePrix;

var firstNameVerification = false;
var lastNameVerification = true;
var adressVerification = true;
var cityVerification = true;
var emailVerification = true;

//EventListener pour s'assurer que la valeur des champs est juste
document.getElementById('firstName').addEventListener('change', function (event) {
  let constraint = /^[ a-zA-Z\-\’]{3,}/;

    if (constraint.test(this.value)) { //ça fonctionne :)
        firstNameVerification = true;
        if (firstNameVerification + lastNameVerification + adressVerification + cityVerification + emailVerification) {
            document.getElementById("bttFormSend").removeAttribute("disabled");
        }
    }
    else { //ne fonctionne pas :(
        document.getElementById("bttFormSend").setAttribute("disabled", true);
        firstNameVerification = false;
    }
} );
document.getElementById('lastName').addEventListener('change', function () {
    
});
document.getElementById('adress').addEventListener('change', function () {
    
});
document.getElementById('city').addEventListener('change', function () {
    
});
document.getElementById('email').addEventListener('change', function () {
    
});

//eventListener pour envoyer le formulaire
document.getElementById('bttFormSend').addEventListener('click', function (event) {
    event.preventDefault();

    let formPurchaseOrder = {
        contactDetails : {
            firstName : document.getElementById('firstName').value,
            lastName : document.getElementById('lastName').value,
            adresse : document.getElementById('adress').value,
            city : document.getElementById('city').value,
            email : document.getElementById('email').value},
        Basket : []
    }

    for (let index = 0; index < basketToDisplay.length; index++) {
        let productAddForm = {
            id : basketToDisplay[index].id,
            color : basketToDisplay[index].color 
        }
        formPurchaseOrder.Basket.push(productAddForm);
    }

    console.log(formPurchaseOrder);

    //ici mettre Fetch with POST   
});