import { ajoutListenersAvis } from "./avis.js"


// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("http://localhost:8081/pieces/").then( pieces => pieces.json())
// const pieces = await reponse.json()





function genererPieces(pieces) {

    for(let i=0 ; i<pieces.length ; i++){

        const article = pieces[i]


        const sectionFiche = document.querySelector(".fiches")

        const pieceElement = document.createElement("article")
        

        
        const imageElement = document.createElement("img")
        imageElement.src = article.image
        imageElement.alt = article.nom

        const nomElement = document.createElement("h2")
        nomElement.innerText = article.nom

        const prixElement = document.createElement("p")
        prixElement.innerText = `prix: ${article.prix} € (${article.prix < 50 ? "€" : "€€€"})`

        const categorieElement = document.createElement("p")
        categorieElement.innerText = article.categorie ?? "(aucun categorie)"

        const descriptionElement = document.createElement("p")
        descriptionElement.innerText = article.description ?? "(Pas de description pour le moment.)"

        const disponibiliteElement = document.createElement("p")
        disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock"

        const avisElement = document.createElement("button")
        avisElement.dataset.id = article.id
        avisElement.textContent = "Afficher les avis"
        
        sectionFiche.appendChild(pieceElement)

        pieceElement.appendChild(imageElement)
        pieceElement.appendChild(nomElement)
        pieceElement.appendChild(prixElement)
        pieceElement.appendChild(categorieElement)
        pieceElement.appendChild(descriptionElement)
        pieceElement.appendChild(disponibiliteElement)
        pieceElement.appendChild(avisElement)
    }
    ajoutListenersAvis();
}
// 1 ere Affihcage des pieces
genererPieces(pieces);

const btnTrier = document.querySelector(".btn-trier")
btnTrier.addEventListener("click", function() {
    const piecesOrdonnees = Array.from(pieces)
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix  
   
});
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesOrdonnees)
    })


const btnFiltrer = document.querySelector(".btn-filtrer")
btnFiltrer.addEventListener("click", function() {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });

    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltrees)
});
const btnFiltrerDescription = document.querySelector(".btn-filtrer-description")
btnFiltrerDescription.addEventListener("click", function() {
    const piecesFiltreesDescription = pieces.filter(function (piece) {
        return piece.description;
    })
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltreesDescription)
})
const btnTrierDesc = document.querySelector(".btn-trier-desc")
btnTrierDesc.addEventListener("click", function() {
    const piecesOrdonneesDesc = Array.from(pieces)
    piecesOrdonneesDesc.sort(function (a, b) {
        return b.prix - a.prix
    });
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesOrdonneesDesc)
}); 

const noms = pieces.map( (piece) => piece.nom
)
for(let i= noms.length -1; i>=0 ;i--) {
    if(pieces[i].prix > 35) {
        noms.splice(i,1)
    }
}
console.log(noms)

const abordablesElements = document.createElement("ul")
for (let i=0; i<noms.length; i++) {
    const liElement = document.createElement("li")
    liElement.innerText = noms[i]
    abordablesElements.appendChild(liElement)
}
document.querySelector(".abordables").appendChild(abordablesElements)


const diponisblesElements = document.createElement("ul")
for (let i=0; i<pieces.length; i++) {
    if(pieces[i].disponibilite){

        const liElement = document.createElement("li")
        liElement.innerText = `${pieces[i].nom} _ ${pieces[i].prix} €`
        diponisblesElements.appendChild(liElement)
    } 
    }
    
document.querySelector(".disponibles").appendChild(diponisblesElements)

const inputPrixMax = document.querySelector("#prix-max")
inputPrixMax.addEventListener("input", function() {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltrees)
})   
