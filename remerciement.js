
//Ci-dessous l'adresse web de la page de remerciements
let URLOfPage = new URLSearchParams(window.location.search);

//Ci-dessous on réinjecte le prix et la référence de la commande dans le HTML 
document.getElementById("refPurchaseRemerciements").textContent += URLOfPage.get("id_");
document.getElementById("priceRemerciements").textContent += URLOfPage.get("price") + " €";