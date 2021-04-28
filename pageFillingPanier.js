// import {getTeddy} from './index.js'
// import {AddToDataStorage} from './pageFillingArticle.js'
// import {ExtractFromDataStorage} from './pageFillingArticle.js'

//Cette fonction permet d'extraire des variables stockées
const ExtractFromDataStorage = function (StorageLocationName){
    var obj = JSON.parse(sessionStorage[StorageLocationName]);
    return obj;
}

//POST pour l'envoie du contact et du tableau d'achats
const sendPurchaseRequest = async function (dataToSend) {
    console.log(dataToSend);
    try {
        let response = await fetch('h​ttp://localhost:3000/api/teddies/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dataToSend) 
        })

        console.log("response OK est affiché ci-dessous");
        console.log(response.ok); //false
        
        let responseData = await response.json();
        sessionStorage.setItem('memoryResponse', responseData.orderId);
        //window.location = 'remerciement.html';

    } catch (error){
        console.log(error);
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
    newTrElem.id = index + 1;
    mainElem.appendChild(newTrElem);

    let secondElem = document.getElementById(index +1);
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
var lastNameVerification = false;
var adressVerification = false;
var cityVerification = false;
var emailVerification = true;

//EventListener pour s'assurer que la valeur des champs est juste
document.getElementById('firstName').addEventListener('change', function (event) {
  let constraint = /^[ a-zA-Z\-\’]{3,}/;

    if (constraint.test(this.value)) { //ça fonctionne :)
        firstNameVerification = true;
        document.getElementById('firstName').classList.remove("red");
        if (firstNameVerification & lastNameVerification & adressVerification & cityVerification & emailVerification) {
            document.getElementById("bttFormSend").removeAttribute("disabled");
        }
    }
    else { //ne fonctionne pas :(
        document.getElementById("bttFormSend").setAttribute("disabled", true);
        document.getElementById('firstName').classList.add("red");
        firstNameVerification = false;
    }
} );
document.getElementById('lastName').addEventListener('change', function () {
    let constraint = /^[ a-zA-Z\-\’]{3,}/;

    if (constraint.test(this.value)) { //ça fonctionne :)
        lastNameVerification = true;
        document.getElementById('lastName').classList.remove("red");
        if (firstNameVerification & lastNameVerification & adressVerification & cityVerification & emailVerification) {
            document.getElementById("bttFormSend").removeAttribute("disabled");
        }
    }
    else { //ne fonctionne pas :(
        document.getElementById("bttFormSend").setAttribute("disabled", true);
        document.getElementById('lastName').classList.add("red");
        lastNameVerification = false;
    }
});
document.getElementById('adress').addEventListener('change', function () {
    let constraint = /^[ a-zA-Z\-\’]{3,}/;

    if (constraint.test(this.value)) { //ça fonctionne :)
        adressVerification = true;
        document.getElementById('adress').classList.remove("red");
        if (firstNameVerification & lastNameVerification & adressVerification & cityVerification & emailVerification) {
            document.getElementById("bttFormSend").removeAttribute("disabled");
        }
    }
    else { //ne fonctionne pas :(
        document.getElementById("bttFormSend").setAttribute("disabled", true);
        document.getElementById('adress').classList.add("red");
        lastNameVerification = false;
    }
});
document.getElementById('city').addEventListener('change', function () {
    let constraint = /^[ a-zA-Z\-\’]{3,}/;

    if (constraint.test(this.value)) { //ça fonctionne :)
        cityVerification = true;
        document.getElementById('city').classList.remove("red");
        if (firstNameVerification & lastNameVerification & adressVerification & cityVerification & emailVerification) {
            document.getElementById("bttFormSend").removeAttribute("disabled");
        }
    }
    else { //ne fonctionne pas :(
        document.getElementById("bttFormSend").setAttribute("disabled", true);
        document.getElementById('city').classList.add("red");
        lastNameVerification = false;
    }
});
document.getElementById('email').addEventListener('change', function () {
    
});

//eventListener pour envoyer le formulaire
document.getElementById('bttFormSend').addEventListener('click', function (e) {
    e.preventDefault();
    /*let formPurchaseOrder = {
        contact : {
            firstName : document.getElementById('firstName').value,
            lastName : document.getElementById('lastName').value,
            email : document.getElementById('email').value,
            address : document.getElementById('adress').value,
            city : document.getElementById('city').value},
        products : []
    };
    for (let index = 0; index < basketToDisplay.length; index++) {
        formPurchaseOrder.products.push(basketToDisplay[index].id);
    }*/

    let contact = {
        firstName : "matthias",
        lastName : "aznar-schwarz",
        email : "matthias.aznar-schwarz@gmail.com",
        address : "kleber",
        city : "Colmar"
    };
    let products = ["5be9c8541c9d440000665243", "5beaa8bf1c9d440000a57d94"];

    let formPurchaseOrder = {contact, products}; 

    //cette fonction envoie la requete POST vers le serveur
    sendPurchaseRequest (formPurchaseOrder);

    console.log(sessionStorage.getItem('memoryResponse'));
});

/*let contact = {
        firstName : "matthias",
        lastName : "aznar-schwarz",
        email : "matthias.aznar-schwarz@gmail.com",
        adress : "kleber",
        city : "Colmar"
    };
    let products = ["5be9c8541c9d440000665243", "5beaa8bf1c9d440000a57d94"];

    let formPurchaseOrder = {contact, products}; */