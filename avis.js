export function ajoutListenersAvis() {

    const piecesElements = document.querySelectorAll(".fiches article button");
 
    for (let i = 0; i < piecesElements.length; i++) {
 
     piecesElements[i].addEventListener("click", async function (event) {
 
        const id = event.target.dataset.id;
        const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
        const avis = await reponse.json();
        window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis));
        const pieceElement = event.target.parentElement;

        afficheAvis(pieceElement, avis);
 
     });
 
    }
 }
export function afficheAvis(pieceElement, avis) {

        // Si un bloc d'avis existe déjà pour cette pièce, on le supprime avant d'en recréer un
        const ancienAvisElement = pieceElement.querySelector(".avis-liste");
        if (ancienAvisElement !== null) {
            ancienAvisElement.remove();
        }

        const avisElement = document.createElement("p");
        avisElement.classList.add("avis-liste");
        for (let i = 0; i < avis.length; i++) {
            avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
        }
        pieceElement.appendChild(avisElement);
 }
 
 export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
    event.preventDefault();
    // Création de l’objet du nouvel avis.
    const avis = {
        pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
        utilisateur: event.target.querySelector("[name=utilisateur]").value,
        commentaire: event.target.querySelector("[name=commentaire]").value,
        nbEtoiles: parseInt(event.target.querySelector("[name=nbEtoiles]").value)
    };
    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(avis);
    // Appel de la fonction fetch avec toutes les informations nécessaires
    fetch("http://localhost:8081/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });
    });
    
 }
 export async function afficherGraphiqueAvis(){
		const avis = await fetch('http://localhost:8081/avis').then(avis => avis.json());
		const nb_commentaires = [0,0,0,0,0]

		for (let commentaire of avis){
			nb_commentaires[commentaire.nbEtoiles - 1] ++
	}
    // Légende qui s'affichera sur la gauche à côté de la barre horizontale
        const labels = ["5", "4", "3", "2", "1"];
    
    // Données et personnalisation du graphique
        const data = {
        labels: labels,
        datasets: [{
            label: "Étoiles attribuées",
            data: nb_commentaires.reverse(),
            backgroundColor: "rgba(255, 230, 0, 1)", // couleur jaune
        }],
        };
        // Objet de configuration final
        const config = {
        type: "bar",
        data: data,
        options: {
            indexAxis: "y",
        },
        };
        // Rendu du graphique dans l'élément canvas
        const graphiqueAvis = new Chart(
        document.querySelector("#graphique-avis"),
        config,
        );
}

 export async function afficherGraphiqueAvisDispo(pieces){
		const avis = await fetch('http://localhost:8081/avis').then(avis => avis.json());
        const nb_avis = [0,0]
		for (let piece of pieces){
            for (let commentaire of avis){
                if (commentaire.pieceId === piece.id){
                    if (piece.disponibilite){
                        nb_avis[0] ++
                    }else{
                        nb_avis[1] ++
                    }
                }
            }
            
	}
    // Légende qui s'affichera sur la gauche à côté de la barre horizontale
        const labels = ["Pieces disponibles", "Pièces indisponibles"];
    
    // Données et personnalisation du graphique
        const data = {
        labels: labels,
        datasets: [{
            label: "avis attribués selon la disponibilité",
            data: nb_avis,
            backgroundColor: "rgba(255, 0, 0, 1)", // couleur rouge
        }],
        };
        // Objet de configuration final
        const config = {
        type: "bar",
        data: data,
        options: {
            indexAxis: "x",
        },
        };
        // Rendu du graphique dans l'élément canvas
        const graphiqueAvis = new Chart(
        document.querySelector("#graphique-avis-dispo"),
        config,
        );
}
        