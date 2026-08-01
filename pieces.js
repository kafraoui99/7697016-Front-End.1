// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json")
const pieces = await reponse.json()
//
const article = pieces[0]

const imageElement = document.createElement("img")
imageElement.src = article.image

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


const sectionFiche = document.querySelector(".fiches")

sectionFiche.appendChild(imageElement)
sectionFiche.appendChild(nomElement)
sectionFiche.appendChild(prixElement)
sectionFiche.appendChild(categorieElement)
sectionFiche.appendChild(descriptionElement)
sectionFiche.appendChild(disponibiliteElement)