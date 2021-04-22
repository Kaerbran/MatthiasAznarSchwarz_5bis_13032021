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

