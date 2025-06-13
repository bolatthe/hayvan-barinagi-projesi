async function loadRequests() {
  const res = await fetch('/api/admin/requests');
  const data = await res.json();
  const div = document.getElementById('requests');
  data.forEach(r => {
    const el = document.createElement('div');
    el.innerHTML = `${r.userId.username} kullanıcısı ${r.animalId.species} için talep gönderdi - Durum: ${r.status}
    <button onclick="update('${r._id}', 'accept')">Kabul</button>
    <button onclick="update('${r._id}', 'reject')">Red</button>`;
    div.appendChild(el);
  });
}
async function update(id, action) {
  await fetch(`/api/admin/requests/${id}/${action}`, { method: 'POST' });
  location.reload();
}
loadRequests();

