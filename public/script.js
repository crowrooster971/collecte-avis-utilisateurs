document.getElementById('avisForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const produit = document.getElementById('produit').value;
    const note = document.getElementById('note').value;
    const avis = document.getElementById('avis').value;

    fetch('/avis', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ produit, note, avis })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('avisList').innerHTML += `<p><strong>${data.produit}</strong> - ${data.note} étoiles: ${data.avis}</p>`;
        document.getElementById('avisForm').reset();
    })
    .catch(error => console.error('Erreur:', error));
});

function loadAvis() {
    fetch('/avis')
        .then(response => response.json())
        .then(data => {
            const avisList = document.getElementById('avisList');
            avisList.innerHTML = '';
            data.forEach(avis => {
                avisList.innerHTML += `<p><strong>${avis.produit}</strong> - ${avis.note} étoiles: ${avis.avis}</p>`;
            });
        });
}

window.onload = loadAvis;