async function loadAnimals() {
  const res = await fetch('/api/animals');
  const animals = await res.json();
  const container = document.getElementById('animal-container');
  animals.forEach(animal => {
    const card = document.createElement('div');
    card.innerHTML = `${animal.species} | ${animal.gender} | ${animal.age} yaş <button onclick="adopt('${animal._id}')">Sahiplen</button>`;
    container.appendChild(card);
  });
}
async function adopt(animalId) {
  const userId = prompt("Kullanıcı ID'nizi girin:");
  await fetch(`/api/adopt/${animalId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });
}
loadAnimals();