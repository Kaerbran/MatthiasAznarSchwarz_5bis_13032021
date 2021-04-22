// import {getTeddy} from './index.js'   //n'est pas supporté par les navigateurs...
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

//permet de connaitre le Teddybear sélectionné dans index.js
let GetURL = JSON.parse(sessionStorage.GetURLArticle);

//permet de remplir le conten de la page, avaec la valeur envoyé par index.js
getTeddy(GetURL)
.then(function (objectTeddy) {
    
    //Inserer l'image du Teddybear
    document.getElementById('articleImageTeddy').src = objectTeddy.imageUrl;
    document.getElementById('articleImageTeddy').alt = 'Un beau nounours!';

    //Inserer le nom du Teddybear
    document.getElementById('articleNameTeddy').innerHTML = objectTeddy.name;
    document.getElementById('articleNameTeddy').titel = objectTeddy._id;    //pas une bonne pratique. J'aurais du passer par l'id de cet élement.

    //Inserer la description du Teddybear
    document.getElementById('articleDescriptionTeddy').innerHTML = objectTeddy.description;

    //Inserer le prix du Teddybear
    document.getElementById('articlePriceTeddy').innerHTML = objectTeddy.price;

    //Inserer le menu déroulant du Teddybear
    for (let index = 0; index < objectTeddy.colors.length; index++) {
        const newOptionElem = document.createElement("option");
        newOptionElem.value = objectTeddy.colors[index];
        newOptionElem.innerHTML = objectTeddy.colors[index];
        
        document.getElementById('articleOptionsTeddy').appendChild(newOptionElem);
    }
})
.then(function () {
    //Ajoute un EventListener de type 'click' sur le boutton
    let elementBttArticle = document.getElementById('articleBttAddBasket');
    elementBttArticle.addEventListener('click', AddToBasket)
});

//Cette fonction permet lors d'un click, d'enregistrer les Teddy ajoutés au panier
const AddToBasket = function () {
    if (document.getElementById('articleOptionsTeddy').options[document.getElementById('articleOptionsTeddy').selectedIndex].value != "no_selection") {
        let Article = {
            name : document.getElementById('articleNameTeddy').innerHTML,
            id : document.getElementById('articleNameTeddy').titel,
            image : document.getElementById('articleImageTeddy').src,
            price : document.getElementById('articlePriceTeddy').innerHTML,
            color : document.getElementById('articleOptionsTeddy').options[document.getElementById('articleOptionsTeddy').selectedIndex].value
        };
        console.log('%c Find below the object that needs to be added to the basket', 'color: green; font-weight: bold;');
        console.log(Article);

        //fonction permettant d'enregistrer les articles que l'on met dans le panier
        AddToDataStorage (Article, 'listeBasketTest3', true);

        let TestStoredData = ExtractFromDataStorage ('listeBasketTest3');
        console.log('%c Ci-dessous les données qui viennent juste d être sauvegardées.', 'color: green; font-weight: bold;');
        console.log(TestStoredData);

    } else{
        console.log('%c Requête non sauvegardé, car aucune sélection n a été faite.', 'color: red; font-weight: bold;');
    }
}

//export {AddToDataStorage};    //n'est pas supporté par les navigateurs...
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

//export {ExtractFromDataStorage};    //n'est pas supporté par les navigateurs...
//Cette fonction permet d'extraire des variables stockées
const ExtractFromDataStorage = function (StorageLocationName){
    var obj = JSON.parse(sessionStorage[StorageLocationName]);
    return obj;
}