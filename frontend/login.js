async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log("🔐 Giriş deneniyor:", username);

  const res = await fetch('http://localhost:5000/api/login', {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  console.log("🔁 Gelen yanıt:", data);

  if (res.ok) {
    if (data.role === 'admin') {
      console.log("👑 Admin girişi, yönlendiriliyor...");
      window.location = 'admin.html';
    } else {
      console.log("👤 Kullanıcı girişi, yönlendiriliyor...");
      window.location = 'dashboard.html';
    }
  } else {
    console.error("🚫 Giriş başarısız:", data.message);
    alert(data.message || 'Giriş başarısız.');
  }
}
